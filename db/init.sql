CREATE DATABASE IF NOT EXISTS employees;

USE employees;

CREATE TABLE IF NOT EXISTS user (
  user_id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(100) NOT NULL,
  user_mail VARCHAR(120) NOT NULL,
  user_password VARCHAR(120) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS employee (
  emp_id INT NOT NULL AUTO_INCREMENT,
  emp_name VARCHAR(120) NOT NULL,
  emp_lastname VARCHAR(120) NOT NULL,
  emp_phone VARCHAR(50) NOT NULL,
  emp_email VARCHAR(120) NOT NULL,
  emp_address VARCHAR(200) NOT NULL,
  PRIMARY KEY (emp_id)
);