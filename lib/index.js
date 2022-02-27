// Packages for this application
const mysql = require('mysql2');
const inquirer = require('inquirer'); // prompt questions
const cTable = require('console.table'); // print MySQL rows to the console
const CFonts = require('cfonts'); // design/color

// Connection
const db = require('../config/connection');
const { response } = require('express');

// Libraries

// Decorative Welcome Message
CFonts.say('Welcome To|Employee|Tracker', {
    font: 'block',
    align: 'center',
    colors: ['whiteBright', 'blueBright'],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: 0,
    gradiant: false,
    independentGradiant: false,
    transitionGradiant: false
});

// Start
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
    if (selection === 'Update Employee') {
        updateEmployee();
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

//----------------------------------EMPLOYEES--------------------------------------------------------//

// VIEW Employees
function viewEmployees() {
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, res) => {
        if(err) throw err;
        console.table(response);
        trackerPrompt();
    });
}

// VIEW Employee by Manager
function viewEmpByManager() {
    const sql = `SELECT id, first_name, last_name FROM employees`;
    db.query(sql, (err, res) => {
        if(err) throw err;
        let managers = results.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
        inquirer.prompt([
            {           
                type: 'list',
                name: 'manager',
                message: 'Select the Manager of the Employees you would like to view.',
                choices: [
                    'Chidi Anagonye',
                    'Janet DellaDenunzio',
                    'Meg Manning',
                    'Dick Casablancas',
                    'Jessica Day'
                ]
            }
        ])
            .then(answerManagers => {
                const sql = `SELECT employees.id AS "ID", employees.first_name AS "First Name", employees.last_name AS "Last Name",
                    roles.title AS "Job Title", roles.salary AS "Salary" FROM employee_tracker.employees
                    LEFT JOIN roles on roles.id = employees.role_id WHERE employees.manager_id = ${answerManagers.manager}`;
                    db.query(sql, (err, res) => {
                        if(err) throw err;
                        console.table(response);
                        trackerPrompt();
                    });
            });
    });
};

// ADD a new Employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Please enter the first name of the New Employee.',
            validate: (firstNameInput) => {
                if(firstNameInput) {
                    return true;
                }
                else {
                    console.log('Please enter a first name for the New Employee.')
                }
            }
        },
        {
            type: 'input',
            name:'lastName',
            message: 'Please enter the last name of the New Employee.',
            validate: (lastNameInput) => {
                if(lastNameInput) {
                    return true;
                }
                else {
                    console.log('Please enter a last name for the New Employee.')
                }
            }
        }
    ])
        .then(answerNewNAme => {
            let newEmpl = [answerNewNAme.firstName, answerNewNAme.last_name]
            const sql = `SELECT roles.id, roles.title FROM roles`;
            db.query(sql, (err, res) => {
                if(err) throw err;
                let roles = response.map(({ id, title }) => ({ name: title, value: id }));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'newEmpRole',
                        message: 'Please select the New Employee Role.',
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
                    }
                ])
                    .then(roleAnswer => {
                        let empRoles = roleAnswer.newEmpRole;
                        newEmpl.push(empRoles);
                        const sql = `SELECT * FROM employees`;
                        db.query(sql, (err, res) => {
                            if(err) throw err;
                            let managers = response.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
                            inquirer.prompt([
                                {                                
                                    type: 'list',
                                    name: 'managerSelect',
                                    message: 'Please select the Employee Manager.',
                                    choices: [
                                        'Chidi Anagonye',
                                        'Janet DellaDenunzio',
                                        'Meg Manning',
                                        'Dick Casablancas',
                                        'Jessica Day'
                                    ]
                                }
                            ])
                            .then(managerAnswer => {
                                let managerSelect = managerAnswer.managerSelect;
                                newEmpl.push(managerSelect);
                                console.log(newEmpl)
                                const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                                    VALUES (?, ?, ?, ?)`;
                                    db.query(sql, newEmpl, (err) => {
                                        if(err) throw err;
                                        console.log('A New Employee has been added.')
                                        viewEmployees();
                                    });
                            });
                        });
                    });
            });
        });
};

// UPDATE Employee
function updateEmployee() {
    const sqlEmployee = `SELECT id, first_name, last_name FROM employees`;
    const sqlRole = `SELECT roles.id, roles.title FROM roles`;
    db.query(sqlEmployee, (err, res) => {
        if(err) throw err;
        let employee = results.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
        inquirer.prompt([
            {
                type: 'list',
                name: 'selectEmpl',
                message: 'Which Employee would you like to update?',
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
            }
        ])
            .then(employeeAnswer => {
                db.query(sqlRole, (err, res) => {
                    if(err) throw err;
                    let role = results.map(({ id, title }) => ({ name: title, value: id }));
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'updatedRole',
                            message: 'Please select the new role for the employee.',
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
                        }
                    ])
                        .then(roleAnswer => {
                            const sql = `UPDATE employees SET role_id = ${roleAnswer.updatedRole} WHERE id = ${employeeAnswer.selectEmpl}`;
                                db.query(sql, (err) => {
                                    if(err) throw err;
                                    console.log('Employee has been Updated.')
                                    viewEmployees();
                                });
                        });
                });
            });
    });
};

// DELETE Employee
function deleteEmployee() {
    const sql = `SELECT id, first_name, last_name FROM emloyees`;
    db.query(sql, (err, res) => {
        if(err) throw err;
        let employees = results.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}));
        inquirer.prompt ([
            {
                type: 'list',
                name: 'removeEmpl',
                message:'Please select the Employee you would like to remove',
                choices: [
                    'Chidi Anagonye',
                    'Janet DellaDenunzio',
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
            },
            {
                type: 'confirm',
                name: 'confirmDel',
                message: 'Confirming you would like to remove this Employee.',
                default: false
            }
        ])
            .then(deleteAnswer => {
                const sql = `DELETE FROM employees WHERE id = ${deleteAnswer.removeEmpl}`;

                db.query(sql, (err) => {
                    if(err) throw err;
                    console.log('Employee has been successfully removed.');
                    viewEmployees();
                });
            });
    });
};