import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import multidimensionalTable from "./storydata/multidimensionalTable";
import simpleTable from "./storydata/simpleTable";
import Table from "./index";

/**
 * Tables are created using descriptive structures. One per table.
 * Example structures are defined under storydata folder. A table
 * can contain 0 - n sub tables, sub tables can contain sub tables
 * and so on. The most common use case is propably a one dimension
 * table.
 */
storiesOf("Table", module)
  .addDecorator(withInfo)
  .add("Multidimensional table", () => {
    return <Table structure={multidimensionalTable} />;
  })
  .add("Simple table", () => {
    return <Table structure={simpleTable} />;
  });
