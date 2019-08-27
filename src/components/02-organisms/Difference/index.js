import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const defaultValues = {
  applyForValue: 0,
  delay: 300,
  initialValue: 100,
  titles: ["[Title 1]", "[Title 2]", "[Title 3]"]
};

const Difference = ({
  applyForValue = defaultValues.applyForValue,
  delay = defaultValues.delay,
  initialValue = defaultValues.initialValue,
  onChanges,
  payload = {},
  titles = defaultValues.titles
}) => {
  const [timeoutHandle, setTimeoutHandle] = useState(null);
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    (value, payload) => {
      setValue(isNaN(value) ? "" : value);
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }
      setTimeoutHandle(
        setTimeout(() => {
          onChanges(payload, {
            applyForValue: isNaN(value) ? initialValue : value
          });
        }, delay)
      );
    },
    [delay, initialValue, onChanges, timeoutHandle]
  );

  useEffect(() => {
    setValue(applyForValue === initialValue ? "" : applyForValue);
  }, [applyForValue, initialValue]);

  return (
    <React.Fragment>
      <div className="flex">
        <div className="flex-1 flex-col">
          <Typography>{titles[0]}</Typography>
          <div>{initialValue}</div>
        </div>
        <div className="flex-1 flex-col">
          <Typography>{titles[1]}</Typography>
          <div>
            <TextField
              type="number"
              inputProps={{ min: "0" }}
              onChange={e =>
                handleChange(parseInt(e.target.value, 10), payload)
              }
              value={value}
            />
          </div>
        </div>
        <div className="flex-1 flex-col">
          <Typography>{titles[2]}</Typography>
          <div>{(value ? value : applyForValue) - initialValue}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

Difference.propTypes = {
  applyForValue: PropTypes.number,
  delay: PropTypes.number,
  initialValue: PropTypes.number,
  onChanges: PropTypes.func.isRequired,
  titles: PropTypes.array
};

export default Difference;
