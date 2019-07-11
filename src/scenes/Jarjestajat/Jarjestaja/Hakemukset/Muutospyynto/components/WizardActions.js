import React from "react";
import {
  WizardBottom,
  Container
} from "./MuutospyyntoWizardComponents";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

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

  return (
    <WizardBottom>
      <Container maxWidth="1085px" padding="15px">
        <Button
          color="primary"
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
            !props.onNext ? "button-hidden" : ""
            }`}
          onClick={onNextClick}
        >
          Seuraava
        </Button>
      </Container>
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

export default WizardActions;
