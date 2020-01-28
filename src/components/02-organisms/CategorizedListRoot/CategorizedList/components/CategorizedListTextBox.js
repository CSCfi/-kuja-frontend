import React, { useState, useEffect } from "react";
import TextBox from "okm-frontend-components/dist/components/00-atoms/TextBox";
import * as R from "ramda";

export const CategorizedListTextBox = ({
  changeObj = {},
  parentComponent,
  parentChangeObj,
  propsObj,
  payload,
  onChanges,
  id,
  rows,
  rowsMax,
  tooltip
}) => {
  const [value, setValue] = useState();
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
    const initialValue =
      R.path(["properties", "value"], changeObj) ||
      propsObj.value ||
      propsObj.defaultValue ||
      "";
    setValue(initialValue);
  }, [changeObj, propsObj.defaultValue, propsObj.value]);

  return (
    <div className={`w-full ${payload.component.styleClasses}`}>
      <TextBox
        id={id}
        isDisabled={isDisabled}
        isHidden={isDisabled}
        isReadOnly={propsObj.isReadOnly}
        isRequired={propsObj.isRequired}
        isValid={propsObj.isValid}
        onChanges={onChanges}
        payload={payload}
        placeholder={propsObj.placeholder}
        isErroneous={propsObj.isErroneous}
        title={propsObj.title}
        value={value}
        rows={rows}
        rowsMax={rowsMax}
        tooltip={tooltip}
      />
    </div>
  );
};

export default CategorizedListTextBox;
