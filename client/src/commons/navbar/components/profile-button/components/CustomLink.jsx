import React from "react";
import { Link } from "react-router-dom";

/**
 * Link personalizado que se renderiza como boton.
 * Usa un ref para pasar el elemento a los demas hijos.
 * https://reactjs.org/docs/forwarding-refs.html
 */
const CustomLink = React.forwardRef(({ session, productState }, ref) => (
  <Link
    ref={ref}
    to="/"
    component="button"
    onClick={() => {
      session();
      productState();
      window.localStorage.removeItem("logged");
    }}
  />
));

export default CustomLink;
