import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import _ from "lodash";

const Input = props => {
  const changesOutDelayed = _.debounce(props.onChanges, props.delay);
  return (
    <React.Fragment>
      <TextField
        aria-label={props.ariaLabel}
        defaultValue={props.value}
        disabled={props.isDisabled}
        placeholder={props.placeholder}
        rows={props.rows}
        rowsMax={props.rowsMax}
        className={`${props.isHidden ? "hidden" : ""} p-2`}
        onChange={e =>
          changesOutDelayed(props.payload, { value: e.target.value })
        }
        error={props.error}
        variant="outlined"
        style={{ width: props.width }}
        fullWidth={props.fullWidth}
        type={props.type}
      />
    </React.Fragment>
  );
};

Input.defaultProps = {
  ariaLabel: "Text area",
  delay: 300,
  isDisabled: false,
  isHidden: false,
  payload: {},
  placeholder: "",
  rows: 1,
  rowsMax: 1,
  error: false,
  width: 100,
  fullWidth: false,
  type: "text"
};

Input.propTypes = {
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
  error: PropTypes.bool,
  width: PropTypes.number,
  fullWidth: PropTypes.bool,
  type: PropTypes.string
};

export default Input;
