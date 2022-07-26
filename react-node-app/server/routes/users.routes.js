const { Router } = require("express");
const {
  insertUser,
  getUser,
  deleteUser,
  updateUser,
  getProducts,
  getProduct,
  buyProduct,
} = require("../controllers/users.controllers");

const router = Router();

router.post("/users", getUser);

router.post("/insert", insertUser);

router.delete("/delete/:id", deleteUser);

router.put("/catalogue", buyProduct);

router.get("/catalogue", getProducts);

router.get("/product/:id", getProduct);

module.exports = router;
