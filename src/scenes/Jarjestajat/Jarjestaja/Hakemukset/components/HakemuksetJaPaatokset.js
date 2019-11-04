import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import MuutospyyntoList from "./MuutospyyntoList";
import { MessageWrapper } from "../../../../../modules/elements";
import { COLORS } from "../../../../../modules/styles";
import { ROLE_KAYTTAJA } from "../../../../../modules/constants";
import { HAKEMUS_VIESTI } from "../Muutospyynto/modules/uusiHakemusFormConstants";
import * as R from "ramda";

const Wrapper = styled.div`
  position: relative;
`;

const UusiMuutospyynto = styled(Link)`
  position: absolute;
  right: 0;
  top: 10px;
  padding: 6px 12px;
  color: ${COLORS.OIVA_GREEN};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const HakemuksetJaPaatokset = ({
  match,
  muutospyynnot,
  organisaatio,
  user
}) => {
  const getMuutospyyntoUrl = () => {
    return `${match.url}/uusi`;
  };

  if (sessionStorage.getItem("role") !== ROLE_KAYTTAJA) {
    return (
      <MessageWrapper>
        <h3>{HAKEMUS_VIESTI.KIRJAUTUMINEN.FI}</h3>
      </MessageWrapper>
    );
  }

  if (R.includes(ROLE_KAYTTAJA, user.roles) && organisaatio.oid === user.oid) {
    return (
      <Wrapper>
        <h2>Hakemukset</h2>
        <UusiMuutospyynto to={getMuutospyyntoUrl()}>Luo uusi</UusiMuutospyynto>
        <MuutospyyntoList muutospyynnot={muutospyynnot} />
      </Wrapper>
    );
  } else {
    return (
      <MessageWrapper>
        <h3>{HAKEMUS_VIESTI.KIRJAUTUMINEN.FI}</h3>
      </MessageWrapper>
    );
  }
};

HakemuksetJaPaatokset.propTypes = {
  match: PropTypes.object,
  muutospyynnot: PropTypes.array,
  organisaatio: PropTypes.object
};

export default HakemuksetJaPaatokset;
