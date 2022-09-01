import React, { useContext, useEffect } from "react";
import AuthContext from "../context/auth-context/AuthContext";
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
  const { setAuth, setUserName, setUserId, setToken } = useContext(AuthContext);

  /*
  useEffect(() => {
    const loggedJSON = window.localStorage.getItem("logged");
    if (loggedJSON) {
      const user = JSON.parse(loggedJSON);
      setAuth(true);
      setToken(user.token);
      setUserId(user.id);
      setUserName(user.name);
    }
  }, []);
  */

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
