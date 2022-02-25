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
            viewAll(departmentSelect)
        }
        if (selection === 'View All Roles') {
            viewAll(roleSelect)
        }
        if (selection === 'View All Employees') {
            viewAll(employeeSelect)
        }
        if (selection === 'View Employees By Manager') {
            viewAll(employeesByManager)
        }
        if (selection === 'View Utilized Budget') {
            viewAll(utilizedBudget)
        }
        if (selection === 'Add New Department') {
            add(departmentPrompt, departmentInsert)
        }
        if (selection === 'Add New Role') {
            add(rolePrompt, roleInsert)
        }
        if (selection === 'Add New Employee') {
            add(employeePrompt, employeeInsert)
        }
        if (selection === 'Update Employee Manager') {
            update(empManagerUpdatePrompt, empManagerReturn)
        }
        if (selection === 'Update Employee Role') {
            update(empUpdatePrompt, empUpdateReturn)
        }
        if (selection === 'Delete Department') {
            remove(departDeletePrompt, departDeleteInsert)
        }
        if (selection === 'Delete Role') {
            remove(roleDeletePrompt, roleDeleteInsert)
        }
        if (selection === 'Delete Employee') {
            remove(employeeDeletePrompt, employeeDeleteInsert)
        }
    })
}

const viewAll = (viewSql) => {
    db.query(viewSql, (err, result) => console.table(result));
}

const add = (trackerSelections, insertSql) => {
    return inquirer.prompt(trackerSelections)
        .then(insertSql)
        .then(trackerPrompt)
};

const update = (trackerSelections, updateSql) => {
    return inquirer.prompt(trackerSelections)
        .then(updateSql)
        .then(trackerPrompt)
};

const remove = (trackerSelections, deleteSql) => {
    return inquirer.prompt(trackerSelections)
        .then(deleteSql)
        .then(trackerPrompt)
};

module.exports = trackerPrompt;