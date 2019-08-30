import React from "react";
import PropTypes from "prop-types";

const StatusTextRow = React.memo(props => {
  return (
    <div className="text-base py-4" style={props.labelStyles}>
      {props.children}
    </div>
  );
});

StatusTextRow.defaultProps = {};

StatusTextRow.propTypes = {
  labelStyles: PropTypes.object
};

export default StatusTextRow;
