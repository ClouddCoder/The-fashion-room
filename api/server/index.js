const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require("body-parser");
const { config } = require("dotenv");
const routes = require("./routes/routes");

config();
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

/**
 * Set the requests, responses and custom error messages
 */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // If whatever input is null
  if (err.code === "23502") {
    return res.status(404).json({
      errorMessage: "Información invalida",
    });
  }

  // eslint-disable-next-line prefer-destructuring
  const constraint = err.constraint;

  // If the user already exists
  if (constraint === "pk_customer" || constraint === "customer_customer_username_key") {
    return res.status(409).json({
      errorMessage: "El usuario ya existe",
      constraint: "email",
    });
  }

  if (constraint === "check_not_null_username" || constraint === "check_not_empty_username") {
    return res.status(422).json({
      errorMessage: "Debes ingresar tu nombre de usuario",
      constraint: "username",
    });
  }

  if (constraint === "check_not_null_name" || constraint === "check_not_empty_name") {
    return res.status(422).json({
      errorMessage: "Debes ingresar tu nombre",
      constraint: "name",
    });
  }

  if (constraint === "check_not_null_email" || constraint === "check_not_empty_email") {
    return res.status(422).json({
      errorMessage: "Debes ingresar tu email",
      constraint: "email",
    });
  }

  if (constraint === "check_not_null_password" || constraint === "check_not_empty_password") {
    return res.status(422).json({
      errorMessage: "Debes ingresar tu contraseña",
      constraint: "password",
    });
  }

  // If the phone number already exists
  if (err.constraint === "phone_phone_number_key") {
    return res.status(409).json({
      errorMessage: "El número ya está registrado",
      constraint: "phone_number",
    });
  }

  if (
    // eslint-disable-next-line operator-linebreak
    err.constraint === "check_not_null_phone_number" ||
    err.constraint === "check_not_empty_phone_number"
  ) {
    return res.status(422).json({
      errorMessage: "Ingresar un número de teléfono",
      constraint: "phone_number",
    });
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
