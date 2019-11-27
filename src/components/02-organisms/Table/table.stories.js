import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import multidimensionalTable from "./storydata/multidimensionalTable";
import simpleTable from "./storydata/simpleTable";
import Table from "./index";

storiesOf("Table", module)
  .addDecorator(withInfo)
  .add("Multidimensional table", () => {
    return <Table structure={multidimensionalTable} />;
  })
  .add("Simple table", () => {
    return <Table structure={simpleTable} />;
  });
