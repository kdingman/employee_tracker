// Packages for this application
const mysql = require('mysql2');
const inquirer = require('inquirer'); // prompt questions
const cTable = require('console.table'); // print MySQL rows to the console
const CFonts = require('cfonts'); // design/color

// Connection
const db = require('../config/connection');

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
            viewEmployess();
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
        if (selection === 'Update Employee Role') {
            updateEmployee();
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

trackerPrompt();