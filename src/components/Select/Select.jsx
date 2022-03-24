import { useRef } from "react";
import PropTypes from "prop-types";

import usePresence from "../../hooks/usePresence";
import useBoundingRect from "../../hooks/useBoundingRect";

import OptionContainer from "./OptionContainer";

import "./Select.css";

const Select = ({
  selected,
  onChange = () => {},
  children = {},
  placeholder = "Choisir",
  id = "",
}) => {
  const [isOpened, isClosing, setOpened, setClosing, setClosed] = usePresence();
  const selectedValue = children[selected];
  const [selectRef, boundingRect] = useBoundingRect();

  const buttonRef = useRef();

  function onOptionClick(value) {
    if (selected !== value) {
      onChange(value);
    }
    setClosing();
  }
  return (
    <div className="select" ref={selectRef}>
      <button
        id={id}
        type="button"
        className="current-selection"
        onClick={isOpened ? setClosing : setOpened}
        ref={buttonRef}
      >
        <div className="test">{selectedValue ?? placeholder}</div>
      </button>
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
          {children}
        </OptionContainer>
      )}
    </div>
  );
};

Select.propTypes = {
  selected: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.objectOf(PropTypes.string),
  placeholder: PropTypes.string,
  id: PropTypes.string,
};

export default Select;
