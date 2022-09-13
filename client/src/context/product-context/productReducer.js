import { TYPES } from "../../actions/productActions";

export const productInitialState = {
  products: [],
  cart: [],
  wishlist: [], // Get all the wishes sending a request to the api
  temporaryWishlist: [], // Add every wish instantly without send a request to the api
  totalProducts: 0,
  totalPrice: 0,
  invoiceId: 0,
};

/**
 * Funcion reductora que determina las acciones a realizar dependiendo del tipo de accion
 */
export function ProductReducer(state, action) {
  switch (action.type) {
    case TYPES.LOAD_PRODUCTS:
      return { ...state, products: [...action.payload] };

    case TYPES.ADD_TO_CART: {
      let newItem = state.products.find((item) => item.product_id === action.payload);
      let itemInCart = state.cart.find((item) => item.product_id === newItem.product_id);

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.product_id === newItem.product_id
                ? { ...item, quantityInCart: item.quantityInCart + 1 }
                : item,
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...newItem, quantityInCart: 1 }],
          };
    }

    case TYPES.REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find((item) => item.product_id === action.payload);

      return itemToDelete.quantityInCart > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.product_id === action.payload
                ? { ...item, quantityInCart: item.quantityInCart - 1 }
                : item,
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.product_id !== action.payload),
          };
    }

    case TYPES.REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.product_id !== action.payload),
      };
    }

    case TYPES.CLEAR_CART: {
      return { ...state, products: [], cart: [], totalProducts: 0, totalPrice: 0 };
    }

    case TYPES.GET_TOTAL_PRODUCTS: {
      let totalProducts = state.cart
        .map((product) => product.quantityInCart)
        .reduce((a, b) => a + b, 0);

      return { ...state, totalProducts };
    }

    case TYPES.GET_TOTAL_PRICE: {
      let totalPrice = state.cart
        .map((product) => product.price * product.quantityInCart)
        .reduce((a, b) => a + b, 0);

      return { ...state, totalPrice };
    }

    case TYPES.ADD_TEMPORARY_WISH: {
      return { ...state, temporaryWishlist: [...state.temporaryWishlist, action.payload] };
    }

    case TYPES.REMOVE_TEMPORARY_WISH: {
      return {
        ...state,
        temporaryWishlist: state.temporaryWishlist.filter(
          (wish) => wish.product_id !== action.payload,
        ),
      };
    }

    case TYPES.GET_WISHLIST:
      return { ...state, wishlist: [...action.payload] };

    case TYPES.CREATE_INVOICE: {
      return { ...state, invoiceId: action.payload };
    }
    default:
      return state;
  }
}
