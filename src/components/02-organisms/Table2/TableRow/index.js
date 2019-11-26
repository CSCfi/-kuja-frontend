import React from "react";

const TableRow = ({ children, properties }) => {
  function onRowClick(action = "click") {
    if (properties.onClick) {
      properties.onClick(action, properties);
    }
  }

  return (
    <div
      key={`key-${Math.random()}`}
      role="row"
      className="flex cursor-pointer hover:bg-gray-100"
      onClick={() => {
        onRowClick();
      }}>
      {children}
    </div>
  );
};

export default TableRow;
