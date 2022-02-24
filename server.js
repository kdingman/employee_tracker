const express = require('express');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// USE apiRoutes
app.use('/api', apiRoutes);

// DEFAULT response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// START server after DB connection
db.connect(err => {
    if(err) throw err;
    console.log('Database connected.');

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});