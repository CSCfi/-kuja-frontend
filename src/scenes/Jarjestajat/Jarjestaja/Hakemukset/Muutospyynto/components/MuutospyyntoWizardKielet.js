import React, { useContext } from "react";
import Section from "components/03-templates/Section";
import { MuutoshakemusContext } from "context/muutoshakemusContext";
import Opetuskielet from "./Kielet/Opetuskielet";
import PropTypes from "prop-types";
import { KIELET_SECTIONS } from "../../../modules/constants";
import Tutkintokielet from "./Kielet/Tutkintokielet";
import { injectIntl } from "react-intl";
import * as R from "ramda";
import wizardMessages from "../../../../../../i18n/definitions/wizard";

const MuutospyyntoWizardKielet = React.memo(props => {
  const { lupa } = props;
  const { kohteet } = lupa;
  const kohde = kohteet[2];
  const { headingNumber } = kohde;
  const heading = props.intl.formatMessage(wizardMessages.header_section2)
  const { state } = useContext(MuutoshakemusContext);

  return (
    <Section code={headingNumber} title={heading}>
      <Opetuskielet
        // changes={state.hasOwnProperty("changes") ? state["opetuskielet"].changes : []}
        kielet={props.kielet}
        kohde={props.lupa.kohteet[2]}
        onUpdate={props.onUpdate}
        lupa={lupa}
        maaraystyyppi={props.maaraystyyppi}
      />

      <h4 className="py-4">{KIELET_SECTIONS.TUTKINTOKIELET}</h4>

      <Tutkintokielet
        changes={state.hasOwnProperty("changes") ? state["tutkintokielet"].changes : []}
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

MuutospyyntoWizardKielet.propTypes = {
  changes: PropTypes.array,
  kielet: PropTypes.object,
  koulutukset: PropTypes.object,
  lupa: PropTypes.object,
  muutoshakemus: PropTypes.object,
  tutkinnotState: PropTypes.array
};

export default injectIntl(MuutospyyntoWizardKielet);
