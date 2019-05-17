import _ from "lodash";
import React, { useContext } from "react";
import Section from "components/03-templates/Section";
import { MUUTOS_TYPES } from "../modules/uusiHakemusFormConstants";
import { MuutoshakemusContext } from "context/muutoshakemusContext";
import {
  addItemToChanges,
  addSubItemToChanges,
  removeItemFromChanges,
  removeSubItemFromChanges
} from "services/muutoshakemus/actions";
import Tutkinnot from "./Tutkinnot/Tutkinnot";

const MuutospyyntoWizardTutkinnot = props => {
  const sectionId = "tutkinnot";
  const { state, dispatch: mhlDispatch } = useContext(MuutoshakemusContext);
  const { lupa } = props;
  const { kohteet } = lupa;
  const { headingNumber, heading } = kohteet[1];

  const getChangesByList = (allChanges = [], koulutusdata = []) => {
    const changes = {};
    _.forEach(koulutusdata, koulutusala => {
      const koulutustyypit = koulutusala.koulutukset;
      changes[koulutusala.koodiArvo] = _.map(allChanges, change => {
        return !!_.find(koulutustyypit, koulutustyyppi => {
          return !!_.find(koulutustyyppi.koulutukset, koulutus => {
            return (
              koulutus.koodiArvo === change.koodiarvo ||
              koulutus.koodiArvo === change.koodiArvo
            );
          });
        })
          ? change
          : null;
      }).filter(Boolean);
    });
    return changes;
  };

  const handleChanges = (item, isSubItemTarget, listId) => {
    if (isSubItemTarget) {
      /******************* IF USE HAS CLICKED A SUB ITEM *******************/
      const existingChange = _.find(state[sectionId].changes[listId], {
        koodiArvo: item.subItems[0].code
      });
      if (existingChange) {
        removeSubItemFromChanges(sectionId, item.subItems[0], listId)(
          mhlDispatch
        );
      } else {
        // Let's find out the type of operation
        const operationType = item.subItems[0].shouldBeSelected
          ? MUUTOS_TYPES.REMOVAL
          : MUUTOS_TYPES.ADDITION;
        // If user is going to select the sub item we wanted its parent to be selected too
        if (operationType === MUUTOS_TYPES.ADDITION) {
          // Let's find out if the parent item is already selected
          const isItemSelected = !!_.find(state[sectionId].changes[listId], {
            koodiarvo: item.code
          });
          // Parent item needs to be selected when at least one sub item is going to be selected
          if (!isItemSelected) {
            addItemToChanges(sectionId, item, listId, operationType)(
              mhlDispatch
            );
          }
        }
        // Let's add the sub item to changes
        addSubItemToChanges(sectionId, item.subItems[0], listId, operationType)(
          mhlDispatch
        );
      }
    } else {
      /******************* IF USE HAS CLICKED AN ITEM *******************/
      // Let's find out the type of operation
      const operationType = item.shouldBeSelected
        ? MUUTOS_TYPES.REMOVAL
        : MUUTOS_TYPES.ADDITION;
      const existingChange = _.find(state[sectionId].changes[listId], {
        koodiarvo: item.code
      });
      if (operationType === MUUTOS_TYPES.REMOVAL) {
        // If user is going to unselect the item we need to unselect all the sub items too
        _.forEach(item.subItems, subItem => {
          removeSubItemFromChanges(sectionId, subItem, listId)(mhlDispatch);
        });
      }
      // Let's reset the item's state
      if (existingChange) {
        removeItemFromChanges(sectionId, item, listId)(mhlDispatch);
      } else {
        addItemToChanges(sectionId, item, listId, operationType)(mhlDispatch);
      }
    }
  };

  return (
    <Section code={headingNumber} title={heading}>
      <Tutkinnot
        koulutukset={props.koulutukset}
        lupa={lupa}
        changes={
          state[sectionId].changes || []
        }
        kohde={props.lupa.kohteet[2]}
        listId={"all"}
        onChanges={handleChanges}
      />
    </Section>
  );
};

export default MuutospyyntoWizardTutkinnot;
