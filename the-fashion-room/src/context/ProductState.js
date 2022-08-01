import React, { useReducer } from "react";
import ProductContext from "./ProductContext";
import { ProductReducer } from "./ProductReducer";
import axios from "axios";
import { TYPES } from "../actions/productActions";

const ProductState = props => {
  const productInitialState = {
    products: [],
    cart: [],
  };

  const [state, dispatch] = useReducer(ProductReducer, productInitialState);

  const loadProducts = async () => {
    const response = await axios.get("http://localhost:3001/catalogue", { crossDomain: true });
    const data = await response.data;
    dispatch({ type: TYPES.LOAD_PRODUCTS, payload: data });
  };

  const addToCart = id => {
    dispatch({ type: TYPES.ADD_TO_CART, payload: id });
  };

  const removeFromCart = (id, all = false) => {
    if (all) {
      dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id });
    } else {
      dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
    }
  };

  const clearCart = () => {
    dispatch({ type: TYPES.CLEAR_CART });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        loadProducts,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
