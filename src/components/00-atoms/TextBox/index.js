import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import PropTypes from "prop-types";

const TextBox = props => {
  return (
    <TextareaAutosize
      aria-label={props.ariaLabel}
      defaultValue={props.defaultValue}
      disabled={props.isDisabled}
      placeholder={props.placeholder}
      rows={props.rows}
      rowsMax={props.rowsMax}
      className={`${props.isHidden ? 'hidden' : ""} w-full border border-solid p-2`}
    />
  );
};

TextBox.defaultProps = {
  ariaLabel: "Text area",
  defaultValue: "",
  placeholder: "Empty",
  rows: 3,
  rowsMax: 100
};

TextBox.propTypes = {
  ariaLabel: PropTypes.string,
  defaultValue: PropTypes.string,
  isDisabled: PropTypes.bool,
  isHidden: PropTypes.bool,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  rowsMax: PropTypes.number
};

export default TextBox;
