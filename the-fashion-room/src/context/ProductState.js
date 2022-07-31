import React, { useReducer } from "react";
import ProductContext from "./ProductContext";
import { ProductReducer } from "./ProductReducer";
import axios from "axios";
import { TYPES } from "../actions/productActions";

const ProductState = (props) => {
  const productInitialState = {
    products: [],
    cart: [],
  };

  const [state, dispatch] = useReducer(ProductReducer, productInitialState);

  const loadProducts = async () => {
    const response = await axios.get("http://localhost:3001/catalogue");
    const data = await response.data;
    dispatch({ type: "success", payload: data, response: "Productos cargados" });
  };

  const addToCart = (id) => {
    console.log(id);
    dispatch({ type: TYPES.ADD_TO_CART, payload: id });
  };

  const clearCart = () => {};

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        loadProducts,
        addToCart,
        clearCart,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
