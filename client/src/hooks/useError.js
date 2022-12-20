import { useState } from "react";

/**
 * Custom hook to handle input errors
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
