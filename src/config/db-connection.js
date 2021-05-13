// Basic database conection with node.js
// Database connection data comes from db.config.js
const mysql = require("mysql2");
//const dbConfig = require("./db.config.js");
const dotenv = require('dotenv');
dotenv.config();

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.PORTHOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB
});

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log(`Successfully connected to the database ${dbConfig.DB}`);
});

module.exports = connection;
