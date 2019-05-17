import React from "./node_modules/react";
import PropTypes from "./node_modules/prop-types";
import CheckboxWithLabel from "../../01-molecules/CheckboxWithLabel";
import Dropdown from "../../00-atoms/Dropdown/Dropdown";

const CheckboxWithLabelAndDropdown = props => {
  const handleCheckboxChange = () => {
    props.onChanges(props.item);
  };

  const handleSelectChange = () => {
    props.onChanges(props.item, true);
  };

  const handleSubCheckboxChange = () => {
    props.onChanges(props.item, true);
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
          name={props.item.code}
          isChecked={props.item.shouldBeSelected}
          onChanges={handleCheckboxChange}
          labelClasses={[
            props.item.isAdded && "is-added",
            props.item.isRemoved && "is-removed",
            props.item.isInLupa && "is-in-lupa"
          ]}
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
  onChanges: PropTypes.func
};

export default CheckboxWithLabelAndDropdown;
