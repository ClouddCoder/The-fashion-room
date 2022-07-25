const pool = require('../db');

const getUser = async (req, res, next) => {
    const {username, password} = req.body;
    const query = "SELECT * FROM login WHERE username = $1 AND password = $2";
    const values = [username, password];

    try {
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Wrong username/password combination'
            });
        }
        return res.json({message: "success"});
    } catch (error) {
        next(error);
    }
}

const insertUser = async (req, res, next) => {
    const {username, password} = req.body;
    const query = "INSERT INTO login (username, password) VALUES ($1, $2) RETURNING *";
    const values = [username, password];

    try {
        const result = await pool.query(query, values);
        return res.json({message: "success"});
    } catch(error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    const {id} = req.params;
    const query = "DELETE FROM login WHERE user_id = $1";
    const values = [id];

    try {
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
                return res.status(404).json({
                message: 'User not found'
            });
        }
        return res.sendStatus(204);
    } catch(error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    const {id} = req.params;
    const {username, password} = req.body;
    const query = "UPDATE login SET username = $1, password = $2 WHERE user_id = $3 RETURNING *";
    const values = [username, password, id];

    try {
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        return res.json(result.rows);
    } catch(error) {
        next(error);
    }
}

const getProducts = async (req, res, next) => {
    const query = "SELECT * FROM products";

    try {
        const result = await pool.query(query);
        res.json(result.rows);
    } catch(error) {
        next(error);
    }
}

const buyProduct = async (req, res, next) => {
    //const {id} = req.params;
    const {quantity, product_id} = req.body;
    const query = "UPDATE products SET quantity = quantity - $1 WHERE product_id = $2";
    const values = [quantity, product_id];

    try {
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        return res.json({message: "success"});
    } catch(error) {
        next(error);
    }

}

module.exports = {
    getUser,
    insertUser,
    deleteUser,
    updateUser,
    getProducts,
    buyProduct
}