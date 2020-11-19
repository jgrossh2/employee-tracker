use employees;

INSERT INTO department (name)
VALUES
    ('Legal'),
    ('Finance'),
    ('Engineering'),
    ('Human Resources'),
    ('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES 
    ('Director of Sales', 180,000, 10),
    ('Lead engineer', 120,000, 11),
    ('Financial Advisor', 100,000, 12),
    ('Employee liason', 75,000, 13),
    ('Product producer', 80,000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Bob', 'Jones', 23, null),
    ('Lisa', 'Smith', 34, null),
    ('Monica', 'Otterman', 22, 12),
    ('Katie', 'Williams', 28, null),
    ('Johnny', 'Walker', 7, 11);