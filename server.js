const express = require('express');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const index = require('./lib/index');

// DEFAULT response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// START server after DB connection
db.connect(err => {
    if (err) console.log('error', err.message, err.stack)
    console.log('Database connected.');

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});