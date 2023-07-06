const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "new_password",
  database: "OnlineMallDatabase",
});
db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

// Create an Amazon S3 service client object.

module.exports = { db: db };
