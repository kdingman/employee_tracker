const express = require("express");

const db = require('../config/connection');

const departmentSelect = `SELECT * FROM departments`;

const departmentPrompt = [
    {
        type: 'input',
        name: 'department',
        message: 'What is the NEW Department Name?'
    }
];

// Add new department to list
const departmentAdd = (({ department }) => {
    const sql = `INSERT INTO departments (name)
        VALUES (?)`;
    const params = department;
    db.query(sql, (err, res) => {
        if(err) {
            res.serverStatus(400).json({ error: error });
            return;
        }
        res.json({
            message: 'Success',
            data: department
        })
    });
});

// To genertate the SUM of the departments budget SUM()
const utilizedBudget = 
    `SELECT departments.name AS department, 
        SUM(roles.salary) AS cost FROM employees
        LEFT JOIN roles on role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        GROUP BY department`;

// Delete a Department
const departDeletePrompt = [
    {
        type: 'list',
        name: 'removeDept',
        message: 'Select Department you would like to remove.',
        choices: [
            'Management',
            'Programming',
            'Engineering',
            'Sales',
            'Promotions'
        ]
    }
];

departDelete = (({ removeDept }) => {
    const sql = `DELETE FROM departments WHERE name = ?`;
    const params = [removeDept];

    db.query(sql, params, (err, res) => {
        if(err) {
            res.serverStatus(400).json({ error: error });
            return;
        }
        res.json({
            message: 'Successfully removed',
        });
    });
});

module.exports = {
    departmentSelect,
    departmentPrompt,
    utilizedBudget,
    departmentAdd,
    departDeletePrompt,
    departDelete
};