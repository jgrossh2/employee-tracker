//find all query statements
const connection = require('./connection');
const mysql = require('mysql2');
const { concat } = require('rxjs');


class DB {
    constructor(connection){
        this.connection = connection;
    }
    //query for viewing all departments = name and id
    //GIVES departmentID, department
    // SELECT id, name AS department
    // -> FROM department;
    viewDepartment() {
        return this.connection.promise().query('SELECT id, name AS department FROM department') 
    };
    
    //query for viewing all roles==job title, role id, department of the role and salary
    viewRoles() {
        return this.connection.promise().query('SELECT title, role.id AS role_id, name AS department, salary FROM role LEFT JOIN department ON department.id=role.department_id')
        };
    viewExistingRoles() {
        return this.connection.promise().query('SELECT role.title FROM role')
    };
    
    //query for all employees==all data ids, first last title, departments, salaries, managers
    //!! NEED id NEED MANAGER NAMES
    viewEmployees = () => {
        return this.connection.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager_id FROM employee LEFT JOIN role ON role_id=role.id LEFT JOIN department ON department.id=role.department_id')
    };
    //query add department==asked to add name, then added to database
    addDepartment(answers) {
        console.log("test", answers)
        return this.connection.promise().query('INSERT INTO department SET ?', {name: answers.departmentName})

    }
    //query add role==asked to add role, then asked name, salary, department for role, added to database
    // addRole(role){
        // return this.connection.promise().query('INSERT INTO role (title, salary, department_id) SET ?', {(name: role.name, role), (salary: role.salary), (department_id: role.)}
    // 
// }
    //query to add employee= first last role and manager and that employee is added to database
    addEmployee() {
        return this.connection.promise().query('INSERT INTO employee(first_name, last_name, role_id, manager_id) SET ?')
    }
    //query to select employee from list
    // selectEmployee = () => {
    //     connection.query('SELECT first_name, last_name FROM employee', function (err, res) {
    //         if (err) throw (err);
    //         console.log(res)
    //         updateEmployee();
    //     })
    // }
    //value obj in inquirer, name goes to user, value is your return
    viewEmployeeNames = () => {
        return this.connection.promise().query("SELECT concat('first_name, + ' ', last_name) AS ' ' FROM employee")
    }
    viewEmployeeRoles = () => {
        return this.connection.promise().query("SELECT role.title AS ' ' FROM role")
    }
    //query to update an employee role=employee to update and their new role and updated to database
    //!!!! FIRST NAME AND LAST NAME ====NAME
    updateEmployeeRole = () => {
        return this.connection.promise().query('UPDATE employee SET role WHERE role.title = updateRole ')
        // SELECT id AS id, CONCAT(first_name, + ' ', last_name) AS name
    // FROM employee; gives id and Employee name
    }
}

module.exports = new DB(connection);