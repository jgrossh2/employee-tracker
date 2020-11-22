const mysql = require('mysql2');
require('dotenv').config();

//connect to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'employees'
});
connection.connect(err => {
    if (err) {
      console.log("error", err)
    }
  });

module.exports = connection;