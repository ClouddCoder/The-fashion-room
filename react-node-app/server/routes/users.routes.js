const { Router } = require("express");
const {
  loginUser,
  registerUser,
  deleteUser,
  getProducts,
  buyProduct,
  getStores,
} = require("../controllers/users.controllers");

const router = Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.delete("/delete/:id", deleteUser);

router.put("/cart", buyProduct);

router.get("/catalogue", getProducts);

router.get("/stores", getStores);

module.exports = router;
