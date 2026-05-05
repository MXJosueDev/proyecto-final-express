const mysql = require("mysql");
const util = require("util");
const pool = require("./database");

async function ensureDatabase() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    port: process.env.DB_PORT || 3306,
  });

  pool.query = util.promisify(pool.query);
  
  const dbName = process.env.DB_NAME || "employees";
  const createDbSql = "CREATE DATABASE IF NOT EXISTS " + mysql.escapeId(dbName);

  await pool.query(createDbSql);
  connection.end();
}

async function ensureTables() {
  await pool.query(
    "CREATE TABLE IF NOT EXISTS user (" +
      "user_id INT NOT NULL AUTO_INCREMENT," +
      "user_name VARCHAR(100) NOT NULL," +
      "user_mail VARCHAR(120) NOT NULL," +
      "user_password VARCHAR(120) NOT NULL," +
      "PRIMARY KEY (user_id)" +
      ")"
  );

  await pool.query(
    "CREATE TABLE IF NOT EXISTS employee (" +
      "emp_id INT NOT NULL AUTO_INCREMENT," +
      "emp_name VARCHAR(120) NOT NULL," +
      "emp_lastname VARCHAR(120) NOT NULL," +
      "emp_phone VARCHAR(50) NOT NULL," +
      "emp_email VARCHAR(120) NOT NULL," +
      "emp_address VARCHAR(200) NOT NULL," +
      "PRIMARY KEY (emp_id)" +
      ")"
  );
}

async function initDb() {
  await ensureDatabase();
  await ensureTables();
}

module.exports = initDb;
