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

  const query = "SELECT * FROM customer WHERE customer_email = $1;";
  const values = [userEmail];

  try {
    const response = await pool.query(query, values);
    if (response.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const data = response.rows[0];

    // eslint-disable-next-line operator-linebreak
    const checkPassword =
      userEmail !== data.customer_email
        ? false
        : await bcrypt.compare(userPassword, data.customer_password);

    if (!checkPassword) {
      return res.status(401).json({
        message: "User/Password incorrect",
      });
    }

    const payload = {
      userId: data.customer_id,
      username: data.customer_name,
    };

    const token = jwt.sign(payload, jwtPassword);

    return res.json({
      isAuth: true,
      userId: data.customer_id,
      userName: data.customer_name,
      username: data.customer_username,
      token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Creates a new user in the database.
 */
const registerUser = async (req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const { userName, userLastname, userEmail, userPassword } = req.body;

  let query = "INSERT INTO customer ";
  query += "(customer_username, customer_name, customer_lastname, ";
  query += "customer_email, customer_password) ";
  query += "VALUES ($1, $2, $3, $4, $5);";

  const userIdquery = "SELECT get_new_customer_id();";

  if (userPassword.length <= 4) {
    return res.status(406).json({
      constraint: "password",
      errorMessage: "La contraseña debe tener más de 4 caracteres",
    });
  }

  // Encrypts the password.
  const passwordHash = await bcrypt.hash(userPassword, 10);
  const values = [userName, userName, userLastname, userEmail, passwordHash];

  try {
    await pool.query(query, values);
    const getuserId = await pool.query(userIdquery);
    const userId = getuserId.rows[0].get_new_customer_id;

    // The username will be the same as the name.
    const payload = {
      userId,
      username: userName,
    };

    const token = jwt.sign(payload, jwtPassword);
    return res.json({
      isAuth: true,
      userId,
      userName,
      username: userName,
      token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Returns the user's id based on the email. This is used when
 * the user forgot their password.
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

/**
 * Updates the name and lastname of the user.
 */
const updateName = async (req, res, next) => {
  const { input, secondInput } = req.body;
  const { authorization } = req.headers;

  let query = "UPDATE customer SET customer_name = $1, ";
  query += "customer_lastname = $2 WHERE customer_id = $3;";

  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  const values = [input, secondInput, decodeToken.userId];

  try {
    const response = await pool.query(query, values);

    if (response.rowCount === 0) {
      return res.status(404).json({ message: "No se encontró el usuario" });
    }

    return res.json({ message: "Nombre actualizado con éxito" });
  } catch (error) {
    next(error);
  }
};

/**
 * Updates the username of the user.
 */
const updateUsername = async (req, res, next) => {
  const { input } = req.body;
  const { authorization } = req.headers;

  const query = "UPDATE customer SET customer_username = $1 WHERE customer_id = $2;";

  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  try {
    await pool.query(query, [input, decodeToken.userId]);
    return res.json({ message: "Username actualizado con éxito" });
  } catch (error) {
    next(error);
  }
};

/**
 * Updates the email of the user.
 */
const updateEmail = async (req, res, next) => {
  const { input } = req.body;
  const { authorization } = req.headers;

  const updateEmailQuery = "UPDATE customer SET customer_email = $1 WHERE customer_id = $2;";

  // Gets the current email of the user to know if the new email is different.
  const getUserEmailquery = "SELECT customer_email FROM customer WHERE customer_id = $1;";

  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  try {
    const response = await pool.query(getUserEmailquery, [decodeToken.userId]);
    const userCurrentEmail = response.rows[0].customer_email;

    if (userCurrentEmail === input) {
      return res.status(406).json({
        message: "El email debe ser diferente al actual",
      });
    }

    await pool.query(updateEmailQuery, [input, decodeToken.userId]);
    return res.json({ message: "Email actualizado con éxito", email: userCurrentEmail });
  } catch (error) {
    next(error);
  }
};

/**
 * Updates the password of the user when forgets it.
 */
const updatePassword = async (req, res, next) => {
  const { userId, currentPassword, newPassword } = req.body;

  // Query to get the user's current password.
  let userCurrentPasswordQuery = "SELECT customer_password FROM customer ";
  userCurrentPasswordQuery += "WHERE customer_id = $1;";

  // Query to update the user's password.
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

    // Checks if the current password is correct.
    const checkCurrentPassword = await bcrypt.compare(currentPassword, userPassword);

    if (!checkCurrentPassword) {
      return res.status(401).json({
        constraint: "currentPassword",
        message: "Contraseña incorrecta",
      });
    }

    // Checks if the new password is different from the current password.
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
 * Returns the user's phone numbers.
 */
const getPhone = async (req, res, next) => {
  const { authorization } = req.headers;

  let query = "SELECT * FROM phone p ";
  query += "JOIN customer_phone cp ON p.phone_id = cp.phone_id ";
  query += "JOIN customer c ON cp.customer_id = c.customer_id ";
  query += "WHERE cp.customer_id = $1;";

  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  try {
    const result = await pool.query(query, [decodeToken.userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No se encontraron teléfonos" });
    }
    return res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

/**
 * Adds a new phone number to the user.
 */
const setPhone = async (req, res, next) => {
  const { newPhone } = req.body;
  const { authorization } = req.headers;

  // Query to insert a new phone number.
  const insertPhoneQuery = "INSERT INTO phone (phone_number) VALUES ($1) RETURNING phone_id;";

  // Query to join the new phone number with the user.
  let joinCustomerPhoneQuery = "INSERT INTO customer_phone ";
  joinCustomerPhoneQuery += "(customer_id, phone_id) VALUES ($1, $2);";

  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  try {
    const response = await pool.query(insertPhoneQuery, [newPhone]);
    await pool.query(joinCustomerPhoneQuery, [decodeToken.userId, response.rows[0].phone_id]);

    return res.json({ message: "Teléfono agregado con éxito" });
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes the user's phone number.
 */
const deletePhone = async (req, res, next) => {
  const { phoneId } = req.body;
  const { authorization } = req.headers;

  const query = "DELETE FROM phone WHERE phone_id = $1;";

  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  try {
    await pool.query(query, [phoneId]);
    return res.json({ message: "Teléfono eliminado con éxito" });
  } catch (error) {
    next(error);
  }
};

/**
 * Returns the addresses of the user.
 */
const getAddress = async (req, res, next) => {
  const { authorization } = req.headers;

  let query = "SELECT * FROM addresses a ";
  query += "JOIN customer_address ca ON a.address_id = ca.address_id ";
  query += "JOIN customer c ON ca.customer_id = c.customer_id ";
  query += "WHERE ca.customer_id = $1;";

  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  try {
    const result = await pool.query(query, [decodeToken.userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No se encontraron direcciones" });
    }
    return res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

/**
 * Returns a single address of the user.
 */
const getSingleAddress = async (req, res, next) => {
  const { addressId } = req.query;
  const { authorization } = req.headers;

  const query = "SELECT * FROM addresses WHERE address_id = $1;";

  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  try {
    const response = await pool.query(query, [addressId]);
    return res.json(response.rows[0]);
  } catch (error) {
    next(error);
  }
};

/**
 * Adds a new address to the user.
 */
const setAddress = async (req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const { department, city, neighborhood, streetType, street, streetNumber, references } = req.body;
  const { authorization } = req.headers;

  // Query to insert a new address.
  let insertAddressQuery = "INSERT INTO addresses ";
  insertAddressQuery += "(department, city, neighborhood, street_type, ";
  insertAddressQuery += "street, street_number, address_references) ";
  insertAddressQuery += "VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING address_id;";

  // Query to join the new address with the user.
  let joinCustomerAddressQuery = "INSERT INTO customer_address ";
  joinCustomerAddressQuery += "(customer_id, address_id) VALUES ($1, $2);";

  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  const values = [department, city, neighborhood, streetType, street, streetNumber, references];

  try {
    const response = await pool.query(insertAddressQuery, values);
    await pool.query(joinCustomerAddressQuery, [decodeToken.userId, response.rows[0].address_id]);

    return res.json({ message: "Dirección agregada con éxito" });
  } catch (error) {
    next(error);
  }
};

/**
 * Updates the user's address.
 */
const updateAddress = async (req, res, next) => {
  const {
    addressId,
    department,
    city,
    neighborhood,
    streetType,
    street,
    streetNumber,
    references,
  } = req.body;
  const { authorization } = req.headers;

  let query = "UPDATE addresses SET department = $1, city = $2, neighborhood = $3, ";
  query += "street_type = $4, street = $5, street_number = $6, address_references = $7 ";
  query += "WHERE address_id = $8;";

  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  const values = [
    department,
    city,
    neighborhood,
    streetType,
    street,
    streetNumber,
    references,
    addressId,
  ];

  try {
    await pool.query(query, values);
    return res.json({ message: "Dirección actualizada con éxito" });
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes the user's address.
 */
const deleteAddress = async (req, res, next) => {
  const { addressId } = req.body;
  const { authorization } = req.headers;

  const query = "DELETE FROM addresses WHERE address_id = $1;";

  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  try {
    await pool.query(query, [addressId]);
    return res.json({ message: "Dirección eliminada con éxito" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUserId,
  updateName,
  updateUsername,
  updateEmail,
  updatePassword,
  getPhone,
  setPhone,
  deletePhone,
  getAddress,
  getSingleAddress,
  setAddress,
  updateAddress,
  deleteAddress,
};
