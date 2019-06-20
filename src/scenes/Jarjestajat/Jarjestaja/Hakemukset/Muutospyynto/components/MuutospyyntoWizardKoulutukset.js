import React from "react";
import { injectIntl } from "react-intl";
import wizardMessages from "../../../../../../i18n/definitions/wizard";
import ValmentavatKoulutukset from "./Koulutukset/ValmentavatKoulutukset";
import AmmatilliseenTehtavaanValmistavatKoulutukset from "./Koulutukset/AmmatilliseenTehtavaanValmistavatKoulutukset";
import Tyovoimakoulutukset from "./Koulutukset/Tyovoimakoulutukset";
import Kuljettajakoulutukset from "./Koulutukset/Kuljettajakoulutukset";
import PropTypes from "prop-types";

const MuutospyyntoWizardKoulutukset = React.memo(props => {
  return (
    <div className="md:pl-16">
      <p className="pt-4 pb-10">
        {props.intl.formatMessage(wizardMessages.info_02)}
      </p>

      <ValmentavatKoulutukset
        koulutukset={props.koulutukset}
        onUpdate={props.onUpdate}
      />

      <AmmatilliseenTehtavaanValmistavatKoulutukset
        koulutukset={props.koulutukset}
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

MuutospyyntoWizardKoulutukset.propTypes = {
  koulutukset: PropTypes.object,
  onUpdate: PropTypes.func
};

export default injectIntl(MuutospyyntoWizardKoulutukset);
