import React from "react";
import PropTypes from "prop-types";
import Checkbox from "components/Checkbox";
import Dropdown from "./Dropdown/Dropdown";

const SelectableItem = props => {
  const handleCheckboxChange = () => {
    props.onChanges(props.item);
  };

  const handleSelectChange = () => {
    props.onChanges(props.item, true);
  };

  const handleSubCheckboxChange = () => {
    props.onChanges(props.item, true);
  };

  const layoutClasses = [
    props.item.isAdded && "is-added",
    props.item.isRemoved && "is-removed",
    props.item.isInLupa && "is-in-lupa"
  ]
    .filter(Boolean)
    .join(" ");

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className={layoutClasses}>
          <Checkbox
            key={`checkbox-item-${props.item.code}`}
            checked={props.item.shouldBeSelected}
            onChange={handleCheckboxChange}
          />
          <span>
            <span className="ml-4">{props.item.code}</span>
            <span className="ml-4">{props.item.title}</span>
            {/* <span className="ml-10">
              {props.item.isInLupa ? "LUPA" : ""}
            </span>
            <span className="ml-10">
              {props.item.isRemoved ? "POISTETTU" : ""}
            </span>
            <span className="ml-10">
              {props.item.isAdded ? "LISÄTTY" : ""}
            </span> */}
          </span>
        </label>
        <div className="w-48">
            <Dropdown options={options} isDisabled={!props.item.shouldBeSelected} />
        </div>
      </div>
      {props.item.subItems && props.item.subItems.length > 0 && (
        <div className="p-4">
          <label>
            <Checkbox
              key={`checkbox-sub-item-${props.item.code}`}
              checked={props.item.subItems[0].shouldBeSelected}
              onChange={handleSubCheckboxChange}
            />
            <span style={{ marginLeft: 8 }}>
              <span className="ml-4" style={{ marginLeft: 8 }}>
                {props.item.subItems[0].code}
              </span>
              <span className="ml-4">{props.item.subItems[0].title}</span>
            </span>
          </label>
        </div>
      )}
    </div>
  );
};

SelectableItem.propTypes = {
  item: PropTypes.object,
  onChanges: PropTypes.func
};

export default SelectableItem;
