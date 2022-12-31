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
 * Requests the API to get the username of the user
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
 * Requests the API to change the user's email
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
 * Requests the API to change the user's password
 */
export function changeUserPassword(userId, currentPassword, newPassword) {
  return instance.put("/edit-password", {
    userId,
    currentPassword,
    newPassword,
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
