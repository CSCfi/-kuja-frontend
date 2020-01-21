import { getAnchorPart } from "../../../utils/common";
import { perustelut } from "./all-mappings";
import * as R from "ramda";
/**
 * Function tries to return an object filled with form data for backend.
 * @param {array} changeObjects - Array of change objects
 */
export function fillForBackend(changeObjects, anchor) {
  if (changeObjects.length) {
    const head = getAnchorPart(changeObjects[0].anchor, 0);
    const anchorInit = anchor && R.slice(0, R.lastIndexOf(".", anchor), anchor);
    const koodiarvo = getAnchorPart(changeObjects[0].anchor, 1);
    const filled = perustelut[head]
      ? perustelut[head](changeObjects, anchorInit)
      : null;
    console.info(head, koodiarvo, filled);
    return filled;
  }

  return null;
}
