import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import usePortal from "react-useportal";

import useClickOutside from "../../hooks/useClickOutside";
import useOnEscape from "../../hooks/useOnEscape";

import getLayoutStyle from "./helpers/getLayoutStyle";
import useOptionFocus from "./helpers/useOptionFocus";

import "./OptionContainer.css";

const OptionContainer = ({
  selected,
  children = {},
  onOptionClick = () => {},
  onCloseRequested,
  onCloseFinished,
  isClosing,
  boundingRect = {},
}) => {
  const { Portal } = usePortal();
  useOnEscape(onCloseRequested);
  const optionContainerRef = useClickOutside(onCloseRequested);
  const initialOptionRef = useRef();
  
  const { handleOptionFocus, focusFirstOption, registerOption } =
    useOptionFocus();

  function requestClose(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      onCloseRequested();
    }
  }
  function close() {
    if (isClosing) {
      onCloseFinished();
    }
  }

  useEffect(() => {
    if (initialOptionRef.current != null) {
      initialOptionRef.current.focus();
    } else {
      focusFirstOption();
    }
  }, [focusFirstOption]);

  return (
    <>
      <Portal>
        <div className={cx("select-overlay")}>
          <ul
            ref={optionContainerRef}
            className={cx("option-container", { isClosing })}
            style={getLayoutStyle(boundingRect)}
            onBlur={requestClose}
            onAnimationEnd={close}
            onKeyDown={handleOptionFocus}
          >
            {Object.entries(children).map(([value, text]) => {
              return (
                <li key={value}>
                  <button
                    className={cx("option", { selected: selected === value })}
                    onClick={() => onOptionClick(value)}
                    ref={node => {
                      if (selected === value) {
                        initialOptionRef.current = node;
                      }
                      registerOption(node);
                    }}
                  >
                    {text ?? value}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </Portal>
      <Portal>
        {/* used to not give focus to the adress bar when tabing out of the options */}
        <div tabIndex={0}></div>
      </Portal>
    </>
  );
};

OptionContainer.propTypes = {
  selected: PropTypes.string,
  children: PropTypes.objectOf(PropTypes.string),
  onOptionClick: PropTypes.func,
  onCloseRequested: PropTypes.func.isRequired,
  onCloseFinished: PropTypes.func.isRequired,
  isClosing: PropTypes.bool.isRequired,
  boundingRect: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

export default OptionContainer;
