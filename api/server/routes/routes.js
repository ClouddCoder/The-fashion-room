const { Router } = require("express");
const {
  loginUser,
  registerUser,
  updatePassword,
  getUserId,
} = require("../controllers/users.controllers");
const {
  getAllProducts,
  getProductVariants,
  buyProduct,
  setWishlist,
  getWishlist,
  createInvoice,
  getStores,
  getStoresPhones,
  getOrderDetail,
  removeOrderDetail,
} = require("../controllers/products.controllers");

const router = Router();

/**
 * Rutas del backend para cada peticion
 */
router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/user-id", getUserId);

router.put("/edit-password", updatePassword);

router.put("/buy", buyProduct);

router.get("/catalogue", getAllProducts);

router.get("/product-variants", getProductVariants);

router.post("/set-wishlist", setWishlist);

router.get("/wishlist", getWishlist);

router.post("/invoice", createInvoice);

router.get("/stores", getStores);

router.get("/stores/phones", getStoresPhones);

router.get("/order-detail", getOrderDetail);

router.delete("/remove-order", removeOrderDetail);

module.exports = router;
