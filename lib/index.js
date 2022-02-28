// Packages for this application
const mysql = require('mysql2');
const inquirer = require('inquirer'); // prompt questions
const cTable = require('console.table'); // print MySQL rows to the console
const CFonts = require('cfonts'); // design/color

// Connection
const db = require('../config/connection');

const { response } = require('express');
const { json } = require('express/lib/response');

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
            'View Employees By Department',
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
    if (selection === 'View Employees By Department') {
        viewEmpByDept();
    }
    if (selection === 'View Utilized Budge') {
        viewUtilBudget();
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
    });
};

//--------------------------DEPARTMENTS------------------------------------------------------------//

//VIEW ALL DEPARTMENTS
viewDepartments = () => {
    const sql = `SELECT * FROM department.id AS "ID", department.name AS "Department" FROM department`;

    db.promoise().query(sql, (err, rows) => {
        if(err) throw err;
        console.table(rows);
    
    trackerPrompt();
    });
};

// View department Utilized Budget SUM()
viewUtilBudget = () => {
    const sql = `SELECT deparment_id AS "ID", department.name AS "Department",
        SUM(salary) AS "Budget"
        FROM role JOIN department ON role.department_id = department.id GROUP BY department_id`;

        db.promise().query(sql, (err, rows) => {
            if (err) throw err;
            console.table(rows);

            trackerPrompt();
        });
};

// ADD a new Department
addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addNewDept',
            message: 'Please enter the new Department name',
            validate: (addNewDept) => {
                if(addNewDept) {
                    return true;
                }
                else{
                    console.log('Please enter a New Department Name.')
                    return false;
                }
            }
        }
    ])
        .then((data) => {
            const sql = `INSERT INTO department (name) VALUES (?)`,;
            
            db.query(sql, data.addNewDept, (err, result) => {
                if (err) throw err;
                console.log('Added' + data.addNewDept + 'to Departments.');

                viewDepartments();
            });
        });
};

// DELETE a Department
deleteDepartment = () => {
    const deptSql = `SELECT * FROM department`;

    db.promise().query(deptSql, (err, data) => {
        if (err) throw err;

        const dept = data.map(({name, id}) => ({name: name, value: id}));

        inquirer.prompt ([
            {
                type: 'list',
                name: 'deleteDept',
                message: 'Please select the Department you would like to Remove.',
                choices: [
                    'Management',
                    'Programming',
                    'Engineering',
                    'Sales',
                    'Promotions'
                ]
            }
        ])
        .then(deleteDept => {
            const dept = deleteDept.dept;
            const sql = `DELETE FROM department WHERE id = ?`;

            db.query(sql, dept, (err, result) => {
                if (err) throw err;
                console.log('Department has been successfully Removed.');

                viewDepartments();
            });
        });
    });
};

//---------------------------------------ROLES--------------------------------------------------------//
viewRoles = () => {
    const sql = `SELECT role.id, role.title, department.name AS department
        FROM role
        INNER JOIN department ON role.department_id =department.id`;

        db.promoise().query(sql, (err, rows) => {
            if(err) throw err;
            console.table(rows);
        
            trackerPrompt(); 
        });   
};

// ADD a new Role
addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'Please enter the name of the New Role.',
            validate: (newRole) => {
                if(newRole) {
                    return true;
                }
                else {
                    console.log('Please enter the name of the New Role.')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'newSalary',
            message: 'Please enter the New Role Salary.',
            validate: (newSalary) => {
                if(newSalary) {
                    return true;
                }
                else {
                    console.log('Please enter a Salary for the New Role.');
                    return false;
                }
            }
        },
    ])
    .then(answers => {
        const params = [answers.role, answers.salary];

        const roleSql = `SELECT name, id FROM department`;

        db.promise().query(roleSql, (err, data) => {
            if(err) throw err;

            const depts = data.map(({name, id}) => ({name: name, value: id}));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'deptId',
                    message: 'Please select the Department of the New Role.',
                    choices: [
                        'Management',
                        'Programming',
                        'Engineering',
                        'Sales',
                        'Promotions'
                    ]
                }
            ])
            .then(deptId => {
                const depts = deptId.depts;
                params.push(depts);

                const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

                db.query(sql, params, (err, result) => {
                    if(err) throw err;
                    console.log('Added' + answers.role + 'to Role.');

                    viewRoles();
                });
            });
        });
    });
};

// DELETE a Role
deleteRole = () => {
    const roleSql = `SELECT 8 FROM role`;

    db.promise().query(roleSql, (err, data) => {
        if (err) throw err;

        const role = data.map(({title, id}) => ({name: title, value: id}));

        inquirer.prompt ([
            {
                type: 'list',
                name: 'deleteRole',
                message: 'Please select the Role you would like to Remove.',
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
        .then(deleteRole => {
            const role = deleteRole.role;
            const sql = `DELETE FROM role WHERE id =?`;

            db.query(sql, role, (err, result) => {
                if (err) throw err;
                console.log('The selected Role has been successfully Removed.');

                viewRoles();
            });
        });
    });
};

//----------------------------------EMPLOYEES--------------------------------------------------------//

// VIEW Employees
viewEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS "Department", role.salary,
        CONCAT(manager.first_name, "", manager.last_name) AS "Manager" FROM emloyee
        LEFT JOIN roles ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id`;

    db.promoise().query(sql, (err, rows) => {
        if(err) throw err;
        console.table(rows);
    
    trackerPrompt();
    });
};

// VIEW Employee by Department
viewEmpByDept = () => {
    const sql = `SELECT employee.first_name, employee.last_name, department_name AS "Department
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id`;

    db.promise().query(sql, (err, rows) => {
        if(err) throw err;
        console.table(rows);
    
    trackerPrompt();
    });
};

// ADD a new Employee
addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Please enter the first name of the New Employee.',
            validate: (firstName) => {
                if(firstName) {
                    return true;
                }
                else{
                    console.log('Please enter a First Name for the New Employee.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name:'lastName',
            message: 'Please enter the last name of the New Employee.',
            validate: (lastName) => {
                if(lastName) {
                    return true;
                }
                else {
                    console.log('Please enter the Last Name of the New Employee');
                    return false;
                }
            }
        },
    ])
    .then(answers => {
        const params = [answers.firstName, answers.lastName]

        const roleSql = `SELECT role.id, role.title FROM role`;

        db.promise().query(roleSql, (err, data) => {
            if (err) throw err;

            const roles = data.map(({id, title}) => ({name: title, value: id}));

            inquirer.prompt ([
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
                },
            ])
            .then(newEmpRole => {
                const role = newEmpRole.role;
                params.push(role);

                const mangSql = `SELECT * FROM employee`;

                db.promise().query(mangSql, (err, data) => {
                    if (err) throw err;

                    const managers = data.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}));

                    inquirer.prompt ([
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
                    .then(managerSelect => {
                        const manager = managerSelect.manager;
                        params.push(manager);

                        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                            VALUES (?, ?, ?, ?)`;

                            db.query(sql, params, (err, result) => {
                                if (err) throw err;
                                console.log('The New Employee has been added.');

                                viewEmployees();
                            });
                    });
                });
            });
        });
    });
};

// UPDATE Employee
updateEmployee = () => {
    const emplSql = `SELECT * FROM employee`;

    db.promoise().query(emplSql, (err, data) => {
        if (err) throw err;

        const employees = data.map(({id, first_name, last_name}) => ({name:first_name + " " + last_name, value: id}));

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
        .then(selectEmpl => {
            const employee = selectEmpl.name;
            const params = [];
            params.push(employee);

            const roleSql = `SELECT * FROM role`;
            db.promise().query(roleSql, (err, data) => {
                if (err) throw err;

                const roles = data.map(({id, title}) => ({name: title, value: id}));
            
            inquirer.prompt ([         
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
            .then(updatedRole => {
                const role = updatedRole.role;
                params.push(role);

                let employee = params[0]
                params[0] = role
                params[1] = employee

                const sql = `UPDATE employee SET role_id = ? WHERE id =?`;

                db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log('The Employee has been Updated.');

                    viewEmployees();
                });
            });
            });
        });
    });
};

// DELETE an Employee
deleteEmployee = () => {
    const emplSql = `SELECT * FROM employee`;

    db.promise().query(emplSql, (err, data) => {
        if (err) throw err;

        const employees = data.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}));

        inquirer.prompt ([
            {
                type: 'list',
                name: 'deleteEmpl',
                message: 'Please select the Employee you woule like to Remove.',
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
            }
        ])
        .then(deleteEMpl => {
            const employee = deleteEMpl.name;

            const sql = `DELETE FROM employee WHERE id = ?`;

            db.query(sql, employee, (err, result) => {
                if (err) throw err;
                console.log('The selected employee has been successfully Removed.');

                viewEmployees();
            });
        });
    });
};

trackerPrompt();