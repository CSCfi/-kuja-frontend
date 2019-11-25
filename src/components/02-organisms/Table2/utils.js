import * as R from "ramda";

/**
 * Basic table components.
 */
export const components = [
  // Grid is around the whole table data.
  {
    id: "grid",
    name: "Grid"
  },
  // It's a row of a table.
  {
    id: "table-row",
    name: "TableRow"
  },
  // Cell definition of a header row.
  {
    id: "header-cell",
    name: "TableCell",
    properties: {
      isHeader: true
    }
  },
  // Cell of a body section.
  {
    id: "cell",
    name: "TableCell"
  },
  // A row group can contain one or multiple rows.
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

export function getMain(properties) {
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

export function getRowGroup(id, properties) {
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

export function getTableRow(id, properties) {
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

export function dataCellsOnHeaderRow(id, cellsOfARow, properties, onClick) {
  return {
    [id]: {
      components: R.addIndex(R.map)((cellData, i) => {
        return getHeaderCell({
          isSortable: cellData.isSortable,
          columnIndex: i,
          orderOfBodyRows: properties.orderOfBodyRows,
          onClick: (action, properties) => {
            return onClick(action, properties);
          },
          sortingToolTip: cellData.sortingTooltip,
          styleClasses: cellData.styleClasses || [`w-1/${cellsOfARow.length}`],
          title: cellData.text
        });
      }, cellsOfARow)
    }
  };
}

export function dataCellsOnRow(id, cellsOfARow) {
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

export function addRowsToObject(
  rows = [],
  isHeader = false,
  index = 0,
  result = {}
) {
  const prefix = isHeader ? "header-" : "";
  const objectToAdd = getTableRow(`${prefix}row-${index}`, {
    includes: [`cells-of-${prefix}row-${index}`]
  });
  const updatedResult = Object.assign({}, result, objectToAdd);
  if (rows[index + 1]) {
    return addRowsToObject(rows, isHeader, index + 1, updatedResult);
  }
  return updatedResult;
}

export function addCellsToObject(
  cellsOfArrayBody,
  properties = {},
  onClick,
  index = 0,
  result = {}
) {
  const objectToAdd = properties.isHeader
    ? dataCellsOnHeaderRow(
        `cells-of-header-row-${index}`,
        cellsOfArrayBody[index],
        properties,
        onClick
      )
    : dataCellsOnRow(
        `cells-of-row-${index}`,
        cellsOfArrayBody[index],
        properties,
        onClick
      );
  const updatedResult = Object.assign({}, result, objectToAdd);
  if (cellsOfArrayBody[index + 1]) {
    return addCellsToObject(
      cellsOfArrayBody,
      properties,
      onClick,
      index + 1,
      updatedResult
    );
  }
  return updatedResult;
}
