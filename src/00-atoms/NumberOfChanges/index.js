import React from "react";
import PropTypes from "prop-types";
import { COLORS } from "modules/styles";

/**
 * The component is able to show the number of changes. If there aren't any changes it renders nothing.
 */
const NumberOfChanges = props => {
  return (
    <React.Fragment>
      {props.changes && props.changes.length ? (
        <div>
          <span className="pr-1">Muutokset:</span>
          <span color={COLORS.OIVA_PURPLE}>{props.changes.length}</span>
        </div>
      ) : null}
    </React.Fragment>
  );
};

NumberOfChanges.defaultProps = {
  changes: []
};

NumberOfChanges.propTypes = {
  /**
   * Array of any sort of values.
   */
  changes: PropTypes.array.isRequired
};

export default NumberOfChanges;
