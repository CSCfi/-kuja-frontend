import React, { useContext } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../context/userContext"

import { ROLE_ESITTELIJA } from "modules/constants";

const Successful = styled.div`
  padding-left: 20px;
  margin: auto;
  width: 1200px;
`;

const CasAuthenticated = () => {
  const { state } = useContext(UserContext);

  let organisaatio = undefined;
  let ytunnus = undefined;
  if (state.oppilaitos && state.oppilaitos.organisaatio) {
    organisaatio = state.oppilaitos.organisaatio;
    if (organisaatio) {
      if (organisaatio.ytunnus) {
        ytunnus = organisaatio.ytunnus;
      }
    }
  }

  if (sessionStorage.getItem("role") === ROLE_ESITTELIJA) {
    return <Redirect to="/asiat" />;
  }

  return (
    <div>
      {state.hasErrored ? (
        <p>Kirjautumisessa tapahtui virhe</p>
      ) : ytunnus ? (
        <Redirect
          ytunnus={ytunnus}
          to={{
            pathname: "/jarjestajat/" + ytunnus + "/omattiedot",
            ytunnus: ytunnus
          }}
        />
      ) : (
        <Successful>
          <h2>
            Tervetuloa Oiva-palveluun {sessionStorage.getItem("username")}
          </h2>
        </Successful>
      )}
    </div>
  );
};

export default CasAuthenticated;
