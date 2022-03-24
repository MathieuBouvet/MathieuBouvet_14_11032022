import PropTypes from "prop-types";

import usePresence from "../../hooks/usePresence";
import useBoundingRect from "../../hooks/useBoundingRect";

import OptionContainer from "./OptionContainer";

import "./Select.css";

const Select = ({
  selected,
  onChange,
  children,
  placeholder = "Choisir",
}) => {
  const [isOpened, isClosing, setOpened, setClosing, setClosed] = usePresence();
  const selectedValue = children[selected];
  const [selectRef, boundingRect] = useBoundingRect();

  function onOptionClick(value) {
    if (selected !== value) {
      onChange(value);
    }
    setClosing();
  }
  return (
    <div className="select" ref={selectRef}>
      <button
        type="button"
        className="current-selection"
        onClick={isOpened ? setClosing : setOpened}
      >
        {selectedValue ?? placeholder}
      </button>
      {isOpened && (
        <OptionContainer
          isClosing={isClosing}
          onCloseFinished={setClosed}
          onCloseRequested={setClosing}
          onOptionClick={onOptionClick}
          boundingRect={boundingRect}
        >
          {children}
        </OptionContainer>
      )}
    </div>
  );
};

Select.propTypes = {};

export default Select;
