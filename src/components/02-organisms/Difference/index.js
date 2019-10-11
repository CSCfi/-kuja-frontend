import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import * as R from "ramda";

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

  const isRequired = payload.component.isRequired;
  let isValid = true;
  if(isRequired === true) {
    if(initialValue > 0) {
      //TODO: Is there an explicit way of knowing whether this component was added as new?
      //Implied not new: initialValue already exists we do not force user to enter adjustment (existing behaviour)
      isValid = value >= 0;
    }
    else {
      //Implied new: Number must be entered when new
      //We need this hack because the value is actually empty string when the field is empty
      isValid = !(typeof value == 'string') && value >= 0;
    }
  }


  const handleChange = useCallback(
    (actionResults, payload) => {
      setValue(isNaN(actionResults.value) ? "" : actionResults.value);
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }
      setTimeoutHandle(
        setTimeout(() => {
          onChanges(payload, {
            applyForValue: isNaN(actionResults.value) ? initialValue : actionResults.value,
            isValid: actionResults.isValid
          });
        }, delay)
      );
    },
    [delay, initialValue, onChanges, timeoutHandle]
  );

  useEffect(() => {
    setValue(applyForValue === initialValue ? "" : applyForValue);
  }, [applyForValue, initialValue]);

  const containerClass = isValid ? "flex" : "flex bg-yellow-300";

  const initialAreaTitle = titles[0];
  const inputAreaTitle = isRequired ? titles[1]+'*' : titles[1];
  const changeAreaTitle = titles[2];

  return (
    <React.Fragment>
      <div className={containerClass}>
        <div className="flex-1 flex-col">
          <Typography>{initialAreaTitle}</Typography>
          <div>{initialValue}</div>
        </div>
        <div className="flex-1 flex-col">
          <Typography>{inputAreaTitle}</Typography>
          <div>
            <TextField
              type="number"
              inputProps={{ min: "0" }}
              onChange={e =>
                handleChange({value: parseInt(e.target.value, 10), isValid}, payload)
              }
              value={value}
            />
          </div>
        </div>
        <div className="flex-1 flex-col">
          <Typography>{changeAreaTitle}</Typography>
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
