DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (50) NOT NULL,
    department_name VARCHAR (30) NOT NULL,
    price INTEGER (5) NOT NULL,
    stock_quantity INTEGER (225) NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Adriana Poster", "Adriana's Fanclub", 5000, 600);