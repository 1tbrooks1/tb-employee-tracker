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
          "Delete a department",
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
        case "Delete a department":
          return deleteDepartment();
        case "Exit":
          console.log("Goodbye!");
          process.exit();
      }
    });
};

function viewDepartments() {
  db.getDepartments()
    .then(([rows]) => {
      let department = rows;
      console.log("\n");
      console.table(department);
    })
    .then(() => init());
}

function viewRoles() {
  db.getRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => init());
}

function viewEmplpoyees() {
  db.getEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => init());
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        message: "What would you like to name your department?",
      },
    ])
    .then((res) => {
      db.addDepartment(res.name);
      console.log("The department has been added!");
    })
    .then(() => init());
}

function addRole() {
  db.getDepartments()
    .then(([departments]) => {
      return inquirer.prompt([
        {
          name: "role",
          message: "What is the name of the role you are adding?",
        },
        {
          name: "salary",
          message: "What is the salary amount?",
        },
        {
          type: "list",
          name: "departmentPrompt",
          message: "What department does the role belong to?",
          choices: departments.map((department) => ({
            name: department.department_name,
            value: department.department_id,
          })),
        },
      ]);
    })
    .then(({ role, salary, departmentPrompt }) => {
      db.addRole(role, salary, departmentPrompt);
      console.log("The role has been successfully added!");
    })
    .then(() => init());
}

function addEmployee() {
  Promise.all([db.getRolesAgain(), db.getManager()])
    .then(([[roles], [managers]]) => {
      return inquirer.prompt([
        {
          name: "first_name",
          message: "What is the first name of the employee?",
        },
        {
          name: "last_name",
          message: "What is the last name of the employee?",
        },
        {
          type: "list",
          name: "role_id",
          message: "What is the role of the employee?",
          choices: roles.map((roles) => ({
            name: roles.role_title,
            value: roles.role_id,
          })),
        },
        {
          type: "list",
          name: "manager_id",
          message: "Who is the manager of the employee?",
          choices: managers.map(({ manager_id, first_name, last_name }) => ({
            name: first_name + " " + last_name,
            value: manager_id,
          })),
        },
      ]);
    })
    .then((answer) => {
      console.log(answer);
      db.addEmployee(answer);
      console.log("You have successfully added an employee!");
    })
    .then(() => init());
}

function updateRole() {
  db.getEmployeesAgain().then(([employee]) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee would you like to update?",
          choices: employee.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.employee_id,
          })),
        },
      ])
      .then((response) => {
        let employee_id = response.employee;
        db.getRolesAgain().then(([roles]) => {
          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "What role do you want the employee to have?",
                choices: roles.map((roles) => ({
                  name: roles.role_title,
                  value: roles.role_id,
                })),
              },
            ])
            .then((response) =>
              db
                .updateRole(employee_id, response.role)
                .then(() =>
                  console.log("The role of the employee is now updated!")
                )
            )
            .then(() => init());
        });
      });
  });
}

function deleteDepartment() {
  db.getDepartments()
    .then(([department]) => {
      return inquirer.prompt([
        {
          type: "list",
          name: "department",
          message: "Which department would you like to delete?",
          choices: department.map((department) => ({
            name: department.department_name,
            value: department.department_id,
          })),
        },
      ]);
    })
    .then(({ department }) => {
      db.deleteDepartment(department);
      console.log("You have successfully deleted a department!");
    })
    .then(() => init());
}

init();
