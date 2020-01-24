import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CheckIcon from "@material-ui/icons/Check";
import * as R from "ramda";

const defaultProps = {
  styleClasses: ["text-base"]
};

const StatusTextRow = React.memo(
  ({
    children,
    isHidden,
    isRequired,
    isValid,
    labelStyles,
    layout,
    statusText,
    statusTextStyleClasses,
    styleClasses
  }) => {
    const [classNames, setClassNames] = useState(defaultProps.styleClasses);

    useEffect(() => {
      if (styleClasses && styleClasses.length) {
        setClassNames(styleClasses);
      }
    }, [styleClasses]);

    useEffect(() => {
      const paddingClass = layout && layout.dense ? "pt-2" : "py-2";
      setClassNames(prevValue => {
        return R.append(paddingClass, prevValue);
      });
    }, [layout]);

    if (!isHidden) {
      return (
        <div className={R.join(" ", classNames)} style={labelStyles}>
          <div className="flex">
            {statusText && (
              <div className={R.join(" ", statusTextStyleClasses)}>
                {statusText}
              </div>
            )}
            {isRequired && (
              <span className={`text-${isValid ? "green" : "red"}-500 pr-2`}>
                {isValid && <CheckIcon fontSize="small"></CheckIcon>}
                {!isValid && <span>*</span>}
              </span>
            )}
            {children}
          </div>
        </div>
      );
    }
  }
);

StatusTextRow.propTypes = {
  isHidden: PropTypes.bool,
  isRequired: PropTypes.bool,
  isValid: PropTypes.bool,
  labelStyles: PropTypes.object,
  layout: PropTypes.object,
  styleClasses: PropTypes.array,
  statusText: PropTypes.string,
  statusTextStyleClasses: PropTypes.array
};

export default StatusTextRow;
