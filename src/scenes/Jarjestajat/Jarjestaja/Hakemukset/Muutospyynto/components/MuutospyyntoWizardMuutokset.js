import React, { useContext, useEffect, useState } from "react";
import Tutkinnot from "./Tutkinnot";
import MuutospyyntoWizardKoulutukset from "./MuutospyyntoWizardKoulutukset";
import MuutospyyntoWizardKielet from "./MuutospyyntoWizardKielet";
import MuutospyyntoWizardToimialue from "./MuutospyyntoWizardToimintaalue";
import MuutospyyntoWizardOpiskelijavuodet from "./MuutospyyntoWizardOpiskelijavuodet";
import MuutospyyntoWizardMuut from "./MuutospyyntoWizardMuut";
import wizardMessages from "../../../../../../i18n/definitions/wizard";
import { fetchKunnat } from "../../../../../../services/kunnat/actions";
import { fetchMaakunnat } from "../../../../../../services/maakunnat/actions";
import { fetchMaakuntakunnat } from "../../../../../../services/maakuntakunnat/actions";
import { KunnatContext } from "context/kunnatContext";
import { MaakunnatContext } from "context/maakunnatContext";
import { MaakuntakunnatContext } from "context/maakuntakunnatContext";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import * as R from "ramda";

const MuutospyyntoWizardMuutokset = React.memo(props => {
  const [kohteet, setKohteet] = useState({});
  const [maaraystyypit, setMaaraystyypit] = useState({});
  const [changesOfToimintaalue, setChangesOfToimintaalue] = useState([]);
  const [
    changesOfTutkinnotJaKoulutukset,
    setChangesOfTutkinnotJaKoulutukset
  ] = useState([]);
  const [changesOfKielet, setChangesOfKielet] = useState({});
  const [changesOfMuut, setChangesOfMuut] = useState([]);

  const { state: kunnat, dispatch: kunnatDispatch } = useContext(KunnatContext);
  const { state: maakunnat, dispatch: maakunnatDispatch } = useContext(
    MaakunnatContext
  );
  const {
    state: maakuntakunnat,
    dispatch: maakuntakunnatDispatch
  } = useContext(MaakuntakunnatContext);

  useEffect(() => {
    fetchKunnat()(kunnatDispatch);
    fetchMaakunnat()(maakunnatDispatch);
    fetchMaakuntakunnat()(maakuntakunnatDispatch);
  }, [kunnatDispatch, maakunnatDispatch, maakuntakunnatDispatch]);

  useEffect(() => {
    setKohteet(
      R.mergeAll(
        R.flatten(
          R.map(item => {
            return {
              [R.props(["tunniste"], item)]: item
            };
          }, props.kohteet)
        )
      )
    );
  }, [props.kohteet]);

  useEffect(() => {
    setMaaraystyypit(
      R.mergeAll(
        R.flatten(
          R.map(item => {
            return {
              [R.props(["tunniste"], item)]: item
            };
          }, props.maaraystyypit)
        )
      )
    );
  }, [props.maaraystyypit]);

  useEffect(() => {
    const getChangesOf = (key, changes, path = ["kohde", "tunniste"]) => {
      return R.filter(R.pathEq(path, key))(changes);
    };
    setChangesOfMuut(getChangesOf("muut", props.muutospyynto.muutokset));
    setChangesOfTutkinnotJaKoulutukset(
      getChangesOf("tutkinnotjakoulutukset", props.muutospyynto.muutokset)
    );
    setChangesOfToimintaalue(
      getChangesOf("toimintaalue", props.muutospyynto.muutokset)
    );
    setChangesOfKielet({
      opetuskielet: getChangesOf("opetuskieli", props.muutospyynto.muutokset, [
        "meta",
        "tunniste"
      ]),
      tutkintokielet: getChangesOf(
        "tutkintokieli",
        props.muutospyynto.muutokset,
        ["meta", "tunniste"]
      )
    });
  }, [props.muutospyynto.muutokset]);

  return (
    <div>
      <p className="py-10">
        {props.intl.formatMessage(wizardMessages.info_01)}
      </p>

      <form onSubmit={props.handleSubmit}>
        <Tutkinnot
          changes={changesOfTutkinnotJaKoulutukset}
          kohde={kohteet.tutkinnotjakoulutukset}
          koulutukset={props.koulutukset}
          koulutusalat={props.koulutusalat}
          koulutustyypit={props.koulutustyypit.data}
          lupa={props.lupa}
          maaraystyyppi={maaraystyypit.OIKEUS}
          onUpdate={props.onUpdate}
        />

        <MuutospyyntoWizardKoulutukset
          changes={changesOfTutkinnotJaKoulutukset}
          kohde={kohteet.tutkinnotjakoulutukset}
          koulutukset={props.koulutukset}
          maaraystyyppi={maaraystyypit.OIKEUS}
          onUpdate={props.onUpdate}
        />

        <MuutospyyntoWizardKielet
          changes={changesOfKielet}
          kohde={kohteet.kielet}
          lupa={props.lupa}
          kielet={props.kielet}
          koulutukset={props.koulutukset}
          onUpdate={props.onUpdate}
          tutkinnotState={props.tutkinnotState}
          maaraystyyppi={maaraystyypit.VELVOITE}
        />

        {kunnat.fetched && maakunnat.fetched && maakuntakunnat.fetched && (
          <MuutospyyntoWizardToimialue
            changes={changesOfToimintaalue}
            lupakohde={props.lupa.kohteet[3]}
            kohde={kohteet.toimintaalue}
            kunnat={kunnat}
            maakunnat={maakunnat}
            maakuntakunnat={maakuntakunnat}
            maaraystyyppi={maaraystyypit.VELVOITE}
            onUpdate={props.onUpdate}
          />
        )}

        <MuutospyyntoWizardOpiskelijavuodet
          lupa={props.lupa}
          opiskelijavuodet={props.opiskelijavuodet}
          changesOfSection5={props.muutoshakemus["muut"].changes}
        />

        <MuutospyyntoWizardMuut
          changes={changesOfMuut}
          kohde={kohteet.muut}
          headingNumber={props.lupa.kohteet[5].headingNumber}
          maaraystyyppi={maaraystyypit.OIKEUS}
          muut={props.muut}
          onUpdate={props.onUpdate}
        />
      </form>
    </div>
  );
});

MuutospyyntoWizardMuutokset.propTypes = {
  kielet: PropTypes.object,
  kohteet: PropTypes.array,
  koulutukset: PropTypes.object,
  koulutusalat: PropTypes.object,
  koulutustyypit: PropTypes.object,
  lupa: PropTypes.object,
  maaraystyypit: PropTypes.array,
  muut: PropTypes.object,
  muutoshakemus: PropTypes.object,
  muutospyynto: PropTypes.object,
  onUpdate: PropTypes.func,
  tutkinnotState: PropTypes.array
};

export default injectIntl(MuutospyyntoWizardMuutokset);
