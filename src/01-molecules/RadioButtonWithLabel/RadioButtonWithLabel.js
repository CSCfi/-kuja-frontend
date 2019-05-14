import React from "react";
import PropTypes from "prop-types";
import RadioButton from "../../00-atoms/RadioButton/RadioButton";

import "./radio-button.css";

const RadioButtonWithLabel = props => {
  const handleChanges = () => {
    props.onChanges(props.payload);
  };

  return (
    <label className="container flex">
      <RadioButton
        name={`radio-${props.name}`}
        isChecked={props.isChecked}
        onChanges={handleChanges}
      />
      <span className="checkmark" />
      <span className="mr-8 pt-1">{props.children}</span>
    </label>
  );
};

RadioButtonWithLabel.propTypes = {
  isChecked: PropTypes.bool,
  name: PropTypes.string,
  onChanges: PropTypes.func,
  payload: PropTypes.object
};

export default RadioButtonWithLabel;
