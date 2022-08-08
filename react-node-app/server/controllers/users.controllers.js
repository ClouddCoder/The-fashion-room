const pool = require("../db");

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
    return res.json({ message: "success", id: result.rows[0].customer_id, name: result.rows[0].name });
  } catch (error) {
    return next(error);
  }
};

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

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const query = "DELETE FROM customer WHERE customer_id = $1";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

const getProducts = async (req, res, next) => {
  const query = "SELECT * FROM product";

  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  const { id } = req.params;
  const query = "SELECT * FROM product WHERE product_id = $1";

  try {
    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    return next(error);
  }
};

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

const createInvoice = async (req, res, next) => {
  const lola = req.body;
  const query = "SELECT invoice_data($1, $2, $3)";
  //const values = [customer_id, quantityInCart, total_price];

  try {
    return res.json(req.body);
    /*
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }
    return res.json({ message: "success" });
    */
  } catch (error) {
    next(error);
  }
}

const getStores = async (req, res, next) => {
  const query = "SELECT * FROM store";

  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getStoresPhones = async (req, res, next) => {
  const query = "SELECT phone FROM store_phone INNER JOIN store ON store.nit = store_phone.nit";

  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
  deleteUser,
  getProducts,
  getProduct,
  buyProduct,
  createInvoice,
  getStores,
  getStoresPhones,
};
