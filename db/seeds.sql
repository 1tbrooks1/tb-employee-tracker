INSERT INTO department (department_name)
VALUES
('Management'),
('Sales'),
('Accounting'),
('Human Resources'),
('Reception'),
('Quality Insurance'),
('Customer Service'),
('Intern'),
('Warehouse');

INSERT INTO roles (role_title, department_id, salary)
VALUES
('Regional Manager', 1, 80000 ),
('Assistant TO the Regional Manager', 1, 50000),
('Sales Representative', 2, 45000),
('Receptionist', 5, 30000),
('Accountant', 3, 60000),
('Head of HR', 4, 60000),
('Head of Quality Insurance', 6, 50000),
('Customer Service Rep', 7, 45000),
('Temp', 8, 20000),
('Warehouse Foreman', 9, 65000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Michael', 'Scott', 1, NULL),
('Dwight K.', 'Schrute', 2, 1),
('Jim', 'Halpert', 3, 1),
('Pam', 'Beasley', 4, 1),
('Stanley', 'Hudson', 3, 1),
('Toby', 'Flenderson', 6, 1),
('Oscar', 'Martinez', 5, 1),
('Kevin', 'Malone', 5, 1),
('Creed', 'Bratton', 6, 1),
('Kelly', 'Kapoor', 8, 1),
('Ryan', 'Howard', 9, 1),
('Darryl', 'Philbin', 10, 1);




