import React, { useReducer, useContext } from "react";
import AuthContext from "../auth-context/AuthContext";
import ProductContext from "./ProductContext";
import { productInitialState, ProductReducer } from "./productReducer";
import axios from "axios";
import { TYPES } from "../../actions/productActions";

/**
 * Estado inicial de los productos
 */
function ProductState(props) {
  const [state, dispatch] = useReducer(ProductReducer, productInitialState);
  const { token } = useContext(AuthContext);

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
   * Retorna los productos del wishlist de un usuario
   */
  const getWishlist = async () => {
    const response = await axios.get("http://localhost:3050/api-server/wishlist", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.data;
    dispatch({ type: TYPES.GET_WISHLIST, payload: data });
  };

  /**
   * Crea una factura nueva en la API
   */
  const createInvoice = async (cart) => {
    const res = await fetch("http://localhost:3050/api-server/invoice", {
      method: "POST",
      body: JSON.stringify(cart),
      headers: new Headers({
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }),
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
        wishlist: state.wishlist,
        invoiceId: state.invoiceId,
        addWish: state.addWish,
        loadProducts,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalProducts,
        getTotalPrice,
        getWishlist,
        createInvoice,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

export default ProductState;
