import React, { useReducer } from "react";
import ProductContext from "./ProductContext";
import { ProductReducer } from "./ProductReducer";
import axios from "axios";
import { TYPES } from "../../actions/productActions";

/**
 * Estado inicial de los productos
 */
function ProductState(props) {
  const productInitialState = {
    products: [],
    cart: [],
    totalProducts: 0,
    totalPrice: 0,
    invoiceId: 0,
  };

  const [state, dispatch] = useReducer(ProductReducer, productInitialState);

  /**
   * Obtiene los productos de la API
   */
  const loadProducts = async () => {
    const response = await axios.get("http://localhost:3050/api-server/catalogue", {
      crossDomain: true,
    });
    const data = await response.data;
    dispatch({ type: TYPES.LOAD_PRODUCTS, payload: data });
  };

  /**
   * Agrega un producto al carrito de compras
   */
  const addToCart = (id) => {
    dispatch({ type: TYPES.ADD_TO_CART, payload: id });
  };

  /**
   * Elimina un producto del carrito de compras
   */
  const removeFromCart = (id, all = false) => {
    if (all) {
      dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id });
    } else {
      dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
    }
    getTotalProducts();
    getTotalPrice();
  };

  /**
   * Limpia el carrito de compras
   */
  const clearCart = () => {
    dispatch({ type: TYPES.CLEAR_CART });
  };

  /**
   * Obtiene el total de productos en el carrito de compras
   */
  const getTotalProducts = () => {
    dispatch({ type: TYPES.GET_TOTAL_PRODUCTS });
  };

  /**
   * Obtiene el total de precio en el carrito de compras
   */
  const getTotalPrice = () => {
    dispatch({ type: TYPES.GET_TOTAL_PRICE });
  };

  /**
   * Crea una factura nueva en la API
   */
  const createInvoice = async (userId, cart) => {
    const res = await fetch("http://localhost:3050/api-server/invoice", {
      method: "POST",
      body: JSON.stringify({ userId, cart }),
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
    const data = await res.json();
    dispatch({ type: TYPES.CREATE_INVOICE, payload: data.invoiceId });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        totalProducts: state.totalProducts,
        totalPrice: state.totalPrice,
        invoiceId: state.invoiceId,
        loadProducts,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalProducts,
        getTotalPrice,
        createInvoice,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

export default ProductState;
