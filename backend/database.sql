CREATE DATABASE invoice_generator;

USE invoice_generator;

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(255),
    address VARCHAR(255),
    customerId VARCHAR(255)
);

CREATE TABLE invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customerId VARCHAR(255),
    product VARCHAR(255),
    quantity INT,
    cost DECIMAL(10, 2),
    total DECIMAL(10, 2),
    date VARCHAR(255)
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(255),
    productId VARCHAR(255)
);
