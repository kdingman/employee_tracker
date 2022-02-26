const express = require('express');
const db = require('./config/connection');

const trackerPrompt = require('./lib/index');


// START server after DB connection
db.connect(err => {
    if(err) throw err;
    console.log('Database connected.');
});

trackerPrompt();