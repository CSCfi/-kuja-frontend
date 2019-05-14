import React, { useContext, useEffect, useState } from "react";
import MuutospyyntoWizardTutkinnot from "./MuutospyyntoWizardTutkinnot";
import MuutospyyntoWizardKoulutukset from "./MuutospyyntoWizardKoulutukset";
import MuutospyyntoWizardKielet from "./MuutospyyntoWizardKielet";
// import MuutospyyntoWizardTutkintokieletContainer from "../containers/MuutospyyntoWizardTutkintokieletContainer";
// import MuutospyyntoWizardToimialue from "./MuutospyyntoWizardToimialue";
// import MuutospyyntoWizardOpiskelijavuodet from "./MuutospyyntoWizardOpiskelijavuodet";
// import MuutospyyntoWizardMuutContainer from "../containers/MuutospyyntoWizardMuutContainer";
// import { Kohde } from "./MuutospyyntoWizardComponents";
import { fetchKoulutusalat } from "services/koulutusalat/actions";
import { KoulutusalatContext } from "context/koulutusalatContext";
import { KoulutuksetContext } from "context/koulutuksetContext";
import { fetchKoulutuksetAll } from "services/koulutukset/actions";
import { KoulutustyypitContext } from "context/koulutustyypitContext";
import { fetchKoulutustyypit } from "services/koulutustyypit/actions";
// import _ from "lodash";

const MuutospyyntoWizardMuutokset = props => {
  const [state, setState] = useState({
    modalIsOpen: false
  });
  const { state: koulutukset, dispatch: koulutuksetDispatch } = useContext(
    KoulutuksetContext
  );
  const { state: koulutusalat, dispatch: koulutusalatDispatch } = useContext(
    KoulutusalatContext
  );
  const {
    state: koulutustyypit,
    dispatch: koulutustyypitDispatch
  } = useContext(KoulutustyypitContext);

  // componentDidUpdate(prevProps) {
  //   const isFormModified = !_.isEqual(prevProps.formValues, props.formValues);
  //   if (isFormModified) {
  //     props.onChildComponentUpdate(props.formValues)
  //   }
  // }

  useEffect(() => {
    fetchKoulutusalat()(koulutusalatDispatch);
    fetchKoulutustyypit()(koulutustyypitDispatch);
  }, []);

  useEffect(() => {
    if (koulutusalat.fetched && koulutustyypit.fetched) {
      fetchKoulutuksetAll(koulutusalat.data, koulutustyypit.data)(
        koulutuksetDispatch
      );
    }
  }, [koulutusalat, koulutustyypit]);

  return (
    <div>
      <p className="pb-4 hidden sm:inline">
        Seuraavat kohdat on jaoteltu ammatillisten tutkintojen ja koulutuksen
        järjestämisluvan rakenteen mukaisesti. Hakijan tulee täyttää alla olevat
        kohdat vain siltä osin, mihin tutkintojen ja koulutuksen
        järjestämislupaan haetaan muutosta. Tarkemmat ohjeistukset sekä
        pykäläviittaukset ammatillisen koulutuksen lakiin (531/2017) on esitetty
        kohdittain.
      </p>

      <form onSubmit={props.handleSubmit}>
        <MuutospyyntoWizardTutkinnot
          lupa={props.lupa}
          koulutukset={koulutukset}
          koulutusalat={koulutusalat}
          koulutustyypit={koulutustyypit}
        />

        <MuutospyyntoWizardKoulutukset
          lupa={props.lupa}
          koulutukset={koulutukset}
          koulutusalat={koulutusalat}
          koulutustyypit={koulutustyypit}
        />

        <MuutospyyntoWizardKielet lupa={props.lupa} koulutukset={koulutukset} />

        {/* <MuutospyyntoWizardTutkintokielet lupa={lupa} /> */}

        {/* <Kohde>
          <MuutospyyntoWizardToimialue lupa={lupa} />
        </Kohde>

        <Kohde>
          <MuutospyyntoWizardOpiskelijavuodet lupa={lupa} />
        </Kohde>

        <Kohde>
          <MuutospyyntoWizardMuutContainer lupa={lupa} />
        </Kohde> */}
      </form>
    </div>
  );
};

export default MuutospyyntoWizardMuutokset;
