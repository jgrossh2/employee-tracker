//Inquirer prompts
const table = require('console.table');
const inquirer = require('inquirer');
const express = require('express');
const DB = require('./db/query');
const { viewRoles } = require('./db/query');
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

DB.viewExistingRoles()
    .then(([rows]) => {
        let existingRoles = rows;
        console.log("roles", existingRoles)
        console.table(existingRoles)
    })

// DB.viewRoles()
// .then(([rows]) =>{
//     let existingRoles= rows;
//     console.table(existingRoles)
// })
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
                    console.log("department", department)
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
                .then(answers => {
                    DB.addDepartment(answers);
                    menu();
                })
                .catch (err => {
                    console.log("err", err)
                })
                break;
            case 'Add a role':
                // function createRole() {
                let existingRoles = [];
                DB.viewRoles() 
                .then(([rows]) => {
                    let existingRoles = rows
                     console.log(existingRoles)
                });
                // console.log(existingRoles)
                let role = [];
                // inquirer.prompt([
                //     {
                //     type:'input',
                //     name: 'name',
                //     message: 'Please enter the name of the role.'    
                // },
                // ]).then(answers => {
                //     role.push(answers);
                //     console.log(role)
                    
                //     inquirer.prompt([
                //     { 
                //     type: 'input',
                //     name: 'salary',
                //     message: 'Please enter the salary.',
                //     validate: salaryInput => {
                //         if (salaryInput) {
                //             return true;
                //         } else {
                //             console.log('Please enter a salary amount.')
                //             return false;
                //         }
                //     }
                // },
                // ]).then(answers => {
                //     role.push(answers);
                //     console.log("role", role)
                    
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'department',
                            message: "Please select a department.",
                            choices: [viewExistingRoles()]
                        },
                        ]).then(answers => {
                            role.push(answers);
                            console.log(role);
                            // DB.addRole(role);
                            menu();
                        });
                            
                // })  
                break;
            // })
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
                        type: 'list',
                        name: 'role',
                        message: "Please select the employee's role.",
                        choices: []
                    },
                    // { 
                    //     type: 'list',
                    //     name: 'manager',
                    //     message: "Please select the employee's manager, if applicable.",
                    //     choices: []
                    // },
                ]).then(answers => {
                    console.log("answers", answers)
                    const add = new add(answers.firstName, answers.lastName, answers.role)
                    console.log("add", add)
                    // DB.addEmployee(add);
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

