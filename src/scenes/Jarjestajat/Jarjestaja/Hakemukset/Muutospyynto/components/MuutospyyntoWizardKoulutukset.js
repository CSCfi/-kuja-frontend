import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import wizardMessages from "../../../../../../i18n/definitions/wizard";
import ValmentavatKoulutukset from "./Koulutukset/ValmentavatKoulutukset";
import ATVKoulutukset from "./Koulutukset/ATVKoulutukset";
import Tyovoimakoulutukset from "./Koulutukset/Tyovoimakoulutukset";
import Kuljettajakoulutukset from "./Koulutukset/Kuljettajakoulutukset";

const MuutospyyntoWizardKoulutukset = React.memo(props => {
  const intl = useIntl();
  return (
    <div className="md:pl-16 pb-10">
      <p className="pt-4 pb-10">{intl.formatMessage(wizardMessages.info_02)}</p>

      <ValmentavatKoulutukset
        changeObjects={props.changeObjects.valmentavatKoulutukset}
        kohde={props.kohde}
        koulutukset={props.koulutukset}
        maaraystyyppi={props.maaraystyyppi}
        onChangesRemove={props.onChangesRemove}
        onChangesUpdate={props.onChangesUpdate}
      />

      <ATVKoulutukset
        changeObjects={props.changeObjects.atvKoulutukset}
        kohde={props.kohde}
        koulutukset={props.koulutukset}
        maaraystyyppi={props.maaraystyyppi}
        onChangesRemove={props.onChangesRemove}
        onChangesUpdate={props.onChangesUpdate}
      />

      <Tyovoimakoulutukset
        changeObjects={props.changeObjects.tyovoimakoulutukset}
        kohde={props.kohde}
        koulutukset={props.koulutukset}
        lupa={props.lupa}
        maaraystyyppi={props.maaraystyyppi}
        onUpdate={props.onUpdate}
        onChangesRemove={props.onChangesRemove}
        onChangesUpdate={props.onChangesUpdate}
      />

      <Kuljettajakoulutukset
        changeObjects={props.changeObjects.kuljettajakoulutukset}
        kohde={props.kohde}
        koulutukset={props.koulutukset}
        lupa={props.lupa}
        maaraystyyppi={props.maaraystyyppi}
        onUpdate={props.onUpdate}
        onChangesRemove={props.onChangesRemove}
        onChangesUpdate={props.onChangesUpdate}
      />
    </div>
  );
});

MuutospyyntoWizardKoulutukset.defaultProps = {
  changeObjects: {}
};

MuutospyyntoWizardKoulutukset.propTypes = {
  changeObjects: PropTypes.object,
  kohde: PropTypes.object,
  koulutukset: PropTypes.object,
  lupa: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  onUpdate: PropTypes.func
};

export default MuutospyyntoWizardKoulutukset;
