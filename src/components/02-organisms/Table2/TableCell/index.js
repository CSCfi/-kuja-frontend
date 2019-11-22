import React from "react";
import PropTypes from "prop-types";
import * as R from "ramda";

const TableCell = ({ children, properties = {} }) => {
  const classNames = R.join(" ", properties.styleClasses || []);

  return (
    <div
      key={`key-${Math.random()}`}
      role={properties.isHeader ? "columnheader" : "gridCell"}
      className={`${classNames} ${
        properties.isHeader ? "bg-green-400" : ""
      } border p-4`}>
      {properties.title} {children}
    </div>
  );
};

TableCell.propTypes = {
  properties: PropTypes.object,
  styleClasses: PropTypes.array
};

export default TableCell;
