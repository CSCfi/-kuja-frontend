import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import * as R from "ramda";
import TableCell from "./TableCell";
import TableRow from "./TableRow";

const Table2 = ({ structure, level = 0 }) => {
  const orderSwap = {
    ascending: "descending",
    descending: "ascending"
  };

  const [orderOfBodyRows, setOrderOfBodyRows] = useState({
    columnIndex: 0,
    order: "ascending"
  });

  const sortedStructure = useMemo(() => {
    const indexOfTbody = R.findIndex(R.propEq("role", "tbody"), structure);
    if (indexOfTbody >= 0) {
      const rowsPath = [indexOfTbody, "rowGroups", 0, "rows"];
      const sorted = R.sortBy(
        R.path(["cells", orderOfBodyRows.columnIndex, "text"])
      )(R.path([indexOfTbody, "rowGroups", 0, "rows"], structure) || []);
      const updatedStructure = R.assocPath(
        rowsPath,
        orderOfBodyRows.order === "ascending" ? sorted : R.reverse(sorted),
        structure
      );
      return updatedStructure;
    }
    return structure;
  }, [orderOfBodyRows, structure]);

  function onCellClick(action, { columnIndex }) {
    if (action === "sort") {
      setOrderOfBodyRows(prevState => {
        let order = R.prop(prevState.order, orderSwap);
        if (prevState.columnIndex !== columnIndex) {
          order = "ascending";
        }
        return { columnIndex: columnIndex, order };
      });
    }
  }

  function onRowClick(action, properties) {
    console.info(action, properties);
  }

  const getRowsToRender = (part, rows = []) => {
    const jsx = R.addIndex(R.map)((row, iii) => {
      return (
        <React.Fragment key={iii}>
          <TableRow
            isLastRow={iii === rows.length - 1}
            key={`row-${iii}`}
            tableLevel={level}
            onClick={() => onRowClick(row)}>
            {R.addIndex(R.map)((cell, iiii) => {
              return (
                <TableCell
                  columnIndex={iiii}
                  isHeaderCell={part.role === "thead"}
                  isOnLastRow={iii === rows.length - 1}
                  key={`cell-${iiii}`}
                  onClick={onCellClick}
                  orderOfBodyRows={orderOfBodyRows}
                  properties={cell}
                  tableLevel={level}>
                  {cell.table && (
                    <Table2 level={level + 1} structure={cell.table}></Table2>
                  )}
                </TableCell>
              );
            }, row.cells || [])}
          </TableRow>
          {row.rows && getRowsToRender(part, row.rows)}
        </React.Fragment>
      );
    }, rows);
    return jsx;
  };

  const table = R.addIndex(R.map)((part, i) => {
    return (
      <React.Fragment key={i}>
        {R.addIndex(R.map)((rowGroup, ii) => {
          return (
            <div
              key={`rowGroup-${ii}`}
              role="rowgroup"
              className={`pl-${4 * level}`}>
              {getRowsToRender(part, rowGroup.rows)}
            </div>
          );
        }, part.rowGroups || [])}
      </React.Fragment>
    );
  }, sortedStructure);

  return <div role="grid">{table}</div>;
};

Table2.propTypes = {
  structure: PropTypes.array
};

export default Table2;
