import React, { useEffect, useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import chroma from "chroma-js";
import * as R from "ramda";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";

const Toimialuevalinta = React.memo(props => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const orderOptions = values => {
    return values.filter(v => v.isFixed).concat(values.filter(v => !v.isFixed));
  };

  const optionStyles = {
    control: styles => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.koodisto === "kunta" ? "#68d391" : "#c6f6d5");
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? data.color
          : isFocused
          ? color.css()
          : null,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor:
            !isDisabled && (isSelected ? data.color : color.css())
        }
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.koodisto === "kunta" ? "#68d391" : "#c6f6d5");
      return {
        ...styles,
        backgroundColor: color.css()
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "#666666"
      }
    })
  };

  const handleSelectChange = (value, { action, removedValue }) => {
    switch (action) {
      case "remove-value":
      case "pop-value":
        if (removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        value = options.filter(v => v.isFixed);
        break;
      default:
        break;
    }
    props.callback(orderOptions(value));
  };

  useEffect(() => {
    setOptions(
      R.flatten(
        R.map(maakunta => {
          return R.concat([maakunta], maakunta.kunta);
        }, props.maakuntakunnatList)
      )
    );
  }, [props.maakuntakunnatList]);

  const searchFilter = (option, searchText) => {
    return option.data.label.toLowerCase().includes(searchText.toLowerCase());
  };

  return (
    <React.Fragment>
      <p className="pb-2">
        {props.intl.formatMessage(wizardMessages.areasInfo2)}
      </p>

      <Select
        name="toimialue"
        isMulti
        value={value}
        onChange={handleSelectChange}
        inputProps={{
          id: "select-multiple"
        }}
        options={options}
        getOptionLabel={option => `${option.label}`}
        getOptionValue={option => `${option.value}`}
        isSearchable={true}
        searchFilter={searchFilter}
        styles={optionStyles}
      />
    </React.Fragment>
  );
});

Toimialuevalinta.propTypes = {
  callback: PropTypes.func,
  maakuntakunnat: PropTypes.array,
  value: PropTypes.array
};

export default injectIntl(Toimialuevalinta);
