import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import simpleStory from "./storydata/simpleStory";
import Table2 from "./index";

storiesOf("Table2", module)
  .addDecorator(withInfo)
  .add("Simple table", () => {
    return <Table2 data={simpleStory} />;
  });
