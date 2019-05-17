import React from "react";
import PropTypes from "prop-types";
import RadioButton from "../../00-atoms/RadioButton/RadioButton";

import styles from  "./radio-button.module.css";

const RadioButtonWithLabel = props => {
  const handleChanges = () => {
    props.onChanges(props.payload);
  };

  return (
    <label className={`${styles.container} flex`}>
      <RadioButton
        name={`radio-${props.name}`}
        isChecked={props.isChecked}
        onChanges={handleChanges}
      />
      <span className={styles.checkmark} />
      <span className="ml-4 pt-1">{props.children}</span>
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
