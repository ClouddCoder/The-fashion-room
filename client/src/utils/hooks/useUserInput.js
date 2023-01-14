import { useState } from "react";

/**
 * Custom hook to handle user input
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
