import React, { useEffect, useState } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
// import { isAdded } from "../../../../../../../css/label";
import PropTypes from "prop-types";
import * as R from "ramda";
import _ from "lodash";

const Tutkintokielet = React.memo(props => {
  const sectionId = "kielet_tutkintokielet";
  const { onChangesRemove, onChangesUpdate, onStateUpdate } = props;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = R.map(stateItem => {
      R.addIndex(R.forEach)((category, ii) => {
        R.addIndex(R.forEach)((subCategory, iii) => {
          let changeObj = null;
          if (R.path([stateItem.areaCode], props.changeObjects.tutkinnot)) {
            const anchor = `tutkinnot_${R.join(".", [
              stateItem.areaCode,
              category.anchor,
              subCategory.anchor,
              subCategory.components[0].anchor
            ])}`;
            changeObj = R.find(
              R.propEq("anchor", anchor),
              R.path([stateItem.areaCode], props.changeObjects.tutkinnot) || []
            );
          }
          if (
            (subCategory.components[0].properties.isChecked && !changeObj) ||
            (changeObj && changeObj.properties.isChecked)
          ) {
            stateItem.categories[ii].categories[iii].components[0] = {
              ...subCategory.components[0],
              anchor: "A",
              name: "StatusTextRow",
              properties: {
                name: "StatusTextRow",
                code: subCategory.components[0].properties.code,
                title: subCategory.components[0].properties.title,
                labelStyles: {}
              }
            };
            stateItem.categories[ii].categories[iii].components.push({
              anchor: "B",
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
          !!!R.filter(R.prop("components"), stateItem.categories[ii].categories)
            .length
        ) {
          stateItem.categories[ii] = false;
        }
      }, stateItem.categories);
      stateItem.categories = stateItem.categories.filter(Boolean);
      if (!!!R.filter(R.prop("categories"), stateItem.categories).length) {
        stateItem = {};
      }
      return stateItem;
    }, _.cloneDeep(props.stateObjects.tutkinnot.items));

    setItems(items);
  }, [
    props.stateObjects.tutkinnot.items,
    props.changeObjects.tutkinnot,
    props.kielet,
    props.locale
  ]);

  useEffect(() => {
    onStateUpdate({ items, koodistoUri: "kieli" }, sectionId);
  }, [items, onStateUpdate]);

  useEffect(() => {
    if (props.unselectedAnchors.length && props.changeObjects.tutkintokielet) {
      const areaCode = R.compose(
        R.last,
        R.split("_"),
        R.head,
        R.split(".")
      )(props.unselectedAnchors[0]);

      const commonPart = R.compose(
        R.join("."),
        R.concat([areaCode])
      )(R.slice(1, 3, R.split(".", props.unselectedAnchors[0])));

      const tutkintokielichangesWithoutRemovedOnes = {
        ...props.changeObjects.tutkintokielet,
        [areaCode]: R.filter(changeObj => {
          return !R.contains(commonPart, changeObj.anchor);
        }, props.changeObjects.tutkintokielet[areaCode] || [])
      };

      if (
        !R.equals(
          tutkintokielichangesWithoutRemovedOnes,
          props.changeObjects.tutkintokielet
        )
      ) {
        onChangesUpdate({
          anchor: sectionId,
          changes: tutkintokielichangesWithoutRemovedOnes
        });
      }
    }
  }, [
    onChangesUpdate,
    props.changeObjects.tutkintokielet,
    props.unselectedAnchors
  ]);

  return (
    <React.Fragment>
      {R.addIndex(R.map)((_item, i) => {
        const item = _.cloneDeep(_item);
        // const _changes = changes[item.areaCode] || [];
        // R.forEach(changeObj => {
        //   const tailOfAnchor = R.tail(changeObj.anchor.split("."));
        //   const i = R.findIndex(
        //     R.propEq("anchor", tailOfAnchor[0]),
        //     item.categories
        //   );
        //   const ii = R.findIndex(
        //     R.propEq("anchor", tailOfAnchor[1]),
        //     item.categories[i].categories
        //   );
        //   if (item.categories[i].categories[ii].components) {
        //     const customStyles =
        //       item.categories[i].categories[ii].components[0].properties
        //         .labelStyles.custom;
        //     item.categories[i].categories[
        //       ii
        //     ].components[0].properties.labelStyles.custom = Object.assign(
        //       {},
        //       customStyles,
        //       isAdded
        //     );
        //   }
        // }, _changes);
        return (
          <React.Fragment key={i}>
            {item.categories && (
              <ExpandableRowRoot
                anchor={`${sectionId}_${item.areaCode}`}
                categories={item.categories}
                changes={R.path(
                  ["tutkintokielet", item.areaCode],
                  props.changeObjects
                )}
                code={item.areaCode}
                index={i}
                key={`expandable-row-root-${i}`}
                onChangesRemove={onChangesRemove}
                onUpdate={onChangesUpdate}
                sectionId={sectionId}
                showCategoryTitles={true}
                title={item.title}
              />
            )}
          </React.Fragment>
        );
      }, R.path(["tutkintokielet", "items"], props.stateObjects) || [])}
    </React.Fragment>
  );
});

Tutkintokielet.defaultProps = {
  changeObjects: {
    tutkinnot: [],
    tutkintokielet: {}
  },
  kielet: [],
  locale: "FI",
  unselectedAnchors: [],
  stateObjects: {}
};

Tutkintokielet.propTypes = {
  changeObjects: PropTypes.object,
  categories: PropTypes.array,
  kielet: PropTypes.array,
  koulutukset: PropTypes.object,
  koulutusalat: PropTypes.object,
  koulutustyypit: PropTypes.array,
  locale: PropTypes.string,
  lupa: PropTypes.object,
  onChangesUpdate: PropTypes.func,
  onChangesRemove: PropTypes.func,
  onStateUpdate: PropTypes.func,
  stateObjects: PropTypes.object,
  unselectedAnchors: PropTypes.array
};

export default Tutkintokielet;
