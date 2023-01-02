import instance from "./api";

const baseURL = "http://localhost:3050/api";

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
export function changeName(newName, token) {
  return instance.put(
    "/edit-name",
    { newName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
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
 * Updates the phone of the user
 */
export function editPhone(newPhone, currentPhoneId, token) {
  return instance.put(
    "/edit-phone",
    {
      newPhone,
      currentPhoneId,
    },
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
export function changeUsername(newUsername, token) {
  return instance.put(
    "/edit-username",
    { newUsername },
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
export function changeUserEmail(newEmail, token) {
  return instance.put(
    "/edit-email",
    { newEmail },
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
 * Modifies the user's address
 */
export function editUserAddress(
  name,
  department,
  city,
  neighborhood,
  streetType,
  street,
  number,
  token,
) {
  return instance.put(
    "/edit-address",
    {
      name,
      department,
      city,
      neighborhood,
      streetType,
      street,
      number,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
