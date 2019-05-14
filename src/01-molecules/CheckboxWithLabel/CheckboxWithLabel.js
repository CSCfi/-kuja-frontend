import React from "react";
import PropTypes from "prop-types";
import Checkbox from "../../00-atoms/Checkbox/Checkbox";

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
      <span>{props.children}</span>
    </label>
  );
};

CheckboxWithLabel.propTypes = {
  isChecked: PropTypes.bool,
  labelClasses: PropTypes.array,
  name: PropTypes.string,
  onChanges: PropTypes.func,
  payload: PropTypes.object
};

export default CheckboxWithLabel;
