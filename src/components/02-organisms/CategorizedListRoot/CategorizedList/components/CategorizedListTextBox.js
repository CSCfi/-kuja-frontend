import React, { useMemo, useEffect } from "react";
import TextBox from "../../../../00-atoms/TextBox";
import { useChangeObjects } from "../../../../../stores/changeObjects";
import * as R from "ramda";

export const CategorizedListTextBox = ({
  changeObj = {},
  parentComponent,
  parentChangeObj,
  parentPropsObj,
  propsObj,
  payload,
  onChanges,
  id,
  rows,
  rowsMax,
  tooltip
}) => {
  const [cos, coActions] = useChangeObjects();

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
    const value = R.path(["properties", "value"], changeObj);
    if (
      parentComponent &&
      (parentComponent.name === "CheckboxWithLabel" ||
        parentComponent.name === "RadioButtonWithLabel") &&
      !R.equals(parentPropsObj.isChecked, true) &&
      !R.isNil(value) &&
      !R.isEmpty(value)
    ) {
      // If parent checkbox is unchecked the changeObject of
      // the current textbox will be removed
      coActions.removeByAnchor(changeObj.anchor);
    }
  }, [parentComponent, parentPropsObj, changeObj]);

  const value = useMemo(() => {
    return (
      R.path(["properties", "value"], changeObj) ||
      propsObj.value ||
      propsObj.defaultValue ||
      ""
    );
  }, [
    changeObj,
    parentComponent,
    parentPropsObj,
    propsObj.defaultValue,
    propsObj.value
  ]);

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
