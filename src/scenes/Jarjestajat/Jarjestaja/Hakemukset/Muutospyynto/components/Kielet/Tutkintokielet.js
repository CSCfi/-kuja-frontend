import React, { useEffect, useState, useMemo } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { isAdded } from "../../../../../../../css/label";
import PropTypes from "prop-types";
import { getAnchorPart } from "../../../../../../../utils/common";
import * as R from "ramda";
import _ from "lodash";

const Tutkintokielet = React.memo(props => {
  const sectionId = "kielet_tutkintokielet";
  const { onChangesRemove, onChangesUpdate, onStateUpdate } = props;
  const [items, setItems] = useState([]);

  useEffect(() => {
    // console.info(
    //   props.stateObjects.tutkinnot.items,
    //   props.changeObjects.tutkinnot
    // );
    const items = R.map(stateItem => {
      R.addIndex(R.forEach)((category, ii) => {
        R.addIndex(R.forEach)((subCategory, iii) => {
          let changeObj = null;
          if (R.path(["tutkinnot", stateItem.areaCode], props.changeObjects)) {
            const anchor = `tutkinnot_${R.join(".", [
              stateItem.areaCode,
              category.anchor,
              subCategory.anchor,
              subCategory.components[0].anchor
            ])}`;
            changeObj = R.find(
              R.propEq("anchor", anchor),
              R.path(["tutkinnot", stateItem.areaCode], props.changeObjects) ||
                []
            );
            // console.info(changeObj, stateItem.areaCode);
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

  // const anchor = `tutkinnot_${R.join(".", [
  //   stateItem.areaCode,
  //   category.anchor,
  //   subCategory.anchor,
  //   subCategory.components[0].anchor
  // ])}`;
  // const change = R.find(
  //   R.propEq("anchor", anchor),
  //   R.path(["tutkinnot", stateItem.areaCode], props.changeObjects) || []
  // );

  // useEffect(() => {
  //   if (items && props.changeObjects.tutkinnot) {
  //     let updatedItems = _.cloneDeep(items);
  //     const operations = R.addIndex(R.mapObjIndexed)(
  //       (changeObjs, areaCode, obj, index) => {
  //         const i = R.findIndex(R.propEq("areaCode", areaCode), items);
  //         return R.map(changeObj => {
  //           const ii = R.findIndex(
  //             R.propEq("anchor", getAnchorPart(changeObj.anchor, 1)),
  //             items[i].categories
  //           );
  //           const iii = R.findIndex(
  //             R.propEq("anchor", getAnchorPart(changeObj.anchor, 2)),
  //             items[i].categories[ii].categories
  //           );
  //           return {
  //             path: [
  //               index,
  //               i,
  //               "categories",
  //               ii,
  //               "categories",
  //               iii,
  //               "components"
  //             ],
  //             operation: changeObj.properties.isChecked ? "addition" : "removal"
  //           };
  //         }, changeObjs);

  //         // const areaCode = R.compose(
  //         //   R.view(R.lensIndex(1)),
  //         //   R.split("_")
  //         // )(getAnchorPart(changeObj.anchor, 0));
  //       },
  //       props.changeObjects.tutkinnot
  //     );

  //     R.forEach(obj => {
  //       console.info(obj.operation, obj.path);
  //       if (obj.operation === "addition") {
  //         updatedItems = R.assocPath(
  //           obj.path,
  //           [
  //             {
  //               anchor: "A",
  //               name: "StatusTextRow",
  //               properties: {
  //                 name: "StatusTextRow",
  //                 code: "23",
  //                 title: "testtiiiii",
  //                 labelStyles: {}
  //               }
  //             },
  //             {
  //               anchor: "B",
  //               name: "Autocomplete",
  //               properties: {
  //                 options: R.map(language => {
  //                   return {
  //                     label:
  //                       R.find(m => {
  //                         return m.kieli === props.locale;
  //                       }, language.metadata).nimi || "[Kielen nimi tähän]",
  //                     value: language.koodiArvo
  //                   };
  //                 }, props.kielet),
  //                 value: []
  //               }
  //             }
  //           ],
  //           updatedItems
  //         );
  //       }
  //     }, R.flatten(R.values(operations)));
  //     console.info(R.flatten(R.values(operations)), items, updatedItems);
  //     // setItems(updatedItems);
  //     //   const anchor = `tutkinnot_${R.join(".", [
  //     //   stateItem.areaCode,
  //     //   category.anchor,
  //     //   subCategory.anchor,
  //     //   subCategory.components[0].anchor
  //     // ])}`;
  //   }
  // }, [items, props.changeObjects.tutkinnot]);

  useEffect(() => {
    onStateUpdate({ items, koodistoUri: "kieli" }, sectionId);
  }, [items]);

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
  changeObjects: {},
  kielet: [],
  locale: "FI",
  unselectedAnchors: {},
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
  unselectedAnchors: PropTypes.object
};

export default Tutkintokielet;
