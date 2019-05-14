import React, { useEffect, useState } from "react";
import ExpandableRow from "01-molecules/ExpandableRow/ExpandableRow";
import { Wrapper } from "./MuutospyyntoWizardComponents";
import PropTypes from "prop-types";
import _ from "lodash";
import { MUUTOS_TYPES } from "../modules/uusiHakemusFormConstants";
import RadioButton from "00-atoms/RadioButton/RadioButton";

const KoulutusList = props => {
  const formState = () => {
    const state = {
      items: _.map(props.koulutukset, (koulutus, i) => {
        const isAdded = !!_.find(
          _.filter(props.changes, { koodiarvo: koulutus.koodiArvo }),
          { type: MUUTOS_TYPES.ADDITION }
        );
        const isRemoved = !!_.find(
          _.filter(props.changes, { koodiarvo: koulutus.koodiArvo }),
          { type: MUUTOS_TYPES.REMOVAL }
        );
        return {
          code: koulutus.koodiArvo,
          isAdded,
          isRemoved,
          shouldBeSelected: isAdded,
          title:
            _.find(koulutus.metadata, m => {
              return m.kieli === "FI";
            }).nimi || "[Koulutuksen otsikko tähän]"
        };
      }),
      changes: props.changes || []
    };
    console.info(state);
    return state;
  };

  const [state, setState] = useState(formState());

  useEffect(() => {
    setState(formState());
  }, [props.changes]);

  const onChanges = (item) => {
    console.info(item);
    props.onChanges(item, props.listId);
  };

  return (
    <Wrapper>
      <ExpandableRow
        code={props.koodiarvo}
        title={props.title}
        changes={state.changes}
      >
        {_.map(state.items, (item, i) => {
          return (
            <div key={`item-${i}`} className="px-6 py-2">
              <RadioButton
                name={`radio-${props.listId}`}
                item={item}
                onChanges={onChanges}
              />
            </div>
          );
        })}
      </ExpandableRow>
    </Wrapper>
  );
};

KoulutusList.propTypes = {
  koodisto: PropTypes.string,
  koulutukset: PropTypes.array,
  listId: PropTypes.string,
  onChanges: PropTypes.func,
  title: PropTypes.string,
  muutMaaraykset: PropTypes.array
};

export default KoulutusList;
