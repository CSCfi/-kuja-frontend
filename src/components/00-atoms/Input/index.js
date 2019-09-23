import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  dense: {
    marginTop: theme.spacing(2)
  }
});

const Input = withStyles(styles)(props => {
  const changesOutDelayed = _.debounce(props.onChanges, props.delay);
  const { classes } = props;

  return (
    <TextField
      aria-label={props.ariaLabel}
      defaultValue={props.value}
      label={props.label}
      disabled={props.isDisabled}
      placeholder={props.placeholder}
      rows={props.rows}
      margin="dense"
      rowsMax={props.rowsMax}
      className={`${props.isHidden ? "hidden" : ""} p-2`}
      onChange={e =>
        changesOutDelayed(props.payload, { value: e.target.value })
      }
      error={props.error}
      variant="outlined"
      style={props.fullWidth ? {} : { width: props.width }}
      fullWidth={props.fullWidth}
      type={props.type}
      InputProps={{
        className: classes.input
      }}
    />
  );
});

Input.defaultProps = {
  ariaLabel: "Text area",
  delay: 300,
  id: `input-${Math.random()}`,
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
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
  isHidden: PropTypes.bool,
  label: PropTypes.string,
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
