const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: 'employee_tracker'
    },
    console.log('You are now connected to the employee tracker database.')
);

module.exports = db;