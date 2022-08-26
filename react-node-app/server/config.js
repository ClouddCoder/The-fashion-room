const { config } = require("dotenv");

config();
// Variable to connect to host database
let host = "";

/**
 * If the environment is test, then the host is localhost.
 * If the environment is development, then the host is postgres-tfr (it is a container, then it must be running).
 */
if (process.env.NODE_ENV === "test") {
  host = process.env.DB_HOST_TEST;
} else {
  host = process.env.DB_HOST;
}

module.exports = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  },
};
