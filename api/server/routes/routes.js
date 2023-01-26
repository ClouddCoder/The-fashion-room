const { Router } = require("express");
const {
  loginUser,
  registerUser,
  getUserId,
  getUserFullName,
  updateName,
  getUsername,
  updateUsername,
  updateEmail,
  updatePassword,
  getPhone,
  setPhone,
  deletePhone,
  getAddress,
  getSingleAddress,
  setAddress,
  updateAddress,
  deleteAddress,
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
} = require("../controllers/products.controllers");

const router = Router();

/**
 * Rutas del backend para cada peticion
 */
router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/user-id", getUserId);

router.get("/user-full-name", getUserFullName);

router.put("/edit-name", updateName);

router.get("/username", getUsername);

router.put("/edit-username", updateUsername);

router.put("/edit-email", updateEmail);

router.put("/edit-password", updatePassword);

router.get("/user-phone", getPhone);

router.post("/add-phone", setPhone);

router.delete("/delete-phone", deletePhone);

router.get("/user-address", getAddress);

router.get("/single-address", getSingleAddress);

router.post("/add-address", setAddress);

router.put("/update-address", updateAddress);

router.delete("/delete-address", deleteAddress);

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

module.exports = router;
