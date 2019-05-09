import React, { useContext } from "react";
import { MuutoshakemusContext } from "context/muutoshakemusContext";
import Section from "components/Section";
import { MUUTOS_TYPES } from "../modules/uusiHakemusFormConstants";
import Opetuskielet from "./Kielet/Opetuskielet";
import { KieletProvider } from "context/kieletContext";
import {
  addItemToChanges,
  removeItemFromChanges
} from "services/muutoshakemus/actions";
import _ from "lodash";

const MuutospyyntoWizardKielet = props => {
  const sectionId = "kielet";
  const { state: mhlState, dispatch: mhlDispatch } = useContext(MuutoshakemusContext);

  const handleChanges = (item, listId, removeExistingOnes = false) => {
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
      addItemToChanges(
        sectionId,
        item,
        listId,
        operationType,
        removeExistingOnes
      )(mhlDispatch);
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
          changes={mhlState[sectionId].changes || {}}
          kohde={props.lupa.kohteet[2]}
          listId={"opetus"}
          onChanges={handleChanges}
        />
      </KieletProvider>
    </Section>
  );
};

export default MuutospyyntoWizardKielet;
