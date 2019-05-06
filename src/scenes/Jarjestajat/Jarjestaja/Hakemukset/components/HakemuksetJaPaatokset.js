import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import MuutospyyntoList from "./MuutospyyntoList";
import Loading from "../../../../../modules/Loading";
import { MessageWrapper } from "../../../../../modules/elements";

import { COLORS } from "../../../../../modules/styles";
import { ROLE_KAYTTAJA } from "../../../../../modules/constants";
import {
  HAKEMUS_VIESTI,
  HAKEMUS_VIRHE
} from "../Muutospyynto/modules/uusiHakemusFormConstants";

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

const HakemuksetJaPaatokset = ({ match, muutospyynnot }) => {
  const getMuutospyyntoUrl = () => {
    return `${match.url}/uusi`;
  };

  const { isFetching, fetched, hasErrored, data } = muutospyynnot;

  if (sessionStorage.getItem("role") !== ROLE_KAYTTAJA) {
    return (
      <MessageWrapper>
        <h3>{HAKEMUS_VIESTI.KIRJAUTUMINEN.FI}</h3>
      </MessageWrapper>
    );
  }

  // TODO: organisaation oid pitää tarkastaa jotain muuta kautta kuin voimassaolevasta luvasta
  const { jarjestajaOid } = this.props.lupa.data;
  if (sessionStorage.getItem("oid") !== jarjestajaOid) {
    return (
      <MessageWrapper>
        <h3>{HAKEMUS_VIESTI.KIRJAUTUMINEN.FI}</h3>
      </MessageWrapper>
    );
  }

  if (fetched) {
    return (
      <Wrapper>
        <h2>Hakemukset</h2>
        <UusiMuutospyynto to={getMuutospyyntoUrl()}>
          Luo uusi
        </UusiMuutospyynto>
        <MuutospyyntoList muutospyynnot={data} />
      </Wrapper>
    );
  } else if (isFetching) {
    return <Loading />;
  } else if (hasErrored) {
    return (
      <MessageWrapper>
        <h3>{HAKEMUS_VIRHE.HAKEMUKSIENNLATAUS.FI}</h3>
      </MessageWrapper>
    );
  } else {
    return null;
  }
};

export default HakemuksetJaPaatokset;
