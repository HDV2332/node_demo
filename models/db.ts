const mysql = require("mysql2");
require("dotenv").config();

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASS;
const db = process.env.DB;

const database = mysql.createConnection({
  host,
  user,
  password,
  database: db,
});

database.connect(function (err: any) {
  if (err) throw err;
  console.log("Connected!!!");
});

module.exports = database;
