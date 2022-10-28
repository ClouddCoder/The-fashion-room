import { TYPES } from "../../actions/productActions";

export const productInitialState = {
  products: [],
  cart: [],
  wishlist: [], // Get all the wishes from database
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
    case TYPES.LOAD_PRODUCTS:
      return { ...state, products: [...action.payload] };

    case TYPES.GET_PRODUCT:
      return { ...state, products: [...state.products, ...action.payload] };

    case TYPES.CLEAR_PRODUCTS_LIST:
      return { ...state, products: [] };

    case TYPES.TOTAL_SHIPPING_COST: {
      // First we get every product's shipping cost and then sum them.
      const allShippingCosts = state.productsToBuy.map((product) => product[0].shipping_cost);
      const total = allShippingCosts.reduce((a, b) => a + b);
      return { ...state, shippingCost: total };
    }

    case TYPES.ADD_TO_CART: {
      const newItem = state.products.find((item) => item[0].variant_id === action.payload);
      const itemInCart = state.cart.find((item) => item[0].variant_id === newItem[0].variant_id);
      let itemModified;

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) => {
              itemModified = [...item];
              itemModified.splice(3, 1, {
                quantity_to_purchase: itemModified[3].quantity_to_purchase + 1,
              });
              return item[0]?.variant_id === newItem[0]?.variant_id ? itemModified : item;
            }),
          }
        : {
            ...state,
            cart: [...state.cart, [...newItem, { quantity_to_purchase: 1 }]],
          };
    }

    case TYPES.REMOVE_ONE_FROM_CART: {
      const itemToDelete = state.cart.find((item) => item[0].variant_id === action.payload);
      let itemModified;

      return itemToDelete[3].quantity_to_purchase > 1
        ? {
            ...state,
            cart: state.cart.map((item) => {
              itemModified = [...item];
              itemModified.splice(3, 1, {
                quantity_to_purchase: itemModified[3].quantity_to_purchase - 1,
              });
              return item[0]?.variant_id === itemToDelete[0]?.variant_id ? itemModified : item;
            }),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item[0].variant_id !== action.payload),
          };
    }

    case TYPES.REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item[0].variant_id !== action.payload),
      };
    }

    case TYPES.CLEAR_CART: {
      return { ...state, products: [], cart: [], totalProducts: 0, totalPrice: 0 };
    }

    case TYPES.GET_TOTAL_PRODUCTS: {
      const totalProducts = state.cart
        .map((product) => product[3].quantity_to_purchase)
        .reduce((a, b) => a + b, 0);

      return { ...state, totalProducts };
    }

    case TYPES.GET_TOTAL_PRICE: {
      const totalPrice = state.productsToBuy
        .map((product) => product[0].variant_price * product[3].quantity_to_purchase)
        .reduce((a, b) => a + b, 0);

      return { ...state, totalPrice };
    }

    case TYPES.GET_RESUME_TOTAL_PRICE: {
      const totalPrice = state.cart
        .map((product) => product[0].variant_price * product[3].quantity_to_purchase)
        .reduce((a, b) => a + b, 0);

      return { ...state, totalPrice };
    }

    case TYPES.GET_WISHLIST:
      return { ...state, wishlist: [...action.payload] };

    case TYPES.REMOVE_FROM_WISHLIST: {
      return {
        ...state,
        wishlist: state.wishlist.filter((wish) => wish.variant_id !== action.payload),
      };
    }

    case TYPES.ADD_PRODUCT_TO_BUY: {
      const product = state.products.find((item) => item[0].variant_id === action.payload);
      return {
        ...state,
        productsToBuy: [[...product, { quantity_to_purchase: 1 }]],
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
