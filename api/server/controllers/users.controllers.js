const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const pool = require("../db");

config();
const jwtPassword = process.env.JWT_PASSWORD;

/**
 * Verifies if the user is authorized.
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
 * Verifies if the user exists in the database and returns the user information.
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

    const token = jwt.sign(payload, jwtPassword);

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
 * Creates a new record in the database with the user information.
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
 * Gets the information of the specific product's category.
 */
const getAllProducts = async (req, res, next) => {
  const { category } = req.query;
  let query = "SELECT p.*, g.gender_value FROM product p ";
  query += "JOIN category c ON c.category_id = p.category_id ";
  query += "JOIN gender g ON g.gender_id = p.gender_id ";
  query += "WHERE c.category_name = $1";

  try {
    const result = await pool.query(query, [category]);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

/**
 * Gets the product's variants information.
 */
const getProductVariants = async (req, res, next) => {
  const { id } = req.query;
  let query = "SELECT v.*, g.gender_value, c.* FROM variant v ";
  query += "JOIN product p ON p.product_id = v.product_id ";
  query += "JOIN gender g ON g.gender_id = p.gender_id ";
  query += "JOIN variant_color vc ON vc.variant_id = v.variant_id ";
  query += "JOIN color c ON c.color_id = vc.color_id ";
  query += "WHERE v.product_id = $1 ";

  try {
    const result = await pool.query(query, [id]);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

/**
 * Updates the product's variant quantity in the database.
 */
const buyProduct = async (req, res, next) => {
  const productsToBuy = req.body;
  let query = "UPDATE variant SET variant_quantity = variant_quantity - $1 ";
  query += "WHERE variant_id = $2";
  const { authorization } = req.headers;
  const decodeToken = getAuthorization(authorization);

  try {
    /* eslint-disable no-await-in-loop */
    // eslint-disable-next-line no-restricted-syntax
    for (const item of productsToBuy) {
      const result = await pool.query(query, [item.quantity_to_purchase, item.variant_id]);

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
 * Creates new records in the database's wishlist table
 * every time the user adds a product to the wishlist.
 */
const setWishlist = async (req, res, next) => {
  const { productId, remove } = req.body;
  const addQuery = "INSERT INTO wishlist (customer_id, product_id) VALUES ($1, $2)";
  const removeQuery = "DELETE FROM wishlist WHERE customer_id = $1 AND product_id = $2";
  const { authorization } = req.headers;
  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  const values = [decodeToken.userId, productId];

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
  let query = "SELECT wishlist.product_id, product_name, default_price FROM wishlist ";
  query += "JOIN customer ON customer.customer_id = wishlist.customer_id ";
  query += "JOIN product ON product.product_id = wishlist.product_id ";
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
 * Creates the order detail every time the user buys products.
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
     * Iterates through the products to buy and creates new records
     * in the table that contains the purchased products.
     */
    /* eslint-disable no-await-in-loop */
    // eslint-disable-next-line no-restricted-syntax
    for (const item of productsToBuy) {
      const orderItemResponse = await pool.query(setOrderItemQuery, [
        orderDetailId,
        item.variant_id,
        item.quantity_to_purchase,
        item.variant_price * item.quantity_to_purchase,
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
 * Gets the store information.
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
 * Gets the store's phone number.
 */
const getStoresPhones = async (req, res, next) => {
  const query = "SELECT * FROM store_phone";
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

/**
 * Gets the user's order information.
 */
const getOrderDetail = async (req, res, next) => {
  let query = "SELECT od.order_detail_id, order_item.order_item_id, ";
  query += "product.product_id, purchase_date, product_name, variant.variant_id, ";
  query += "variant_quantity, variant_price, item_total_cost FROM order_item ";
  query += "INNER JOIN order_detail od ON od.order_detail_id = order_item.order_detail_id ";
  query += "INNER JOIN variant ON variant.variant_id = order_item.variant_id ";
  query += "INNER JOIN product ON product.product_id = variant.product_id ";
  query += "WHERE od.customer_id = $1";
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
 * Deletes an order that user has made.
 */
const removeOrderDetail = async (req, res, next) => {
  const { orderDetailId } = req.body;
  const query = "DELETE FROM order_item WHERE order_item_id = $1";
  const { authorization } = req.headers;
  const decodeToken = getAuthorization(authorization);

  if (decodeToken.code) {
    return res.status(decodeToken.code).json({ message: decodeToken.message });
  }

  try {
    await pool.query(query, [orderDetailId]);
    return res.json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
  getAllProducts,
  getProductVariants,
  buyProduct,
  setWishlist,
  getWishlist,
  createInvoice,
  getStores,
  getStoresPhones,
  getOrderDetail,
  removeOrderDetail,
};
