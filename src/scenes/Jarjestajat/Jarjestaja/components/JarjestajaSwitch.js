import React, { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Jarjestaja from "../components/Jarjestaja";
import { MuutospyynnotContext } from "context/muutospyynnotContext";
import { LuvatContext } from "context/luvatContext";
import { fetchLupa } from "services/luvat/actions";
import { fetchMuutospyynnot } from "services/muutospyynnot/actions";
import MuutospyyntoWizard from "../Hakemukset/Muutospyynto/components/MuutospyyntoWizard";
import { LupahistoriaProvider } from "../../../../context/lupahistoriaContext";

const JarjestajaSwitch = props => {
  const { state: lupa, dispatch: luvatDispatch } = useContext(LuvatContext);
  const { state: muutospyynnot, dispatch: muutospyynnotDispatch } = useContext(
    MuutospyynnotContext
  );
  const { ytunnus } = props.match.params;

  useEffect(() => {
    fetchLupa(ytunnus, "?with=all")(luvatDispatch);
    fetchMuutospyynnot(ytunnus)(muutospyynnotDispatch);
  }, [ytunnus, luvatDispatch, muutospyynnotDispatch]);

  return (
    <React.Fragment>
      <Switch>
        <Route
          exact
          path={`${props.match.path}/hakemukset-ja-paatokset/uusi/:page`}
          render={props => {
            return <MuutospyyntoWizard lupa={lupa} {...props} />;
          }}
        />
        <Route
          exact
          path={`${props.match.path}/hakemukset-ja-paatokset/:uuid/:page`}
          render={props => {
            return <MuutospyyntoWizard lupa={lupa} {...props} />;
          }}
        />
        <Route
          path={`${props.match.path}`}
          render={props => (
            <LupahistoriaProvider>
              <Jarjestaja
                lupa={lupa}
                muutospyynnot={muutospyynnot}
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
