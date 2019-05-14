import _ from "lodash";
import { parseLocalizedField } from "../../modules/helpers";
import { MUUTOS_TYPES } from "locales/uusiHakemusFormConstants";
import { findKieliByKoodi } from "./kieliUtil";

export function sortOpetuskielet(kielet) {
  let array = [];

  array.push(findKieliByKoodi(kielet, "1")); // Suomi
  array.push(findKieliByKoodi(kielet, "2")); // Ruotsi
  array.push(findKieliByKoodi(kielet, "5")); // Saame

  return array;
}

export function getDataForOpetuskieletList(opetuskielet, kohde, changes = []) {
  return {
    items: _.map(opetuskielet, opetuskieli => {
      const { koodiArvo, metadata } = opetuskieli;
      const isAdded = !!_.find(
        _.filter(changes, { koodiarvo: opetuskieli.koodiArvo }),
        { type: MUUTOS_TYPES.ADDITION }
      );
      const isInLupa = !!_.find(kohde.kohdeArvot, { koodiarvo: koodiArvo });
      const isRemoved = !!_.find(
        _.filter(changes, { koodiarvo: opetuskieli.koodiArvo }),
        { type: MUUTOS_TYPES.REMOVAL }
      );
      return {
        code: opetuskieli.koodiArvo,
        isAdded,
        isInLupa,
        isRemoved,
        shouldBeSelected: isAdded,
        title: parseLocalizedField(metadata)
      };
    }),
    changes
  };
}
