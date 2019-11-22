import React from "react";

const TableRow = ({ children }) => {
  return (
    <div key={`key-${Math.random()}`} role="row" className="flex">
      {children}
    </div>
  );
};

export default TableRow;
