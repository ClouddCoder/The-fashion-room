import { useState } from "react";

/**
 * Custom hook to check if the user's password is less than
 * or equal to 4 characters.
 */
const usePasswordLength = () => {
  const [password, setPassword] = useState({ shortPassword: false, errorMessage: "" });

  const checkPasswordLength = (response) => setPassword(response);

  return {
    password,
    checkPasswordLength,
  };
};

export default usePasswordLength;
