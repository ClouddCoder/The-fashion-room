const {Client} = require("pg");

const client = new Client({
  user: "prueba",
  password: "password",
  host: "localhost",
  database: "tfr",
});

client.connect();

/*
client.query("SELECT * FROM login", (err, res) => {
  console.log(err, res);
  client.end();
});
*/

const queryConsultaUsuarios = async () => {
  const res = await client.query("SELECT * FROM login");
  console.log(res.rows);
  client.end();
};

const queryCreacionUsuario = async (username, password) => {
  const query = "INSERT INTO login VALUES ($1, $2)";
  const values = [username, password];
  await client.query(query, values);
};

//queryCreacionUsuario("belen", "123");
queryConsultaUsuarios();
