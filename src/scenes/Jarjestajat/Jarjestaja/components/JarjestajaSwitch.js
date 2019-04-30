import React, { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Jarjestaja from "../components/Jarjestaja";
import { MuutospyynnotContext } from "context/muutospyynnotContext";
import { LuvatContext } from "context/luvatContext";
import { fetchLupa } from "services/luvat/actions";
import { fetchMuutospyynnot } from "services/muutospyynnot/actions";
// import Wizard from '../Hakemukset/Muutospyynto/containers/MuutospyyntoWizardContainer'

const JarjestajaSwitch = props => {
  const { state: lupa, dispatch: luvatDispatch } = useContext(LuvatContext);
  const { state: muutospyynnot, dispatch: muutospyynnotDispatch } = useContext(
    MuutospyynnotContext
  );
  const { ytunnus } = props.match.params;

  useEffect(() => {
    fetchLupa(ytunnus, "?with=all")(luvatDispatch);
    fetchMuutospyynnot(ytunnus)(muutospyynnotDispatch);
  }, []);

  return (
    <Switch>
      {/* <Route path="/jarjestajat/:ytunnus/hakemukset-ja-paatokset/uusi/:page" render={() =>{
        return <MuutospyyntoWizardContainer />
      } } />
      <Route path="/jarjestajat/:ytunnus/hakemukset-ja-paatokset/:uuid/:page" render={() =>{
        return <MuutospyyntoWizardContainer />
      } } /> */}
      <Route
        path="/jarjestajat/:ytunnus"
        render={() => (
          <Jarjestaja lupa={lupa} muutospyynnot={muutospyynnot} {...props} />
        )}
      />
    </Switch>
  );
};

export default JarjestajaSwitch;
