import React from "react";
import {
  WizardBottom,
} from "./MuutospyyntoWizardComponents";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { injectIntl } from "react-intl";

const WizardActions = props => {
  const onPrevClick = () => {
    props.onPrev(props.pageNumber);
  };

  const onNextClick = () => {
    props.onNext(props.pageNumber);
  };

  const onSaveClick = () => {
    props.onSave();
  };

  const {
    intl: { formatMessage }
  } = props;

  return (
    <WizardBottom>
      <div className="flex justify-between w-full max-w-5xl p-4 mx-auto">
        <Button
          color="primary"
          variant="contained"
          className={`previous button-left ${
            !props.onPrev ? "invisible" : ""
            }`}
          onClick={onPrevClick}
        >
          Edellinen
        </Button>
        <div>
          <Button
            color="primary"
            disabled={!props.isSavingEnabled}
            onClick={onSaveClick}>
            Tallenna luonnos
          </Button>
        </div>
        <Button
          color="primary"
          variant="contained"
          className={`next button-right ${
            !props.onNext ? "invisible" : ""
            }`}
          onClick={onNextClick}
        >
          Seuraava
        </Button>
      </div>
    </WizardBottom>
  );
};

WizardActions.propTypes = {
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  pageNumber: PropTypes.number,
  isSavingEnabled: PropTypes.bool,
  save: PropTypes.func
};

export default injectIntl(WizardActions);
