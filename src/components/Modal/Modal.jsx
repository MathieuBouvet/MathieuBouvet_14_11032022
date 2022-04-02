import PropTypes from "prop-types";
import cx from "classnames";
import useClickOutside from "../../hooks/useClickOutside";
import useOnEscape from "../../hooks/useOnEscape";
import Portal from "../Portal/Portal";
import "./Modal.css";

const Modal = ({ isClosing, onCloseFinished, onCloseRequested, children }) => {
  useOnEscape(onCloseRequested);
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
