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
  changes = [],
  locale
) {
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
        shouldBeSelected: isAdded || (!isRemoved && isInLupa),
        title: parseLocalizedField(metadata, R.toUpper(locale))
      };
    }),
    changes
  };
}
