import instance from "./api";

/**
 * Fetches the store's information
 */
export function getStoreInformation() {
  return instance.get("/stores");
}

/**
 * Fetches the store's address
 */
export function getStoreAddress(storeNit) {
  return instance.get("/store/address", {
    params: {
      storeNit,
    },
  });
}

/**
 * Fetches the store's phones
 */
export function getStorePhones(storeNit) {
  return instance.get("/store/phones", {
    params: {
      storeNit,
    },
  });
}
