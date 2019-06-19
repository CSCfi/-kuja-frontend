import React, { useContext } from "react";
import { injectIntl } from "react-intl";
import wizardMessages from "../../../../../../i18n/definitions/wizard";
import { MuutoshakemusContext } from "context/muutoshakemusContext";
import { MUUTOS_TYPES } from "../modules/uusiHakemusFormConstants";
import {
  addItemToChanges,
  removeItemFromChanges
} from "services/muutoshakemus/actions";
import _ from "lodash";
import ValmentavatKoulutukset from "./Koulutukset/ValmentavatKoulutukset";
import AmmatilliseenTehtavaanValmistavatKoulutukset from "./Koulutukset/AmmatilliseenTehtavaanValmistavatKoulutukset";
import Tyovoimakoulutukset from "./Koulutukset/Tyovoimakoulutukset";
import Kuljettajakoulutukset from "./Koulutukset/Kuljettajakoulutukset";

const MuutospyyntoWizardKoulutukset = props => {
  const sectionId = "koulutukset";
  const { state, dispatch: mhlDispatch } = useContext(MuutoshakemusContext);

  const handleChanges = (item, listId, removeExistingOnes) => {
    // Let's find out the type of operation
    const operationType = item.shouldBeSelected
      ? MUUTOS_TYPES.REMOVAL
      : MUUTOS_TYPES.ADDITION;
    const existingChange = _.find(state[sectionId].changes[listId], {
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

  return (
    <div className="md:pl-16">
      <p className="pt-4 pb-10">
        {props.intl.formatMessage(wizardMessages.info_02)}
      </p>

      <ValmentavatKoulutukset
        changes={
          state[sectionId].changes
            ? state[sectionId].changes["valmentavat"]
            : []
        }
        onChanges={handleChanges}
      />

      <AmmatilliseenTehtavaanValmistavatKoulutukset
        changes={
          state[sectionId].changes
            ? state[sectionId].changes[
                "ammatilliseentehtavaanvalmistavakoulutus"
              ]
            : []
        }
        onChanges={handleChanges}
      />

      <Tyovoimakoulutukset
        changes={
          state[sectionId].changes
            ? state[sectionId].changes["oivatyovoimakoulutus"]
            : []
        }
        onChanges={handleChanges}
      />

      <Kuljettajakoulutukset
        changes={
          state[sectionId].changes
            ? state[sectionId].changes["kuljettajakoulutus"]
            : []
        }
        onChanges={handleChanges}
      />
    </div>
  );
};

export default injectIntl(MuutospyyntoWizardKoulutukset);
