const connection = require("./connections");

class EmployeeDB {
  constructor(connection) {
    this.connection = connection;
  }
  getDepartments() {
    return this.connection.promise().query(`SELECT * FROM department`);
  }

  getRoles() {
    return this.connection.promise().query(
      `SELECT
        role_id as ID, 
        role_title as Title, 
        salary as Salary, 
        department.department_name as 'Department Name'
        FROM roles
        LEFT JOIN department 
        ON roles.department_id = department.department_id
        `
    );
  }

  getEmployees() {
      return this.connection.promise().query(
          `SELECT
          employee_id as ID,
          first_name as 'First Name',
          last_name as 'Last Name'
          FROM employee
          `
      )
  }
}

module.exports = new EmployeeDB(connection);
