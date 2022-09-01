import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ProductContext from "../context/product-context/ProductContext";
import AuthContext from "../context/auth-context/AuthContext";
import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import Catalogue from "../pages/catalogue/Catalogue";

const mockAddToCart = jest.fn();
const product = {
  product_id: 1,
  product_name: "Zapatos",
  price: 50000,
  stock: 100,
};

const products = () => product;

test("Render catalogue", () => {
  const propsAuthContext = {
    auth: true,
  };

  const propsProductContext = {
    addToCart: mockAddToCart,
    loadProducts: jest.fn(),
    products: [],
  };

  jest.spyOn(React, "useEffect").mockImplementation((f) => f());
  render(
    <AuthContext.Provider value={{ propsAuthContext }}>
      <ProductContext.Provider value={{ propsProductContext }}>
        <Router>
          <Catalogue />
        </Router>
      </ProductContext.Provider>
      ,
    </AuthContext.Provider>,
  );
  expect(screen.getByText("Zapatos")).toBeInTheDocument();
});
