import React from "react";
import { storiesOf } from "@storybook/react";
import Autocomplete from "./index";
import { withInfo } from "@storybook/addon-info";

storiesOf("Autocomplete", module)
  .addDecorator(withInfo)
  .add("Example 1", () => (
    <Autocomplete
      name="example"
      options={[
        { label: "A", value: "A" },
        { label: "B", value: "B" },
        { label: "C", value: "C" }
      ]}
    />
  ));
