const mysql = require('mysql2');

//connect to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'employees'
});
connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
  });

module.exports = connection;