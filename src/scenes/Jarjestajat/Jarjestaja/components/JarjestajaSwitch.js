import React, { useContext, useEffect, useMemo } from "react";
import { Switch, Route } from "react-router-dom";
import Jarjestaja from "../components/Jarjestaja";
import { LupahistoriaProvider } from "../../../../context/lupahistoriaContext";
import Hakemus from "../Hakemukset/Hakemus";
import { BackendContext } from "../../../../context/backendContext";
import {
  abort,
  fetchFromBackend
} from "../../../../services/backendService";

const JarjestajaSwitch = props => {
  const { state: fromBackend, dispatch } = useContext(BackendContext);
  const { ytunnus } = props.match.params;

  /**
   * Abort controller instances are used for cancelling the related
   * XHR calls later.
   */
  const abortControllers = useMemo(() => {
    return fetchFromBackend([
      { key: "lupa", dispatchFn: dispatch, urlEnding: `${ytunnus}?with=all` },
      { key: "muutospyynnot", dispatchFn: dispatch, urlEnding: ytunnus }
    ]);
  }, [dispatch, ytunnus]);

  /**
   * Ongoing XHR calls must be canceled. It's done here.
   */
  useEffect(() => {
    return () => {
      abort(abortControllers);
    };
  }, [abortControllers, dispatch]);

  return (
    <React.Fragment>
      <Switch>
        <Route
          exact
          path={`${props.match.path}/hakemukset-ja-paatokset/uusi/:page`}
          render={props => {
            return <Hakemus lupa={fromBackend.lupa} {...props} />;
          }}
        />
        <Route
          exact
          path={`${props.match.path}/hakemukset-ja-paatokset/:uuid/:page`}
          render={props => {
            return <Hakemus lupa={fromBackend.lupa} {...props} />;
          }}
        />
        <Route
          path={`${props.match.path}`}
          render={props => (
            <LupahistoriaProvider>
              <Jarjestaja
                lupa={fromBackend.lupa}
                muutospyynnot={fromBackend.muutospyynnot}
                {...props}
              />
            </LupahistoriaProvider>
          )}
        />
      </Switch>
    </React.Fragment>
  );
};

export default JarjestajaSwitch;
