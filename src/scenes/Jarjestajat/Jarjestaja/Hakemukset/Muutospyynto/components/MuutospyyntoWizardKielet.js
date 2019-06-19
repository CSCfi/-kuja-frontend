import React, { useContext } from "react";
import { MuutoshakemusContext } from "context/muutoshakemusContext";
import Section from "components/03-templates/Section";
import Opetuskielet from "./Kielet/Opetuskielet";
import { KieletProvider } from "context/kieletContext";
import { KIELET_SECTIONS } from "../../../modules/constants";
import Tutkintokielet from "./Kielet/Tutkintokielet";

const MuutospyyntoWizardKielet = props => {
  const { state: mhlState } = useContext(
    MuutoshakemusContext
  );

  const { lupa } = props;
  const { kohteet } = lupa;
  const kohde = kohteet[2];
  const { headingNumber, heading } = kohde;

  return (
    <Section code={headingNumber} title={heading}>
      <KieletProvider>
        <Opetuskielet
          changes={mhlState.opetuskielet.changes.opetuskieli || []}
          kohde={props.lupa.kohteet[2]}
        />
        <h4 className="py-4">{KIELET_SECTIONS.TUTKINTOKIELET}</h4>
        {/* <Tutkintokielet
          koulutukset={props.koulutukset}
          lupa={lupa}
          changes={mhlState.tutkintokielet.changes || []}
          kohde={kohteet[1]}
        /> */}
      </KieletProvider>
    </Section>
  );
};

export default MuutospyyntoWizardKielet;
