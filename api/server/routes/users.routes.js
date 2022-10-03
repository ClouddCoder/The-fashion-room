const { Router } = require("express");
const {
  loginUser,
  registerUser,
  getProducts,
  buyProduct,
  setWishlist,
  getWishlist,
  createInvoice,
  getStores,
  getStoresPhones,
  getOrderDetail,
  removeOrderDetail,
} = require("../controllers/users.controllers");

const router = Router();

/**
 * Rutas del backend para cada peticion
 */
router.post("/login", loginUser);

router.post("/register", registerUser);

router.put("/cart", buyProduct);

router.get("/catalogue", getProducts);

router.post("/set-wishlist", setWishlist);

router.get("/wishlist", getWishlist);

router.post("/invoice", createInvoice);

router.get("/stores", getStores);

router.get("/stores/phones", getStoresPhones);

router.get("/order-detail", getOrderDetail);

router.put("/remove-order", removeOrderDetail);

module.exports = router;
