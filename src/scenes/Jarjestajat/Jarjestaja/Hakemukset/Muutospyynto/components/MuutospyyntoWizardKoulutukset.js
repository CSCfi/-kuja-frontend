import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import wizardMessages from "../../../../../../i18n/definitions/wizard";
import ValmentavatKoulutukset from "./Koulutukset/ValmentavatKoulutukset";
import AmmatilliseenTehtavaanValmistavatKoulutukset from "./Koulutukset/AmmatilliseenTehtavaanValmistavatKoulutukset";
import Tyovoimakoulutukset from "./Koulutukset/Tyovoimakoulutukset";
import Kuljettajakoulutukset from "./Koulutukset/Kuljettajakoulutukset";
import PropTypes from "prop-types";
import * as R from "ramda";

const MuutospyyntoWizardKoulutukset = React.memo(props => {
  const [
    ammatilliseenTehtavaanValmistavatKoulutuksetMuutokset,
    setAmmatilliseenTehtavaanValmistavatKoulutuksetMuutokset
  ] = useState(null);
  const [
    kuljettajakoulutuksetMuutokset,
    setKuljettajakoulutuksetMuutokset
  ] = useState(null);
  const [
    tyovoimakoulutuksetMuutokset,
    setTyovoimakoulutuksetMuutokset
  ] = useState(null);
  const [
    valmentavatKoulutuksetMuutokset,
    setValmentavatKoulutuksetMuutokset
  ] = useState(null);

  useEffect(() => {
    setKuljettajakoulutuksetMuutokset(
      R.filter(
        changeObj => R.startsWith("koulutukset_kuljettajakoulutukset", changeObj.anchor),
        props.changeObjects
      )
    );
    setTyovoimakoulutuksetMuutokset(
      R.filter(
        changeObj => R.startsWith("koulutukset_tyovoimakoulutukset", changeObj.anchor),
        props.changeObjects
      )
    );
    setAmmatilliseenTehtavaanValmistavatKoulutuksetMuutokset(
      R.filter(
        changeObj =>
          R.startsWith(
            "koulutukset_ammatilliseentehtavaanvalmistavatkoulutukset",
            changeObj.anchor
          ),
        props.changeObjects
      )
    );
    setValmentavatKoulutuksetMuutokset(
      R.filter(
        changeObj => R.startsWith("koulutukset_valmentavatKoulutukset", changeObj.anchor),
        props.changeObjects
      )
    );
  }, [props.changeObjects]);

  return (
    <div className="md:pl-16 pb-10">
      <p className="pt-4 pb-10">
        {props.intl.formatMessage(wizardMessages.info_02)}
      </p>

      {valmentavatKoulutuksetMuutokset && (
        <ValmentavatKoulutukset
          changeObjects={valmentavatKoulutuksetMuutokset}
          kohde={props.kohde}
          koulutukset={props.koulutukset}
          maaraystyyppi={props.maaraystyyppi}
          onUpdate={props.onUpdate}
        />
      )}

      {ammatilliseenTehtavaanValmistavatKoulutuksetMuutokset && (
        <AmmatilliseenTehtavaanValmistavatKoulutukset
          changeObjects={ammatilliseenTehtavaanValmistavatKoulutuksetMuutokset}
          kohde={props.kohde}
          koulutukset={props.koulutukset}
          maaraystyyppi={props.maaraystyyppi}
          onUpdate={props.onUpdate}
        />
      )}

      {tyovoimakoulutuksetMuutokset && (
        <Tyovoimakoulutukset
          changeObjects={tyovoimakoulutuksetMuutokset}
          kohde={props.kohde}
          koulutukset={props.koulutukset}
          maaraystyyppi={props.maaraystyyppi}
          onUpdate={props.onUpdate}
        />
      )}

      {kuljettajakoulutuksetMuutokset && (
        <Kuljettajakoulutukset
          changeObjects={kuljettajakoulutuksetMuutokset}
          kohde={props.kohde}
          koulutukset={props.koulutukset}
          maaraystyyppi={props.maaraystyyppi}
          onUpdate={props.onUpdate}
        />
      )}
    </div>
  );
});

MuutospyyntoWizardKoulutukset.defaultProps = {
  changeObjects: []
};

MuutospyyntoWizardKoulutukset.propTypes = {
  changeObjects: PropTypes.array,
  kohde: PropTypes.object,
  koulutukset: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  onUpdate: PropTypes.func
};

export default injectIntl(MuutospyyntoWizardKoulutukset);
