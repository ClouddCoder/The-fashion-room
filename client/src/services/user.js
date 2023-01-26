import instance, { baseURL } from "./api";

/**
 * Requests the API to log in the user.
 * @param {string} userEmail
 * @param {string} userPassword
 * @returns {function} - The function that posts the user's data.
 */
export function loginUser(userEmail, userPassword) {
  return fetch(`${baseURL}/login`, {
    method: "POST",
    body: JSON.stringify({ userEmail, userPassword }),
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Requests the API to register the user.
 * @param {string} userName
 * @param {string} userLastname
 * @param {string} userEmail
 * @param {string} userPassword
 * @returns {function} - The function that posts the user's data.
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
 * Fetches the user's id given the email.
 * @param {string} email
 * @returns {function} - The function that fetches the user's id.
 */
export function getUserId(email) {
  return instance.get("/user-id", {
    params: {
      email,
    },
  });
}

/**
 * Fetches the user's full name.
 * @param {string} token - The token of the user.
 * @returns {function} - The function that fetches the user's full name.
 */
export function getUserFullName(token) {
  return instance.get("/user-full-name", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Updates the full name of the user.
 * @param {object} {input, secondInput} - New name and lastname of the user.
 * @param {string} token - The token of the user.
 * @returns {function} - The function that updates the user's name.
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
 * Updates the email of the user.
 * @param {object} {input} - New email of the user.
 * @param {*} token
 * @returns {function} - The function that updates the user's email.
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
 * Fetches the user's username.
 * @param {string} token - The token of the user.
 * @returns {function} - The function that fetches the user's username.
 */
export function getUsername(token) {
  return instance.get("/username", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Updates the username of the user.
 * @param {object} {input} - New username of the user.
 * @param {*} token - The token of the user.
 * @returns {function} - The function that updates the user's username.
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
 * Updates the password of the user.
 * @param {number} userId
 * @param {string} currentPassword
 * @param {string} newPassword
 * @returns {function} - The function that updates the user's password.
 */
export function changeUserPassword(userId, currentPassword, newPassword) {
  return instance.put("/edit-password", {
    userId,
    currentPassword,
    newPassword,
  });
}

/**
 * Gets all the phones that the user has.
 * @param {string} token
 * @returns {function} - The function that fetches the user's phones.
 */
export function getPhone(token) {
  return instance.get("/user-phone", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Adds a new phone to the user.
 * @param {string} newPhone
 * @param {string} token
 * @returns {function} - The function that adds the user's new phone.
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
 * Deletes the phone of the user.
 * @param {number} phoneId
 * @param {string} token
 * @returns {function} - The function that deletes the user's phone.
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
 * Gets all the user's address.
 * @param {string} token
 * @returns {function} - The function that fetches the user's addresses.
 */
export function getAddress(token) {
  return instance.get("/user-address", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Gest a single address to update it.
 * @param {number} addressId
 * @param {string} token
 * @returns {function} - The function that gets the user's address.
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
 * Adds a new address to the user.
 * @param {string} department
 * @param {string} city
 * @param {string} neighborhood
 * @param {string} streetType
 * @param {string} street
 * @param {string} streetNumber
 * @param {string} references
 * @param {string} token
 * @returns {function} - The function that adds the user's new address.
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
 * Updates the address of the user.
 * @param {number} addressId
 * @param {string} token
 * @param {string} department
 * @param {string} city
 * @param {string} neighborhood
 * @param {string} streetType
 * @param {string} street
 * @param {string} streetNumber
 * @param {string} references
 * @returns {function} - The function that updates the user's address.
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
 * Deletes the address of the user.
 * @param {number} addressId
 * @param {string} token
 * @returns {function} - The function that deletes the user's address.
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
