const mysql = require('mysql2');

//connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employee'
});

module.exports = connection;