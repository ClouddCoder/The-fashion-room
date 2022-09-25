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
    try {
      const response = await axios.get("http://localhost:3050/api/catalogue", {
        crossDomain: true,
      });
      const data = response.data;
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
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = response.data;
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
            "Authorization": `Bearer ${token}`,
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
   * Crea una factura nueva en la API
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

  const resetProductState = () => {
    dispatch({ type: TYPES.RESET_PRODUCT_STATE });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        totalProducts: state.totalProducts,
        totalPrice: state.totalPrice,
        wishlist: state.wishlist,
        temporaryWishlist: state.temporaryWishlist,
        invoiceId: state.invoiceId,
        addWish: state.addWish,
        loadProducts,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalProducts,
        getTotalPrice,
        getWishlist,
        handleWish,
        createInvoice,
        resetProductState,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

export default ProductState;
