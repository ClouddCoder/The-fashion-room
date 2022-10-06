/* eslint-disable no-use-before-define */
import React, { useReducer, useContext, useMemo } from "react";
import axios from "axios";
import AuthContext from "../auth-context/AuthContext";
import ProductContext from "./ProductContext";
import { productInitialState, ProductReducer } from "./productReducer";
import { TYPES } from "../../actions/productActions";

/**
 * Estado inicial de los productos
 */
function ProductState({ children }) {
  const [state, dispatch] = useReducer(ProductReducer, productInitialState);
  const { token } = useContext(AuthContext);

  /**
   * Obtiene los productos de la API
   */
  const loadProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3050/api/catalogue", {
        crossDomain: true,
      });
      const { data } = response;
      dispatch({ type: TYPES.LOAD_PRODUCTS, payload: data });
    } catch (error) {
      console.log(error);
    }
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
    try {
      const response = await axios.get("http://localhost:3050/api/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      dispatch({ type: TYPES.GET_WISHLIST, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Agrega o elimina un producto a la tabla wishlist de la base de datos.
   * Tambien actualiza el estado de wishlist.
   */
  const handleWish = async (product, remove = false) => {
    try {
      await axios.post(
        "http://localhost:3050/api/set-wishlist",
        {
          productId: product.product_id,
          remove,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (remove) {
        dispatch({ type: TYPES.REMOVE_FROM_WISHLIST, payload: product.product_id });
      }
    } catch (error) {
      return console.log(error);
    }
  };

  /**
   * Agrega un producto para ser commprado. En caso de que sea el carrito de compras
   * el paramtro sera un array de productos.
   */
  const addProductToBuy = (product, fromCart = false) => {
    if (fromCart) {
      dispatch({ type: TYPES.BUY_CART, payload: product });
    } else {
      dispatch({ type: TYPES.ADD_PRODUCT_TO_BUY, payload: product });
    }
  };

  /**
   * Limpia la lista de productos a comprar cuando el usuario salga de la pagina de compra.
   */
  const clearListOfProductsToBuy = () => {
    dispatch({ type: TYPES.CLEAR_LIST_OF_PRODUCTS_TO_BUY });
  };

  /**
   * Peticion a la API para obtener la informacion de las compras realizadas por el usuario.
   */
  const loadOrderDetail = async () => {
    try {
      const response = await axios.get("http://localhost:3050/api/order-detail", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      dispatch({ type: TYPES.GET_MY_ORDERS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Elimina una compra realizada por el usuario.
   */
  const removeOrder = async (product) => {
    try {
      axios.delete("http://localhost:3050/api/remove-order", {
        data: {
          detailId: product.detail_id,
        },

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: TYPES.REMOVE_AN_ORDER,
        payload: product.detail_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Peticion para crear una factura despues de que el usuario realice una compra.
   */
  const createInvoice = async (cart) => {
    try {
      const res = await fetch("http://localhost:3050/api/invoice", {
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
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Borra los datos de los productos guardados al cerrar sesion.
   */
  const resetProductState = () => {
    dispatch({ type: TYPES.RESET_PRODUCT_STATE });
  };

  const valueProps = useMemo(
    () => ({
      products: state.products,
      cart: state.cart,
      totalProducts: state.totalProducts,
      totalPrice: state.totalPrice,
      wishlist: state.wishlist,
      temporaryWishlist: state.temporaryWishlist,
      myOrders: state.myOrders,
      invoiceId: state.invoiceId,
      addWish: state.addWish,
      productsToBuy: state.productsToBuy,
      loadProducts,
      addToCart,
      removeFromCart,
      clearCart,
      getTotalProducts,
      getTotalPrice,
      getWishlist,
      handleWish,
      addProductToBuy,
      clearListOfProductsToBuy,
      loadOrderDetail,
      removeOrder,
      createInvoice,
      resetProductState,
    }),
    [
      state.products,
      state.cart,
      state.totalProducts,
      state.totalPrice,
      state.wishlist,
      state.temporaryWishlist,
      state.myOrders,
      state.invoiceId,
      state.addWish,
      state.productsToBuy,
      token,
    ],
  );

  return <ProductContext.Provider value={valueProps}>{children}</ProductContext.Provider>;
}

export default ProductState;
