const express = require('express');

const db = require('../config/connection');

// You will be able to search Employee by their Manager
const employeesByManagerSelect = `SELECT 
    x.id, x.first_name, x.last_name, 
    roles.title AS role,
    departments.name AS department,
    roles.salary AS salary,
    CONCAT_WS(' ', y.first_name, y.last_name) AS manager
    FROM employees x
    LEFT JOIN employees y ON x.manager_id = y.id
    LEFT JOIN roles ON x.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = department.id
    ORDER BY manager`;

// Search for Employee
const employeePrompt = [
    {
        type: 'input',
        name: 'firstName',
        message: "Please enter the Employee's First Name."
    },
    {
        type: 'input',
        name: 'lastName',
        message: "Please enter the Employee's Last Name."
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: "Please SELECT the Employee's Role.",
        choices: [
            'Business Manager',
            'Sales Director',
            'Promotions Director',
            'Program Director',
            'Chief Engineer',
            'On-Air Talent',
            'Production Manager',
            'Staff Engineer',
            'Account Executive',
            'Local Sales Rep',
            'National Sales Rep',
            'Promotions Coordinator',
            'Field Coordinator',
            'Intern'
        ]
    },
    {
        type: 'confirm',
        name: 'confirmManager',
        message: 'Does this Employee have a Manager?',
        default: true
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: "Who is the Employee's Manager?",
        choices: [
            'Janet DellaDenunzio',
            'Chidi Anagonye',
            'Meg Manning',
            'Dick Casablancas',
            'Jessica Day'
        ],
        validate: employeeManagerInput => {
            if(employeeManagerInput) {
                return true;
            }
            else{
                console.log('Please SELECT a Manager Name.');
            }
        }
    }
];

const newId = (empName) => {
    let employeeId;

    if(empName === 'Eleanor Shellstrop') {
        employeeId = 1
    }
    if(empName === 'Tahani Anagoney') {
        employeeId = 2
    }
    if(empName === 'Jason Mendoza') {
        employeeId = 3
    }
    if(empName === 'Veronica Mars') {
        employeeId = 4
    }
    if(empName === 'Logan Echolls') {
        employeeId = 5
    }
    if(empName === 'Wallace Fennel') {
        employeeId = 6
    }
    if(empName === 'Lilly Kane') {
        employeeId = 7
    }
    if(empName === 'Gia Goodman') {
        employeeId = 8
    }
    if(empName === 'Eli Navarro') {
        employeeId = 9
    }
    if(empName === 'Jackie Cook') {
        employeeId = 10
    }
    if(empName === 'Michael Danson') {
        employeeAdd = 11
    }

    return employeeId;
}

// ADD New Employee
const employeeAdd = (({ firstName, lastName, employeeRole, employeeManager, confirmManager }) => {
    let managerId;

    if(confirmManager === false) {
        managerId = null;
    }
    else{ 
        managerId = newId(manager);
    }
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES
    (?, ?, (SELECT id FROM roles WHERE title =?), ?)`;

    const params = [firstName, lastName, employeeRole, managerId];

    db.query(sql, params, (err, res) => {
        if(err) {
            res.json(400).json({ error: error });
            return;
        }
        res.json({
            message: 'Successfully added!',
            data: firstName, lastName, employeeRole, managerId
        })
    });
});

// UPDATE Employee Data
const empUpdatePrompt = [
    {
        type: 'list',
        name: 'employee',
        message: 'Please SELECT the Employee you would like to UPDATE.',
        choices: [
            'Eleanor Shellstrop',
            'Tahani AlJamil',
            'Jason Mendoza',
            'Veronica Mars',
            'Logan Echolls',
            'Wallace Fennel',
            'Lilly Kane',
            'Gia Goodman',
            'Eli Navarro',
            'Jackie Cook',
            'Michael Danson'
        ]
    },
    {
        type: 'list',
        name: 'updatedRole',
        message: 'Please SELECT employees NEW Role.',
        choices: [
            'Business Manager',
            'Sales Director',
            'Promotions Director',
            'Program Director',
            'Chief Engineer',
            'On-Air Talent',
            'Production Manager',
            'Staff Engineer',
            'Account Executive',
            'Local Sales Rep',
            'National Sales Rep',
            'Promotions Coordinator',
            'Field Coordinator',
            'Intern'
        ]
    },
    {
        type: 'confirm',
        name: 'confirmManagerUpdate',
        message: "Does this Employee's Manager need to be Updated?",
        default: true
    },
    {
        type: 'list',
        name: 'newManager',
        message: "Please SELECT Employee's NEW Manager.",
        choices: [
            'Janet DellaDenunzio',
            'Chidi Anagonye',
            'Meg Manning',
            'Dick Casablancas',
            'Jessica Day'
        ],
        validate: newManagerInput => {
            if(newManagerInput) {
                return true;
            }
            else {
                console.log('Please SELECT a Manager.');
            }
        }
    }
];

const emplUpdate = (({ employee, updatedRole, confirmManagerUpdate, newManager }) => {
    const employeeId = newId(employee);

    let managerId;
    if(confirmManagerUpdate === true) {
        managerId = newId(newManager)
    }

    const sql = `UPDATE employees
    SET role_id = (SELECT id FROM roles WHERE title =?),
    manager_id = ? WHERE id=?`;

    const params = [updatedRole, managerId, employeeId];

    db.query(sql, params, (req, res) => {});
});

// REMOVE Employee
employeeDeletePrompt = [
    {
        type: 'list',
        name: 'removeEmployee',
        message: 'Please SELECT the Employee you would like to remove.',
        choices: [
            'Janet DellaDenunzio',
            'Chidi Anagonye',
            'Meg Manning',
            'Dick Casablancas',
            'Jessica Day',
            'Eleanor Shellstrop',
            'Tahani AlJamil',
            'Jason Mendoza',
            'Veronica Mars',
            'Logan Echolls',
            'Wallace Fennel',
            'Lilly Kane',
            'Gia Goodman',
            'Eli Navarro',
            'Jackie Cook',
            'Michael Danson'
        ]
    }
];

employeeDelete = (( { removeEmployee }) => {
    const sql = `DELETE FROM employees where CONCAT_WS(' ', fist_name, last_name) =?`;
    const params = [removeEmployee];
    
    db.query(sql, params, (err, res) => {
        if(err) {
            res.json(400).json({ error: error });
            return;
        }
        res.json({
            message: 'Successfully removed.',
            data: removeEmployee
        })
    });
});

module.exports = {
    employeesByManagerSelect,
    employeePrompt,
    employeeAdd,
    empUpdatePrompt,
    emplUpdate,
    employeeDeletePrompt,
    employeeDelete
};