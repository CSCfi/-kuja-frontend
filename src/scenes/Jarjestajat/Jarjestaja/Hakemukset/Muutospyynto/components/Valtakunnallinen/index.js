import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import CheckboxWithLabel from "../../../../../../../components/01-molecules/CheckboxWithLabel";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";

const Valtakunnallinen = React.memo(props => {
  const name = "valtakunnallinen";
  const [isChecked, setIsChecked] = useState(false);

  const handleChanges = (payload, { isChecked }) => {
    return props.callback({ payload, isChecked });
  };

  useEffect(() => {
    setIsChecked(props.isCheckedInitial || props.changes.properties.isChecked);
  }, [props.changes, props.data, props.isCheckedInitial]);

  return (
    <>
      <p className="pb-4">
        {props.intl.formatMessage(wizardMessages.areasInfo3)}
      </p>
      {/* 
        If not in Lupa but checkbox is checked -> added 
        If in Lupa but checkbox is unchecked -> removed 
      */}
      <CheckboxWithLabel
        name={`${name}-checkbox`}
        id={`${name}-checkbox`}
        isChecked={isChecked}
        labelStyles={Object.assign(
          {},
          !props.isCheckedInitial && props.changes.properties.isChecked
            ? isAdded
            : {},
          props.isCheckedInitial && !props.changes.properties.isChecked
            ? isRemoved
            : {},
          props.isCheckedInitial ? isInLupa : {}
        )}
        onChanges={handleChanges}
      >
        {props.intl.formatMessage(wizardMessages.responsibilities)}
      </CheckboxWithLabel>
    </>
  );
});

Valtakunnallinen.defaultProps = {
  changes: {}
};

Valtakunnallinen.propTypes = {
  isCheckedInitial: PropTypes.bool,
  callback: PropTypes.func,
  changes: PropTypes.object
};

export default injectIntl(Valtakunnallinen);
