import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const Difference = props => {
  const [difference, setDifference] = useState(props.initialValue);

  return (
    <React.Fragment>
      <div className="flex">
        <div className="flex-1 flex-col">
          <Typography>{props.titles[0]}</Typography>
          <div>{props.initialValue}</div>
        </div>
        <div className="flex-1 flex-col">
          <Typography>{props.titles[1]}</Typography>
          <div>
            <TextField
              type="number"
              inputProps={{ min: "0" }}
              onChange={e => {
                return setDifference(
                  parseInt(e.target.value || "0", 10) - props.initialValue
                );
              }}
              value={props.nextValue}
            />
          </div>
        </div>
        <div className="flex-1 flex-col">
          <Typography>{props.titles[2]}</Typography>
          <div>{difference}</div>
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
