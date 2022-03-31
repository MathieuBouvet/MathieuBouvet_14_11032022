import { useRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import usePresence from "../../hooks/usePresence";
import useBoundingRect from "../../hooks/useBoundingRect";

import OptionContainer from "./OptionContainer";

import "./Select.css";

const Select = ({
  selected,
  onChange = () => {},
  children = {},
  label = "Choisir",
  id = "",
}) => {
  const [isOpened, isClosing, setOpened, setClosing, setClosed] = usePresence();
  const [selectRef, boundingRect] = useBoundingRect();

  const buttonRef = useRef();

  const optionsData = Array.isArray(children)
    ? children.reduce((acc, value) => {
        acc[value] = value;
        return acc;
      }, {})
    : children;
  const selectedValue = optionsData[selected];

  function onOptionClick(value) {
    if (selected !== value) {
      onChange(value);
    }
    setClosing();
  }
  return (
    <div
      className={cx("select input-group", {
        opened: isOpened,
        "has-value": selectedValue != null,
      })}
      ref={selectRef}
    >
      <button
        id={id}
        type="button"
        className={cx("current-selection input-group-input")}
        onClick={isOpened ? setClosing : setOpened}
        ref={buttonRef}
      >
        <div className="selected-value">{selectedValue ?? ""}</div>
      </button>
      <label htmlFor={id} className="input-group-label">
        {label}
      </label>
      {isOpened && (
        <OptionContainer
          isClosing={isClosing}
          onCloseFinished={() => {
            buttonRef.current?.focus();
            setClosed();
          }}
          onCloseRequested={setClosing}
          onOptionClick={onOptionClick}
          boundingRect={boundingRect}
          selected={selected}
        >
          {optionsData}
        </OptionContainer>
      )}
    </div>
  );
};

Select.propTypes = {
  selected: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.string),
  ]),
  placeholder: PropTypes.string,
  id: PropTypes.string,
};

export default Select;
