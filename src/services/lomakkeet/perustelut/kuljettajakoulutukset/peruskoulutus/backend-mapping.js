import { assocPath, find, forEach, isNil, map, propEq } from "ramda";

function getMapping(koodiarvo) {
  return [
    {
      path: ["tarpeellisuus"],
      anchors: [
        `perustelut_koulutukset_kuljettajakoulutukset.${koodiarvo}.tehtavan-tarpeellisuus.textbox.A`
      ],
      valueFn: changeObjects => changeObjects[0].properties.value
    },
    {
      path: ["voimassaoleva"],
      anchors: [
        `perustelut_koulutukset_kuljettajakoulutukset.${koodiarvo}.tehtavan-tarpeellisuus.textbox.A`
      ],
      valueFn: changeObjects => changeObjects[0].properties.isChecked === true
    }
  ];
}

export function calculateValues(mapping, changeObjects) {
  let result = {};
  forEach(item => {
    const changeObjectsSubGroup = map(anchor => {
      return find(propEq("anchor", anchor), changeObjects);
    }, item.anchors);
    const value = item.valueFn(changeObjectsSubGroup);
    if (!isNil(value)) {
      result = assocPath(item.path, value, result);
    }
  }, mapping || []);
  return result;
}

export const perustelut = {
  perustelut_koulutukset_kuljettajakoulutukset: (changeObjects, koodiarvo) => {
    return {
      perusteluteksti_kuljetus: calculateValues(
        getMapping(koodiarvo),
        changeObjects
      )
    };
  }
};
