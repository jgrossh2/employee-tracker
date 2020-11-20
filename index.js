//Inquirer prompts
const table = require('console.table');
const inquirer = require('inquirer');
const express = require('express');
const db = require('./db/connection.db');
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
async function menu() {
     inquirer
    .prompt({
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee roll' ],
        })
        
        await switch(answers.menu) {
            case 'View all departments':
                db.viewDepartment();
                break;
            case 'View all roles':
                db.viewRoles();
                break;
            case 'View all employees':
                db.viewEmployees();
                break;
            case 'Add a department':
                db.addDepartment();
                break;
            case 'Add a role':
                db.addRole();
                break;
            case 'Add an employee':
                db.addEmployee();
                break;
            case 'Update an employee role':
                db.selectEmployee();
                break;
            }
};
start();

