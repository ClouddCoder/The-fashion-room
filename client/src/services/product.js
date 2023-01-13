import instance, { baseURL } from "./api";

/**
 * Fetches all products from a given category
 */
export function getProductsByCategory(category) {
  return instance.get("/catalogue", {
    params: {
      category,
    },
  });
}

/**
 * Fetches all variants of a given product's id
 */
export function getVariantsOfTheProduct(id) {
  return instance.get("/product-variants", {
    params: {
      id,
    },
  });
}

/**
 * Fetches the user's wishlist
 */
export function getUserWishlist(token) {
  return instance.get("/wishlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Adds or removes a wish from the user's wishlist
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
 * Fetches the user's purchases
 */
export function getUserPurchases(token) {
  return instance.get("/order-detail", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Removes a purchase made by the user
 */
export function removeUserPurchase(token, orderDetailId) {
  return instance.delete("/remove-order", {
    data: {
      orderDetailId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Buys the products selected by the user
 */
export function makeThePurchase(token, productsToBuy) {
  return fetch(`${baseURL}/buy`, {
    method: "PUT",
    body: JSON.stringify(productsToBuy),
    headers: new Headers({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
  });
}

/**
 * Creates a new invoice after each purchase
 */
export function createUserInvoice(token, productsToBuy) {
  return fetch(`${baseURL}/invoice`, {
    method: "POST",
    body: JSON.stringify(productsToBuy),
    headers: new Headers({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
  });
}
