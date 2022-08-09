const { Router } = require("express");
const {
  loginUser,
  registerUser,
  getProducts,
  buyProduct,
  createInvoice,
  getStores,
  getStoresPhones,
  getOrders,
} = require("../controllers/users.controllers");

const router = Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.put("/cart", buyProduct);

router.get("/catalogue", getProducts);

router.post("/invoice", createInvoice);

router.get("/stores", getStores);

router.get("/stores/phones", getStoresPhones);

router.post("/orders", getOrders);

module.exports = router;
