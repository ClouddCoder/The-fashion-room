import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Catalogue from "../pages/Catalogue";
import ShoppingCart from "../pages/ShoppingCart";
import ProductState from "../context/ProductState";
import About from "../pages/About";

function HomepageNav() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/catalogue"
            element={
              <ProductState>
                <Catalogue />
              </ProductState>
            }
          />
          <Route
            path="/cart/"
            element={
              <ProductState>
                <ShoppingCart />
              </ProductState>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default HomepageNav;
