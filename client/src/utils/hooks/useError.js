import { useState } from "react";

/**
 * Custom hook to display the error on the input.
 * @returns {object} {error, setInputError}
 */
const useError = () => {
  const [error, setError] = useState({ constraint: "", message: "" });

  const setInputError = (input) => setError(input);

  return {
    error,
    setInputError,
  };
};

export default useError;
