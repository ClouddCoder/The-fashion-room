import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "../context/auth-context/AuthContext";
import ProductContext from "../context/product-context/ProductContext";
import Login from "../pages/login/Login";
import Catalogue from "../pages/catalogue/Catalogue";

// AuthContext props for testing login component
export const authContext = {
  setAuth: jest.fn(),
  setUserId: jest.fn(),
  setUser: jest.fn(),
  userEmail: "",
  setUserEmail: jest.fn((value) => value),
  userPassword: "",
  setUserPassword: jest.fn(),
  setToken: jest.fn(),
};

// products for testing catalogue component
export const mockProducts = [
  { product_id: "656589", product_name: "Blusa", price: "45000", stock: "100" },
  { product_id: "656804", product_name: "Camisa", price: "45000", stock: "100" },
  { product_id: "657019", product_name: "Corbata", price: "45000", stock: "100" },
  { product_id: "657234", product_name: "Pantalon", price: "45000", stock: "100" },
  { product_id: "657449", product_name: "Pantaloneta", price: "45000", stock: "100" },
  { product_id: "657664", product_name: "Zapatos", price: "45000", stock: "100" },
];

// AuthContext props for testing catalogue component
export const authContextProps = {
  auth: true,
  token: "token",
};

// ProductContext props for testing catalogue component when is rendering
export const productContextProps = {
  addToCart: jest.fn(),
  loadProducts: jest.fn(),
  products: mockProducts,
  temporaryWishlist: [],
};

// ProductContext props for testing catalogue component when is adding a product to the cart or wishlist
export const contextPropstToAddToCart = {
  addToCart: jest.fn(),
  loadProducts: jest.fn(),
  products: [mockProducts[0]],
  temporaryWishlist: [],
  addTemporaryWish: jest.fn(),
  removeTemporaryWish: jest.fn(),
};

// Render login component
export function LoginTest() {
  return render(
    <AuthContext.Provider value={authContext}>
      <Router>
        <Login />
      </Router>
    </AuthContext.Provider>,
  );
}

// Render catalogue component
export function CatalogueTest(type = "catalogue") {
  let productProps = {};

  type === "catalogue"
    ? (productProps = { ...productContextProps })
    : (productProps = { ...contextPropstToAddToCart });

  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productProps}>
        <Router>
          <Catalogue />
        </Router>
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}
