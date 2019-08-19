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
    valmentavatKoulutuksetMuutokset,
    setValmentavatKoulutuksetMuutokset
  ] = useState([]);
  const [
    ammatilliseenTehtavaanValmistavatKoulutuksetMuutokset,
    setAmmatilliseenTehtavaanValmistavatKoulutuksetMuutokset
  ] = useState([]);

  useEffect(() => {
    setAmmatilliseenTehtavaanValmistavatKoulutuksetMuutokset(
      R.filter(
        muutos =>
          R.startsWith(
            "ammatilliseentehtavaanvalmistavatkoulutukset",
            muutos.meta.changeObj.anchor
          ),
        props.changes
      )
    );
    setValmentavatKoulutuksetMuutokset(
      R.filter(
        muutos =>
          R.startsWith("valmentavatkoulutukset", muutos.meta.changeObj.anchor),
        props.changes
      )
    );
  }, [props.changes]);

  return (
    <div className="md:pl-16 pb-10">
      <p className="pt-4 pb-10">
        {props.intl.formatMessage(wizardMessages.info_02)}
      </p>

      <ValmentavatKoulutukset
        changes={valmentavatKoulutuksetMuutokset}
        kohde={props.kohde}
        koulutukset={props.koulutukset}
        maaraystyyppi={props.maaraystyyppi}
        onUpdate={props.onUpdate}
      />

      <AmmatilliseenTehtavaanValmistavatKoulutukset
        changes={ammatilliseenTehtavaanValmistavatKoulutuksetMuutokset}
        kohde={props.kohde}
        koulutukset={props.koulutukset}
        maaraystyyppi={props.maaraystyyppi}
        onUpdate={props.onUpdate}
      />

      <Tyovoimakoulutukset
        koulutukset={props.koulutukset}
        onUpdate={props.onUpdate}
      />

      <Kuljettajakoulutukset
        koulutukset={props.koulutukset}
        onUpdate={props.onUpdate}
      />
    </div>
  );
});

MuutospyyntoWizardKoulutukset.defaultProps = {
  changes: []
};

MuutospyyntoWizardKoulutukset.propTypes = {
  changes: PropTypes.array,
  kohde: PropTypes.object,
  koulutukset: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  onUpdate: PropTypes.func
};

export default injectIntl(MuutospyyntoWizardKoulutukset);
