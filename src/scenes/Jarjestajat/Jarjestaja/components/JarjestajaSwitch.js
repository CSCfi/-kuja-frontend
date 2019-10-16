import React, { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Jarjestaja from "../components/Jarjestaja";
import { LuvatContext } from "context/luvatContext";
import { fetchLupa } from "../../../../services/luvat/actions";
import { LupahistoriaProvider } from "../../../../context/lupahistoriaContext";
import { injectIntl } from "react-intl";
import Hakemus from "../Hakemukset/Hakemus";

const JarjestajaSwitch = props => {
  const { state: lupa, dispatch: luvatDispatch } = useContext(LuvatContext);
  const { ytunnus } = props.match.params;
  const {
    intl: { formatMessage }
  } = props;

  useEffect(() => {
    fetchLupa(ytunnus, "?with=all", formatMessage)(luvatDispatch);
  }, [ytunnus, luvatDispatch, formatMessage]);

  return (
    <React.Fragment>
      <Switch>
        <Route
          exact
          path={`${props.match.path}/hakemukset-ja-paatokset/uusi/:page`}
          render={props => {
            return <Hakemus lupa={lupa} {...props} />;
          }}
        />
        <Route
          exact
          path={`${props.match.path}/hakemukset-ja-paatokset/:uuid/:page`}
          render={props => {
            return <Hakemus lupa={lupa} {...props} />;
          }}
        />
        <Route
          path={`${props.match.path}`}
          render={props => (
            <LupahistoriaProvider>
              <Jarjestaja
                lupa={lupa}
                {...props}
              />
            </LupahistoriaProvider>
          )}
        />
      </Switch>
    </React.Fragment>
  );
};

export default injectIntl(JarjestajaSwitch);