import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Checkbox from "@material-ui/core/Checkbox";
import green from "@material-ui/core/colors/green";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

/**
 * Label and checkbox united.
 */
const CheckboxWithLabel = props => {
  const [state, setState] = useState({
    isChecked: props.isChecked
  });

  const styles = makeStyles({
    root: {
      color: green[600],
      "&$checked": {
        color: green[500]
      }
    },
    label: props.labelStyles,
    checked: {} // This object must be empty for checked color to work.
  })();

  const handleChanges = () => {
    setState({
      isChecked: !state.isChecked
    });
    props.onChanges(props.payload);
  };

  return (
    <FormGroup row>
      <FormControlLabel
        classes={{
          label: styles.label
        }}
        control={
          <Checkbox
            checked={state.isChecked}
            value="1"
            onChange={handleChanges}
            classes={{
              checked: styles.checked,
              root: styles.root
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
  payload: {}
};

CheckboxWithLabel.propTypes = {
  isChecked: PropTypes.bool,
  name: PropTypes.string.isRequired,
  /**
   * Will be called after checking or unchecking the checkbox.
   */
  onChanges: PropTypes.func.isRequired,
  /**
   * A parameter of the onChanges function.
   */
  payload: PropTypes.object,
  labelStyles: PropTypes.object
};

export default CheckboxWithLabel;
