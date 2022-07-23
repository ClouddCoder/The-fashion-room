const {Pool} = require("pg");
const {db} = require("./config");

const pool = new Pool({
    user: db.user,
    password: db.password,
    host: db.host,
    database: db.database,
    port: db.port,
})

module.exports = pool;