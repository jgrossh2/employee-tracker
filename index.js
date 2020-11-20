//Inquirer prompts
const table = require('console.table');
const inquirer = require('inquirer');
const express = require('express');
const DB = require('./db/query')
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
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee roll' ],
        }).then((answers) => {
        switch(answers.menu) {
            case 'View all departments':
                DB.viewDepartment();
                break;
            case 'View all roles':
                DB.viewRoles();
                break;
            case 'View all employees':
                DB.viewEmployees();
                break;
            case 'Add a department':
                DB.addDepartment();
                break;
            case 'Add a role':
                DB.addRole();
                break;
            case 'Add an employee':
                DB.addEmployee();
                break;
            case 'Update an employee role':
                DB.selectEmployee();
                break;
            }
        });
};
start();

