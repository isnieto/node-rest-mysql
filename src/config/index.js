// gather our variables from .env file and map them into well-named variables and export them through a module.
// under 'config/index.js

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY,
  port: process.env.PORT
};