import React, { useState } from "react";
import Select from "react-select";
import { handleTutkintokieliSelectChange } from "../../../../../../services/koulutukset/koulutusUtil";

const KieliSelect = props => {
  const [state, setState] = useState({
    selectedOption: props.value
  });

  const handleChange = selectedOption => {
    setState({ selectedOption });
    const { editValues, fields, isInLupa, tutkinto } = props;
    handleTutkintokieliSelectChange(
      editValues,
      fields,
      isInLupa,
      tutkinto,
      selectedOption
    );
  };

  const { selectedOption } = state;
  const { identifier, kielet, disabled } = props;

  return (
    <div className="flex-3">
      <Select
        name={`select-${identifier}`}
        value={selectedOption}
        onChange={handleChange}
        options={kielet}
        disabled={disabled}
        placeholder="Valitse kieli..."
      />
    </div>
  );
};

export default KieliSelect;
