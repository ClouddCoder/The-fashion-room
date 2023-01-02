const { Router } = require("express");
const {
  loginUser,
  registerUser,
  getUserId,
  updateName,
  updateUsername,
  updateEmail,
  updatePassword,
  getPhone,
  setPhone,
  updatePhone,
} = require("../controllers/users.controllers");
const {
  getAllProducts,
  getProductVariants,
  buyProduct,
  setWishlist,
  getWishlist,
  createInvoice,
  getStores,
  getStoreAddress,
  getStorePhones,
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

router.put("/edit-name", updateName);

router.put("/edit-username", updateUsername);

router.put("/edit-email", updateEmail);

router.put("/edit-password", updatePassword);

router.get("/user-phone", getPhone);

router.post("/add-phone", setPhone);

router.put("/edit-phone", updatePhone);

router.put("/buy", buyProduct);

router.get("/catalogue", getAllProducts);

router.get("/product-variants", getProductVariants);

router.post("/set-wishlist", setWishlist);

router.get("/wishlist", getWishlist);

router.post("/invoice", createInvoice);

router.get("/stores", getStores);

router.get("/store/address", getStoreAddress);

router.get("/store/phones", getStorePhones);

router.get("/order-detail", getOrderDetail);

router.delete("/remove-order", removeOrderDetail);

module.exports = router;
