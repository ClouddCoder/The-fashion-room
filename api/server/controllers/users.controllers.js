const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const pool = require("../db");

config();
const jwtPassword = process.env.JWT_PASSWORD;

/**
 * Verifica si el usuario esta autorizado.
 */
const getAuthorization = (authorization) => {
  let token;

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    // eslint-disable-next-line prefer-destructuring
    token = authorization.split(" ")[1];
  } else {
    return { code: 401, message: "Unauthorized" };
  }

  if (!token) {
    return { code: 401, message: "Token missing or invalid" };
  }

  const decodeToken = jwt.verify(token, jwtPassword);

  if (!decodeToken.userId) {
    return { code: 401, message: "Unauthorized" };
  }

  return decodeToken;
};

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
      status: 200,
    });
  } catch (error) {
    next(error);
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
    next(error);
  }
};

/**
 * Obtiene todos los productos de la base de datos
 */
const getProducts = async (req, res, next) => {
  const { category } = req.query;
  let query = "SELECT variant.product_id, product_name, variant.variant_id, variant_name, ";
  query += "variant_price, variant_quantity, attribute_type, attribute_value FROM category ";
  query += "JOIN product ON product.category_id = category.category_id ";
  query += "JOIN variant ON variant.product_id = product.product_id ";
  query += "JOIN variant_attribute va ON va.variant_id = variant.variant_id ";
  query += "JOIN attribute ON attribute.attribute_id = va.attribute_id ";
  query += "WHERE category_name = $1";

  try {
    const result = await pool.query(query, [category]);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

/**
 * Actualiza la informacion de un producto despues de realizar una compra
 */
const buyProduct = async (req, res, next) => {
  const productsToBuy = req.body;
  let query = "UPDATE variant SET variant_quantity = variant_quantity - $1 ";
  query += "WHERE product_id = $2";
  const { authorization } = req.headers;
  const decodeToken = getAuthorization(authorization);

  try {
    /* eslint-disable no-await-in-loop */
    // eslint-disable-next-line no-restricted-syntax
    for (const item of productsToBuy) {
      const result = await pool.query(query, [
        item[3]?.quantity_to_purchase,
        item[0]?.product_id,
      ]);

      if (result.rowCount === 0) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
    }
    /* eslint-enable no-await-in-loop */
    return res.json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

/**
 * Crea el wishlist de un usuario
 */
const setWishlist = async (req, res, next) => {
  const { variantId, remove } = req.body;
  const addQuery = "INSERT INTO wishlist (customer_id, variant_id) VALUES ($1, $2)";
  const removeQuery = "DELETE FROM wishlist WHERE customer_id = $1 AND variant_id = $2";
  const { authorization } = req.headers;
  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  const values = [decodeToken.userId, variantId];

  try {
    if (!remove) {
      await pool.query(addQuery, values);
    } else {
      await pool.query(removeQuery, values);
    }
    return res.json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

const getWishlist = async (req, res, next) => {
  let query = "SELECT wishlist.variant_id, product_name, variant_price FROM wishlist ";
  query += "INNER JOIN customer ON customer.customer_id = wishlist.customer_id ";
  query += "INNER JOIN variant ON variant.variant_id = wishlist.variant_id ";
  query += "INNER JOIN product ON product.product_id = variant.product_id ";
  query += "WHERE customer.customer_id = $1";
  const { authorization } = req.headers;

  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  try {
    const result = await pool.query(query, [decodeToken.userId]);
    return res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

/**
 * Crea una nueva orden despues de cada compra
 */
const createInvoice = async (req, res, next) => {
  const productsToBuy = req.body;
  const setOrderDetailIdQuery = "SELECT set_order_detail_id()";
  const setOrderDetailQuery = "SELECT set_order_detail($1, $2)";
  const setOrderItemQuery = "SELECT set_order_item($1, $2, $3, $4)";
  const { authorization } = req.headers;
  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  try {
    const getOrderDetailId = await pool.query(setOrderDetailIdQuery);
    const orderDetailId = getOrderDetailId.rows[0].set_order_detail_id;
    await pool.query(setOrderDetailQuery, [orderDetailId, decodeToken.userId]);

    /**
     * Recorre el carrito de compras y agrega cada producto a la tabla
     * que contiene los productos comprados.
     */
    /* eslint-disable no-await-in-loop */
    // eslint-disable-next-line no-restricted-syntax
    for (const item of productsToBuy) {
      const orderItemResponse = await pool.query(setOrderItemQuery, [
        orderDetailId,
        item[0].product_id,
        item[3].quantity_to_purchase,
        item[0].variant_price * item[3].quantity_to_purchase,
      ]);

      if (orderItemResponse.rowCount === 0) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
    }
    /* eslint-enable no-await-in-loop */

    return res.json({ message: "success", orderDetailId });
  } catch (error) {
    next(error);
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
  let query = "SELECT invoice_detail.detail_id, invoice_detail.invoice_id, ";
  query += "invoice_detail.product_id, purchase_date, ";
  query += "product_name, quantity, product_price, total_amount FROM invoice_detail ";
  query += "INNER JOIN invoice ON invoice.invoice_id = invoice_detail.invoice_id ";
  query += "INNER JOIN product ON product.product_id = invoice_detail.product_id ";
  query += "WHERE customer_id = $1";
  const { authorization } = req.headers;
  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  try {
    const result = await pool.query(query, [decodeToken.userId]);
    return res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

/**
 * Elimina un producto comprado.
 */
const removeOrderDetail = async (req, res, next) => {
  const { detailId } = req.body;
  const query = "DELETE FROM invoice_detail WHERE detail_id = $1";
  const values = [detailId];
  const { authorization } = req.headers;
  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  try {
    await pool.query(query, values);
    return res.json({ message: "success" });
  } catch (error) {
    next(error);
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
  removeOrderDetail,
};
