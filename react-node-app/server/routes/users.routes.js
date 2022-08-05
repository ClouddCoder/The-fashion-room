const { Router } = require("express");
const {
  loginUser,
  registerUser,
  deleteUser,
  getProducts,
  buyProduct,
  getStores,
  getStoresPhones,
} = require("../controllers/users.controllers");

const router = Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.delete("/delete/:id", deleteUser);

router.put("/cart", buyProduct);

router.get("/catalogue", getProducts);

router.get("/stores", getStores);

router.get("/stores/phones", getStoresPhones);

module.exports = router;
