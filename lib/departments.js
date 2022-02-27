const { response } = require('express');
const db = require('../config/connection');

// View All Departments
const departments = () => {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, result) => {
        if(err) throw err;
        console.table(response);
    })
}; 

// Add a NEW Department
const departmentPrompt = [
    {
        type: 'input',
        name: 'department',
        message: 'What is the NEW Department Name?'
    }
]
const departmentAdd = (({ deptName }) => {
    const sql = `INSERT INTO departments (name) VALUES (?)`;
    const params = departName;

    db.query(sql, params, (err, res) => {
        if(err) throw err;
        console.table(response);
    });
});
 

// To genertate the SUM of the departments budget SUM()
const viewUtilizedBudget = () => {
   const sql = `SELECT departments.name AS department, 
       SUM(roles.salary) AS cost FROM employees
       LEFT JOIN roles on role_id = roles.id
       LEFT JOIN departments ON roles.department_id = departments.id
       GROUP BY department`;

       db.query(sql, (err, res) => {
           if(err) {
               res.status(500).json({ error: err.message });
               return;
           }
           console.table(response);
           return;
       })
   }

// Delete a Department
const departDeletePrompt = [
        {
            type: 'list',
            name: 'deleteDepartment',
            message: 'Please select which Department you would like to remove.',
            choices: ['Management', 'Programming', 'Engineering', 'Sales', 'Promotions']
        }
    ];
const departDelete = (({ deleteDepartment }) => {
    const sql = `DELETE FROM departments WHERE name = ?`;
    const params = [deleteDepartment];

    db.query(sql, params, (err, res) => {
        if (err) throw err;
        return;
    })
    console.table(response);
})

module.exports = {
    departments,
    departmentPrompt,
    departmentAdd,
    viewUtilizedBudget,
    departDeletePrompt,
    departDelete
};