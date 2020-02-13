import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import wizardMessages from "../../../../../../i18n/definitions/wizard";
import ValmentavatKoulutukset from "./Koulutukset/ValmentavatKoulutukset";
import ATVKoulutukset from "./Koulutukset/ATVKoulutukset";
import Tyovoimakoulutukset from "./Koulutukset/Tyovoimakoulutukset";
import Kuljettajakoulutukset from "./Koulutukset/Kuljettajakoulutukset";

const MuutospyyntoWizardKoulutukset = props => {
  const intl = useIntl();
  return (
    <div className="md:pl-16 pb-10">
      <p className="pt-4 pb-10">{intl.formatMessage(wizardMessages.info_02)}</p>

      <ValmentavatKoulutukset
        koulutukset={props.koulutukset}
        onChangesRemove={props.onChangesRemove}
        onChangesUpdate={props.onChangesUpdate}
      />

      <ATVKoulutukset
        koulutukset={props.koulutukset}
        onChangesRemove={props.onChangesRemove}
        onChangesUpdate={props.onChangesUpdate}
      />

      <Tyovoimakoulutukset
        koulutukset={props.koulutukset}
        maaraykset={props.maaraykset}
        onChangesRemove={props.onChangesRemove}
        onChangesUpdate={props.onChangesUpdate}
      />

      <Kuljettajakoulutukset
        koulutukset={props.koulutukset}
        lupa={props.maaraykset}
        onChangesRemove={props.onChangesRemove}
        onChangesUpdate={props.onChangesUpdate}
      />
    </div>
  );
};

MuutospyyntoWizardKoulutukset.propTypes = {
  koulutukset: PropTypes.object,
  maaraykset: PropTypes.array
};

export default MuutospyyntoWizardKoulutukset;
