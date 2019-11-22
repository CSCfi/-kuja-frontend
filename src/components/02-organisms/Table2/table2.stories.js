import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import Table2 from "./index";
import * as R from "ramda";

const components = [
  {
    id: "grid",
    name: "Grid"
  },
  {
    id: "table-row",
    name: "TableRow",
    properties: {
      isHeader: true
    }
  },
  {
    id: "header-cell",
    name: "TableCell",
    properties: {
      isHeader: true
    }
  },
  {
    id: "cell",
    name: "TableCell"
  },
  {
    id: "row-group",
    name: "RowGroup"
  }
];

function getCell(properties) {
  return {
    ref: "cell",
    properties
  };
}

function getHeaderCell(properties) {
  return {
    ref: "header-cell",
    properties
  };
}

storiesOf("Table2", module)
  .addDecorator(withInfo)
  .add("Simple table", () => {
    function getMain(properties) {
      return {
        main: {
          components: [
            {
              ref: "grid",
              includes: properties.includes
            }
          ]
        }
      };
    }

    function getRowGroup(id, properties) {
      return {
        [id]: {
          components: [
            {
              ref: "row-group",
              includes: properties.includes
            }
          ]
        }
      };
    }

    function getTableRow(id, properties) {
      return {
        [id]: {
          components: [
            {
              ref: "table-row",
              includes: properties.includes
            }
          ]
        }
      };
    }

    function dataCellsOnHeaderRow(id, cellsOfARow) {
      return {
        [id]: {
          components: R.map(cellData => {
            return getHeaderCell({
              styleClasses: [`w-1/${cellsOfARow.length}`],
              title: cellData.text
            });
          }, cellsOfARow)
        }
      };
    }
    function dataCellsOnRow(id, cellsOfARow) {
      const obj = {
        [id]: {
          components: R.map(cellData => {
            const cell = getCell(
              {
                styleClasses: [`w-1/${cellsOfARow.length}`],
                title: cellData.text
              },
              cellData
            );
            console.info(cell, cellData);
            return {
              ...cell,
              includes: cellData.includes || []
            };
          }, cellsOfARow)
        }
      };
      console.info(obj);
      return obj;
    }

    const structure = Object.assign(
      {},
      getMain({
        includes: ["rowGroupHeader", "rowGroupBody"]
      }),
      getRowGroup("rowGroupHeader", {
        includes: ["headerRow"]
      }),
      getRowGroup("rowGroupBody", {
        includes: ["bodyRow", "bodyRow", "bodyRow"]
      }),
      getTableRow("headerRow", {
        includes: ["dataCellsOnHeaderRow"]
      }),
      getTableRow("bodyRow", {
        includes: ["dataCellsOnRow"]
      }),
      dataCellsOnHeaderRow("dataCellsOnHeaderRow", [
        {
          text: "Column 1 title"
        },
        {
          text: "Column 2 title"
        },
        {
          text: "Column 3 title"
        },
        {
          text: "Column 4 title"
        }
      ]),
      dataCellsOnRow("dataCellsOnRow", [
        {
          text: "Random thing... long text is here. How can we handle it?"
        },
        {
          text: "Random thing"
        },
        {
          text: "Random thing"
        },
        {
          text: "Random thing"
        }
      ])
    );

    console.info(structure);

    return <Table2 structure={structure} components={components} />;
  });
