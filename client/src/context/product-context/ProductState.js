/* eslint-disable no-use-before-define */
import { useReducer, useContext, useMemo } from "react";
import AuthContext from "../auth-context/AuthContext";
import ProductContext from "./ProductContext";
import {
  getProductsByCategory,
  getVariantsOfTheProduct,
  getUserWishlist,
  handleUserWish,
  getUserPurchases,
  removeUserPurchase,
  createUserInvoice,
} from "../../services/product";
import { productInitialState, ProductReducer } from "./productReducer";
import { TYPES } from "../../actions/productActions";

/**
 * Initial state.
 */
function ProductState({ children }) {
  const [state, dispatch] = useReducer(ProductReducer, productInitialState);
  const { token } = useContext(AuthContext);

  /**
   * Set to true to display de loader.
   */
  const setLoader = () => {
    dispatch({ type: TYPES.LOADER, payload: true });
  };

  /**
   * Changes all product names.
   */
  const getProductNameCapitalized = (products) => {
    products.forEach((product) => {
      const productName = product.product_name.replace("-", " ");
      const productNameCapitalized = productName.replace(
        productName[0],
        productName[0].toUpperCase(),
      );
      // eslint-disable-next-line no-param-reassign
      product.product_name = productNameCapitalized;
    });
  };

  /**
   * Gets all products from a category.
   */
  const loadProducts = async (category) => {
    try {
      const response = await getProductsByCategory(category);

      const { data } = response;
      getProductNameCapitalized(data);
      dispatch({ type: TYPES.LOAD_PRODUCTS, payload: data });
      dispatch({ type: TYPES.LOADER, payload: false });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Gets one product's variants information.
   */
  const getProductVariants = async (id) => {
    try {
      const response = await getVariantsOfTheProduct(id);

      const { data } = response;
      getProductNameCapitalized(data);
      dispatch({ type: TYPES.GET_VARIANTS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Stores the variant id that will come by the default with the product when is fetched.
   */
  const setVariantId = (variantId) => {
    dispatch({ type: TYPES.SET_VARIANT_ID, payload: parseInt(variantId, 10) });
  };

  /**
   * Clears the products list to avoid duplicates.
   */
  const clearProductsList = () => dispatch({ type: TYPES.CLEAR_PRODUCTS_LIST });

  /**
   * Gets the total shipping cost.
   */
  const getTotalShippingCost = () => {
    dispatch({ type: TYPES.TOTAL_SHIPPING_COST });
  };

  /**
   * Adds one product to the shopping cart list.
   */
  const addToCart = (id) => {
    dispatch({ type: TYPES.ADD_TO_CART, payload: id });
  };

  /**
   * Removes one or all products from the shopping cart list.
   */
  const removeFromCart = (id, all = false) => {
    if (all) {
      dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id });
    } else {
      dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
    }
    getTotalProducts();
    getTotalPrice(true);
  };

  /**
   * Cleans the shopping cart list.
   */
  const clearCart = () => {
    dispatch({ type: TYPES.CLEAR_CART });
  };

  /**
   * Gets the number of products inside the shopping cart.
   */
  const getTotalProducts = () => {
    dispatch({ type: TYPES.GET_TOTAL_PRODUCTS });
  };

  /**
   * Gets shopping cart's total price or
   * the total amount to pay.
   */
  const getTotalPrice = (resume = false) => {
    if (resume) dispatch({ type: TYPES.GET_RESUME_TOTAL_PRICE });
    else dispatch({ type: TYPES.GET_TOTAL_PRICE });
  };

  /**
   * Gets user's whislist.
   */
  const getWishlist = async () => {
    try {
      const response = await getUserWishlist(token);
      const { data } = response;
      getProductNameCapitalized(data);
      dispatch({ type: TYPES.GET_WISHLIST, payload: data });
      dispatch({ type: TYPES.LOADER, payload: false });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Adds or removes a product from the wishlist.
   */
  const handleWish = async (product, remove = false) => {
    try {
      await handleUserWish(token, product, remove);

      if (remove) {
        dispatch({ type: TYPES.REMOVE_FROM_WISHLIST, payload: product });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Inserts a product's variant to be purchased. If argument is the shopping cart,
   * it will be a list.
   */
  const addProductToBuy = (product, fromCart = false) => {
    if (fromCart) {
      dispatch({ type: TYPES.BUY_CART, payload: product });
    } else {
      dispatch({ type: TYPES.ADD_PRODUCT_TO_BUY, payload: product });
    }
  };

  /**
   * Cleans list of products to buy when the user leaves
   * the checkout page.
   */
  const clearListOfProductsToBuy = () => {
    dispatch({ type: TYPES.CLEAR_LIST_OF_PRODUCTS_TO_BUY });
  };

  /**
   * Gets the user's purchases.
   */
  const loadOrderDetail = async () => {
    try {
      const response = await getUserPurchases(token);
      const { data } = response;
      getProductNameCapitalized(data);
      dispatch({ type: TYPES.GET_MY_ORDERS, payload: data });
      dispatch({ type: TYPES.LOADER, payload: false });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Removes an order made by the user.
   */
  const removeOrder = async (product) => {
    try {
      await removeUserPurchase(token, product.order_item_id);

      dispatch({
        type: TYPES.REMOVE_AN_ORDER,
        payload: product.order_item_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Sets a new order after each purchase.
   */
  const createInvoice = async (productsToBuy) => {
    try {
      const res = await createUserInvoice(token, productsToBuy);
      const data = await res.json();

      if (res.ok) {
        dispatch({ type: TYPES.CREATE_INVOICE, payload: data.orderDetailId });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Removes the product data after user log out.
   */
  const resetProductState = () => {
    dispatch({ type: TYPES.RESET_PRODUCT_STATE });
  };

  const valueProps = useMemo(
    () => ({
      loader: state.loader,
      products: state.products,
      variants: state.variants,
      variantId: state.variantId,
      cart: state.cart,
      totalProducts: state.totalProducts,
      totalPrice: state.totalPrice,
      wishlist: state.wishlist,
      temporaryWishlist: state.temporaryWishlist,
      myOrders: state.myOrders,
      invoiceId: state.invoiceId,
      addWish: state.addWish,
      productsToBuy: state.productsToBuy,
      shippingCost: state.shippingCost,
      setLoader,
      loadProducts,
      getProductVariants,
      setVariantId,
      clearProductsList,
      getTotalShippingCost,
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
      state.loader,
      state.products,
      state.variants,
      state.variantId,
      state.cart,
      state.totalProducts,
      state.totalPrice,
      state.wishlist,
      state.temporaryWishlist,
      state.myOrders,
      state.invoiceId,
      state.addWish,
      state.productsToBuy,
      state.shippingCost,
      token,
    ],
  );

  return <ProductContext.Provider value={valueProps}>{children}</ProductContext.Provider>;
}

export default ProductState;
