import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import * as R from "ramda";
import TableCell from "./TableCell";
import TableRow from "./TableRow";
import RowGroup from "./RowGroup";

const Table = ({ structure, level = 0 }) => {
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

  function onRowClick(action, row, tableLevel) {
    if (row.onClick) {
      row.onClick(row, action);
    }
  }

  function onCellClick(action, { columnIndex, cell, row }) {
    if (action === "sort") {
      setOrderOfBodyRows(prevState => {
        let order = R.prop(prevState.order, orderSwap);
        if (prevState.columnIndex !== columnIndex) {
          order = "ascending";
        }
        return { columnIndex: columnIndex, order };
      });
    } else {
      onRowClick(action, row);
    }
  }

  const getRowsToRender = (part, rows = []) => {
    const jsx = R.addIndex(R.map)((row, iii) => {
      return (
        <React.Fragment key={iii}>
          <TableRow
            key={`row-${iii}`}
            row={row}
            onClick={onRowClick}
            tableLevel={level}>
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
                  row={row}
                  tableLevel={level}>
                  {cell.table && (
                    <Table level={level + 1} structure={cell.table}></Table>
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
            <RowGroup key={`rowGroup-${ii}`} tableLevel={level}>
              {getRowsToRender(part, rowGroup.rows)}
            </RowGroup>
          );
        }, part.rowGroups || [])}
      </React.Fragment>
    );
  }, sortedStructure);

  return <div role="grid">{table}</div>;
};

Table.propTypes = {
  structure: PropTypes.array
};

export default Table;
