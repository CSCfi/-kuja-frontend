import Difference from "./index";
import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { story1 } from "./storyData/story1";

storiesOf("Difference", module)
  .addDecorator(withInfo)
  .add("Example 1", () => {
    return (
      <Difference
        initialValue={story1.initialValue}
        value={story1.value}
        titles={story1.titles}
      />
    );
  });
