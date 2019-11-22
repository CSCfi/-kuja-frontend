import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import simpleStory from "./storydata/simpleStory";
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
            console.info(cellData.styleClasses);
            return getHeaderCell({
              styleClasses: cellData.styleClasses || [
                `w-1/${cellsOfARow.length}`
              ],
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
                styleClasses: cellData.styleClasses || [
                  `w-1/${cellsOfARow.length}`
                ],
                title: cellData.text
              },
              cellData
            );
            return {
              ...cell,
              includes: cellData.includes || []
            };
          }, cellsOfARow)
        }
      };
      return obj;
    }

    function addToObject(rows, isHeader = false, index = 0, result = {}) {
      const prefix = isHeader ? "header-" : "";
      const objectToAdd = getTableRow(`${prefix}row-${index}`, {
        includes: [`cells-of-${prefix}row-${index}`]
      });
      const updatedResult = Object.assign({}, result, objectToAdd);
      if (rows[index + 1]) {
        return addToObject(rows, isHeader, index + 1, updatedResult);
      }
      return updatedResult;
    }

    function addCellsToObject(
      cellsOfArrayBody,
      isHeader = false,
      index = 0,
      result = {}
    ) {
      const objectToAdd = isHeader
        ? dataCellsOnHeaderRow(
            `cells-of-header-row-${index}`,
            cellsOfArrayBody[index]
          )
        : dataCellsOnRow(`cells-of-row-${index}`, cellsOfArrayBody[index]);
      const updatedResult = Object.assign({}, result, objectToAdd);
      if (cellsOfArrayBody[index + 1]) {
        return addCellsToObject(
          cellsOfArrayBody,
          isHeader,
          index + 1,
          updatedResult
        );
      }
      return updatedResult;
    }

    const structure = Object.assign(
      {},
      getMain({
        includes: ["rowGroupHeader", "rowGroupBody"]
      }),
      getRowGroup("rowGroupHeader", {
        includes: R.map(
          key => `header-row-${key}`,
          Object.keys(simpleStory.header.rows)
        )
      }),
      getRowGroup("rowGroupBody", {
        includes: R.map(key => `row-${key}`, Object.keys(simpleStory.body.rows))
      }),
      addToObject(simpleStory.header.rows, true),
      addToObject(simpleStory.body.rows),
      addCellsToObject(R.map(R.prop("cells"), simpleStory.header.rows), true),
      addCellsToObject(R.map(R.prop("cells"), simpleStory.body.rows))
    );

    console.info(structure);

    return <Table2 structure={structure} components={components} />;
  });
