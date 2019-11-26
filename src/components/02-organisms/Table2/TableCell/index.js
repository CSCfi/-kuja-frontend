import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import * as R from "ramda";
import { withStyles } from "@material-ui/core";
import SimpleMenu from "../../SimpleMenu";

const StyledButton = withStyles({
  root: {
    border: 0,
    color: "white",
    width: "100%",
    justifyContent: "left",
    outline: "none",
    margin: "0.5rem"
  },
  label: {
    textTransform: "capitalize"
  }
})(Button);

const TableCell = ({
  children,
  columnIndex,
  isHeaderCell = false,
  isOnLastRow,
  onClick,
  orderOfBodyRows,
  properties = {},
  row,
  tableLevel = 0
}) => {
  const classNames = R.join(
    " ",
    R.without(["truncate"], properties.styleClasses || [])
  );

  function sort() {
    onClick("sort", { columnIndex, properties });
  }

  const menuActions = useMemo(() => {
    return properties.menu
      ? R.map(action => {
          return {
            ...action,
            onClick: () => {
              return onClick(action.id, {
                cell: properties,
                row
              });
            }
          };
        }, properties.menu.actions)
      : [];
  }, [properties.menu]);

  return (
    <div
      key={`key-${Math.random()}`}
      role={isHeaderCell ? "columnheader" : "gridCell"}
      className={`${classNames} ${properties.table ? "w-full" : "flex"} ${
        isHeaderCell ? `bg-green-${tableLevel + 5}00 text-white` : "p-2"
      } relative items-center ${!isOnLastRow ? "border-b" : ""}`}>
      {properties.isSortable ? (
        <StyledButton
          aria-label="Sort"
          onClick={() => {
            sort();
          }}
          title={properties.sortingTooltip}>
          {properties.text && (
            <span className={properties.truncate ? "truncate" : ""}>
              {properties.text}
            </span>
          )}
          {orderOfBodyRows && columnIndex === orderOfBodyRows.columnIndex && (
            <React.Fragment>
              {orderOfBodyRows.order === "ascending" ? (
                <ArrowUpwardIcon fontSize="small" />
              ) : (
                <ArrowDownwardIcon fontSize="small" />
              )}
            </React.Fragment>
          )}
        </StyledButton>
      ) : (
        <React.Fragment>
          <span
            className={`${
              properties.truncate ? "truncate" : ""
            } py-1 cursor-default`}>
            {properties.text}
            {properties.menu && <SimpleMenu actions={menuActions}></SimpleMenu>}
          </span>
        </React.Fragment>
      )}
      {children}
    </div>
  );
};

TableCell.propTypes = {
  columnIndex: PropTypes.number,
  isHeaderCell: PropTypes.bool,
  isOnLastRow: PropTypes.bool,
  onClick: PropTypes.func,
  orderOfBodyRows: PropTypes.object,
  properties: PropTypes.object,
  row: PropTypes.object,
  tableLevel: PropTypes.number
};

export default TableCell;
