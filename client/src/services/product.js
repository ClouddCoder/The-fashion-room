import instance, { baseURL } from "./api";

/**
 * Fetches all products given a category.
 * @param {string} category - The category of the products to fetch.
 * @returns {Promise} - The products.
 */
export function getProductsByCategory(category) {
  return instance.get("/catalogue", {
    params: {
      category,
    },
  });
}

/**
 * Fetches all variants given the product's id.
 * @param {number} id - The product's id.
 * @returns {Promise} - The variants.
 */
export function getVariantsOfTheProduct(id) {
  return instance.get("/product-variants", {
    params: {
      id,
    },
  });
}

/**
 * Fetches the user's wishlist.
 * @param {string} token - The user's token.
 * @returns {Promise} - The wishlist.
 */
export function getUserWishlist(token) {
  return instance.get("/wishlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Adds a product to the user's wishlist.
 * @param {string} token - The user's token.
 * @param {number} productId - The product's id.
 * @param {boolean} remove - Whether to remove the product from the wishlist.
 * @returns {Promise} - Message if succeeded or failed.
 */
export function handleUserWish(token, productId, remove = false) {
  return instance.post(
    "/set-wishlist",
    {
      productId,
      remove,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

/**
 * Fetches the user's purchases.
 * @param {string} token - The user's token.
 * @returns {Promise} - The purchases.
 */
export function getUserPurchases(token) {
  return instance.get("/order-detail", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Buys the products selected by the user.
 * @param {string} token - The user's token.
 * @param {Array} productsToBuy - The products to buy.
 * @returns {Promise} - Message if succeeded or failed.
 */
export function makeThePurchase(token, productsToBuy) {
  return fetch(`${baseURL}/buy`, {
    method: "PUT",
    body: JSON.stringify(productsToBuy),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
  });
}

/**
 * Creates a new invoice after each purchase.
 * @param {string} token - The user's token.
 * @param {Array} productsToBuy - The products to buy.
 * @returns {Promise} - Message if succeeded or failed.
 */
export function createUserInvoice(token, productsToBuy) {
  return fetch(`${baseURL}/invoice`, {
    method: "POST",
    body: JSON.stringify(productsToBuy),
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
  });
}
