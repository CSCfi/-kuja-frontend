import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import multidimensionalTable from "./storydata/multidimensionalTable";
import simpleTable from "./storydata/simpleTable";
import Table2 from "./index";

storiesOf("Table2", module)
  .addDecorator(withInfo)
  .add("Multidimensional table", () => {
    return <Table2 structure={multidimensionalTable} />;
  })
  .add("Simple table", () => {
    return <Table2 structure={simpleTable} />;
  });
