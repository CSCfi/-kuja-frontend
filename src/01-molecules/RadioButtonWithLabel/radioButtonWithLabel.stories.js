import React from "react";
import { storiesOf } from "@storybook/react";
import RadioButtonWithLabel from "./index";

storiesOf("RadioButtonWithLabel", module)
  .add("is checked", () => (
    <RadioButtonWithLabel name="checked-with-label" isChecked={true}>
      Label text
    </RadioButtonWithLabel>
  ))
  .add("is unchecked", () => (
    <RadioButtonWithLabel name="example" isChecked={false}>
      Label text
    </RadioButtonWithLabel>
  ));
