import _ from "lodash";
import React, { useContext } from "react";
import TutkintoList from "./TutkintoList";
import { parseLocalizedField } from "../../../../../../modules/helpers";
import Loading from "../../../../../../modules/Loading";
import { Row, Info } from "./MuutospyyntoWizardComponents";
import Section from "components/Section";
import { MUUTOS_TYPES } from "../modules/uusiHakemusFormConstants";
import { MuutoshakemusContext } from "context/muutoshakemusContext";
import {
  addItemToChanges,
  addSubItemToChanges,
  removeItemFromChanges,
  removeSubItemFromChanges
} from "services/muutoshakemus/actions";

const MuutospyyntoWizardTutkinnot = props => {
  const sectionId = 'tutkinnot';
  const { state, dispatch: mhlDispatch } = useContext(MuutoshakemusContext);
  const { lupa } = props;
  const { kohteet } = lupa;
  const { headingNumber, heading } = kohteet[1];
  const koulutusdata = props.koulutukset.koulutusdata;
  const koulutusDataSorted = _.sortBy(koulutusdata, d => {
    return d.koodiArvo;
  });

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
        removeSubItemFromChanges(sectionId, item.subItems[0], listId)(mhlDispatch);
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
            addItemToChanges(sectionId, item, listId, operationType)(mhlDispatch);
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
      {_.map(koulutusDataSorted, (koulutusala, i) => {
        const koodiarvo = koulutusala.koodiarvo || koulutusala.koodiArvo;
        const { metadata, koulutukset } = koulutusala;
        const nimi = parseLocalizedField(metadata);
        return (
          <TutkintoList
            key={i}
            koodiarvo={koodiarvo}
            areaCode={koodiarvo}
            title={nimi}
            koulutustyypit={koulutukset}
            articles={kohteet[1].maaraykset}
            changes={state[sectionId].changes ? state[sectionId].changes[koodiarvo] : []}
            onChanges={handleChanges}
            listId={koodiarvo}
          />
        );
      })}
    </Section>
  );
};

export default MuutospyyntoWizardTutkinnot;

// const changes = getChangesByList(
//   props.tutkintomuutoksetValue,
//   props.koulutukset.koulutusdata
// );
// if (state.changes === null) {
//   setState({
//     changes: changes || []
//   });
// }

// } else if (koulutuksetIsFetching || muutIsFetching) {
//   return <Loading />;
// } else if (koulutuksetHasErrored || muutHasErrored) {
//   return <h2>Virhe ladattaessa tietoja</h2>;
// } else {
//   return null;
// }

// componentDidUpdate(prevProps, prevState) {
//   if (
//     props.koulutukset &&
//     props.koulutukset.koulutusdata &&
//     props.tutkintomuutoksetValue
//   ) {
//     const changes = getChangesByList(
//       props.tutkintomuutoksetValue,
//       props.koulutukset.koulutusdata
//     );
//     if (state.changes === null) {
//       setState({
//         changes: changes || []
//       });
//     }
//   }
// }
