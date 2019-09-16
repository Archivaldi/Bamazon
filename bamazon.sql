CREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(255),
    over_head_costs INT,
    PRIMARY KEY (department_id)
);


CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255),
    price DECIMAL(5,2) NOT NULL,
    stock_quantity INT NOT NULL,
    product_sales INT,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
    PRIMARY KEY (item_id)
);


INSERT INTO departments (department_name, over_head_costs)
VALUES
("Griffindor", 140000),
("Dark Magic", 24000),
("Death Hallows", 110000),
("Joke department", 45000),
("Protection Department", 55000);

INSERT INTO products(product_name, department_id, price, stock_quantity, product_sales) 
VALUES 
("Time Turner", 1, 89.95, 4, 63445), 
("Tom Riddle's Diary", 2, 79.99, 7, 23846), 
("Cloak of Invisibility", 3,129.99, 5, 36900),
("Elder Wand", 3, 250, 3, 25455),
("The Marauder's Map", 1, 49.99, 15, 82356),
("Frog Spawn Soap", 4, 1.50, 99, 78264),
("Hermione's handbag", 1, 15.99, 19, 49465),
("Arthur Weasley\'s Ford Anglia", 5, 550, 3, 65345),
("Floo Powder", 5, 10.99, 100, 86035),
("Flying carpet", 2, 39.99, 9, 18236);