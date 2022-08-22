const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users.routes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(userRoutes);

/**
 * Determina las peticiones, respuestas y errores personalizados en cada consulta
 */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.code === "23505") {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  if (err.code === "23502") {
    return res.status(404).json({
      message: "Invalid data",
    });
  }

  return res.status(400).json({
    message: "Something went wrong",
  });
});

/**
 * Inicia el servidor en el puerto 3001
 */
app.listen(3001, "0.0.0.0", () => {
  console.log("Server running on port 3001");
});
