// Basic database conection with node.js
// Database connection data comes from db.config.js
const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log(`Successfully connected to the database ${dbConfig.DB}`);
});

module.exports = connection;

// Connecting to the database moongoose
/* mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
 }).then(() => {
    console.log("Successfully connected to the express-mongo-app database");
 }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
 });
  */
