CREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255),
    department_name VARCHAR(255),
    price DECIMAL(5,2) NOT NULL,
    stock_quantity INT NOT NULL,
    product_sales INT,
    PRIMARY KEY (item_id)
);

-- CREATE TABLE departments (
--     department_id INT NOT NULL AUTO-INCREMENT,
--     department_name VARCHAR(255),
--     over_head_costs INT,
--     PRIMARY KEY (department_id)
-- );

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES 
("Time_Turner", "Griffindor", 89.95, 4), 
("Tom Riddle's Diary", "Dark Magic", 79.99, 7), 
("Cloak of Invisibility", "Death Hallows",129.99, 5),
("Elder Wand", "Death Hallows", 250, 3),
("The Marauder's Map", "Griffindor", 49.99, 15),
("Frog Spawn Soap", "Jokes department", 1.50, 99),
("Hermione's handbag", "Griffindor", 15.99, 19),
("Arthur Weasley's Ford Anglia", "Protection Department", 550, 3),
("Floo Powder", "Protection Department", 10.99, 100),
("Flying carpet", "Dark Magic", 39.99, 9);