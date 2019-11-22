import React from "react";
import PropTypes from "prop-types";
import * as R from "ramda";

const RowGroup = ({ children, styleClasses = [] }) => {
  const classNames = R.join(" ", styleClasses);

  return (
    <div className={classNames} key={`key-${Math.random()}`} role="rowgroup">
      {children}
    </div>
  );
};

RowGroup.propTypes = {
  styleClasses: PropTypes.array
};

export default RowGroup;
