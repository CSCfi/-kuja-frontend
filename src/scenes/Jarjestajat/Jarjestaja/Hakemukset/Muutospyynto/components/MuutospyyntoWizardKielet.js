import React, { useEffect, useContext } from "react";
import { MuutoshakemusContext } from "context/muutoshakemusContext";
import Section from "components/03-templates/Section";
import Opetuskielet from "./Kielet/Opetuskielet";
import PropTypes from "prop-types";
import { KIELET_SECTIONS } from "../../../modules/constants";
import Tutkintokielet from "./Kielet/Tutkintokielet";
import { fetchKielet } from "../../../../../../services/kielet/actions";
import { KieletContext } from "../../../../../../context/kieletContext";
import { injectIntl } from "react-intl";
import * as R from "ramda";

const MuutospyyntoWizardKielet = props => {
  const { state: mhlState } = useContext(MuutoshakemusContext);
  const { state: languages, dispatch: languagesDispatch } = useContext(
    KieletContext
  );

  const { lupa } = props;
  const { kohteet } = lupa;
  const kohde = kohteet[2];
  const { headingNumber, heading } = kohde;

  useEffect(() => {
    fetchKielet(props.intl.locale)(languagesDispatch);
  }, [languagesDispatch, props.intl.locale]);

  return (
    <Section code={headingNumber} title={heading}>
      <Opetuskielet
        changes={mhlState.opetuskielet.changes.opetuskieli || []}
        kohde={props.lupa.kohteet[2]}
      />
      <h4 className="py-4">{KIELET_SECTIONS.TUTKINTOKIELET}</h4>
      {props.koulutukset &&
        Object.keys(props.koulutukset.koulutusdata).length > 0 &&
        languages && languages.kielet && languages.kielet.length > 0 && (
          <Tutkintokielet
            kielet={languages.kielet}
            koulutukset={props.koulutukset}
            locale={R.toUpper(props.intl.locale)}
            lupa={lupa}
            changes={mhlState.tutkintokielet.changes || []}
            kohde={props.lupa.kohteet[1]}
          />
        )}
    </Section>
  );
};

MuutospyyntoWizardKielet.propTypes = {
  koulutukset: PropTypes.object,
  lupa: PropTypes.object
};

export default injectIntl(MuutospyyntoWizardKielet);
