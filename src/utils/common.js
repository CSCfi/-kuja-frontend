import * as R from "ramda";

export const getAnchorPart = (anchor, index) => {
  return R.compose(
    R.view(R.lensIndex(index)),
    R.split(".")
  )(anchor);
};

export const curriedGetAnchorPartsByIndex = R.curry((objects, index) => {
  return R.map(obj => {
    return getAnchorPart(R.prop("anchor", obj), index);
  })(objects);
});

export const getAnchorsStartingWith = (prefix, objects) => {
  return R.filter(R.compose(
    R.startsWith(prefix),
    R.head,
    R.split("."),
    R.prop("anchor")
  ))(objects);
};
