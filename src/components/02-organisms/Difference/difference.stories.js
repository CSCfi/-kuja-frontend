import React from "react";
import Difference from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { story1 } from "./storyData/story1";

storiesOf("Difference", module)
  .addDecorator(withInfo)
  .add("Modifiable and not required", () => {
    return (
      <Difference
        initialValue={story1.initialValue}
        value={story1.value}
        titles={story1.titles}
        payload={{component: {properties: {isRequired: false}}}}
      />
    );
  });
