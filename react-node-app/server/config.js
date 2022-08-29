const { config } = require("dotenv");

config();
// Variable to connect to host database
let host = "";
let port = "";

/**
 * Databasee is a container except for testing.
 * If it is test, then the host is localhost.
 * If it is development, then the host is postgres-tfr.
 */
if (process.env.NODE_ENV === "test") {
  host = process.env.DB_HOST_TEST;
  port = process.env.DB_PORT_TEST;
} else {
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
