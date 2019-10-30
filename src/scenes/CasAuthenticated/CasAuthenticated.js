import React, { useContext } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { BackendContext } from "../../context/backendContext";
import { injectIntl } from "react-intl";
import { ROLE_ESITTELIJA } from "modules/constants";
import commonMessages from "../../i18n/definitions/common";

const Successful = styled.div`
  padding-left: 20px;
  margin: auto;
  max-width: 1200px;
`;

const CasAuthenticated = props => {
  const { state } = useContext(BackendContext);
  const {
    intl: { formatMessage }
  } = props;

  let ytunnus = undefined;
  if (state.organisaatio) {
    ytunnus = state.organisaatio.raw.ytunnus;
  }

  if (state.hasErrored) {
    return <p>{formatMessage(commonMessages.loginError)}</p>;
  } else if (state.kayttaja && state.kayttaja.raw.roles.length > 1) {
    const role = state.kayttaja.raw.roles[1];
    // TODO: Different roles routing here when applicable
    switch (role) {
      case ROLE_ESITTELIJA: {
        return <Redirect to="/asiat" />;
      }
      default: {
        return (
          <Redirect
            ytunnus={ytunnus}
            to={{
              pathname: "/jarjestajat/" + ytunnus + "/omattiedot",
              ytunnus: ytunnus
            }}
          />
        );
      }
    }
  }
  return (
    <Successful>
      <h2>
        {formatMessage(commonMessages.welcome)}
        {", "}
        {sessionStorage.getItem("username")}
      </h2>
    </Successful>
  );
};

export default injectIntl(CasAuthenticated);
