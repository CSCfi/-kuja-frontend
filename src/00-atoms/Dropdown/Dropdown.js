import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

import "./dropdown.css";

const selectCustomStyles = {
  control: provided => ({
    ...provided,
    height: "34px",
    minHeight: "34px"
  }),
  indicatorsContainer: provided => ({
    ...provided,
    height: "100%",
    minHeight: "100%"
  })
};

const Dropdown = props => {
  return (
    <Select
      name={props.name}
      value={props.value}
      onChange={props.onChanges}
      options={props.options}
      isDisabled={props.isDisabled}
      placeholder={props.placeholder}
      className="select-element"
      styles={selectCustomStyles}
    />
  );
};

Dropdown.propTypes = {
  name: PropTypes.string,
  isDisabled: PropTypes.bool,
  onChanges: PropTypes.func,
  options: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.object
};

export default Dropdown;
