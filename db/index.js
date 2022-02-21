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

  getRolesAgain() {
    return this.connection.promise().query(
        `SELECT * FROM roles`
    )
  };

  getEmployeesAgain() {
    return this.connection.promise().query(
        `SELECT * FROM employee`
    )
  }

  getEmployees() {
    return this.connection.promise().query(
      `SELECT A.employee_id as id, 
        A.first_name as 'First Name',
        A.last_name as 'Last Name',
        roles.role_title as 'Job Title',
        department.department_name as 'Department Name',
        roles.salary as Salary,
        B.first_name as 'Manager First Name',
        B.last_name as 'Manager Last Name'
        FROM employee A
        LEFT JOIN roles
        ON A.role_id = roles.role_id
        LEFT JOIN department
        ON roles.department_id = department.department_id
        LEFT JOIN employee B on A.manager_id = B.employee_id
        `
    );
  }

  getManager() {
      return this.connection.promise().query(
          `SELECT * FROM employee`
      );
  };

  addDepartment(name) {
      return this.connection.promise().query(
      `INSERT INTO department(department_name)
      VALUES(?)`, name)
  };

  addRole(role, salary, department_id) {
      return this.connection.promise().query(
          `INSERT INTO roles(role_title, salary, department_id)
            VALUES(?,?,?)`, [role, salary, department_id])
  };

  addEmployee(userAnswer) {
    return this.connection.promise().query(
          `INSERT INTO employee
            SET ?`, userAnswer
      )
  };

  updateRole(employee_id, role_id) {
      return this.connection.promise().query(
          `UPDATE employee SET employee.role_id = ? WHERE employee.employee_id = ?`,
          [role_id, employee_id]
      )
  };

  deleteDepartment(id) {
      return this.connection.promise().query(
          `DELETE FROM department WHERE department.department_id = ?`
      , id)
  }

}

module.exports = new EmployeeDB(connection);
