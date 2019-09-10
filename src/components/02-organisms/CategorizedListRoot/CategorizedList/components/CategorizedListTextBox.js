import React, { useState, useEffect } from "react";
import TextBox from "../../../../00-atoms/TextBox";
import * as R from "ramda";

export const CategorizedListTextBox = ({
  changeObj = {},
  parentComponent,
  parentChangeObj,
  propsObj,
  payload,
  onChanges,
  idSuffix
}) => {
  const [value, setValue] = useState("");
  let isDisabled = false;
  if (parentComponent) {
    isDisabled =
      R.includes(parentComponent.name, [
        "CheckboxWithLabel",
        "RadioButtonWithLabel"
      ]) &&
      ((!parentComponent.properties.isChecked &&
        R.isEmpty(parentChangeObj.properties)) ||
        !parentChangeObj.properties.isChecked);
  }

  useEffect(() => {
    setValue(
      R.path(["properties", "value"], changeObj) || propsObj.defaultValue || ""
    );
  }, [changeObj]);

  return (
    <div className="pt-4 pr-2 w-full my-2 sm:my-0 sm:mb-1">
      <TextBox
        id={`textbox-${idSuffix}`}
        isDisabled={isDisabled}
        isHidden={isDisabled}
        onChanges={onChanges}
        payload={payload}
        placeholder={propsObj.placeholder}
        value={value}
      />
    </div>
  );
};

export default CategorizedListTextBox;
