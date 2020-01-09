import { assocPath, find, forEach, isNil, map, path, propEq } from "ramda";

function getMapping(koodiarvo) {
  return [
    {
      path: ["tarpeellisuus"],
      anchors: [
        `perustelut_koulutukset_kuljettajakoulutukset.${koodiarvo}.tehtavan-tarpeellisuus.textbox.A`
      ],
      valueFn: changeObjects => path([0, "properties", "value"], changeObjects)
    },
    {
      path: ["voimassaoleva"],
      anchors: [
        `perustelut_koulutukset_kuljettajakoulutukset.${koodiarvo}.voimassaolo.voimassaolo-field-yes.A`,
        `perustelut_koulutukset_kuljettajakoulutukset.${koodiarvo}.voimassaolo.voimassaolo-field-no.A`
      ],
      valueFn: changeObjects => {
        const yesValue = path([0, "properties", "isChecked"], changeObjects);
        const noValue = path([1, "properties", "isChecked"], changeObjects);
        let isValid = null;
        if (!isNil(yesValue)) {
          isValid = true;
        } else if (!isNil(noValue)) {
          isValid = false;
        }
        return isValid;
      }
    },
    {
      path: ["suunnitelma"],
      anchors: [
        `perustelut_koulutukset_kuljettajakoulutukset.${koodiarvo}.suunnitelma.suunnitelma-field.A`
      ],
      valueFn: changeObjects => path([0, "properties", "value"], changeObjects)
    },
    {
      path: ["kanta_linja_auto"],
      anchors: [
        `perustelut_koulutukset_kuljettajakoulutukset.${koodiarvo}.ajoneuvokanta.ajoneuvokanta-kentat.linja-autoja`
      ],
      valueFn: changeObjects => path([0, "properties", "value"], changeObjects)
    },
    {
      path: ["kanta_kuorma_auto"],
      anchors: [
        `perustelut_koulutukset_kuljettajakoulutukset.${koodiarvo}.ajoneuvokanta.ajoneuvokanta-kentat.kuorma-autoja`
      ],
      valueFn: changeObjects => path([0, "properties", "value"], changeObjects)
    },
    {
      path: ["kanta_peravaunu"],
      anchors: [
        `perustelut_koulutukset_kuljettajakoulutukset.${koodiarvo}.ajoneuvokanta.ajoneuvokanta-kentat.peravaunuja`
      ],
      valueFn: changeObjects => path([0, "properties", "value"], changeObjects)
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
