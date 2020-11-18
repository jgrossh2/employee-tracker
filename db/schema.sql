DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30)
);
CREATE TABLE roles (
    id INT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT fk_party FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL 
);
CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    CONSTRAINT fk_party FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    CONSTRAINT fk_party FOREIGN KEY (manager_id) REFERENCES manager(id) ON DELETE SET NULL 
);