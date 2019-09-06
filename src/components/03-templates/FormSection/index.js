import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Section from "../Section";
import * as R from "ramda";

const FormSection = ({
  changeObjects = {},
  children,
  code,
  id,
  render,
  runOnChanges,
  runOnStateUpdate,
  title
}) => {
  const [changes, setChanges] = useState({});
  const [state, setState] = useState({});

  useEffect(() => {
    if (!!runOnChanges) {
      runOnChanges(id, changes);
    }
  }, [runOnChanges, changes, id]);

  useEffect(() => {
    if (!!runOnStateUpdate) {
      runOnStateUpdate(id, state);
    }
  }, [runOnStateUpdate, state, id]);

  useEffect(() => {
    if (!R.equals(changeObjects, changes)) {
      setChanges(changeObjects);
    }
  }, [changeObjects]);

  const updateChanges = payload => {
    setChanges(prevState => {
      const nextState = R.assocPath(
        R.split("_", payload.anchor),
        payload.changes,
        prevState
      );
      return nextState;
    });
  };

  const updateState = payload => {
    setState(prevChanges => ({
      ...prevChanges,
      [payload.anchor]: payload.changes
    }));
  };

  const removeChanges = (...payload) => {
    return updateChanges({ anchor: payload[1], changes: [] });
  };

  return (
    <Section code={code} title={title}>
      {!!render
        ? render({
            changeObjects: changes,
            onChangesRemove: removeChanges,
            onChangesUpdate: updateChanges,
            onStateUpdate: updateState,
            sectionId: id
          })
        : null}
      {children}
    </Section>
  );
};

FormSection.propTypes = {
  id: PropTypes.string,
  changeObjects: PropTypes.object,
  code: PropTypes.number,
  runOnChanges: PropTypes.func,
  runOnStateUpdate: PropTypes.func,
  title: PropTypes.string
};

export default FormSection;
