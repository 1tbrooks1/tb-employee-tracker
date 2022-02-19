const inquirer = require("inquirer");
const db = require("./db/index.js");
const cTable = require("console.table");

const init = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Update an employee manager",
          "View employees by manager",
          "View employees by department",
          "Delete a department",
          "Delete a role",
          "Delete an employee",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.option) {
        case "View all departments":
          return viewDepartments();
        case "View all roles":
          return viewRoles();
        case "View all employees":
          return viewEmplpoyees();
        case "Add a department":
          return addDepartment();
        case "Add a role":
          return addRole();
        case "Add an employee":
          return addEmployee();
        case "Update an employee role":
          return updateRole();
        case "Update an employee manager":
          return updateManager();
        case "View employees by manager":
          return byManager();
        case "View employees by department":
          return byDepartment();
        case "Delete a department":
          return deleteDepartment();
        case "Delete a role":
          return deleteRole();
        case "Delete an employee":
          return deleteEmployee();
        case "Exit":
          return exit();
      }
    });
};

function viewDepartments() {
  db.getDepartments().then(([rows]) => {
    let department = rows;
    console.log("\n");
    console.table(department);
  });
  init();
}

function viewRoles() {
  db.getRoles().then(([rows]) => {
    let roles = rows;
    console.log("\n");
    console.table(roles);
  });
  init();
}

function viewEmplpoyees() {
  db.getEmployees().then(([rows]) => {
    let employees = rows;
    console.log("\n");
    console.table(employees);
  });
  init();
}

function addDepartment() {
  inquirer.prompt([
    {
      name: 'name',
      message: "What would you like to name your department?"
    },
  ]).then(res => {
    db.addDepartment(res.name)
    console.log("The department has been added!")
    init()
  })
}

function addRole() {
  db.getDepartments()
  .then(([departments]) => {
    return inquirer.prompt([
      {
      name: 'role',
      message: 'What is the name of the role you are adding?'
      },
      {
        name: 'salary',
        message: 'What is the salary amount?'
      },
      {
        type: 'list',
        name: 'departmentPrompt',
        message: 'What department does the role belong to?',
        choices: departments.map(department => ({ name: department.department_name, value: department.department_id })),
      },
    ])
  },
  ).then(({ role, salary, departmentPrompt }) => {
    db.addRole(role, salary, departmentPrompt)
    console.log('The role has been successfully added!')
    init();
  })
}

// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data,
// including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

init();
