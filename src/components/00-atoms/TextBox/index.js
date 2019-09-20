import React, { useState, useEffect } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import PropTypes from "prop-types";

const TextBox = props => {
  const [value, setValue] = useState(null);
  const [handle, setHandle] = useState(null);

  const updateValue = e => {
    setValue(e.target.value);
    if (handle) {
      clearTimeout(handle);
    }
    setHandle(
      (v => {
        return setTimeout(() => {
          props.onChanges(props.payload, { value: v });
        }, props.delay);
      })(e.target.value)
    );
  };

  useEffect(() => {
    if (props.value !== value || !value) {
      setValue(props.value);
    }
  }, [props.value, value]);

  return (
    <React.Fragment>
      {value !== null ? (
        <TextareaAutosize
          aria-label={props.ariaLabel}
          disabled={props.isDisabled}
          placeholder={props.placeholder}
          rows={props.rows}
          rowsMax={props.rowsMax}
          className={`${
            props.isHidden ? "hidden" : ""
          } w-full border border-solid p-2`}
          onChange={updateValue}
          value={value}
        />
      ) : null}
    </React.Fragment>
  );
};

TextBox.defaultProps = {
  ariaLabel: "Text area",
  delay: 300,
  isDisabled: false,
  isHidden: false,
  payload: {},
  placeholder: "",
  rows: 3,
  rowsMax: 100
};

TextBox.propTypes = {
  ariaLabel: PropTypes.string,
  delay: PropTypes.number,
  isDisabled: PropTypes.bool,
  isHidden: PropTypes.bool,
  /** Is called with the payload and the value. */
  onChanges: PropTypes.func.isRequired,
  /** Custom object defined by user. */
  payload: PropTypes.object,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  value: PropTypes.string
};

export default TextBox;
