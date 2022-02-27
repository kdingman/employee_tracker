// Packages for this application
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table'); // print MySQL rows to the console

const db = require('../config/connection');
const { departments, viewUtilizedBudget } = require('./departments');

const trackerPrompt = () => {
    return inquirer.prompt ([
        {
        type: 'list',
        name: 'selection',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'View Employees By Manager',
            'View Utilized Budget',
            'Add New Department',
            'Add New Role',
            'Add New Employee',
            'Update Employee Role',
            'Delete Department',
            'Delete Role',
            'Delete Employee',
        ]
    }
])

    .then(({ selection }) => {

        if (selection === 'View All Departments') {
            viewDepartments();
        }
        if (selection === 'View All Roles') {
            viewRoles();
        }
        if (selection === 'View All Employees') {
            viewEmployees();
        }
        if (selection === 'View Employees By Manager') {
            viewEmpByManager();
        }
        if (selection === 'View Utilized Budget') {
            viewUtilizedBudget();
        }
        if (selection === 'Add New Department') {
            addDepartment();
        }
        if (selection === 'Add New Role') {
            addRole();
        }
        if (selection === 'Add New Employee') {
            addEmployee();
        }
        if (selection === 'Update Employee Manager') {
            updateManager();
        }
        if (selection === 'Update Employee Role') {
            updateRole();
        }
        if (selection === 'Delete Department') {
            deleteDepartment();
        }
        if (selection === 'Delete Role') {
            deleteRole();
        }
        if (selection === 'Delete Employee') {
            deleteEmployee();
        }
    })
}

//--------------------------DEPARTMENTS------------------------------------------------------------//

//VIEW ALL DEPARTMENTS
function viewDepartments() {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, res) => {
        if(err) throw err;
        console.table(response);
        trackerPrompt();
    });
}

// ADD a new Department
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addNewDept',
            message: 'Please enter the new Department name',
            validate: (addNewDeptInput => {
                if(addNewDeptInput) {
                    return true;
                }
                else {
                    console.log('Please enter a Department Name.')
                }
            })
        }
    ])
        .then(newDepartInput => {
            let newDept = newDepartInput.addNewDept;
            const sql = `INSERT INTO departments (dept_name) VALUES (?)`;

            db.query(sql, newDept, (err) => {
                if(err) throw err;
                console.log('A new department has been added.');
                viewDepartments();
            });
        });
}

// DELETE a department
function deleteDepartment() {
    const sql = `SELECT department.id, department.dept_name FROM department`;

    db.query(sql, (err, res) => {
        if(err) throw err;
        let depart = results.map(({ id, dept_name }) => ({ name: dept_name, value: id }));
        inquirer.prompt ([
            {
                type: 'list',
                name: 'delDepart',
                message: 'Which Department would you like to remove?',
                choices: [
                    'Management',
                    'Programming',
                    'Engineering',
                    'Sales',
                    'Promotions'
                ]
            },
            {
                type: 'confirm',
                name: 'confirmDeptDel',
                message: 'Confirming you would like to remove this Department.',
                default: false
            }
        ])
            .then(deleteAnswer => {
                let deleted = `DELETE FROM departments WHERE id = ${deleteAnswer.delDepart}`
                let deleteRole = `DELETE FROM roles WHERE department_id = ${deleteAnswer.delDepart}`

                db.query(deleted, (err) => {
                    if(err) throw err;
                })
                db.query(deleteRole, (err) => {
                    if(err) throw err;
                    console.log('Department has been successfully removed');
                    trackerPrompt();
                });
            });
    });
};