import instance from "./api";

/**
 * Fetches the store's information.
 * @returns {function} - The function that fetches the store's information.
 */
export function getStoreInformation() {
  return instance.get("/stores");
}

/**
 * Fetches the store's address.
 * @param {number} storeNit
 * @returns {function} - The function that fetches the store's address.
 */
export function getStoreAddress(storeNit) {
  return instance.get("/store/address", {
    params: {
      storeNit,
    },
  });
}

/**
 * Fetches the store's phones.
 * @param {number} storeNit
 * @returns {function} - The function that fetches the store's phones.
 */
export function getStorePhones(storeNit) {
  return instance.get("/store/phones", {
    params: {
      storeNit,
    },
  });
}
