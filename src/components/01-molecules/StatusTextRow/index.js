import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as R from "ramda";

const defaultProps = {
  styleClasses: ["text-base", "py-4"]
};

const StatusTextRow = React.memo(({ children, labelStyles, styleClasses }) => {
  const [classNames, setClassNames] = useState(defaultProps.styleClasses);

  useEffect(() => {
    if (styleClasses && styleClasses.length) {
      setClassNames(styleClasses);
    }
  }, [styleClasses]);

  return (
    <div className={R.join(" ", classNames)} style={labelStyles}>
      {children}
    </div>
  );
});

StatusTextRow.propTypes = {
  labelStyles: PropTypes.object,
  styleClasses: PropTypes.array
};

export default StatusTextRow;
