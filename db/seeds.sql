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
    ('Contract review', 180000, 1),
    ('Director of Sales', 180000, 2),
    ('Lead engineer', 120000, 3),
    ('Financial Advisor', 100000, 2),
    ('Employee liason', 75000, 4),
    ('Product producer', 80000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Ed', 'Pager', 1, null),
    ('Bob', 'Jones', 2, null),
    ('Lisa', 'Smith', 3, null),
    ('Monica', 'Otterman',4, 2),
    ('Katie', 'Williams', 5, null),
    ('Johnny', 'Walker', 6, 3);