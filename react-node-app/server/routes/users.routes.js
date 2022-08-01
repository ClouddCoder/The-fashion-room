const { Router } = require("express");
const {
  loginUser,
  registerUser,
  deleteUser,
  getProducts,
  buyProduct,
} = require("../controllers/users.controllers");

const router = Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.delete("/delete/:id", deleteUser);

router.put("/catalogue", buyProduct);

router.get("/catalogue", getProducts);

module.exports = router;
