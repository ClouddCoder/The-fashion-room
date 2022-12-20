import React from "react";

function Modal({ state, children }) {
  if (!state) return null;
  return <div>{children}</div>;
}

export default Modal;
