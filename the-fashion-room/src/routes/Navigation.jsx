import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductState from "../context/product-context/ProductState";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Home from "../pages/home/Home";
import Catalogue from "../pages/catalogue/Catalogue";
import ShoppingCart from "../pages/shopping-cart/ShoppingCart";
import Contact from "../pages/contact/Contact";
import Invoice from "../pages/invoice/Invoice";
import Orders from "../pages/orders/Orders";

/**
 * Componente que establece las rutas de la aplicacion
 */
function Navigation() {
  return (
    <>
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
    </>
  );
}

export default Navigation;
