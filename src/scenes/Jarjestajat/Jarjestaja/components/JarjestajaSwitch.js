import React, { useContext, useEffect, useMemo } from "react";
import { Switch, Route } from "react-router-dom";
import Jarjestaja from "../components/Jarjestaja";
import PropTypes from "prop-types";
import { LupahistoriaProvider } from "../../../../context/lupahistoriaContext";
import Hakemus from "../Hakemukset/Hakemus";
import { BackendContext } from "../../../../context/backendContext";
import {
  abort,
  fetchFromBackend,
  getFetchState,
  statusMap
} from "../../../../services/backendService";
import * as R from "ramda";
import Loading from "../../../../modules/Loading";

const JarjestajaSwitch = ({ match, organisaatio, user, ytunnus }) => {
  const { state: fromBackend, dispatch } = useContext(BackendContext);

  /**
   * Abort controller instances are used for cancelling the related
   * XHR calls later.
   */
  const abortControllers = useMemo(() => {
    return ytunnus
      ? fetchFromBackend([
          {
            key: "lupa",
            dispatchFn: dispatch,
            urlEnding: `${ytunnus}?with=all`
          },
          { key: "muutospyynnot", dispatchFn: dispatch, urlEnding: ytunnus }
        ])
      : [];
  }, [dispatch, ytunnus]);

  /**
   * Ongoing XHR calls must be canceled. It's done here.
   */
  useEffect(() => {
    return () => {
      abort(abortControllers);
    };
  }, [abortControllers, dispatch]);

  const fetchState = useMemo(() => {
    return getFetchState([fromBackend.lupa, fromBackend.muutospyynnot]);
  }, [fromBackend.lupa, fromBackend.muutospyynnot]);

  const view = useMemo(() => {
    let jsx = <React.Fragment></React.Fragment>;
    if (fetchState === statusMap.fetching) {
      jsx = <Loading />;
    } else if (fetchState === statusMap.ready) {
      return (
        <React.Fragment>
          <Switch>
            <Route
              exact
              path={`${match.path}/hakemukset-ja-paatokset/uusi/:page`}
              render={props => {
                return <Hakemus lupa={fromBackend.lupa} {...props} />;
              }}
            />
            <Route
              exact
              path={`${match.path}/hakemukset-ja-paatokset/:uuid/:page`}
              render={props => {
                return <Hakemus lupa={fromBackend.lupa} {...props} />;
              }}
            />
            <Route
              path={`${match.path}`}
              render={() => (
                <LupahistoriaProvider>
                  <Jarjestaja
                    lupa={R.path(["lupa", "raw"], fromBackend)}
                    match={match}
                    muutospyynnot={fromBackend.muutospyynnot.raw}
                    organisaatio={organisaatio}
                    user={user}
                  />
                </LupahistoriaProvider>
              )}
            />
          </Switch>
        </React.Fragment>
      );
    }
    return jsx;
  }, [fetchState, fromBackend, match, organisaatio, user]);

  return view;
};

JarjestajaSwitch.propTypes = {
  match: PropTypes.object,
  organisaatio: PropTypes.object,
  user: PropTypes.object,
  ytunnus: PropTypes.string
};

export default JarjestajaSwitch;
