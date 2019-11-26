import React from "react";
import PropTypes from "prop-types";

const TableRow = ({ children, onClick, row, tableLevel = 0 }) => {
  function onRowClick(action = "click") {
    if (onClick) {
      onClick(action, row, tableLevel);
    }
  }

  return (
    <div
      key={`key-${Math.random()}`}
      role="row"
      className={`hover:bg-gray-${tableLevel + 1}00 cursor-pointer flex`}
      onClick={() => {
        onRowClick();
      }}>
      {children}
    </div>
  );
};

TableRow.propTypes = {
  onClick: PropTypes.func,
  row: PropTypes.object,
  tableLevel: PropTypes.number
};

export default TableRow;
