const pool = require("../db");
const { getAuthorization } = require("./helpers");

/**
 * Gets the information of the products with one variant, given a category.
 */
const getAllProducts = async (req, res, next) => {
  const { category } = req.query;
  let query = "SELECT DISTINCT ON (p.product_id) p.product_id, p.product_name, ";
  query += "g.gender_value, v.variant_id, v.variant_name, t.min_price FROM product p ";
  query += "JOIN category ca ON ca.category_id = p.category_id ";
  query += "JOIN gender g ON g.gender_id = p.gender_id ";
  query += "JOIN variant v ON v.product_id = p.product_id ";
  query += "JOIN (SELECT product_id, MIN(variant_price) AS min_price ";
  query += "FROM variant GROUP BY product_id) t ";
  query += "ON v.product_id = t.product_id and t.min_price = v.variant_price ";
  query += "WHERE ca.category_name = $1 ";
  query += "ORDER BY p.product_id;";

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
  let query = "SELECT v.*, g.gender_value, c.color_value, p.product_name, ";
  query += "p.shipping_cost FROM variant v ";
  query += "JOIN product p ON p.product_id = v.product_id ";
  query += "JOIN gender g ON g.gender_id = p.gender_id ";
  query += "JOIN variant_color vc ON vc.variant_id = v.variant_id ";
  query += "JOIN color c ON c.color_id = vc.color_id ";
  query += "WHERE v.product_id = $1;";

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
  const { authorization } = req.headers;
  let query = "UPDATE variant SET variant_quantity = variant_quantity - $1 ";
  query += "WHERE variant_id = $2;";
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
  const { authorization } = req.headers;
  const addQuery = "INSERT INTO wishlist (customer_id, product_id) VALUES ($1, $2);";
  const removeQuery = "DELETE FROM wishlist WHERE customer_id = $1 AND product_id = $2;";
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
  const { authorization } = req.headers;
  let query = "SELECT DISTINCT ON (w.product_id) w.product_id, p.product_name, v.variant_id, ";
  query += "v.variant_name, t.min_price FROM wishlist w ";
  query += "JOIN product p ON p.product_id = w.product_id ";
  query += "JOIN variant v ON v.product_id = p.product_id ";
  query += "JOIN customer cu ON cu.customer_id = w.customer_id ";
  query += "JOIN (SELECT product_id, MIN(variant_price) AS min_price ";
  query += "FROM variant GROUP BY product_id) t ";
  query += "ON v.product_id = t.product_id and t.min_price = v.variant_price ";
  query += "WHERE cu.customer_id = $1;";

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
  const { authorization } = req.headers;
  const setOrderDetailIdQuery = "SELECT set_order_detail_id();";
  const setOrderDetailQuery = "SELECT set_order_detail($1, $2);";
  const setOrderItemQuery = "SELECT set_order_item($1, $2, $3, $4);";
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
  const query = "SELECT * FROM store;";

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
  const query = "SELECT * FROM store_phone;";
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

/**
 * Gets the user's orders information.
 */
const getOrderDetail = async (req, res, next) => {
  const { authorization } = req.headers;
  let query = "SELECT oi.order_detail_id, oi.order_item_id, oi.item_total_cost, ";
  query += "oi.product_quantity, p.product_id, od.purchase_date, p.product_name, v.variant_id, ";
  query += "v.variant_quantity, v.variant_price FROM order_item oi ";
  query += "JOIN order_detail od ON od.order_detail_id = oi.order_detail_id ";
  query += "JOIN variant v ON v.variant_id = oi.variant_id ";
  query += "JOIN product p ON p.product_id = v.product_id ";
  query += "WHERE od.customer_id = $1;";
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
  const { authorization } = req.headers;
  const query = "DELETE FROM order_item WHERE order_item_id = $1;";
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
