const mysql = require("mysql2");

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "sakila",
});

database.connect(function (err: any) {
  if (err) throw err;
  console.log("Connected!!!");
});

export default database;
