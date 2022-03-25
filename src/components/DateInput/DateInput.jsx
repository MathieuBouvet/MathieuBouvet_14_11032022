import PropTypes from "prop-types";
import InputGroup from "../InputGroup/InputGroup";
import { useState } from "react";

import cx from "classnames";

import "./DateInput.css";

const DateInput = ({ inputClassName, className, value, ...props }) => {
  const [showAsDate, setShowAsDate] = useState(false);

  const formatedValue =
    showAsDate || value === ""
      ? value
      : new Date(value).toLocaleDateString(undefined, {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

  return (
    <InputGroup
      {...props}
      value={formatedValue}
      className={cx("date-input-group", className)}
      inputClassName={cx("date-input", inputClassName)}
      type={showAsDate ? "date" : "text"}
      onFocus={() => setShowAsDate(true)}
      onBlur={() => setShowAsDate(false)}
    />
  );
};

DateInput.propTypes = {
  children: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
};

export default DateInput;
