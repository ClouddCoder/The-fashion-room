const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const pool = require("../db");

config();
const jwtPassword = process.env.JWT_PASSWORD;

/**
 * Obtiene el usuario según el email y contraseña ingresados
 */
const loginUser = async (req, res, next) => {
  const { userEmail, userPassword } = req.body;
  let query = "SELECT customer_id, customer_name, customer_lastname, ";
  query += "customer_email, customer_password ";
  query += "FROM customer WHERE customer_email = $1";
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

    const token = await jwt.sign(payload, jwtPassword);

    return res.json({
      userAuth: true,
      userId: result.rows[0].customer_id,
      userName: result.rows[0].customer_name,
      token,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Registra un usuario nuevo a la base de datos
 */
const registerUser = async (req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const { userName, userLastname, userEmail, userPassword } = req.body;
  let query = "INSERT INTO customer ";
  query += "(customer_name, customer_lastname, customer_email, customer_password) ";
  query += "VALUES ($1, $2, $3, $4)";
  const userIdquery = "SELECT get_new_customer_id()";

  if (userPassword.length <= 4) {
    return res.status(406).json({
      message: "Password must be at least 4 characters long",
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
      token,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Obtiene todos los productos de la base de datos
 */
const getProducts = async (req, res, next) => {
  const query = "SELECT * FROM product";

  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

/**
 * Actualiza la informacion de un producto despues de realizar una compra
 */
const buyProduct = async (req, res, next) => {
  const cart = req.body;
  const query = "UPDATE product SET stock = stock - $1 WHERE product_id = $2";
  const { authorization } = req.headers;
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    // eslint-disable-next-line prefer-destructuring
    token = authorization.split(" ")[1];
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const decodeToken = jwt.verify(token, jwtPassword);

  if (!token || !decodeToken.userId) {
    return res.status(401).json({
      message: "Token missing or invalid",
    });
  }

  try {
    /* eslint-disable no-await-in-loop */
    // eslint-disable-next-line no-restricted-syntax
    for (const item of cart) {
      const result = await pool.query(query, [item.quantityInCart, item.product_id]);

      if (result.rowCount === 0) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
    }
    /* eslint-enable no-await-in-loop */
    return res.json({ message: "success" });
  } catch (error) {
    return next(error);
  }
};

/**
 * Crea el wishlist de un usuario
 */
const setWishlist = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const query = "INSERT INTO wishlist (customer_id, product_id, quantity) VALUES ($1, $2, $3)";
  const { authorization } = req.headers;
  let token = "";
  return res.json({ message: productId });

  /*
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    // eslint-disable-next-line prefer-destructuring
    token = authorization.split(" ")[1];
  } else {
    return res.status(401).json({
      token,
      message: "Unauthorized",
    });
  }

  const decodeToken = await jwt.verify(token, jwtPassword);

  if (!token || !decodeToken.userId) {
    return res.status(401).json({
      message: "Token missing or invalid",
    });
  }

  const values = [decodeToken.userId, productId, quantity];

  try {
    await pool.query(query, values);
    return res.json({ message: "success" });
  } catch (error) {
    return next(error);
  }
  */
};

const getWishlist = async (req, res, next) => {
  const query = "SELECT * FROM wishlist";
  const { authorization } = req.headers;
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    // eslint-disable-next-line prefer-destructuring
    token = authorization.split(" ")[1];
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const decodeToken = jwt.verify(token, jwtPassword);

  if (!token || !decodeToken.userId) {
    return res.status(401).json({
      message: "Token missing or invalid",
    });
  }

  try {
    const result = await pool.query(query);
    return res.json(result.rows);
  } catch (error) {
    return next(error);
  }
};

/**
 * Crea una nueva factura despues de cada compra
 */
const createInvoice = async (req, res, next) => {
  const cart = req.body;
  const createInvoiceIdQuery = "SELECT create_invoice_id()";
  const createInvoiceQuery = "SELECT create_invoice($1, $2)";
  const insertInvoiceDetailsQuery = "SELECT invoice_data($1, $2, $3, $4)";
  const { authorization } = req.headers;
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    // eslint-disable-next-line prefer-destructuring
    token = authorization.split(" ")[1];
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const decodeToken = await jwt.verify(token, jwtPassword);

  if (!token || !decodeToken.userId) {
    return res.status(401).json({
      message: "Token missing or invalid",
    });
  }

  try {
    const getInvoiceId = await pool.query(createInvoiceIdQuery);
    const invoiceId = getInvoiceId.rows[0].create_invoice_id;
    await pool.query(createInvoiceQuery, [invoiceId, decodeToken.userId]);

    /**
     * Recorre el carrito de compras y agrega cada producto a la tabla
     * que contiene los productos comprados de una factura.
     */
    /* eslint-disable no-await-in-loop */
    // eslint-disable-next-line no-restricted-syntax
    for (const item of cart) {
      const getInvoiceDetails = await pool.query(insertInvoiceDetailsQuery, [
        invoiceId,
        item.product_id,
        item.quantityInCart,
        item.price * item.quantityInCart,
      ]);

      if (getInvoiceDetails.rowCount === 0) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
    }
    /* eslint-enable no-await-in-loop */

    return res.json({ message: "success", invoiceId });
  } catch (error) {
    return next(error);
  }
};

/**
 * Obtiene la informacion de las tiendas de la base de datos
 */
const getStores = async (req, res, next) => {
  const query = "SELECT * FROM store";

  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene los telefonos de las tiendas de la base de datos
 */
const getStoresPhones = async (req, res, next) => {
  const query = "SELECT phone FROM store_phone INNER JOIN store ON store.nit = store_phone.nit";

  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene la informacion detallada de cada factura
 */
const getOrderDetail = async (req, res, next) => {
  let query = "SELECT invoice_detail.invoice_id, purchase_date, ";
  query += "product_name, quantity, total_amount FROM invoice_detail ";
  query += "INNER JOIN invoice ON invoice.invoice_id = invoice_detail.invoice_id ";
  query += "INNER JOIN product ON product.product_id = invoice_detail.product_id ";
  query += "WHERE customer_id = $1";
  const { authorization } = req.headers;
  let token = "";

  if (authorization || authorization.toLowerCase().startsWith("bearer")) {
    // eslint-disable-next-line prefer-destructuring
    token = authorization.split(" ")[1];
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const decodeToken = await jwt.verify(token, jwtPassword);

  if (!token || !decodeToken.userId) {
    return res.status(401).json({
      message: "Token missing or invalid",
    });
  }

  try {
    const result = await pool.query(query, [decodeToken.userId]);
    return res.json(result.rows);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
  getProducts,
  buyProduct,
  setWishlist,
  getWishlist,
  createInvoice,
  getStores,
  getStoresPhones,
  getOrderDetail,
};
