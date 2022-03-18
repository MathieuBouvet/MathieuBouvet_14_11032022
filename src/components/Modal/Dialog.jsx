import ComponentPresence from "../ComponentPresence";
import Modal from "./Modal";
import PropTypes from "prop-types";

const Dialog = ({ isOpen, onClose, children }) => {
  return (
    <ComponentPresence presenceWanted={isOpen}>
      {({ isExiting, onExited }) => (
        <Modal
          isClosing={isExiting}
          onCloseRequested={onClose}
          onCloseFinished={onExited}
        >
          {children}
        </Modal>
      )}
    </ComponentPresence>
  );
};

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Dialog;
