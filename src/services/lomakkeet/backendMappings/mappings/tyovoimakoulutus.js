import { isNil, path } from "ramda";

/**
 * Function contains mapping data for backend related to kuljettajien peruskoulutuslomake.
 * Return value is an array of config objects. The first property of a config object is
 * 'path'. It defines where the value (calculated by valueFn) is put to. Second property
 * is 'anchors'. Function 'valueFn' is called with change objects of those anchors.
 * @param {number} koodiarvo
 */
export function getMapping(koodiarvo) {
  return [
    // TODO: write mappings here
  ];
}
