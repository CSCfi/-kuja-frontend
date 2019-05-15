import React from "react";
import { storiesOf } from "@storybook/react";
import CheckboxWithLabel from "./index";

storiesOf("CheckboxWithLabel", module)
  .add("is checked", () => (
    <CheckboxWithLabel
      name="checked-with-label"
      isChecked={true}
      onChanges={() => {
        alert("Clicked!");
      }}
    >
      Label text
    </CheckboxWithLabel>
  ))
  .add("is unchecked", () => (
    <CheckboxWithLabel name="example" isChecked={false}>
      Label text
    </CheckboxWithLabel>
  ))
  .add("is in lupa", () => (
    <CheckboxWithLabel
      name="example"
      isChecked={false}
      onChanges={() => {
        alert("Clicked!");
      }}
      labelClasses={["is-in-lupa"]}
    >
      Label text
    </CheckboxWithLabel>
  ))
  .add("is checked and is in lupa", () => (
    <CheckboxWithLabel
      name="example"
      isChecked={true}
      onChanges={() => {
        alert("Clicked!");
      }}
      labelClasses={["is-in-lupa"]}
    >
      Label text
    </CheckboxWithLabel>
  ))
  .add("is in lupa and is added", () => (
    <CheckboxWithLabel
      name="example"
      isChecked={false}
      onChanges={() => {
        alert("Clicked!");
      }}
      labelClasses={["is-added", "is-in-lupa"]}
    >
      Label text
    </CheckboxWithLabel>
  ))
  .add("is checked, is in lupa and is removed", () => (
    <CheckboxWithLabel
      name="example"
      isChecked={false}
      onChanges={() => {
        alert("Clicked!");
      }}
      labelClasses={["is-removed", "is-in-lupa"]}
    >
      Label text
    </CheckboxWithLabel>
  ));
