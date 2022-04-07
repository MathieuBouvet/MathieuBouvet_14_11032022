import PropTypes from "prop-types";
import cx from "classnames";
import useClickOutside from "../../hooks/useClickOutside";
import useOnEscape from "../../hooks/useOnEscape";
import Portal from "../Portal/Portal";
import "./Modal.css";

const Modal = ({
  title,
  isClosing,
  onCloseFinished,
  onCloseRequested,
  children,
}) => {
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
        <section className={cx("modal", { closing: isClosing })} ref={modalRef}>
          <header className="modal-header">
            <h2 className="modal-title">{title}</h2>
            <button className="modal-close-button" onClick={onCloseRequested}>
              ✕
            </button>
          </header>
          {children}
        </section>
      </div>
    </Portal>
  );
};

Modal.propTypes = {
  isClosing: PropTypes.bool.isRequired,
  onCloseRequested: PropTypes.func,
  onCloseFinished: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Modal;
