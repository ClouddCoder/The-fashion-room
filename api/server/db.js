const { Pool } = require("pg");
const fs = require("fs");
const { db } = require("./config");

const pool = new Pool({
  user: db.user,
  password: db.password,
  host: db.host,
  database: db.database,
  port: db.port,
  ssl: {
    ca: fs.readFileSync(db.ssl),
  },
});

module.exports = pool;
