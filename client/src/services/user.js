import instance, { baseURL } from "./api";

/**
 * Requests the API to log in the user
 */
export function loginUser(userEmail, userPassword) {
  return fetch(`${baseURL}/login`, {
    method: "POST",
    body: JSON.stringify({ userEmail, userPassword }),
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Requests the API to register the user
 */
export function registerUser(userName, userLastname, userEmail, userPassword) {
  return fetch(`${baseURL}/register`, {
    method: "POST",
    body: JSON.stringify({
      userName,
      userLastname,
      userEmail,
      userPassword,
    }),
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}

/**
 * Fetches the user's id given the email
 */
export function getUserId(email) {
  return instance.get("/user-id", {
    params: {
      email,
    },
  });
}

/**
 * Updates the name of the user
 */
export function changeName({ input, secondInput }, token) {
  return instance.put(
    "/edit-name",
    {
      input,
      secondInput,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

/**
 * Updates the email of the user
 */
export function changeUserEmail({ input }, token) {
  return instance.put(
    "/edit-email",
    { input },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

/**
 * Updates the username of the user
 */
export function changeUsername({ input }, token) {
  return instance.put(
    "/edit-username",
    { input },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

/**
 * Updates the password of the user
 */
export function changeUserPassword(userId, currentPassword, newPassword) {
  return instance.put("/edit-password", {
    userId,
    currentPassword,
    newPassword,
  });
}

/**
 * Gets all the phones that the user has
 */
export function getPhone(token) {
  return instance.get("/user-phone", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Adds a new phone to the user
 */
export function setPhone(newPhone, token) {
  return instance.post(
    "/add-phone",
    { newPhone },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

/**
 * Deletes the phone of the user
 */
export function deletePhone(phoneId, token) {
  return instance.delete("/delete-phone", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      phoneId,
    },
  });
}

/**
 * Gets all the user's address
 */
export function getAddress(token) {
  return instance.get("/user-address", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Gest a single address to update it
 */
export function getSingleAddress(addressId, token) {
  return instance.get("/single-address", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      addressId,
    },
  });
}

/**
 * Adds a new address to the user
 */
export function setAddress(
  department,
  city,
  neighborhood,
  streetType,
  street,
  streetNumber,
  references,
  token,
) {
  return instance.post(
    "/add-address",
    { department, city, neighborhood, streetType, street, streetNumber, references },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

/**
 * Updates the address of the user
 */
export function updateAddress(
  addressId,
  token,
  department,
  city,
  neighborhood,
  streetType,
  street,
  streetNumber,
  references,
) {
  return instance.put(
    "/update-address",
    { addressId, department, city, neighborhood, streetType, street, streetNumber, references },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

/**
 * Deletes the address of the user
 */
export function deleteAddress(addressId, token) {
  return instance.delete("/delete-phone", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      addressId,
    },
  });
}
