import React, { useContext, useEffect, useState } from "react";
import { MuutoshakemusContext } from "context/muutoshakemusContext";
import Section from "components/Section";
import ExpandableRow from "components/ExpandableRow";
import { getDataForKieletList } from "services/kielet/opetuskieletUtil";
import SelectableItem from "components/SelectableItem";
import { Wrapper } from "../MuutospyyntoWizardComponents";
import { MUUTOS_WIZARD_TEKSTIT } from "../../modules/constants";
import { OppilaitoksenOpetuskieletContext } from "context/kieletContext";
import { fetchOppilaitoksenOpetuskielet } from "services/kielet/actions";
import { MUUTOS_TYPES } from "../../modules/uusiHakemusFormConstants";
import {
  addItemToChanges,
  removeItemFromChanges
} from "services/muutoshakemus/actions";
import _ from "lodash";

const Tutkintokielet = props => {
  const sectionId = "opetuskielet";
  const [state, setState] = useState({});
  const { state: opetuskielet, dispatch } = useContext(
    OppilaitoksenOpetuskieletContext
  );
  const { state: mhlState, dispatch: mhlDispatch } = useContext(
    MuutoshakemusContext
  );

  useEffect(() => {
    setState(
      getDataForKieletList(
        opetuskielet,
        props.lupa.kohteet[2],
        mhlState[sectionId].changes["kielet"]
      )
    );
  }, [opetuskielet, mhlState[sectionId].changes["kielet"]]);

  useEffect(() => {
    fetchOppilaitoksenOpetuskielet()(dispatch);
  }, []);

  const handleChanges = (
    item,
    listId = "kielet",
    removeExistingOnes = false
  ) => {
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
      <Wrapper>
        <ExpandableRow
          shouldBeExpanded={true}
          title={MUUTOS_WIZARD_TEKSTIT.MUUTOS_OPETUSKIELET.HEADING.FI}
          changes={mhlState[sectionId].changes["kielet"]}
        >
          <div className="py-4">
            {_.map(state.items, (item, i) => {
              return (
                <div key={`item-${i}`} className="mx-6 px-1 py-2">
                  <SelectableItem item={item} onChanges={handleChanges} />
                </div>
              );
            })}
          </div>
        </ExpandableRow>
      </Wrapper>
    </Section>
  );
};

export default Tutkintokielet;
