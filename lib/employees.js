const db = require('../config/connection');





// VIEW Employees
const viewEmployees = () => {
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, result) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(result);
        return;
    });
};

// View By Manager
const viewEmpManager = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name,
    role.title AS job_title,
    department.department_name,
    role.salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employee.role_id = role.id
    LEFT JOIN departments ON role.department_id = department.id
    LEFT JOIN employess AS manager on employee.manager_id = manager.id
    ORDER BY employee.id`;
}

// ADD a New Employee
const addEmployee = () => {
    inquirer.prompt ([
        {
            name: 'first_name',
            type: 'input',
            message: 'Please enter the First Name of the New Employee.'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Please enter the Last Name of the New Employee.'
        },
        {
            name: 'title',
            type: 'list',
            message: 'Please select the Role for the New Employee.',
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
    ])
        .then((response) => {
            db.query(`INSERT INTO employees (first_name, last_name, title, employeeManager) VALUES (?, ?, ?, ?)`,
            [response.first_name, response.last_name, response.role_name, response.employeeManager], function (err, res) {
                if(err) throw err;
                console.log('The NEW Employee has been added.');

            db.query(`SELECT FROM * employees`, (err, result) => {
                if(err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                console.table(result);
                return;
            });
            })
        });
};

// UPDATE Employee Role
const updateEmpRole =() => {
    inquirer.prompt([
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
            type: 'number',
            name: 'role_id',
            message: 'Please enter the New Role ID for the Employee you are updating.'
        }
    ])
        .then(function(response) {
            db.query(`UPDATE employess SET role_id = ? WHERE employee = ?`,
            [response.role_id, response.employee], function (err, data) {
                if(err) throw err;
                console.log('The employees New Role has been Updated.');

            db.query(`SELECT * FROM employees`, (err, result) => {
                if(err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                console.table(result);
                return;
            });
            })
        });
};

// REMOVE Employee
const deleteEmployee = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'removeEmp',
            message: 'Please select the Employee you would like to remove.',
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
    ])
        .then(function (response) {
            db.query(`DELETE FROM employees WHERE removeEmp = ?`, [response.removeEmp], function (err, data) {
                    if (err) throw err;
                    console.log('The Employee has been Removed successfully.');

                db.query(`SELECT * FROM employees`, (err, result) => {
                    if(err) {
                        res.status(500).json({ error: err.message });
                        return;
                    }
                    console.table(result);
                    return;
                });
                }
            )
        });
};