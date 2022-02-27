const { response } = require('express');
const db = require('../config/connection');

// View All Departments
const departments = () => {
    const sql = `SELECT department.id AS "ID", dept_name AS "Department" FROM department`;

    db.query(sql, (err, res) => {
        if(err) throw err;
        console.table(response);
    })
}; 

// Add a NEW Department
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


// To genertate the SUM of the departments budget SUM()
const viewUtilizedBudget = () => {
   const sql = `SELECT departments.name AS department, 
       SUM(roles.salary) AS cost FROM employees
       LEFT JOIN roles on role_id = roles.id
       LEFT JOIN departments ON roles.department_id = departments.id
       GROUP BY department`;

       db.query(sql, (err, result) => {
           if(err) {
               res.status(500).json({ error: err.message });
               return;
           }
           console.table(result);
           return;
       })
   }

// Delete a Department
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