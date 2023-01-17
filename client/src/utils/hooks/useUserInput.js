import { useState } from "react";

/**
 * Custom hook to get the user's input.
 * @returns {object} {input, setUserInput}
 */
const useUserInput = () => {
  const [input, setInput] = useState("");

  const setUserInput = (text) => setInput(text);

  return {
    input,
    setUserInput,
  };
};

export default useUserInput;
