// Packages for this application
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table'); // print MySQL rows to the console

const db = require('../config/connection');

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

//---------------------------------------ROLES--------------------------------------------------------//
function viewRoles() {
    const sql = `SELECT roles.id AS "ID", roles.title AS "Job Title", 
        department.dept_name AS "Department",
        roles.salary AS "Salary" FROM roles
        LEFT JOIN departments on roles.department_id = department.id`

        db.query(sql, (err, res) => {
            if(err) throw err;
            console.table(response);

            trackerPrompt();
        });
}

// ADD a new Role
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addNewRole',
            message: 'Please enter the name of the New Role.',
            validate: (addNewRoleInput => {
                if(addNewRoleInput) {
                    return true;
                }
                else {
                    console.log('Please enter a name for the New Role.')
                }
            })
        },
        {
            type: 'number',
            name: 'newRoleSalary',
            message: 'Please enter the New Role Salary.',
            validate: (newRoleSalaryInput => {
                if(newRoleSalaryInput) {
                    return true;
                }
                else {
                    console.log('Please enter a Salary for the New Role.')
                }
            })
        }
    ])
        .then(newRoleAnswer => {
            let newRole = [newRoleAnswer.addNewRole, newRoleAnswer.newRoleSalary];
            let searchDept = `SELECT department.id, department.dept_name FROM departments`;

            db.query(searchDept, (err, res) => {
                if(err) throw err
                let dept = resonse.map(({ id, dept_name }) => ({ name: dept_name, value: id }));
                inquirer.prompt ([
                    {
                        type: 'list',
                        name: 'newRoleDept',
                        message: 'Which Department does this New Role belong to?',
                        choices: [
                            'Management',
                            'Programming',
                            'Engineering',
                            'Sales',
                            'Promotions'
                        ]
                    }
                ])
                .then(deptAnswer => {
                    let newDept = deptAnswer.newRoleDept;
                    newRole.push(newDept);
                    const sql = `INSERT INTO roles (title, salary, deparment_id) VALUES (?, ?, ?)`;
                    db.query(sql, newRole, (err) => {
                        if(err) throw err;
                        console.log('A New Role has been added.')
                        viewRoles();
                    });
                });
            });
        });
};

// DELETE a Role
function deleteRole () {
    const sql = `SELECT roles.id, roles.title FROM roles`;
    db.query(sql, (err, res) => {
        if(err) throw err;
        let role = results.map(({ id, title }) => ({ name: title, value: id }));
        inquirer.prompt ([
            {
                type: 'list',
                name: 'removeRole',
                message: 'Please select the Role you would like to remove.',
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
                    'Intern',
                    'Promotions Coordinator',
                    'Field Coordinator',
                    'Promotions Intern'
                ]
            },
            {
                type: 'confirm',
                name: 'confirmDelete',
                message: 'Confirming you would like to remove this Role.',
                default: false
            }
        ])
            .then(deleteAnswer => {
                const sql = `DELETE FROM roles WHERE id = ${deleteAnswer.removeRole}`
                db.query(sql, (err) => {
                    if(err) throw err;
                    console.log('Role has been successully removed.');
                    viewRoles();
                });
            });
    });
};