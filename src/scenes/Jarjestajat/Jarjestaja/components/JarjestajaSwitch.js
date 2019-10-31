import React, { useContext, useMemo } from "react";
import { Switch, Route } from "react-router-dom";
import Jarjestaja from "../components/Jarjestaja";
import PropTypes from "prop-types";
import { LupahistoriaProvider } from "../../../../context/lupahistoriaContext";
import { BackendContext } from "../../../../context/backendContext";
import { injectIntl } from "react-intl";
import { isReady } from "../../../../services/backendService";
import * as R from "ramda";
import { parseLupa } from "../../../../services/luvat/lupaParser";
import HakemusContainer from "../Hakemukset/HakemusContainer";
import FetchHandler from "../../../../FetchHandler";

const JarjestajaSwitch = ({ history, intl, match, organisaatio, user }) => {
  const { state: fromBackend, dispatch } = useContext(BackendContext);

  const ytunnus = useMemo(() => {
    return match.params.ytunnus;
  }, [match]);

  const fetchSetup = useMemo(() => {
    return ytunnus
      ? [
          {
            key: "lupa",
            subKey: ytunnus,
            dispatchFn: dispatch,
            urlEnding: `${ytunnus}?with=all`
          },
          { key: "muutospyynnot", dispatchFn: dispatch, urlEnding: ytunnus }
        ]
      : [];
  }, [dispatch, ytunnus]);

  const lupa = useMemo(() => {
    return fromBackend.lupa && isReady(fromBackend.lupa[ytunnus])
      ? fromBackend.lupa[ytunnus].raw
      : {};
  }, [fromBackend.lupa, ytunnus]);

  const lupaKohteet = useMemo(() => {
    return R.isEmpty(lupa) ? {} : parseLupa(lupa, intl.formatMessage);
  }, [lupa, intl.formatMessage]);

  return (
    <React.Fragment>
      <FetchHandler
        fetchSetup={fetchSetup}
        ready={
          <React.Fragment>
            <Switch>
              <Route
                exact
                path={`${match.path}/hakemukset-ja-paatokset/uusi/:page`}
                render={props => {
                  return (
                    <HakemusContainer
                      history={history}
                      lupaKohteet={lupaKohteet}
                      lupa={lupa}
                      match={props.match}
                    />
                  );
                }}
              />
              <Route
                exact
                path={`${match.path}/hakemukset-ja-paatokset/:uuid/:page`}
                render={props => {
                  return (
                    <HakemusContainer
                      history={history}
                      lupaKohteet={lupaKohteet}
                      lupa={lupa}
                      match={props.match}
                    />
                  );
                }}
              />
              <Route
                path={`${match.path}`}
                render={() => (
                  <LupahistoriaProvider>
                    {ytunnus && (
                      <Jarjestaja
                        lupaKohteet={lupaKohteet}
                        lupa={lupa}
                        match={match}
                        muutospyynnot={fromBackend.muutospyynnot.raw}
                        organisaatio={organisaatio}
                        user={user}
                      />
                    )}
                  </LupahistoriaProvider>
                )}
              />
            </Switch>
          </React.Fragment>
        }
      ></FetchHandler>
    </React.Fragment>
  );
};

JarjestajaSwitch.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  organisaatio: PropTypes.object,
  user: PropTypes.object
};

export default injectIntl(JarjestajaSwitch);
