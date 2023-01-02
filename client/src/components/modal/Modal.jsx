import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

function Modal({ state, children }) {
  if (!state) return null;

  return ReactDOM.createPortal(
    <div className="modal-background">
      <div className="modal-window">{children}</div>
    </div>,
    document.getElementById("portal"),
  );
}

export default Modal;
