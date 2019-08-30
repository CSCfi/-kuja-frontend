import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { injectIntl } from "react-intl";
import { COLORS, TRANSITIONS } from "../../../modules/styles";
import { HAKEMUS_OTSIKOT } from "../../../locales/uusiHakemusFormConstants";
import { FaPlus } from "react-icons/fa";

const LiiteTopArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FileInput = styled.div`
  color: ${props =>
    props.disabled
      ? COLORS.WHITE
      : props.color
      ? props.textColor
      : COLORS.OIVA_GREEN};
  background-color: ${props =>
    props.disabled
      ? COLORS.LIGHT_GRAY
      : props.bgColor
      ? props.bgColor
      : COLORS.WHITE};
  border: 1px solid
    ${props =>
      props.disabled
        ? COLORS.LIGHT_GRAY
        : props.bgColor
        ? props.bgColor
        : COLORS.OIVA_GREEN};
  margin: 10px 0;
  font-size: 14px;
  transition: ${TRANSITIONS.EASE_IN_OUT_QUICK};
  height: 36px;
  width: 120px;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  align-items: center;
  div {
    position: absolute;
    text-align: center;
    white-space: nowrap;
    margin: 0 auto;
    cursor: pointer;
    svg {
      margin: 2px 10px 0 0;
    }
  }
  &:hover {
    color: ${props =>
      props.disabled
        ? COLORS.WHITE
        : props.bgColor
        ? props.bgColor
        : COLORS.WHITE};
    background-color: ${props =>
      props.disabled
        ? COLORS.LIGHT_GRAY
        : props.textColor
        ? props.textColor
        : COLORS.OIVA_GREEN};
    ${props => (props.disabled ? "cursor: not-allowed;" : null)}
    cursor: pointer;
  }

  input[type="file"] {
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 36px;
  }
`;

const Attachment = React.memo(props => {
  return (
    <React.Fragment>
      <LiiteTopArea>{HAKEMUS_OTSIKOT.LIITE_OHJE.FI}</LiiteTopArea>
      <FileInput>
        <div className="flex flex-row">
          <FaPlus /> {HAKEMUS_OTSIKOT.LISAA_LIITE.FI}...
        </div>
        <input
          name={props.name}
          type="file"
          defaultValue=""
          onChange={props.setAttachment}
        />
      </FileInput>
    </React.Fragment>
  );
});

Attachment.propTypes = {
  name: PropTypes.string,
  setAttachment: PropTypes.func
};

export default injectIntl(Attachment);
