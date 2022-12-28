const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const pool = require("../db");
const { getAuthorization } = require("./helpers");

config();
const jwtPassword = process.env.JWT_PASSWORD;

/**
 * Verifies if the user exists in the database and returns the user information.
 */
const loginUser = async (req, res, next) => {
  const { userEmail, userPassword } = req.body;
  let query = "SELECT customer_id, customer_name, customer_lastname, ";
  query += "customer_email, customer_password ";
  query += "FROM customer WHERE customer_email = $1;";
  const values = [userEmail];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // eslint-disable-next-line operator-linebreak
    const checkPassword =
      userEmail !== result.rows[0].customer_email
        ? false
        : await bcrypt.compare(userPassword, result.rows[0].customer_password);

    if (!checkPassword) {
      return res.status(401).json({
        message: "User/Password incorrect",
      });
    }

    const payload = {
      userId: result.rows[0].customer_id,
      userName: result.rows[0].customer_name,
      userEmail,
    };

    const token = jwt.sign(payload, jwtPassword);

    return res.json({
      userAuth: true,
      userId: result.rows[0].customer_id,
      userName: result.rows[0].customer_name,
      username: `${result.rows[0].customer_name} ${result.rows[0].customer_lastname}`,
      token,
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Creates a new record in the database with the user information.
 */
const registerUser = async (req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const { userName, userLastname, userEmail, userPassword } = req.body;
  let query = "INSERT INTO customer ";
  query += "(customer_name, customer_lastname, customer_email, customer_password) ";
  query += "VALUES ($1, $2, $3, $4);";
  const userIdquery = "SELECT get_new_customer_id();";

  if (userPassword.length <= 4) {
    return res.status(406).json({
      constraint: "password",
      errorMessage: "La contraseña debe tener más de 4 caracteres",
    });
  }

  const passwordHash = await bcrypt.hash(userPassword, 10);
  const values = [userName, userLastname, userEmail, passwordHash];

  try {
    await pool.query(query, values);
    const getuserId = await pool.query(userIdquery);
    const userId = getuserId.rows[0].get_new_customer_id;

    const payload = {
      userId,
      userName,
      userEmail,
    };

    const token = jwt.sign(payload, jwtPassword);
    return res.json({
      userAuth: true,
      userId,
      userName,
      username: `${userName} ${userLastname}`,
      token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Updates the user's email
 */
const updateEmail = async (req, res, next) => {
  const { newEmail } = req.body;
  const { authorization } = req.headers;
  const updateEmailQuery = "UPDATE customer SET customer_email = $1 WHERE customer_id = $2;";
  const getUserEmailquery = "SELECT customer_email FROM customer WHERE customer_id = $1;";
  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  try {
    const response = await pool.query(getUserEmailquery, [decodeToken.userId]);
    const userCurrentEmail = response.rows[0].customer_email;

    if (userCurrentEmail === newEmail) {
      return res.status(406).json({
        message: "El email debe ser diferente al actual",
      });
    }

    await pool.query(updateEmailQuery, [newEmail, decodeToken.userId]);
    return res.json({ message: "Email actualizado con éxito", email: userCurrentEmail });
  } catch (error) {
    next(error);
  }
};

/**
 * Updates the user's password when the user forgets it
 */
const updatePassword = async (req, res, next) => {
  const { userId, currentPassword, newPassword } = req.body;

  // Query to get the user's current password
  let userCurrentPasswordQuery = "SELECT customer_password FROM customer ";
  userCurrentPasswordQuery += "WHERE customer_id = $1;";

  // Query to update the user's password
  let updatePasswordquery = "UPDATE customer SET customer_password = $2 ";
  updatePasswordquery += "WHERE customer_id = $1;";

  try {
    const result = await pool.query(userCurrentPasswordQuery, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        constraint: "currentPassword",
        message: "Ingresa una contraseña válida",
      });
    }

    const userPassword = result.rows[0].customer_password;

    // Checks if the current password is correct
    const checkCurrentPassword = await bcrypt.compare(currentPassword, userPassword);

    if (!checkCurrentPassword) {
      return res.status(401).json({
        constraint: "currentPassword",
        message: "Contraseña incorrecta",
      });
    }

    // Checks if the new password is different from the current password
    const checkNewPassword = await bcrypt.compare(newPassword, userPassword);

    if (checkNewPassword) {
      return res.status(406).json({
        constraint: "newPassword",
        message: "La nueva contraseña debe ser diferente a la actual",
      });
    }

    if (newPassword.length <= 4) {
      return res.status(406).json({
        constraint: "newPassword",
        message: "La contraseña debe tener más de 4 caracteres",
      });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await pool.query(updatePasswordquery, [userId, newPasswordHash]);

    return res.json({ message: "Contraseña actualizada" });
  } catch (error) {
    next(error);
  }
};

/**
 * Returns the user's id based on the email. This is used when
 * the user forgot their password
 */
const getUserId = async (req, res, next) => {
  const { email } = req.query;
  const query = "SELECT customer_id FROM customer WHERE customer_email = $1;";

  try {
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Correo no existe" });
    }
    return res.json({ userId: result.rows[0].customer_id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
  updateEmail,
  updatePassword,
  getUserId,
};
