import React from "react";
import PropTypes from "prop-types";
import Checkbox from "../../00-atoms/Checkbox/Checkbox";

/**
 * Label and checkbox united.
 */
const CheckboxWithLabel = props => {
  const handleChanges = () => {
    props.onChanges(props.payload);
  };

  return (
    <label
      className={
        props.labelClasses ? props.labelClasses.filter(Boolean).join(" ") : ""
      }
    >
      <Checkbox
        key={`checkbox-${props.name}`}
        checked={props.isChecked}
        onChange={handleChanges}
      />
      <span className="ml-4">{props.children}</span>
    </label>
  );
};

CheckboxWithLabel.defaultProps = {
  isChecked: false,
  labelClasses: [],
  payload: {}
}

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
