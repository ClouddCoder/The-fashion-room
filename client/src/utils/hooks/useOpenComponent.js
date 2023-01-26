import { useState } from "react";

/**
 * Custom hook to display the loader or the modal.
 * @returns {object} {loader, setLoaderComponent}
 */
const useOpenComponent = () => {
  const [open, setOpen] = useState(false);

  const setOpenComponent = (value) => setOpen(value);

  return {
    open,
    setOpenComponent,
  };
};

export default useOpenComponent;
