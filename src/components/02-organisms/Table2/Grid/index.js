import React from "react";
import PropTypes from "prop-types";
import * as R from "ramda";

const Grid = ({ children, styleClasses = [] }) => {
  const classNames = R.join(" ", styleClasses);

  return (
    <div className={classNames} key={`key-${Math.random()}`} role="grid">
      {children}
    </div>
  );
};

Grid.propTypes = {
  styleClasses: PropTypes.array
};

export default Grid;
