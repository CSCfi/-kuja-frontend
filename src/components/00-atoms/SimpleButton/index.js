import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

const defaultProps = {
  payload: {},
  text: "[text is missing]",
  variant: "contained"
};

const SimpleButton = ({
  onClick,
  payload = defaultProps.payload,
  text = defaultProps.text,
  variant = defaultProps.variant
}) => {
  const handleClick = () => {
    onClick(payload);
  };

  return (
    <Button onClick={handleClick} variant={variant}>
      {text}
    </Button>
  );
};

SimpleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  payload: PropTypes.object,
  variant: PropTypes.string,
  text: PropTypes.string
};

export default SimpleButton;
