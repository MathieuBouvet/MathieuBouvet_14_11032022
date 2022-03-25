import cx from "classnames";
import PropTypes from "prop-types";

import "./InputGroup.css";

const InputGroup = ({
  children,
  id = "",
  value = "",
  onChange = () => {},
  className = "",
  labelClassName = "",
  inputClassName = "",
  ...rest
}) => {
  return (
    <div className={cx("input-group", className)}>
      <input
        className={cx("input-group-input", inputClassName)}
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder=" "
        {...rest}
      />
      {children != null && (
        <label htmlFor={id} className={cx("input-group-label", labelClassName)}>
          {children}
        </label>
      )}
    </div>
  );
};

InputGroup.propTypes = {
  children: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
};

export default InputGroup;
