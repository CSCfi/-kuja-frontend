import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";

import MuutospyyntoWizardTutkinnot from "./MuutospyyntoWizardTutkinnot";
// import MuutospyyntoWizardOpetuskieletContainer from "../containers/MuutospyyntoWizardOpetuskieletContainer";
// import MuutospyyntoWizardTutkintokieletContainer from "../containers/MuutospyyntoWizardTutkintokieletContainer";
// import MuutospyyntoWizardToimialue from "./MuutospyyntoWizardToimialue";
// import MuutospyyntoWizardOpiskelijavuodet from "./MuutospyyntoWizardOpiskelijavuodet";
// import MuutospyyntoWizardMuutContainer from "../containers/MuutospyyntoWizardMuutContainer";
// import { Kohde } from "./MuutospyyntoWizardComponents";
import { MUUT_KEYS } from "../modules/constants";
import { fetchKoulutusalat } from "services/koulutusalat/actions";
import { KoulutusalatContext } from "context/koulutusalatContext";
import { KoulutuksetContext } from "context/koulutuksetContext";
import { fetchKoulutuksetAll } from "services/koulutukset/actions";
import { KoulutustyypitContext } from "context/koulutustyypitContext";
import { fetchKoulutustyypit } from "services/koulutustyypit/actions";

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
    // fetchKoulutusalat={props.fetchKoulutusalat}
    // fetchKoulutustyypit={props.fetchKoulutustyypit}
    // fetchKoulutuksetAll={props.fetchKoulutuksetAll}
    // fetchKoulutuksetMuut={props.fetchKoulutuksetMuut}
    // fetchKoulutus={props.fetchKoulutus}
    // MuutospyyntoWIzardTutkinnot ja MuutospyyntoWizardTutkintokielet tarvitsevat listan tutkinnoista
    // if (
    //   (!props.koulutusalat.fetched &&
    //     !props.koulutusalat.hasErrored) ||
    //   (!props.koulutustyypit.fetched &&
    //     !props.koulutustyypit.hasErrored)
    // ) {
    //   props.fetchKoulutusalat().then(() => {
    //     props.fetchKoulutustyypit().then(() => {
    //       if (
    //         props.koulutusalat.fetched &&
    //         !props.koulutusalat.hasErrored &&
    //         props.koulutustyypit.fetched &&
    //         !props.koulutustyypit.hasErrored
    //       ) {
    //         props.fetchKoulutuksetAll();
    //         props.fetchKoulutuksetMuut(MUUT_KEYS.KULJETTAJAKOULUTUS);
    //         props.fetchKoulutuksetMuut(MUUT_KEYS.OIVA_TYOVOIMAKOULUTUS);
    //         props.fetchKoulutuksetMuut(
    //           MUUT_KEYS.AMMATILLISEEN_TEHTAVAAN_VALMISTAVA_KOULUTUS
    //         );
    //         props.fetchKoulutus("999901");
    //         props.fetchKoulutus("999903");
    //       }
    //     });
    //   });
    // }
  }, []);

  useEffect(() => {
    if (koulutusalat.fetched && koulutustyypit.fetched) {
      fetchKoulutuksetAll(koulutusalat.data, koulutustyypit.data)(
        koulutuksetDispatch
      );
    }
  }, [koulutusalat, koulutustyypit]);

  const { lupa } = props;

  return (
    <div>
      <p className="pb-4">
        Seuraavat kohdat on jaoteltu ammatillisten tutkintojen ja koulutuksen
        järjestämisluvan rakenteen mukaisesti. Hakijan tulee täyttää alla olevat
        kohdat vain siltä osin, mihin tutkintojen ja koulutuksen
        järjestämislupaan haetaan muutosta. Tarkemmat ohjeistukset sekä
        pykäläviittaukset ammatillisen koulutuksen lakiin (531/2017) on esitetty
        kohdittain.
      </p>

      {/* <form onSubmit={props.handleSubmit}> */}
      <MuutospyyntoWizardTutkinnot
        lupa={lupa}
        koulutukset={koulutukset}
        koulutusalat={koulutusalat}
        koulutustyypit={koulutustyypit}
      />

      {/* <Kohde>
          <MuutospyyntoWizardOpetuskieletContainer lupa={lupa} />

          <MuutospyyntoWizardTutkintokieletContainer lupa={lupa} />
        </Kohde>

        <Kohde>
          <MuutospyyntoWizardToimialue lupa={lupa} />
        </Kohde>

        <Kohde>
          <MuutospyyntoWizardOpiskelijavuodet lupa={lupa} />
        </Kohde>

        <Kohde>
          <MuutospyyntoWizardMuutContainer lupa={lupa} />
        </Kohde> */}
      {/* </form> */}
    </div>
  );
};

export default MuutospyyntoWizardMuutokset;
