const pool = require("../db");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM customer WHERE email = $1 AND password = $2";
  const values = [email, password];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Wrong email/password combination",
      });
    }
    return res.json({ message: "success" });
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
  const { quantity, productId } = req.body;
  const query = "UPDATE product SET quantity = quantity - $1 WHERE product_id = $2";
  const values = [quantity, productId];

  try {
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    return res.json({ message: "success" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
  deleteUser,
  getProducts,
  getProduct,
  buyProduct,
};
