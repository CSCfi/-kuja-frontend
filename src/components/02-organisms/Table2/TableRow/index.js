import React from "react";
import PropTypes from "prop-types";

const TableRow = ({ children, isLastRow, onClick, tableLevel = 0 }) => {
  function onRowClick(action = "click") {
    if (onClick) {
      onClick(action);
    }
  }

  return (
    <div
      key={`key-${Math.random()}`}
      role="row"
      className={`hover:bg-gray-${tableLevel + 1}00 cursor-pointer flex ${
        tableLevel > 0 ? "overflow-auto rounded-lg" : ""
      }`}
      onClick={() => {
        onRowClick();
      }}>
      {children}
    </div>
  );
};

TableRow.propTypes = {
  isLastRow: PropTypes.bool,
  onClick: PropTypes.func,
  tableLevel: PropTypes.number
};

export default TableRow;
