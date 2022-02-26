const express = require('express');
const res = require('express/lib/response');

const db = require('../config/connection');

const roleSelect = `SELECT
    roles.id, roles.title, roles.salary. departmentsname
    AS department
    FROM roles
    LEFT JOIN departments
    ON roles.department_id = departments.id`;

const rolePrompt = [
    {
        type: 'input',
        name: 'roleName',
        message: 'What is the New Role name?'
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the New Role Salary? (Numeric Form)'
    },
    {
        type: 'list',
        name: 'selectDept',
        message: 'Which Department is the New Role?',
        choices: [
            'Management',
            'Programming',
            'Engineering',
            'Sales',
            'Promotions'
        ]
    }
];

// Add New Role
const roleAdd = (({ roleName, roleSalary, selectDept }) => {
    const sql = `INSERT INTO roles
        (title, salary, department_id)
        VALUES
        (?, ?, (SELECT id FROM departments WHERE name =? ))`;
    
    const params = [roleName, roleSalary, selectDept];

    db.query(sql, params, (err, res) => {
        if(err){
            res.json(400).json({ error: error });
            return;
        }
        res.json({
            message: 'Success',
            data: roleName, roleSalary, selectDept
        })
    });
});

// Remove Role
roleDeletePrompt = [
    {
        type: 'list',
        name: 'removeRole',
        message: 'Please select which Role you would like to remove.',
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
    }
];

roleDelete = (({ removeRole }) => {
    const sql = `DELETE FROM roles WHERE title =?`;
    const params = [removeRole];

    db.query(sql, params, (err, res) => {
        if(err) {
            res.json(400).json( error: error );
            return;
        }
        res.json({
            message: 'Successfully removed!',
            data: removeRole
        })
    });
});

module.exports = { roleSelect, rolePrompt, roleAdd, roleDeletePrompt, roleDelete };