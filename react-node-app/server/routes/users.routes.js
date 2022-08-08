const { Router } = require("express");
const {
  loginUser,
  registerUser,
  deleteUser,
  getProducts,
  buyProduct,
  createInvoice,
  getStores,
  getStoresPhones,
} = require("../controllers/users.controllers");

const router = Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.delete("/delete/:id", deleteUser);

router.put("/cart", buyProduct);

router.get("/catalogue", getProducts);

router.post("/invoice", createInvoice);

router.get("/stores", getStores);

router.get("/stores/phones", getStoresPhones);

module.exports = router;
