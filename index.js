//Inquirer prompts
const table = require('console.table');
const inquirer = require('inquirer');
const express = require('express');
const DB = require('./db/query');
require('dotenv').config();

//function in switch case from prompt choice
// const util = require('util');
// const menuAsync = until.promisify(menu());

function start() {
console.log(`
================================================
                EMPLOYEE TRACKER
================================================`);
menu();
};

function menu() {
     inquirer
    .prompt({
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role' ],
        }).then((answers) => {
        switch(answers.menu) {
            case 'View all departments':
                DB.viewDepartment()
                .then(([rows]) => {
                    let department= rows;
                    console.table(department);
                    menu();
                });
                break;
                
            case 'View all roles':
                DB.viewRoles()
                .then(([rows]) => {
                    let roles = rows;
                    console.table(roles);
                    menu();
                })
                break;
            case 'View all employees':
                DB.viewEmployees()
                .then(([rows]) => {
                    let employee = rows;
                    console.table(employee)
                    menu();
                })
                break;
            case 'Add a department':
                inquirer.prompt({
                    type: 'input',
                    name: 'departmentName',
                    message: 'Please enter the department name.'
                })
                .then(async (answers) => {
                    // console.log("answers", answers)
                    let data = await DB.addDepartment(answers);
                    console.log("data", data)
                    menu();
                })
                .catch (err => {
                    console.log("err", err)
                })
                // DB.addDepartment();
                break;
            case 'Add a role':
                DB.viewRoles
                inquirer.prompt([
                    {
                    type:'input',
                    name: 'name',
                    message: 'Please enter the name of the role.'    
                },
                { 
                    type: 'number',
                    name: 'salary',
                    message: 'Please enter the salary.'
                },
                {
                    type: 'list',
                    name: 'department',
                    message: []
                },
                ]).then(answers => {
                    const role = new role(answers.name, answers.salary, answers.department)
                    DB.addRole(role);
                    menu();
                })
                    break;
            case 'Add an employee':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: "Please enter the employee's first name.",
                    },
                    { 
                        type: 'input',
                        name: 'lastName',
                        message: "Please enter the employee's last name.",
                    },
                    {
                        type: 'input',
                        name: 'role',
                        message: "Please enter the employee's role.",
                    },
                    { 
                        type: 'input',
                        name: 'manager',
                        message: "Please enter the employee's manager, if applicable."
                    },
                ]).then(answers => {
                    console.log("answers", answers)
                    const add = new add(answers.firstName, answers.lastName, answers.role, answers.manager)
                    DB.addEmployee(add);
                    menu()
                });
                break;
                
            case 'Update an employee role':
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employeeList',
                        message: "Please select the employee to update.",
                        choices: [ DB.viewEmployeeNames()
                                    .then(([rows]) =>{
                                        console.table(rows);
                                    })]
                    },
                ]).then(answers => {
                    const update = new update(answers.employeeList)
                    // DB.selectEmployee(update);
                    menu();
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'roleList',
                        message: "Please select the employee's role.",
                        choices: [DB.viewEmployeeRoles()
                                .then(([rows]) => {
                                    console.table(rows)
                                })]

                    },
                ]).then(answers => {
                    const updateRole = new UpdateRoll(answers.roleList)
                    DB.updateEmployeeRole(update, updateRole)
                })
            });
                // DB.selectEmployee();
                break;
                
            };
        });
};
    

start();

