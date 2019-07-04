import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const Difference = props => {
  const [initialValue, setInitialValue] = useState(props.initialValue);
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setInitialValue(props.initialValue);
    setValue(props.value);
  }, [props.initialValue, props.value]);

  return (
    <React.Fragment>
      <div className="flex">
        <div className="flex-1 flex-col">
          <Typography>{props.titles[0]}</Typography>
          <div>{initialValue}</div>
        </div>
        <div className="flex-1 flex-col">
          <Typography>{props.titles[1]}</Typography>
          <div>
            <TextField
              type="number"
              inputProps={{ min: "0" }}
              onChange={e => {
                return setValue(parseInt(e.target.value || "0", 10));
              }}
              value={value}
            />
          </div>
        </div>
        <div className="flex-1 flex-col">
          <Typography>{props.titles[2]}</Typography>
          <div>{value - initialValue}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

Difference.defaultProps = {
  value: 0,
  titles: ["[Title 1]", "[Title 2]", "[Title 3]"]
};

Difference.propTypes = {
  initialValue: PropTypes.number,
  titles: PropTypes.array,
  value: PropTypes.number
};

export default Difference;
