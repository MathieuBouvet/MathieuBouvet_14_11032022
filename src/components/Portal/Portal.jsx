import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  return createPortal(children, document.body);
};

Portal.propTypes = {};

export default Portal;
