import React from "react";
import PropTypes from "prop-types";
import CheckboxWithLabel from "../../01-molecules/CheckboxWithLabel";
import Dropdown from "../../00-atoms/Dropdown";

const CheckboxWithLabelAndDropdown = props => {
  const handleCheckboxChange = () => {
    props.onChanges(props.item);
  };
  
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <CheckboxWithLabel
          name={`checkboxWithLabel-${props.item.code}`}
          isChecked={props.item.shouldBeSelected}
          onChanges={handleCheckboxChange}
          labelStyles={props.labelStyles}
        >
          <span className="ml-4">{props.item.code}</span>
          <span className="ml-4">{props.item.title}</span>
        </CheckboxWithLabel>
        <div className="w-48">
          <Dropdown
            options={options}
            isDisabled={!props.item.shouldBeSelected}
          />
        </div>
      </div>
    </div>
  );
};

CheckboxWithLabelAndDropdown.propTypes = {
  item: PropTypes.object,
  onChanges: PropTypes.func,
  options: PropTypes.array,
  labelStyles: PropTypes.object
};

export default CheckboxWithLabelAndDropdown;
