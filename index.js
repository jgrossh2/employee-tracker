const table = require('console.table');
const { createPublicKey } = require('crypto');
const inquirer = require('inquirer');
const DB = require('./db/query');
require('dotenv').config();

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
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Delete a department', 'Add a role', 'Delete a role', 'Add an employee', 'Delete an employee', 'Update an employee role' ],
        }).then((answers) => {
        switch(answers.menu) {
            case 'View all departments':
                allDepartments();
                break;
            case 'View all roles':
                allRoles();
                break;
            case 'View all employees':
                allEmployees();
                break;
            case 'Add a department':
                createDepartment();
                break;
            case 'Delete a department':
                removeDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Delete a role':
                removeRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Delete an employee':
                removeEmployee();
                break;
            case 'Update an employee role':
                updateRoleOfEmployee();
                break;
        };
    });
};
function allDepartments() {
    DB.viewDepartment()
    .then(([rows]) => {
        let department= rows;
        console.table(department);
        menu();
    });
}
function allRoles() {
    DB.viewRoles()
    .then(([rows]) => {
        let roles = rows;
        console.table(roles);
        menu();
    });
}
function allEmployees() {
    DB.viewEmployees()
    .then(([rows]) => {
        let employee = rows;
        console.table(employee)
        menu();
    })
};
function createDepartment() {
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
    }
function removeDepartment() {
    DB.viewDepartment()
    .then(([rows]) => {
        let departments = rows;
        const departmentList = departments.map(({ id, name }) => ({
            name: name,
            value: id
        
        }));
    inquirer.prompt({
        type: 'list',
        name: 'department',
        message: 'Select the department to delete.',
        choices: departmentList
    })
    .then(res=> {
        DB.deleteDepartment(res.department);
        menu()
    })
});
}
function addRole() {
    DB.viewDepartment()
    .then(([rows]) => {
        let departments = rows;
        const departmentList = departments.map(({ id, name }) => ({
            name: name,
            value: id
        
        }));
    inquirer .prompt([
        {
            type:'input',
            name: 'title',
            message: 'Please enter the name of the role.'    
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter the salary.'
        },
        {
            type: 'list',
            name: 'department_id',
            message: "Please select a department.",
            choices: departmentList 
        },
        ]).then(role => {
            DB.makeRole(role)
            .then(() => console.log(`Added role ${role.title}.`))
            .then(() => menu());
        });        
})  
};
function addEmployee() {
    inquirer.prompt([
            {
            type: 'input',
            name: 'first_name',
            message: "Please enter the employee's first name.",
             },
            { 
            type: 'input',
            name: 'last_name',
            message: "Please enter the employee's last name.",
            },
        ])
        .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;

            DB.viewRoles()
            .then(([rows]) => {
                let roles = rows;
                const roleList = roles.map(({ id, title }) => ({
                    name: title,
                    value: id
                }));
                inquirer.prompt ({
                    type: 'list',
                    name: 'role_id',
                    message: "Please select the employee's role.",
                    choices: roleList
                })
                .then(res => {
                    let roleId = res.roleId;

                DB.viewEmployees()
                    .then(([rows]) => {
                        let employees = rows;
                        const managerList = employees.map(({ id, first_name, last_name}) => ({
                            name: `${first_name} ${last_name}`,
                            value: id
                        }));
                managerList.unshift({ name: "None", value: null });    
                
                inquirer.prompt({
                    type: 'list',
                    name: 'manager_id',
                    message: "Please select the employee's manager, if applicable.",
                    choices: managerList
                })
                .then(answers => {
                    let employee = {
                        manager_id: answers.manager_id,
                        role_id: roleId,
                        first_name: firstName,
                        last_name: lastName
                    }
                DB.addNewEmployee(employee);
                console.log(`Your employee ${firstName} ${lastName} has been added.`)
                menu()
                });
            });
        });
    });
});
};

function updateRoleOfEmployee() {
    DB.viewEmployees()
    .then(([rows]) => {
        let names = rows;
        const name = names.map(({ first_name, last_name }) => ({
            name: `${first_name} ${last_name}`
        }));
    DB.viewRoles()
    .then(([rows]) => {
        let roles = rows;
        const roleList = roles.map(({ id, title }) => ({
            name: title,
            value: id
        }));
    inquirer.prompt([
    {
        type: 'list',
        name: 'employeeList',
        message: "Please select the employee to update.",
        choices: name
    },
    ]).then(answers => {
        let update = answers.employeeList
    
    inquirer.prompt([
        {
        type: 'list',
        name: 'roleList',
        message: "Please select the employee's role.",
        choices: roleList
        },
    ]).then(answers => {
        const updateRole = answers.roleList
        DB.updateEmployeeRole(update, updateRole)
        console.log(`${first_name} ${last_name} has been updated.`)
        menu()
        });
    });
});
});
};

start()

//need to get title, department and salary for view all employees
//connect role_id to get title department and salary

