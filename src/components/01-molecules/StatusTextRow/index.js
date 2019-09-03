import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as R from "ramda";

const defaultProps = {
  styleClasses: ["text-base", "py-4"]
};

const StatusTextRow = React.memo(
  ({ children, styleClasses = defaultProps.styleClasses }) => {
    const [classNames, setClassNames] = useState(styleClasses);

    useEffect(() => {
      console.info(styleClasses);
      setClassNames(styleClasses);
    }, [styleClasses]);

    return <div className={R.join(" ", classNames)}>{children}</div>;
  }
);

StatusTextRow.propTypes = {
  styleClasses: PropTypes.array
};

export default StatusTextRow;
