const connection = require('./connection');
const mysql = require('mysql2');

class DB {
    //connects query to connection
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
    //query for all employees==all data ids, first last title, departments, salaries, managers
    viewEmployees() {
        return this.connection.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id=department.id LEFT JOIN employee AS manager ON manager.id=employee.manager_id');
    };
    //query add department==asked to add name, then added to database
    addDepartment(answers) {
        return this.connection.promise().query('INSERT INTO department SET ?', {name: answers.departmentName});
    }
    deleteDepartment(department) {
        return this.connection.promise().query('DELETE FROM department WHERE id =? ', department);
    }
    //query add role==asked to add role, then asked name, salary, department for role, added to database
    makeRole(role) {
        return this.connection.promise().query('INSERT INTO role SET ?', role);
    }
    deleteRole(title) {
        return this.connection.promise().query('DELETE FROM role WHERE id = ?', title);
    }
    //query to add employee= first last role and manager and that employee is added to database
    addNewEmployee(employee) {
        return this.connection.promise().query('INSERT INTO employee SET ?', employee);
    }
    findDepartmentSalary(roleId) {
        return this.connection.promise().query('SELECT role.salary, department.name AS department FROM role LEFT JOIN department ON department_id=department.id WHERE role.id=?', roleId);
    }
    deleteEmployee(name) {
        return this.connection.promise().query('DELETE FROM employee WHERE id = ?', name);
    }
    //query to update an employee role=employee to update and their new role and updated to database
    updateEmployeeRole(updateRole, update) {
        return this.connection.promise().query('UPDATE employee SET role_id = ? WHERE employee.id = ?', [updateRole, update])
    }
}

module.exports = new DB(connection);