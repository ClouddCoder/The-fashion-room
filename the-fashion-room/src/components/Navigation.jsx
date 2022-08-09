import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Catalogue from "../pages/Catalogue";
import ShoppingCart from "../pages/ShoppingCart";
import ProductState from "../context/product-context/ProductState";
import AuthState from "../context/auth-context/AuthState";
import Contact from "../pages/Contact";
import Invoice from "../pages/Invoice";
import Orders from "../pages/Orders";

function Navigation() {
  return (
    <>
      <AuthState>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<Orders />} />
            <Route
              path="/catalogue"
              element={
                <ProductState>
                  <Catalogue />
                </ProductState>
              }
            />
            <Route
              path="/cart"
              element={
                <ProductState>
                  <ShoppingCart />
                </ProductState>
              }
            />
            <Route
              path="/invoice"
              element={
                <ProductState>
                  <Invoice />
                </ProductState>
              }
            />
          </Routes>
        </Router>
      </AuthState>
    </>
  );
}

export default Navigation;
