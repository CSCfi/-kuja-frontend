import React from "react";
import PropTypes from "prop-types";

import "./radio-button.css";

const RadioButton = props => {
  const handleOnChange = () => {
    props.onChanges(props.item);
  };

  return (
    <label className="container flex">
      <input
        type="radio"
        name={props.name}
        checked={props.item.shouldBeSelected}
        onChange={handleOnChange}
      />
      <span className="checkmark" />
      <span className="mr-8 pt-1">
        <span className="ml-4">{props.item.code}</span>
        <span className="ml-4">{props.item.title}</span>
      </span>
    </label>
  );
};

RadioButton.propTypes = {
  item: PropTypes.object,
  onChanges: PropTypes.func
};

export default RadioButton;
