const express = require("express");
const employee = express.Router();
const db = require("../config/database");

employee.post("/", async (req, res, next) => {
  const { emp_name, emp_lastname, emp_phone, emp_email, emp_address } = req.body;

  if (!(emp_name && emp_lastname && emp_phone && emp_email && emp_address))
    return res.status(400).json({ code: 400, message: "Campos incompletos" });

  let query = "INSERT INTO employee(emp_name, emp_lastname, emp_phone, emp_email, emp_address)";
  query += ` VALUES ('${emp_name}','${emp_lastname}','${emp_phone}','${emp_email}','${emp_address}')`;

  const rows = await db.query(query);

  if (rows.affectedRows == 1) {
    return res.status(201).json({ code: 201, message: "Empleado creado con exito" });
  }

  return res.status(500).json({ code: 500, message: "Ocurrio un error" });
});

employee.get("/", async (req, res, next) => {
  const rows = await db.query("SELECT * FROM employee;");
  return res.status(200).json({ code: 200, message: rows });
});

employee.get("/name/:name", async (req, res, next) => {
  const name = req.params.name;
  const rows = await db.query(`SELECT * FROM employee WHERE emp_name = '${name}'`);

  if (rows.length == 0) {
    return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
  }

  return res.status(200).json({ code: 200, message: rows });
});

employee.get(/^\/([0-9]{1,10})$/, async (req, res, next) => {
  const id = req.params[0];
  const rows = await db.query(`SELECT * FROM employee WHERE emp_id = ${id}`);

  if (rows.length == 1) {
    return res.status(200).json({ code: 200, message: rows[0] });
  }

  return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});

employee.put(/^\/([0-9]{1,10})$/, async (req, res, next) => {
  const id = req.params[0];
  const { emp_name, emp_lastname, emp_phone, emp_email, emp_address } = req.body;

  if (!(emp_name && emp_lastname && emp_phone && emp_email && emp_address))
    return res.status(400).json({ code: 400, message: "Campos incompletos" });

  const query = `UPDATE employee SET emp_name='${emp_name}', emp_lastname='${emp_lastname}', emp_phone='${emp_phone}', emp_email='${emp_email}', emp_address='${emp_address}' WHERE emp_id=${id}`;
  const rows = await db.query(query);

  if (rows.affectedRows == 1) {
    return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente" });
  }

  return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});

employee.delete(/^\/([0-9]{1,10})$/, async (req, res, next) => {
  const id = req.params[0];
  const rows = await db.query(`DELETE FROM employee WHERE emp_id = ${id}`);

  if (rows.affectedRows == 1) {
    return res.status(200).json({ code: 200, message: "Empleado borrado correctamente" });
  }

  return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});

module.exports = employee;
