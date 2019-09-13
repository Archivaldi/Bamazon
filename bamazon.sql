CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    product_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255),
    PRIMARY KEY (product_id)
);