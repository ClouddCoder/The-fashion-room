import ReactDOM from "react-dom";
import "./Modal.css";

/**
 * Component to render the modal.
 * @param {object} { state, children} - state is used to show or hide the modal.
 * @returns {JSX.Element} - Modal component
 */
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
