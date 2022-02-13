const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "Ta1!SQLTa1!",
      database: "election",
    },
    console.log("Connected to the Company database.")
  );

  module.exports = db;