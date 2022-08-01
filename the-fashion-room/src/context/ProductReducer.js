import { TYPES } from "../actions/productActions";

export function ProductReducer(state, action) {
  switch (action.type) {
    case TYPES.LOAD_PRODUCTS:
      return { ...state, products: action.payload };
    case TYPES.ADD_TO_CART: {
      let newItem = state.products.find(item => item.product_id === action.payload);

      let itemInCart = state.cart.find(item => item.product_id === newItem.product_id);

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map(item =>
              item.product_id === newItem.product_id
                ? { ...item, quantityInCart: item.quantityInCart + 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...newItem, quantityInCart: 1 }],
          };
    }
    case TYPES.REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find(item => item.product_id === action.payload);

      return itemToDelete.quantityInCart > 1
        ? {
            ...state,
            cart: state.cart.map(item =>
              item.product_id === action.payload
                ? { ...item, quantityInCart: item.quantityInCart - 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter(item => item.product_id !== action.payload),
          };
    }
    case TYPES.REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter(item => item.product_id !== action.payload),
      };
    }
    case TYPES.CLEAR_CART: {
      return { products: [], cart: [] };
    }
    default:
      return state;
  }
}
