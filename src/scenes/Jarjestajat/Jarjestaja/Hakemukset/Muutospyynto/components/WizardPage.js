import React, { useEffect, useState } from "react";
import WizardActions from "./WizardActions";
import PropTypes from "prop-types";

const WizardPage = props => {
  const [isSavingEnabled, setIsSavingEnabled] = useState(false);
  const onSave = () => {
    setIsSavingEnabled(false);
    // TODO: Save
  };

  useEffect(() => {
    setIsSavingEnabled(true);
  }, [props.muutoshakemus]);

  return (
    <div>
      {props.children}
      <WizardActions
        pageNumber={props.pageNumber}
        onPrev={props.onPrev}
        onNext={props.onNext}
        onSave={onSave}
        isSavingEnabled={isSavingEnabled}
      />
    </div>
  );
};

WizardPage.defaultProps = {
  changes: []
};

WizardPage.propTypes = {
  muutoshakemus: PropTypes.object,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onSave: PropTypes.func,
  pageNumber: PropTypes.number
};

export default WizardPage;
