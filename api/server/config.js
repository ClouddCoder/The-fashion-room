const { config } = require("dotenv");

config();
// Variables to connect the database.
let user = "";
let password = "";
let host = "";
let name = "";
let port = "";
let ssl = 0;

/**
 * For testing and development the database is different.
 */
switch (process.env.NODE_ENV) {
  case "test_jest":
  case "test_api":
    user = process.env.DB_USER_TEST;
    password = process.env.DB_PASSWORD_TEST;
    host = process.env.DB_HOST_TEST;
    name = process.env.DB_NAME_TEST;
    port = process.env.DB_PORT_TEST;
    ssl = process.env.DB_SSL_TEST;
    break;
  case "development":
    user = process.env.DB_USER_DEV;
    password = process.env.DB_PASSWORD_DEV;
    host = process.env.DB_HOST_DEV;
    name = process.env.DB_NAME_DEV;
    port = process.env.DB_PORT_DEV;
    ssl = process.env.DB_SSL_DEV;
    break;
  default:
    user = process.env.DB_USER;
    password = process.env.DB_PASSWORD;
    host = process.env.DB_HOST;
    name = process.env.DB_NAME;
    port = process.env.DB_PORT;
    ssl = process.env.DB_SSL;
}

module.exports = {
  db: {
    user,
    password,
    host,
    database: name,
    port,
    ssl: Boolean(parseInt(ssl, 10)),
  },
};
