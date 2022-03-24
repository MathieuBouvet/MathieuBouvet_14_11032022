import cx from "classnames";
import PropTypes from "prop-types";
import usePortal from "react-useportal";

import useClickOutside from "../../hooks/useClickOutside";
import useOnEscape from "../../hooks/useOnEscape";

import "./OptionContainer.css";

function getDimension(boundingRect) {
  const { x = 0, y = 0, height = 0, width = "100%" } = boundingRect ?? {};
  return {
    top: y + height,
    left: x,
    width,
  };
}

const OptionContainer = ({
  selected,
  children,
  onOptionClick,
  onCloseRequested,
  onCloseFinished,
  isClosing,
  boundingRect,
}) => {
  const { Portal } = usePortal();
  useOnEscape(onCloseRequested);
  const optionContainerRef = useClickOutside(onCloseRequested);

  return (
    <Portal>
      <div className={cx("select-overlay")}>
        <ul
          ref={optionContainerRef}
          className={cx("option-container", { isClosing })}
          onAnimationEnd={() => {
            if (isClosing) {
              onCloseFinished();
            }
          }}
          style={getDimension(boundingRect)}
        >
          {Object.entries(children).map(([value, text]) => (
            <li
              key={value}
              className={cx("option", { selected: selected === value })}
              onClick={() => onOptionClick(value)}
            >
              {text ?? value}
            </li>
          ))}
        </ul>
      </div>
    </Portal>
  );
};

OptionContainer.propTypes = {};

export default OptionContainer;
