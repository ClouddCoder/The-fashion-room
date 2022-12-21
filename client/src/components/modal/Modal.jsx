import React from "react";
import "./Modal.css";

function Modal({ state, children }) {
  if (!state) return null;
  return (
    <div className="modal-background">
      <div className="modal-window">{children}</div>
    </div>
  );
}

export default Modal;
