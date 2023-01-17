import { useState } from "react";

/**
 * Custom hook to display the loader.
 * @returns {object} {loader, setLoaderComponent}
 */
const useLoader = () => {
  const [loader, setLoader] = useState(false);

  const setLoaderComponent = (value) => setLoader(value);

  return {
    loader,
    setLoaderComponent,
  };
};

export default useLoader;
