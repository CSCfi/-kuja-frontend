import * as R from "ramda";

const getAnchorPart = (anchor, index) => {
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