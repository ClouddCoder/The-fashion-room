import { TYPES } from "../../actions/productActions";

export const productInitialState = {
  loader: true, // Loader to wait for data
  products: [],
  variants: [],
  variantId: 0,
  cart: [],
  wishlist: [], // Gets all the wishes from database
  totalProducts: 0,
  totalPrice: 0,
  invoiceId: 0,
  myOrders: [], // All user's purchases
  productsToBuy: [], // Products ready to buy
  shippingCost: 0,
};

/**
 * Funcion reductora que determina las acciones a realizar dependiendo del tipo de accion
 */
export function ProductReducer(state, action) {
  switch (action.type) {
    case TYPES.LOADER:
      return { ...state, loader: action.payload };

    case TYPES.LOAD_PRODUCTS:
      return { ...state, products: [...action.payload] };

    case TYPES.GET_VARIANTS:
      return { ...state, variants: [...action.payload] };

    case TYPES.SET_VARIANT_ID:
      return { ...state, variantId: action.payload };

    case TYPES.CLEAR_PRODUCTS_LIST:
      return { ...state, products: [] };

    case TYPES.TOTAL_SHIPPING_COST: {
      // First we get every product's shipping cost and then sum them.
      const allShippingCosts = state.productsToBuy.map((product) => product.shipping_cost);
      const total = allShippingCosts.reduce((a, b) => a + b);
      return { ...state, shippingCost: total };
    }

    case TYPES.ADD_TO_CART: {
      const newItem = state.variants.find((item) => item.variant_id === action.payload);
      const itemInCart = state.cart.find((item) => item.variant_id === newItem.variant_id);

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.variant_id === itemInCart.variant_id
                ? { ...item, quantity_to_purchase: item.quantity_to_purchase + 1 }
                : item,
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...newItem, quantity_to_purchase: 1 }],
          };
    }

    case TYPES.REMOVE_ONE_FROM_CART: {
      const itemToDelete = state.cart.find((item) => item.variant_id === action.payload);

      return itemToDelete.quantity_to_purchase > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.variant_id === itemToDelete.variant_id
                ? { ...item, quantity_to_purchase: item.quantity_to_purchase - 1 }
                : item,
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.variant_id !== action.payload),
          };
    }

    case TYPES.REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.variant_id !== action.payload),
      };
    }

    case TYPES.CLEAR_CART: {
      return { ...state, products: [], cart: [], totalProducts: 0, totalPrice: 0 };
    }

    case TYPES.GET_TOTAL_PRODUCTS: {
      const totalProducts = state.cart
        .map((product) => product.quantity_to_purchase)
        .reduce((a, b) => a + b, 0);

      return { ...state, totalProducts };
    }

    case TYPES.GET_TOTAL_PRICE: {
      const totalPrice = state.productsToBuy
        .map((product) => product.variant_price * product.quantity_to_purchase)
        .reduce((a, b) => a + b, 0);

      return { ...state, totalPrice };
    }

    case TYPES.GET_RESUME_TOTAL_PRICE: {
      const totalPrice = state.cart
        .map((product) => product.variant_price * product.quantity_to_purchase)
        .reduce((a, b) => a + b, 0);

      return { ...state, totalPrice };
    }

    case TYPES.GET_WISHLIST:
      return { ...state, wishlist: [...action.payload] };

    case TYPES.REMOVE_FROM_WISHLIST: {
      return {
        ...state,
        wishlist: state.wishlist.filter((wish) => wish.product_id !== action.payload),
      };
    }

    case TYPES.ADD_PRODUCT_TO_BUY: {
      const product = state.variants.find((variant) => variant.variant_id === action.payload);
      return {
        ...state,
        productsToBuy: [{ ...product, quantity_to_purchase: 1 }],
      };
    }

    case TYPES.BUY_CART: {
      return { ...state, productsToBuy: [...action.payload] };
    }

    case TYPES.CLEAR_LIST_OF_PRODUCTS_TO_BUY: {
      return { ...state, productsToBuy: [] };
    }

    case TYPES.GET_MY_ORDERS: {
      return { ...state, myOrders: [...action.payload] };
    }

    case TYPES.REMOVE_AN_ORDER: {
      return {
        ...state,
        myOrders: state.myOrders.filter((order) => order.order_item_id !== action.payload),
      };
    }

    case TYPES.CREATE_INVOICE: {
      return { ...state, invoiceId: action.payload };
    }

    case TYPES.RESET_PRODUCT_STATE:
      return { ...state, ...productInitialState };
    default:
      return state;
  }
}
