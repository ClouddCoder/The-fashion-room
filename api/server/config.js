const { config } = require("dotenv");

config();
// Variables to connect the database.
let host;
let port;

/**
 * For testing and development the database is different.
 */
switch (process.env.NODE_ENV) {
  case "test":
  case "test_api":
    host = process.env.DB_HOST_TEST;
    port = process.env.DB_PORT_TEST;
    break;
  case "development":
    host = process.env.DB_HOST;
    break;
  default:
    host = process.env.DB_HOST;
}

module.exports = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host,
    database: process.env.DB_DATABASE,
    port,
  },
};
