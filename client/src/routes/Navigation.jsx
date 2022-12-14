import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductState from "../context/product-context/ProductState";
import Profile from "../pages/profile/Profile";
import MyData from "../pages/my-data/MyData";
import EditEmail from "../pages/edit-email/EditEmail";
import EditUserName from "../pages/edit-user-name/EditUserName";
import EditUsername from "../pages/edit-username/EditUsername";
import EditPhone from "../pages/edit-phone/EditPhone";
import Address from "../pages/address/Address";
import EditAddress from "../pages/edit-address/EditAddress";
import EditPassword from "../pages/edit-password/EditPassword";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Home from "../pages/home/Home";
import Catalogue from "../pages/catalogue/Catalogue";
import Product from "../pages/product/Product";
import ShoppingCart from "../pages/shopping-cart/ShoppingCart";
import Wishlist from "../pages/wishlist/Wishlist";
import Contact from "../pages/contact/Contact";
import Buy from "../pages/buy/Buy";
import Invoice from "../pages/invoice/Invoice";
import Orders from "../pages/orders/Orders";

/**
 * Componente que establece las rutas de la aplicacion
 */
function Navigation() {
  return (
    <ProductState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-data" element={<MyData />} />
          <Route path="/edit-email" element={<EditEmail />} />
          <Route path="/edit-user-name" element={<EditUserName />} />
          <Route path="/edit-username" element={<EditUsername />} />
          <Route path="/edit-phone" element={<EditPhone />} />
          <Route path="/address" element={<Address />} />
          <Route path="/edit-address" element={<EditAddress />} />
          <Route path="/edit-password" element={<EditPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/catalogue/:category" element={<Catalogue />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/buy" element={<Buy />} />
        </Routes>
      </Router>
    </ProductState>
  );
}

export default Navigation;
