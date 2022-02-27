const { response } = require('express');
const db = require('../config/connection');

// View All Departments
const departments = () => {
<<<<<<< HEAD
    const sql = `SELECT department.id AS "ID", dept_name AS "Department" FROM department`;

    db.query(sql, (err, res) => {
=======
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, result) => {
>>>>>>> feature/departments
        if(err) throw err;
        console.table(response);
    })
}; 

// Add a NEW Department
<<<<<<< HEAD
const departPrompt = () => {
   inquirer.prompt([
       {
           type: 'input',
           name: 'department',
           message: 'What is the NEW Department Name?'
       }
   ])
   .then((answer)=> {
        db.query(`INSERT INTO departments (name) VALUES (?)`,;

=======
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
 
>>>>>>> feature/departments

// To genertate the SUM of the departments budget SUM()
const viewUtilizedBudget = () => {
   const sql = `SELECT departments.name AS department, 
       SUM(roles.salary) AS cost FROM employees
       LEFT JOIN roles on role_id = roles.id
       LEFT JOIN departments ON roles.department_id = departments.id
       GROUP BY department`;

<<<<<<< HEAD
       db.query(sql, (err, result) => {
=======
       db.query(sql, (err, res) => {
>>>>>>> feature/departments
           if(err) {
               res.status(500).json({ error: err.message });
               return;
           }
<<<<<<< HEAD
           console.table(result);
=======
           console.table(response);
>>>>>>> feature/departments
           return;
       })
   }

// Delete a Department
<<<<<<< HEAD
const deleteDepartment = () => {
   inquirer.prompt([
        {
            type: 'number',
            name: 'department_id',
            message: 'Please enter the id of the department you would like to remove. (Numeric Value)'
        }
   ])
    .then((response) => {
       db.query(`DELETE FROM departments WHERE id = ?`, [response.departID], function (err, data) {
           if(err) throw err;
           console.log('Success, the department has been removed.');

           db.query(`SELECT * FROM departments`, (err, result) => {
               if(err) {
                   res.status(500).json({ error: err.message })
               }
               console.table(result);
               return;
           });
       });
   });
}

module.exports = {
    departments,

}
=======
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
>>>>>>> feature/departments
