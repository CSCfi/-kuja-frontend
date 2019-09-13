import React from "react";
import PropTypes from "prop-types";

import Section from "../Section";
const FormSection = React.memo(
  ({
    children,
    code,
    id,
    muutoshakemus,
    render,
    runOnChanges,
    runOnStateUpdate,
    title
  }) => {
    const updateChanges = payload => {
      runOnChanges(payload.anchor, payload.changes);
    };

    const updateState = (data, sectionId) => {
      runOnStateUpdate(sectionId || id, data);
    };

    const removeChanges = (...payload) => {
      return updateChanges({ anchor: payload[1], changes: [] });
    };

    return (
      <Section code={code} title={title}>
        {!!render
          ? render({
              muutoshakemus,
              onChangesRemove: removeChanges,
              onChangesUpdate: updateChanges,
              onStateUpdate: updateState,
              sectionId: id
            })
          : null}
        {children}
      </Section>
    );
  }
);

FormSection.propTypes = {
  id: PropTypes.string,
  code: PropTypes.number,
  muutoshakemus: PropTypes.object,
  runOnChanges: PropTypes.func,
  runOnStateUpdate: PropTypes.func,
  title: PropTypes.string
};

export default FormSection;
