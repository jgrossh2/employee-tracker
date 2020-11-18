const mysql = require('mysql2');

//connect to database
// const db = new mysql2.Database('./db/employee.db', err => {
//     if (err) {
//         return console.error(err.message);
//     }

//     console.log('Connected to the employee database.');
// });
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
});

module.exports = connection;