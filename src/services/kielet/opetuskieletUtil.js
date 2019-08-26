import _ from "lodash";
import { parseLocalizedField } from "../../modules/helpers";
import { MUUTOS_TYPES } from "locales/uusiHakemusFormConstants";
// import { findKieliByKoodi } from "./kieliUtil";
import * as R from "ramda";

export function sortOpetuskielet(kielet) {
  return kielet.sort((a, b) => {return a.koodiArvo - b.koodiArvo});
}

export function getDataForOpetuskieletList(
  opetuskielet,
  kohde,
  locale
) {
  return {
    items: _.map(opetuskielet, opetuskieli => {
      const { koodiArvo, metadata } = opetuskieli;
      const isInLupa = !!_.find(kohde.kohdeArvot, { koodiarvo: koodiArvo });
      return {
        code: opetuskieli.koodiArvo,
        isInLupa,
        title: parseLocalizedField(metadata, R.toUpper(locale))
      };
    })
  };
}
