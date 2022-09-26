import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductState from "../context/product-context/ProductState";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Home from "../pages/home/Home";
import Catalogue from "../pages/catalogue/Catalogue";
import Product from "../pages/product/Product";
import ShoppingCart from "../pages/shopping-cart/ShoppingCart";
import Wishlist from "../pages/wishlist/Wishlist";
import Contact from "../pages/contact/Contact";
import Invoice from "../pages/invoice/Invoice";
import Orders from "../pages/orders/Orders";

/**
 * Componente que establece las rutas de la aplicacion
 */
function Navigation() {
  return (
    <>
      <ProductState>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/invoice" element={<Invoice />} />
          </Routes>
        </Router>
      </ProductState>
    </>
  );
}

export default Navigation;
