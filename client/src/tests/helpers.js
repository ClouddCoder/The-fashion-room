import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "../context/auth-context/AuthContext";
import ProductContext from "../context/product-context/ProductContext";
import Login from "../pages/login/Login";
import Catalogue from "../pages/catalogue/Catalogue";
import Contact from "../pages/contact/Contact";
import Home from "../pages/home/Home";
import Invoice from "../pages/invoice/Invoice";
import Navbar from "../commons/navbar/Navbar";
import Footer from "../commons/footer/Footer";
import Product from "../pages/product/Product";

// AuthContext props for testing components.
export const authContextProps = {
  auth: true,
  setAuth: jest.fn(),
  userId: 1,
  setUserId: jest.fn(),
  user: "user",
  setUser: jest.fn(),
  userName: "user",
  setUserName: jest.fn(),
  userLastname: "user",
  setUserLastname: jest.fn(),
  userEmail: "user@user.com",
  setUserEmail: jest.fn(),
  userPassword: "1234",
  setUserPassword: jest.fn(),
  token: "1234",
  setToken: jest.fn(),
};

// products for testing catalogue component.
export const mockProducts = [
  { product_id: "656589", product_name: "Blusa", product_price: "45000", product_stock: "100" },
  { product_id: "656804", product_name: "Camisa", product_price: "45000", product_stock: "100" },
  {
    product_id: "657019",
    product_name: "Corbata",
    product_price: "45000",
    product_stock: "100",
  },
  {
    product_id: "657234",
    product_name: "Pantalon",
    product_price: "45000",
    product_stock: "100",
  },
  {
    product_id: "657449",
    product_name: "Pantaloneta",
    product_price: "45000",
    product_stock: "100",
  },
  {
    product_id: "657664",
    product_name: "tenis-colegial",
    product_price: "45000",
    product_stock: "100",
  },
];

// product' variants for testing product component.
export const mockProductVariants = [
  {
    color_value: "negro",
  },
];

// ProductContext props for testing components.
export const productContextProps = {
  addToCart: jest.fn(),
  loadProducts: jest.fn(),
  getProduct: jest.fn(),
  clearListOfProductsToBuy: jest.fn(),
  products: mockProducts,
  wishlist: [],
  getWishlist: jest.fn(),
  handleWish: jest.fn(),
  resetProductState: jest.fn(),
};

// ProductContext props for testing Product component.
export const productProductContextProps = {
  addToCart: jest.fn(),
  loadProducts: jest.fn(),
  getProduct: jest.fn(),
  clearListOfProductsToBuy: jest.fn(),
  products: mockProductVariants,
  wishlist: [],
  getWishlist: jest.fn(),
  resetProductState: jest.fn(),
};

export const mockStores = [
  { store_nit: 1, store_name: "Tienda 1", store_address: "Calle 1" },
  { store_nit: 2, store_name: "Tienda 2", store_address: "Calle 2" },
  { store_nit: 3, store_name: "Tienda 3", store_address: "Calle 3" },
];

export const mockStorePhone = [
  [
    { store_nit: 1, phone: "123456789" },
    { store_nit: 2, phone: "987654321" },
    { store_nit: 3, phone: "547897884" },
  ],
];

// Renders login component
export function LoginTest() {
  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productContextProps}>
        <Router>
          <Login />
        </Router>
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}

// Renders catalogue component.
export function CatalogueTest() {
  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productContextProps}>
        <Router>
          <Catalogue />
        </Router>
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}

// Renders contact component.
export function ContactTest() {
  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productContextProps}>
        <Router>
          <Contact />
        </Router>
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}

// Renders Home component.
export function HomeTest() {
  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productContextProps}>
        <Router>
          <Home />
        </Router>
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}

export const productProps = {
  cart: mockProducts,
  totalPrice: 45000,
  clearCart: jest.fn(),
  invoiceId: 1,
};

// Renders Invoice component.
export function InvoiceTest() {
  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productProps}>
        <Router>
          <Invoice />
        </Router>
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}

// Renders Navbar component.
export function NavbarTest() {
  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productContextProps}>
        <Router>
          <Navbar />
        </Router>
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}

// Renders Footer component.
export function FooterTest() {
  return render(
    <AuthContext.Provider value={authContextProps}>
      <Router>
        <Footer />
      </Router>
    </AuthContext.Provider>,
  );
}

// Renders Product component.
export function ProductTest() {
  return render(
    <AuthContext.Provider value={authContextProps}>
      <ProductContext.Provider value={productProductContextProps}>
        <Router>
          <Product />
        </Router>
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}
