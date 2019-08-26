import React, { useEffect, useState } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { parseLocalizedField } from "../../../../../../../modules/helpers";
import { findKieliByKoodi } from "../../../../../../../services/kielet/kieliUtil";
import { isAdded } from "../../../../../../../css/label";
import PropTypes from "prop-types";
import * as R from "ramda";
import _ from "lodash";

const Tutkintokielet = React.memo(props => {
  const sectionId = "tutkintokielet";
  const [defaultLanguage, setDefaultLanguage] = useState({});
  const [items, setItems] = useState([]);
  const [changes, setChanges] = useState({});
  const { onUpdate } = props;

  useEffect(() => {
    const language = findKieliByKoodi(props.kielet, "FI");
    setDefaultLanguage({
      label: parseLocalizedField(language.metadata, props.locale),
      value: language.koodiArvo
    });
  }, [props.kielet, props.locale]);

  useEffect(() => {
    if (props.tutkinnotState.length > 0) {
      const activeOnes = R.map(stateItem => {
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
              stateItem.categories[ii].categories[iii].components[0] = {
                ...subCategory.components[0],
                name: "StatusTextRow",
                properties: {
                  name: "StatusTextRow",
                  code: subCategory.components[0].properties.code,
                  title: subCategory.components[0].properties.title,
                  labelStyles: subCategory.components[0].properties.labelStyles
                }
              };
              stateItem.categories[ii].categories[iii].components.push({
                name: "Autocomplete",
                properties: {
                  options: R.map(language => {
                    return {
                      label:
                        R.find(m => {
                          return m.kieli === props.locale;
                        }, language.metadata).nimi || "[Kielen nimi tähän]",
                      value: language.koodiArvo
                    };
                  }, props.kielet),
                  value: []
                }
              });
            } else {
              delete stateItem.categories[ii].categories[iii].components;
            }
            delete stateItem.categories[ii].categories[iii].categories;
          }, category.categories);
          if (
            !!!R.filter(
              R.prop("components"),
              stateItem.categories[ii].categories
            ).length
          ) {
            stateItem.categories[ii] = false;
          }
        }, stateItem.categories);
        stateItem.categories = stateItem.categories.filter(Boolean);
        if (!!!R.filter(R.prop("categories"), stateItem.categories).length) {
          stateItem = {};
        }
        return stateItem;
      }, _.cloneDeep(props.tutkinnotState));
      setItems(activeOnes);
    }
  }, [props.tutkinnotState, defaultLanguage, props.kielet, props.locale]);

  useEffect(() => {
    const _changes = R.mapObjIndexed((changeObjects, key) => {
      return R.filter(changeObj => {
        return R.not(
          R.includes(changeObj.anchor, props.unselectedAnchors[key] || [])
        );
      }, changeObjects);
    }, changes);
    if (R.not(R.equals(changes, _changes))) {
      setChanges(_changes);
    }
  }, [changes, props.unselectedAnchors]);

  useEffect(() => {
    onUpdate({ sectionId, payload: { changes, items, koodistoUri: "kieli" } });
  }, [changes, items, onUpdate, props.kielet]);

  useEffect(() => {
    const _changes = {};
    R.forEach(muutos => {
      const areaCode = R.head(R.split(".", muutos.meta.changeObj.anchor));
      _changes[areaCode] = _changes[areaCode] || [];
      _changes[areaCode].push(muutos.meta.changeObj);
    }, props.changes || []);
    setChanges(_changes);
  }, [props.changes]);

  const saveChanges = payload => {
    setChanges(prevState => {
      return {
        ...prevState,
        [payload.anchor]: payload.changes
      };
    });
  };

  const removeChanges = (...payload) => {
    return saveChanges({ anchor: payload[1], changes: [] });
  };

  return (
    <React.Fragment>
      {R.addIndex(R.map)((_item, i) => {
        const item = _.cloneDeep(_item);
        const _changes = changes[item.areaCode] || [];
        R.forEach(changeObj => {
          const tailOfAnchor = R.tail(changeObj.anchor.split("."));
          const i = R.findIndex(
            R.propEq("anchor", tailOfAnchor[0]),
            item.categories
          );
          const ii = R.findIndex(
            R.propEq("anchor", tailOfAnchor[1]),
            item.categories[i].categories
          );
          if (item.categories[i].categories[ii].components) {
            const customStyles =
              item.categories[i].categories[ii].components[0].properties
                .labelStyles.custom;
            item.categories[i].categories[
              ii
            ].components[0].properties.labelStyles.custom = Object.assign(
              {},
              customStyles,
              isAdded
            );
          }
        }, _changes);
        return (
          <ExpandableRowRoot
            anchor={item.areaCode}
            categories={item.categories}
            changes={_changes}
            code={item.areaCode}
            index={i}
            key={`expandable-row-root-${i}`}
            onChangesRemove={removeChanges}
            onUpdate={saveChanges}
            sectionId={sectionId}
            title={item.title}
          />
        );
      }, items)}
    </React.Fragment>
  );
});

Tutkintokielet.defautlProps = {
  changes: [],
  kielet: [],
  locale: "FI",
  unselectedAnchors: {}
};

Tutkintokielet.propTypes = {
  changes: PropTypes.array,
  categories: PropTypes.array,
  kielet: PropTypes.array,
  koulutukset: PropTypes.object,
  koulutusalat: PropTypes.object,
  koulutustyypit: PropTypes.array,
  locale: PropTypes.string,
  lupa: PropTypes.object,
  onUpdate: PropTypes.func,
  tutkinnotState: PropTypes.array,
  unselectedAnchors: PropTypes.object
};

export default Tutkintokielet;
