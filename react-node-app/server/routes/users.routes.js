const { Router } = require("express");
const {
  loginUser,
  registerUser,
  getProducts,
  buyProduct,
  createInvoice,
  getStores,
  getStoresPhones,
  getOrderDetail,
} = require("../controllers/users.controllers");

const router = Router();

/**
 * Rutas del backend para cada peticion
 */
router.post("/login", loginUser);

router.post("/register", registerUser);

router.put("/cart", buyProduct);

router.get("/catalogue", getProducts);

router.post("/invoice", createInvoice);

router.get("/stores", getStores);

router.get("/stores/phones", getStoresPhones);

router.get("/order-detail", getOrderDetail);

module.exports = router;
