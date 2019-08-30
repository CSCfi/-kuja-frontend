import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Section from "../Section";

const FormSection = ({
  sectionChanges = {},
  children,
  code,
  id,
  render,
  runOnChanges,
  title
}) => {
  const [changes, setChanges] = useState([]);

  useEffect(() => {
    if (!!runOnChanges) {
      runOnChanges(id, { changes });
    }
  }, [runOnChanges, changes, id]);

  useEffect(() => {
    setChanges(sectionChanges);
  }, [sectionChanges]);

  const updateChanges = payload => {
    setChanges(prevChanges => ({
      ...prevChanges,
      [payload.anchor]: payload.changes
    }));
  };

  const removeChanges = (...payload) => {
    return updateChanges(payload);
  };

  return (
    <Section code={code} title={title}>
      {!!render
        ? render({
            sectionChanges: changes,
            onChangesRemove: removeChanges,
            onUpdate: updateChanges,
            sectionId: id
          })
        : null}
      {children}
    </Section>
  );
};

FormSection.propTypes = {
  id: PropTypes.string,
  sectionChanges: PropTypes.object,
  code: PropTypes.number,
  runOnChanges: PropTypes.func,
  title: PropTypes.string
};

export default FormSection;
