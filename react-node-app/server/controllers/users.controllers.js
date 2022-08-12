const pool = require("../db");

/**
 * Obtiene el usuario según el email y contraseña ingresados
 */
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const query = "SELECT customer_id, name FROM customer WHERE email = $1 AND password = $2";
  const values = [email, password];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Wrong email/password combination",
      });
    }
    return res.json({
      message: "success",
      id: result.rows[0].customer_id,
      name: result.rows[0].name,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Registra un usuario nuevo a la base de datos
 */
const registerUser = async (req, res, next) => {
  const { name, lastname, email, password } = req.body;
  const query = "INSERT INTO customer (name, lastname, email, password) VALUES ($1, $2, $3, $4)";
  const values = [name, lastname, email, password];

  try {
    await pool.query(query, values);
    return res.json({ message: "success" });
  } catch (error) {
    next(error);
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

  try {
    for (const item of cart) {
      const result = await pool.query(query, [item.quantityInCart, item.product_id]);

      if (result.rowCount === 0) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
    }
    return res.json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

/**
 * Crea una nueva factura despues de cada compra
 */
const createInvoice = async (req, res, next) => {
  const { userId, cart } = req.body;
  const queryCreateInvoiceId = "SELECT create_invoice_id()";
  const queryInsertInvoice = "SELECT create_invoice($1, $2)";
  const queryInsertInvoiceDetails = "SELECT invoice_data($1, $2, $3, $4)";

  try {
    const getInvoiceId = await pool.query(queryCreateInvoiceId);
    const invoiceId = getInvoiceId.rows[0].create_invoice_id;
    await pool.query(queryInsertInvoice, [invoiceId, userId]);

    for (const item of cart) {
      const getInvoiceDetails = await pool.query(queryInsertInvoiceDetails, [
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
    return res.json({ message: "success", invoiceId });
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
  const { userId } = req.body;
  const query =
    "SELECT invoice_detail.invoice_id, purchase_date, product_name, quantity, total_amount FROM invoice_detail INNER JOIN invoice ON invoice.invoice_id = invoice_detail.invoice_id INNER JOIN product ON product.product_id = invoice_detail.product_id WHERE customer_id = $1";

  try {
    const result = await pool.query(query, [userId]);
    return res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
  getProducts,
  buyProduct,
  createInvoice,
  getStores,
  getStoresPhones,
  getOrderDetail,
};
