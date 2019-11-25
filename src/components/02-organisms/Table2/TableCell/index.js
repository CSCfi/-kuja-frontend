import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import * as R from "ramda";
import { withStyles } from "@material-ui/core";

const StyledButton = withStyles({
  root: {
    border: 0,
    color: "white",
    width: "100%",
    height: "100%",
    justifyContent: "left",
    padding: "1rem"
  },
  label: {
    textTransform: "capitalize"
  }
})(Button);

const TableCell = ({ children, properties = {} }) => {
  const classNames = R.join(
    " ",
    R.without(["truncate"], properties.styleClasses || [])
  );

  function sort() {
    properties.onClick("sort", properties);
  }

  return (
    <div
      key={`key-${Math.random()}`}
      role={properties.isHeader ? "columnheader" : "gridCell"}
      className={`${classNames} ${
        properties.isHeader ? "bg-green-500 border" : "border-t p-4"
      } relative flex items-center`}>
      {properties.isSortable ? (
        <StyledButton
          aria-label="Sort"
          onClick={() => {
            sort();
          }}
          title={properties.sortingToolTip}>
          <span className="truncate">{properties.title}</span> {children}
          {properties.orderOfBodyRows &&
            properties.columnIndex ===
              properties.orderOfBodyRows.columnIndex && (
              <React.Fragment>
                {properties.orderOfBodyRows.order === "ascending" ? (
                  <ArrowUpwardIcon fontSize="small" />
                ) : (
                  <ArrowDownwardIcon fontSize="small" />
                )}
              </React.Fragment>
            )}
        </StyledButton>
      ) : (
        <React.Fragment>
          <span className="truncate">{properties.title}</span> {children}
        </React.Fragment>
      )}
    </div>
  );
};

TableCell.propTypes = {
  properties: PropTypes.object,
  styleClasses: PropTypes.array
};

export default TableCell;
