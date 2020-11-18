const table = require('console.table');
const inquire = require('inquirer');
const express = require('express');
const db = require('./db/database');

const PORT = process.env.PORT || 3001;
const app = express();

// //Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use apiRoutes
// app.use('/api', apiRoutes);

// //Default response for any other requests(Not found) Catch all
app.use((req, res) => {
    res.status(404).end();
});
//start server after db connection
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});