// Packages for this application
const mysql = require('mysql2');
const inquirer = require('inquirer'); // prompt questions
const cTable = require('console.table'); // print MySQL rows to the console
const CFonts = require('cfonts'); // design/color

// Connection
const db = require('../config/connection');

// Libraries to pull from
const { departmentPrompt, utilizedBudget, departDeletePrompt, departDelete } = require('../lib/departments');
const { employeesByManagerSelect, employeePrompt, employeeAdd, empUpdatePrompt, empUpdate, employeeDeletePrompt, employeeDelete } = require('../lib/employees');
const { roleSelect, rolePrompt, roleAdd, roleDeletePrompt, roleDelete} = require('../lib/roles');

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
            viewAll(departmentSelect)
        }
        if (selection === 'View All Roles') {
            viewAll(roleSelect)
        }
        if (selection === 'View All Employees') {
            viewAll(employeeSelect)
        }
        if (selection === 'View Employees By Manager') {
            viewAll(employeesByManagerSelect)
        }
        if (selection === 'View Utilized Budget') {
            viewAll(utilizedBudget)
        }
        if (selection === 'Add New Department') {
            add(departmentPrompt, departmentAdd)
        }
        if (selection === 'Add New Role') {
            add(rolePrompt, roleAdd)
        }
        if (selection === 'Add New Employee') {
            add(employeePrompt, employeeAdd)
        }
        if (selection === 'Update Employee Role') {
            update(empUpdatePrompt, empUpdate)
        }
        if (selection === 'Delete Department') {
            remove(departDeletePrompt, departDelete)
        }
        if (selection === 'Delete Role') {
            remove(roleDeletePrompt, roleDelete)
        }
        if (selection === 'Delete Employee') {
            remove(employeeDeletePrompt, employeeDelete)
        }
    })
}

const viewAll = (viewSql) => {
    db.query(viewSql, (err, result) => console.table(result));
    setTimeout(trackerPrompt, 2000);
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