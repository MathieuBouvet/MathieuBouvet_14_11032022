import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import usePortal from "react-useportal";
import cx from "classnames";
import useClickOutside from "../../hooks/useClickOutside";
import "./Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  const { Portal } = usePortal();
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleEscape(e) {
      if (e.code === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  });

  const modalRef = useClickOutside(onClose);

  if (!isOpen && !showModal) return null;
  return (
    <Portal>
      <div
        className={cx("modal-overlay", { closing: !isOpen })}
        onAnimationEnd={() => {
          if (!isOpen) {
            setShowModal(false);
          }
        }}
      >
        <div className="modal" ref={modalRef}>
          <button className="modal-close-button" onClick={onClose}>
            ✕
          </button>
          {children}
        </div>
      </div>
    </Portal>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
