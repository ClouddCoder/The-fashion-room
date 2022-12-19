import instance from "./api";

/**
 * Requests the API to change the user's email
 */
export function changeUserEmail(email, newEmail, token) {
  return instance.put(
    "/edit-email",
    { email, newEmail },
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
  return instance.put("/edit/password", {
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
