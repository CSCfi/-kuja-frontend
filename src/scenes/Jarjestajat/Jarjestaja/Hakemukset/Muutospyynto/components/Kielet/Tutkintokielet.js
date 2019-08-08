import React, { useEffect, useState } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { parseLocalizedField } from "../../../../../../../modules/helpers";
import { findKieliByKoodi } from "../../../../../../../services/kielet/kieliUtil";
import PropTypes from "prop-types";
import * as R from "ramda";

const Tutkintokielet = React.memo(props => {
  const sectionId = "tutkintokielet";
  const [defaultLanguage, setDefaultLanguage] = useState({});
  const [changes, setChanges] = useState({});
  const [state, setState] = useState([]);

  useEffect(() => {
    const language = findKieliByKoodi(props.kielet, "FI");
    setDefaultLanguage({
      label: parseLocalizedField(language.metadata, props.locale),
      value: language.koodiArvo
    });
  }, [props.kielet, props.locale]);

  useEffect(() => {
    if (props.tutkinnotState.length > 0) {
      const activeOnes = R.addIndex(R.map)((stateItem, i) => {
        let tmpStateItem = R.clone(stateItem);
        R.addIndex(R.forEach)((category, ii) => {
          R.addIndex(R.forEach)((subCategory, iii) => {
            const change = R.find(
              R.propEq("path", [ii, "categories", iii, "components", 0]),
              stateItem.changes
            );
            if (
              (subCategory.components[0].properties.isChecked && !change) ||
              (change && change.properties.isChecked)
            ) {
              tmpStateItem.categories[ii].categories[iii].components.push({
                name: "Dropdown",
                properties: {
                  options: R.map(language => {
                    return {
                      label:
                        R.find(m => {
                          return m.kieli === props.locale;
                        }, language.metadata).nimi || "[Kielen nimi tähän]",
                      value: language.value
                    };
                  }, props.kielet),
                  selectedOption: defaultLanguage
                }
              });
            } else {
              delete tmpStateItem.categories[ii].categories[iii].components;
            }
            delete tmpStateItem.categories[ii].categories[iii].categories;
          }, category.categories);
          if (
            !!!R.filter(
              R.prop("components"),
              tmpStateItem.categories[ii].categories
            ).length
          ) {
            tmpStateItem.categories[ii] = false;
          }
        }, stateItem.categories);
        tmpStateItem.categories = tmpStateItem.categories.filter(Boolean);
        if (!!!R.filter(R.prop("categories"), tmpStateItem.categories).length) {
          tmpStateItem = {};
        }
        return tmpStateItem;
      }, props.tutkinnotState);
      setState(activeOnes);
    }
  }, [props.tutkinnotState, defaultLanguage, props.kielet, props.locale]);

  const saveChanges = payload => {
    setChanges(prevState => {
      const newState = R.clone(prevState);
      newState[payload.anchor] = payload.changes;
      console.log(newState[payload.anchor].categories)
      return newState;
    });
  };

  const removeChanges = (...payload) => {
    return saveChanges({ anchor: payload[1], changes: [] });
  };

  return (
    <React.Fragment>
      {R.addIndex(R.map)((itemState, i) => {
        return (
          <ExpandableRowRoot
            anchor={itemState.areaCode}
            categories={itemState.categories}
            changes={changes[itemState.areaCode]}
            code={itemState.areaCode}
            index={i}
            key={`expandable-row-root-${i}`}
            onChangesRemove={removeChanges}
            onUpdate={saveChanges}
            sectionId={sectionId}
            title={itemState.title}
          />
        );
      }, state)}
    </React.Fragment>
  );
});

Tutkintokielet.defautlProps = {
  changes: [],
  locale: "FI"
};

Tutkintokielet.propTypes = {
  categories: PropTypes.array,
  kielet: PropTypes.array,
  koulutukset: PropTypes.object,
  koulutusalat: PropTypes.object,
  koulutustyypit: PropTypes.array,
  locale: PropTypes.string,
  lupa: PropTypes.object,
  onUpdate: PropTypes.func,
  tutkinnotState: PropTypes.array
};

export default Tutkintokielet;
