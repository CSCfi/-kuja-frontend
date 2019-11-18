import * as R from "ramda";

/**
 * Utility functions are listed here.
 * @namespace utils
 * */

/**
 * @module Utils/common
 */

/**
 * Returns a part of the given anchor by index.
 * @param {string} anchor
 * @param {number} index
 * @param {string} separator - Default value: .
 */
export function getAnchorPart(anchor, index, separator = ".") {
  return R.compose(R.view(R.lensIndex(index)), R.split(separator))(anchor);
}

/**
 * Returns the element with the given anchor from the array of elements
 * @param anchor
 * @param scanArray
 */
export const findAnchoredElement = (anchor, scanArray) => {
  return R.find(R.propEq("anchor", anchor), scanArray || []);
};

export const findAnchoredCategoryFromElement = (anchor, elementObject) => {
  return findAnchoredElement(anchor, elementObject.categories);
};

export const findAnchoredComponentFromElement = (anchor, elementObject) => {
  return findAnchoredElement(anchor, elementObject.components);
};

const findAnchoredCategoryOrComponentFromElement = (anchor, elementObject) => {
  let retval = findAnchoredCategoryFromElement(anchor, elementObject);
  if (!retval) retval = findAnchoredComponentFromElement(anchor, elementObject);
  return retval;
};

/**
 * Returns the element found from given anchor in a category hierarchy. We expect that the anchor is
 * a . delimited path with elementes being categories and optionally the last element being a component
 *
 * @param anchor The path for scanning the component from stateObject (e.g. vahimmaisopiskelijavuodet.A)
 * @param stateObject
 */
export const findAnchoredElementFromCategoryHierarchy = (
  anchor,
  rootObject
) => {
  if (!rootObject || !anchor || R.isEmpty(rootObject)) return undefined;
  const anchorParts = anchor.split(".");
  let currentElement = rootObject;

  for (const anchorPart of anchorParts) {
    currentElement = findAnchoredCategoryOrComponentFromElement(
      anchorPart,
      currentElement
    );

    if (!currentElement) {
      return undefined;
    }
  }

  return currentElement;
};

export const removeAnchorPart = (anchor, index, separator = ".") => {
  return R.compose(
    R.join(separator),
    R.remove(index, 1),
    R.split(separator)
  )(anchor);
};

export const replaceAnchorPartWith = (anchor, index, replaceWith) => {
  return R.compose(
    R.join("."),
    R.update(index, replaceWith),
    R.split(".")
  )(anchor);
};

export const curriedGetAnchorPartsByIndex = R.curry((objects, index) => {
  return R.map(obj => {
    return getAnchorPart(R.prop("anchor", obj), index);
  })(objects);
});

export const getAnchorsStartingWith = (prefix, objects) => {
  return R.filter(
    R.compose(R.startsWith(prefix), R.head, R.split("."), R.prop("anchor"))
  )(objects);
};

export const flattenObj = obj => {
  const go = obj_ =>
    R.chain(([k, v]) => {
      if (R.type(v) === "Object" || R.type(v) === "Array") {
        return R.map(([k_, v_]) => [`${k}.${k_}`, v_], go(v));
      } else {
        return [[k, v]];
      }
    }, R.toPairs(obj_));

  return R.fromPairs(go(obj));
};
