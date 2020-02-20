import * as R from "ramda";
import {
  getPathByAnchor,
  ifOneTerm
} from "../../components/02-organisms/CategorizedListRoot/utils";
import { findObjectWithKey } from "../../utils/common";

export function createRules(requiredFields = []) {
  return R.map(rule => {
    return {
      isRequired: () => true,
      markRequiredFields: lomake => {
        const _path = getPathByAnchor(R.split(".", rule.anchor), lomake);
        return R.assocPath(
          R.concat(_path, ["properties", "isRequired"]),
          true,
          lomake
        );
      },
      isValid: (lomake, changeObjects) => {
        return () =>
          ifOneTerm(
            [
              {
                anchor: rule.anchor,
                properties: { value: R.compose(R.not, R.isEmpty) }
              }
            ],
            lomake,
            changeObjects
          );
      },
      showErrors: (lomake, isValid) => {
        const _path = getPathByAnchor(R.split(".", rule.anchor), lomake);
        return R.assocPath(
          R.concat(_path, ["properties", "isValid"]),
          isValid,
          lomake
        );
      }
    };
  }, requiredFields);
}
/**
 *
 * @param {array} categories - Categories structure.
 * @param {object} reqProps - Is used for filtering found components.
 * @param {object} decorateWith - Object that will be attached return value.
 * @param {array} _fullAnchor - "Component's full anchor. For recursion only."
 */
export function createTerms(
  categories,
  reqProps = {},
  decorateWith = {},
  _fullAnchor = []
) {
  return R.map(category => {
    const fullAnchor = R.append(category.anchor, _fullAnchor);
    if (category.categories) {
      return createTerms(
        category.categories,
        reqProps,
        decorateWith,
        fullAnchor
      ).filter(Boolean);
    }
    if (category.components) {
      return R.map(component => {
        let isToBeReturned = true;
        R.mapObjIndexed((value, key) => {
          if (!R.equals(R.prop(key, component), value)) {
            isToBeReturned = false;
          }
        }, reqProps);
        return isToBeReturned
          ? Object.assign(
              {},
              {
                anchor: `${R.join(".", fullAnchor)}.${component.anchor}`
              },
              decorateWith
            )
          : null;
      }, category.components).filter(Boolean);
    }
    return null;
  }, categories);
}

export function getCategoriesByProps(
  categories,
  reqProps = {},
  _fullAnchor = [],
  results = [],
  fullPath = []
) {
  return R.addIndex(R.map)((category, i) => {
    const fullAnchor = R.append(category.anchor, _fullAnchor);
    let isToBeReturned = true;
    R.forEachObjIndexed((value, key) => {
      if (value instanceof Function) {
        isToBeReturned = value(R.prop(key, category));
      } else if (!R.equals(R.prop(key, category), value)) {
        isToBeReturned = false;
      }
    }, reqProps);
    if (isToBeReturned) {
      results.push(
        Object.assign({}, category, {
          fullAnchor: R.join(".", fullAnchor),
          fullPath: R.append(i, fullPath)
        })
      );
    }
    if (category.categories) {
      return getCategoriesByProps(
        category.categories,
        reqProps,
        fullAnchor,
        results,
        R.concat(fullPath, [i, "categories"])
      ).filter(Boolean);
    }
    return results;
  }, categories);
}

export function getActiveCheckboxes(lomake, changeObjects = []) {
  const components = R.filter(
    R.propEq("name", "CheckboxWithLabel"),
    findObjectWithKey(lomake, "components")
  );
  const changeObjectsWithTailAnchors = R.map(changeObj => {
    const tailAnchor = R.compose(
      R.join("."),
      R.tail(),
      R.split("."),
      R.prop("anchor")
    )(changeObj);
    return R.assoc("anchor", tailAnchor, changeObj);
  }, changeObjects);

  return R.filter(component => {
    const changeObj = R.find(
      R.propEq("anchor", component.fullAnchor),
      changeObjectsWithTailAnchors
    );
    return (
      (component.properties.isChecked && !changeObj) ||
      (changeObj && changeObj.properties.isChecked)
    );
  }, components);
}

export function sortArticlesByHuomioitavaKoodi(articles, locale) {
  const sortedArticles = R.sort((a, b) => {
    const metadataA = R.find(R.propEq("kieli", locale), a.metadata);
    const metadataB = R.find(R.propEq("kieli", locale), b.metadata);
    /**
     * List items will be arranged by huomioitava koodi. If it isn't
     * available we use value 0 instead of it. That's why undefined
     * ones go on top of the list.
     */
    const numberValueA = parseInt(metadataA.huomioitavaKoodi, 10) || 0;
    const numberValueB = parseInt(metadataB.huomioitavaKoodi, 10) || 0;
    if (numberValueA > numberValueB) {
      return 1;
    } else if (numberValueA < numberValueB) {
      return -1;
    } else {
      return -1;
    }
  }, articles);
  return sortedArticles;
}
