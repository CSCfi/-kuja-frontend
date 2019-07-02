import React from "react";
import {
  Button,
  SubtleButton,
  WizardBottom,
  Container
} from "./MuutospyyntoWizardComponents";
import PropTypes from "prop-types";

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
          type="button"
          className={`previous button-left ${
            !props.onPrev ? "button-hidden" : ""
          }`}
          onClick={onPrevClick}
        >
          Edellinen
        </Button>
        <div>
          <SubtleButton disabled={!props.isSavingEnabled} onClick={onSaveClick}>
            Tallenna luonnos
          </SubtleButton>
        </div>
        <Button
          type="button"
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
