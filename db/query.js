const connection = require('./connection');
const mysql = require('mysql2');

class DB {
    constructor(connection){
        this.connection = connection;
    }
    //query for viewing all departments = name and id
    viewDepartment() {
        return this.connection.promise().query('SELECT department.id, department.name FROM department') 
    };
    //query for viewing all roles==job title, role id, department of the role and salary
    viewRoles() {
        return this.connection.promise().query('SELECT role.id AS role_id, role.title, department.name AS department, salary FROM role LEFT JOIN department ON department.id=role.department_id')
        };
    viewManagers() {
    }
    //query for all employees==all data ids, first last title, departments, salaries, managers
    //!! NEED id NEED MANAGER NAMES
    viewEmployees() {
        return this.connection.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(employee.first_name, " ", employee.last_name) AS manager FROM employee LEFT JOIN role ON role_id=role.id LEFT JOIN department ON role.department_id=department.id');
    };
    //query add department==asked to add name, then added to database
    addDepartment(answers) {
        return this.connection.promise().query('INSERT INTO department SET ?', {name: answers.departmentName})
    }
    //query add role==asked to add role, then asked name, salary, department for role, added to database
    makeRole(role) {
        return this.connection.promise().query('INSERT INTO role SET ?', role);
    }
    //query to add employee= first last role and manager and that employee is added to database
    addNewEmployee(employee) {
        return this.connection.promise().query('INSERT INTO employee SET ?', employee);
    }
    //value obj in inquirer, name goes to user, value is your return
    //query to update an employee role=employee to update and their new role and updated to database
    //!!!! FIRST NAME AND LAST NAME ====NAME
    updateEmployeeRole(update, updateRole) {
        return this.connection.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [update, updateRole])
        // SELECT id AS id, CONCAT(first_name, + ' ', last_name) AS name
    // FROM employee; gives id and Employee name
    }
}

module.exports = new DB(connection);