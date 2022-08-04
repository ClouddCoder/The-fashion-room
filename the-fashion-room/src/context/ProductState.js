import React, { useReducer } from "react";
import ProductContext from "./ProductContext";
import { ProductReducer } from "./ProductReducer";
import axios from "axios";
import { TYPES } from "../actions/productActions";

const ProductState = props => {
  const productInitialState = {
    products: [],
    cart: [],
    totalProducts: 0,
    totalPrice: 0,
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

  const getTotalProducts = () => {
    dispatch({ type: TYPES.GET_TOTAL_PRODUCTS });
  };

  const getTotalPrice = () => {
    dispatch({ type: TYPES.GET_TOTAL_PRICE });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        totalProducts: state.totalProducts,
        totalPrice: state.totalPrice,
        loadProducts,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalProducts,
        getTotalPrice,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
