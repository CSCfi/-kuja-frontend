import React, { useContext } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { BackendContext } from "../../context/backendContext";

import { ROLE_ESITTELIJA } from "modules/constants";

const Successful = styled.div`
  padding-left: 20px;
  margin: auto;
  width: 1200px;
`;

const CasAuthenticated = () => {
  const { state } = useContext(BackendContext);

  let ytunnus = undefined;
  if (state.organisaatio) {
    ytunnus = state.organisaatio.raw.ytunnus;
  }

  // TODO: Different roles routing here when applicable
  if (
    state.kauttaja &&
    state.kayttaja.raw.roles.length > 1 &&
    state.kayttaja.raw.roles[1] === ROLE_ESITTELIJA
  ) {
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
