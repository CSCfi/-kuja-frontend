import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const styles = theme => ({
  dense: {
    marginTop: theme.spacing(2)
  }
});

const Datepicker = withStyles(styles)(props => {
  const { classes } = props;
  const [selectedDate, setSelectedDate] = useState(props.value);

  const handleDateChange = date => {
    props.onChanges(props.payload, { value: date });
    setSelectedDate(date);
  };

  useEffect(() => {
    if (props.value !== selectedDate || !selectedDate) {
      setSelectedDate(props.value);
    }
  }, [props.value]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        format="dd/MM/yyyy" // Always is Finnish format
        aria-label={props.ariaLabel}
        label={props.label}
        disabled={props.isDisabled}
        placeholder={props.placeholder}
        margin="dense"
        className={`${props.isHidden ? "hidden" : ""} p-2`}
        onChange={handleDateChange}
        error={props.error}
        style={props.fullWidth ? {} : { width: props.width }}
        fullWidth={props.fullWidth}
        InputProps={{
          className: classes.input
        }}
        value={selectedDate}
      />
    </MuiPickersUtilsProvider>
  );
});

Datepicker.defaultProps = {
  ariaLabel: "Datepicker",
  label: "",
  delay: 300,
  id: `datepicker-${Math.random()}`,
  isDisabled: false,
  isHidden: false,
  payload: {},
  error: false,
  width: "10em",
  fullWidth: false
};

Datepicker.propTypes = {
  ariaLabel: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
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
  width: PropTypes.string,
  fullWidth: PropTypes.bool,
  value: PropTypes.instanceOf(Date)
};

export default Datepicker;
