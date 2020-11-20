//find all query statements
const connection = ('./connection.js');
const mysql = require('mysql2');
const { concat } = require('rxjs');


class DB {
    // constructor(connection){
    //     this.connection = connection;
    // }
    //query for viewing all departments = name and id
    //GIVES departmentID, department
    // SELECT id, name AS department
    // -> FROM department;
    viewDepartment = () => {
    const query = connection.query('SELECT id, name AS department FROM department', function(err, res) {
        if (err) throw err;
        console.log(res)
        console.log("this" + query.sql)
    });
    };
    //query for viewing all roles==job title, role id, department of the role and salary
    viewRoles = () => {
        connection.query('SELECT title, role.id, name, salary FROM role LEFT JOIN department ON department.name=name') , function(err, res) {
            if (err) throw err;
            console.log(res)
        }
    };
    //query for all employees==all data ids, first last title, departments, salaries, managers
    //!! NEED id NEED MANAGER NAMES
    viewEmployees = () => {
        connection.query('SELECT employee.id, first_name, last_name, title, department.name, salary, manager_id FROM employee LEFT JOIN role     ON role_id=role.id LEFT JOIN department ON department.name=name', function(err, res) {
            if (err) throw err;
            console.log(res)
        })
    };
    //query add department==asked to add name, then added to database
    addDepartment = () => {
        connection.query('INSERT INTO department(name) VALUES("answer")', function (err, res) {
            if (err) throw err;
            console.log(res)
        })
    }
    //query add role==asked to add role, then asked name, salary, department for role, added to database
    addRole = () => {
        connection.query('INSERT INTO role(title, salary, department_id) VALUES (answer)', function (err, res) {
            if (err) throw (err);
            console.log(res)
        })
    }
    //query to add employee= first last role and manager and that employee is added to database
    addEmployee = () => {
        connection.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (answer)', function (err, res) {
            if (err) throw (err);
            console.log(res)
        })
    }
    //query to select employee from list
    selectEmployee = () => {
        connection.query('SELECT first_name, last_name FROM employee', function (err, res) {
            if (err) throw (err);
            console.log(res)
            updateEmployee();
        })
    }
    //query to update an employee role=employee to update and their new role and updated to database
    //!!!! FIRST NAME AND LAST NAME ====NAME
    updateEmployee = () => {
        connection.query('UPDATE employee SET role WHERE first_name= answer ')
        // SELECT id AS id, CONCAT(first_name, + ' ', last_name) AS name
    // FROM employee; gives id and Employee name
    }
}

module.exports = new DB;