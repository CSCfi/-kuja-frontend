import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Checkbox from "@material-ui/core/Checkbox";
import green from "@material-ui/core/colors/green";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles({
  root: {
    color: green[600],
    "&$checked": {
      color: green[500]
    }
  },
  checked: {}
});

/**
 * Label and checkbox united.
 */
const CheckboxWithLabel = props => {
  const [state, setState] = useState({
    isChecked: props.isChecked
  });
  const classes = useStyles();
  const handleChanges = () => {
    setState({
      isChecked: !state.isChecked
    });
    props.onChanges(props.payload);
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={state.isChecked}
            value="1"
            onChange={handleChanges}
            classes={{
              root: classes.root,
              checked: classes.checked
            }}
          />
        }
        label={props.children}
      />
    </FormGroup>
  );
};

CheckboxWithLabel.defaultProps = {
  isChecked: false,
  labelClasses: [],
  payload: {}
};

CheckboxWithLabel.propTypes = {
  isChecked: PropTypes.bool,
  labelClasses: PropTypes.array,
  name: PropTypes.string.isRequired,
  /**
   * Will be called after checking or unchecking the checkbox.
   */
  onChanges: PropTypes.func.isRequired,
  /**
   * A parameter of the onChanges function.
   */
  payload: PropTypes.object
};

export default CheckboxWithLabel;
