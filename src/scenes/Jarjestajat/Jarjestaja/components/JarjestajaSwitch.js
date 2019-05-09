import React, { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Jarjestaja from "../components/Jarjestaja";
import { MuutospyynnotContext } from "context/muutospyynnotContext";
import { MuutosperustelutContext } from "context/muutosperustelutContext";
import { LuvatContext } from "context/luvatContext";
import { VankilatContext } from "context/vankilatContext";
import { ElykeskuksetContext } from "context/elykeskuksetContext";
import { PaatoskierroksetContext } from "context/paatoskierroksetContext";
import { fetchLupa } from "services/luvat/actions";
import { fetchMuutospyynnot } from "services/muutospyynnot/actions";
// import { fetchMuutosperustelut } from "services/muutosperustelut/actions";
import MuutospyyntoWizard from "../Hakemukset/Muutospyynto/components/MuutospyyntoWizard";
// import { fetchVankilat } from "../../../../services/vankilat/actions";
// import { fetchELYkeskukset } from "../../../../services/elykeskukset/actions";
// import { fetchPaatoskierrokset } from "../../../../services/paatoskierrokset/actions";
import { LupahistoriaProvider } from "../../../../context/lupahistoriaContext";

const JarjestajaSwitch = props => {
  // const { state: ELYkeskukset, dispatch: ElykeskuksetDispatch } = useContext(
  //   ElykeskuksetContext
  // );
  const { state: lupa, dispatch: luvatDispatch } = useContext(LuvatContext);
  // const {
  //   state: paatoskierrokset,
  //   dispatch: paatoskierroksetDispatch
  // } = useContext(PaatoskierroksetContext);
  // const {
  //   state: muutosperustelut,
  //   dispatch: muutosperustelutDispatch
  // } = useContext(MuutosperustelutContext);
  const { state: muutospyynnot, dispatch: muutospyynnotDispatch } = useContext(
    MuutospyynnotContext
  );
  // const { state: vankilat, dispatch: vankilatDispatch } = useContext(
  //   VankilatContext
  // );
  const { ytunnus } = props.match.params;

  useEffect(() => {
    fetchLupa(ytunnus, "?with=all")(luvatDispatch);
    fetchMuutospyynnot(ytunnus)(muutospyynnotDispatch);
    // fetchMuutosperustelut()(muutosperustelutDispatch);
    // fetchVankilat()(vankilatDispatch);
    // fetchELYkeskukset()(ElykeskuksetDispatch);
    // fetchPaatoskierrokset()(paatoskierroksetDispatch);
  }, []);

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
