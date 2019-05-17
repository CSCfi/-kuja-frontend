import React, { useContext } from "react";
import { MuutoshakemusContext } from "context/muutoshakemusContext";
import Section from "components/03-templates/Section";
import { MUUTOS_TYPES } from "../modules/uusiHakemusFormConstants";
import Opetuskielet from "./Kielet/Opetuskielet";
import { KieletProvider } from "context/kieletContext";
import {
  addItemToChanges,
  removeItemFromChanges
} from "services/muutoshakemus/actions";
import _ from "lodash";
import { KIELET_SECTIONS } from "../../../modules/constants";
import Tutkintokielet from "./Kielet/Tutkintokielet";

const MuutospyyntoWizardKielet = props => {
  const { state: mhlState, dispatch: mhlDispatch } = useContext(
    MuutoshakemusContext
  );

  const handleChanges = (item, listId, sectionId) => {
    console.info(item, listId, sectionId);
    // Let's find out the type of operation
    const operationType = item.shouldBeSelected
      ? MUUTOS_TYPES.REMOVAL
      : MUUTOS_TYPES.ADDITION;
    const existingChange = _.find(mhlState[sectionId].changes[listId], {
      koodiarvo: item.code
    });
    // Let's reset the item's state
    if (existingChange) {
      removeItemFromChanges(sectionId, item, listId)(mhlDispatch);
    } else {
      addItemToChanges(sectionId, item, listId, operationType, false)(
        mhlDispatch
      );
    }
  };

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
          onChanges={handleChanges}
          listId="opetuskieli"
        />
        <h4 className="py-4">{KIELET_SECTIONS.TUTKINTOKIELET}</h4>
        <Tutkintokielet
          koulutukset={props.koulutukset}
          lupa={lupa}
          changes={mhlState.tutkintokielet.changes || []}
          kohde={kohteet[1]}
          onChanges={handleChanges}
        />
      </KieletProvider>
    </Section>
  );
};

export default MuutospyyntoWizardKielet;
