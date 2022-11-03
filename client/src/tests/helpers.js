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

// AuthContext props for testing login component.
export const loginAuthContextProps = {
  setAuth: jest.fn(),
  setUserId: jest.fn(),
  setUser: jest.fn(),
  userEmail: "",
  setUserEmail: jest.fn(),
  userPassword: "",
  setUserPassword: jest.fn(),
  setToken: jest.fn(),
};

// AuthContext props for testing other components.
export const authContextProps = {
  auth: true,
  token: "token",
  user: "brayan",
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
    product_name: "Zapatos",
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

// ProductContext props for testing catalogue component.
export const productContextProps = {
  addToCart: jest.fn(),
  loadProducts: jest.fn(),
  getProduct: jest.fn(),
  clearListOfProductsToBuy: jest.fn(),
  products: mockProducts,
  temporaryWishlist: [],
};

// ProductContext props for testing Product component.
export const ProductProductContextProps = {
  getProduct: jest.fn(),
  clearListOfProductsToBuy: jest.fn(),
  products: mockProductVariants,
};

// ProductContext props for testing catalogue component
// when is adding a product to the cart or wishlist.
export const contextPropstToAddToCart = {
  addToCart: jest.fn(),
  loadProducts: jest.fn(),
  products: [mockProducts[0]],
  temporaryWishlist: [],
  addTemporaryWish: jest.fn(),
  removeTemporaryWish: jest.fn(),
};

export const mockStores = [
  { nit: 1, name: "Tienda 1", address: "Calle 1" },
  { nit: 2, name: "Tienda 2", address: "Calle 2" },
  { nit: 3, name: "Tienda 3", address: "Calle 3" },
];

export const mockStorePhone = [
  { nit: 1, phone: "123456789" },
  { nit: 2, phone: "987654321" },
  { nit: 3, phone: "547897884" },
];

// Renders login component
export function LoginTest() {
  return render(
    <AuthContext.Provider value={loginAuthContextProps}>
      <Router>
        <Login />
      </Router>
    </AuthContext.Provider>,
  );
}

// Renders catalogue component.
export function CatalogueTest(type = "catalogue") {
  let productProps;

  const setProps = () => {
    if (type === "catalogue") productProps = { ...productContextProps };
    else productProps = { ...contextPropstToAddToCart };
  };

  setProps();

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

// Renders contact component.
export function ContactTest() {
  return render(
    <AuthContext.Provider value={authContextProps}>
      <Router>
        <Contact />
      </Router>
    </AuthContext.Provider>,
  );
}

// Renders Home component.
export function HomeTest() {
  return render(
    <AuthContext.Provider value={authContextProps}>
      <Router>
        <Home />
      </Router>
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
      <Router>
        <Navbar />
      </Router>
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
      <ProductContext.Provider value={ProductProductContextProps}>
        <Router>
          <Product />
        </Router>
      </ProductContext.Provider>
    </AuthContext.Provider>,
  );
}
