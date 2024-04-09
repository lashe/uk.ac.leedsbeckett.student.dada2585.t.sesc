// config.js
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  APP_NAME: process.env.APP_NAME,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  // Database Connection
  DB: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    operatorsAliases: 0,
  }
};
