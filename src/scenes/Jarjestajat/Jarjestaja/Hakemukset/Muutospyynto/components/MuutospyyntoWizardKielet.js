import React from "react";
import Section from "components/03-templates/Section";
import Opetuskielet from "./Kielet/Opetuskielet";
import PropTypes from "prop-types";
import { KIELET_SECTIONS } from "../../../modules/constants";
import Tutkintokielet from "./Kielet/Tutkintokielet";
import { injectIntl } from "react-intl";
import * as R from "ramda";

const MuutospyyntoWizardKielet = React.memo(props => {
  const { lupa } = props;
  const { kohteet } = lupa;
  const kohde = kohteet[2];
  const { headingNumber, heading } = kohde;

  return (
    <Section code={headingNumber} title={heading}>
      <Opetuskielet
        changes={props.changes}
        kielet={props.kielet}
        kohde={props.lupa.kohteet[2]}
        onUpdate={props.onUpdate}
      />

      <h4 className="py-4">{KIELET_SECTIONS.TUTKINTOKIELET}</h4>

      <Tutkintokielet
        kielet={props.kielet.kielet}
        koulutukset={props.koulutukset}
        locale={R.toUpper(props.intl.locale)}
        lupa={lupa}
        kohde={props.lupa.kohteet[1]}
        onUpdate={props.onUpdate}
        tutkinnotState={props.tutkinnotState}
      />
    </Section>
  );
});

MuutospyyntoWizardKielet.defaultProps = {
  changes: []
};

MuutospyyntoWizardKielet.propTypes = {
  changes: PropTypes.array,
  kielet: PropTypes.object,
  koulutukset: PropTypes.object,
  lupa: PropTypes.object,
  muutoshakemus: PropTypes.object,
  tutkinnotState: PropTypes.array
};

export default injectIntl(MuutospyyntoWizardKielet);
