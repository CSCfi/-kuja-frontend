import React, { useEffect, useState } from "react";
import WizardActions from "./WizardActions";
import PropTypes from "prop-types";

const WizardPage = props => {
  const [isSavingEnabled, setIsSavingEnabled] = useState(false);
  const { onSave } = props;

  const save = () => {
    // setIsSavingEnabled(false); // todo: fix by enabling again when changes
    onSave();
  };

  useEffect(() => {
    setIsSavingEnabled(true);
  }, [props.changeObjects]);

  return (
    <div>
      {props.children}
      <WizardActions
        pageNumber={props.pageNumber}
        onPrev={props.onPrev}
        onNext={props.onNext}
        onSave={save}
        isSavingEnabled={isSavingEnabled}
        hakemusUUID={props.hakemusUUID}
      />
    </div>
  );
};

WizardPage.defaultProps = {
  changes: []
};

WizardPage.propTypes = {
  lupa: PropTypes.object,
  changeObjects: PropTypes.object,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onSave: PropTypes.func,
  pageNumber: PropTypes.number,
  hakemusUUID: PropTypes.string
};

export default WizardPage;
