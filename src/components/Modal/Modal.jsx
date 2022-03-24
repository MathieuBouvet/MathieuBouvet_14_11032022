import { useEffect } from "react";
import PropTypes from "prop-types";
import usePortal from "react-useportal";
import cx from "classnames";
import useClickOutside from "../../hooks/useClickOutside";
import "./Modal.css";

const Modal = ({ isClosing, onCloseFinished, onCloseRequested, children }) => {
  const { Portal } = usePortal();

  useEffect(() => {
    function handleEscape(e) {
      if (e.code === "Escape") {
        onCloseRequested();
      }
    }
    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  });

  const modalRef = useClickOutside(onCloseRequested);

  return (
    <Portal>
      <div
        className={cx("modal-overlay", { closing: isClosing })}
        onAnimationEnd={() => {
          if (isClosing) {
            onCloseFinished();
          }
        }}
      >
        <div className="modal" ref={modalRef}>
          <button className="modal-close-button" onClick={onCloseRequested}>
            ✕
          </button>
          {children}
        </div>
      </div>
    </Portal>
  );
};

Modal.propTypes = {
  isClosing: PropTypes.bool.isRequired,
  onCloseRequested: PropTypes.func,
  onCloseFinished: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
