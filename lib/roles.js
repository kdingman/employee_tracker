const db = require('../config/connection');

// VIEW all the Roles
const viewRoles = () => {
    const sql = `SELECT roles.id, roles.title, roles.salary. departmentsname AS department
    FROM roles
    LEFT JOIN departments
    ON roles.department_id = departments.id`;

    db.query(sql, (err, result) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(result);
        return;
    });
};

// ADD a New Role
const addRole = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'title',
            message: 'What is the New Role name?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the New Role Salary? (Numeric Form)'
        },
        {
            type: 'number',
            name: 'department_id',
            message: 'Please enter the Department ID for the New Role.'
        }
    ])
        .then((response) => {
            db.query(`INSERT INTO roles (title, salary, department_id)VALUES (?, ?, ?)`,
            [response.title, response.salary, response.department_id], function (err, data) {
                if(err) throw err;
                console.log('The New Role has been successfully added');

                db.query(`SELECT * FROM roles`, (err, result) => {
                    if(err) {
                        res.status(500).json({ error: err.message });
                        return;
                    }
                    console.table(result);
                    trackerPrompt();
                });
            });
        });
};

// REMOVE a Role
const deleteRole = () => {
    inquirer.prompt ([
        {
           name: 'role_id' ,
           type: 'number',
           message: 'Please enter the ID of the Role you would like to remove. (Numeric Value)'
        }
    ])
        .then((response) => {
            db.query(`DELETE FROM roles WHERE id = ?`, [response.role_id], function (err, data) {
                if(err)throw err;
                console.log('The role has been successfully removed.');

            db.query(`SELECT * FROM roles`, (err, result) => {
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