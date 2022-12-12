const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require("body-parser");
const { config } = require("dotenv");
const userRoutes = require("./routes/users.routes");

config();
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(userRoutes);

/**
 * Set the requests, responses and custom error messages.
 */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const constraint = err.constraint.split("_")[3];

  if (err.code === "23502") {
    return res.status(404).json({
      errorMessage: "Información invalida",
      constraint,
    });
  }

  if (err.code === "23505") {
    return res.status(409).json({
      errorMessage: "El usuario ya existe",
      constraint,
    });
  }

  if (err.code === "23514") {
    let errorMessage = "";
    switch (constraint) {
      case "name":
        errorMessage = "Debes ingresar tu nombre";
        break;
      case "lastname":
        errorMessage = "Debes ingresar tu apellido";
        break;
      case "email":
        errorMessage = "Debes ingresar tu email";
        break;
      case "password":
        errorMessage = "Debes ingresar tu contraseña";
        break;
      default:
    }
    return res.status(422).json({ errorMessage, constraint });
  }

  return res.status(400).json({
    errorMessage: "Something went wrong",
    constraint,
  });
});

/**
 * Inicia el servidor en el puerto 3001
 */
const PORT = parseInt(process.env.PORT, 10) || 3001;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
