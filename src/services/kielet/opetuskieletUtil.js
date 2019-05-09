import _ from "lodash";
import { parseLocalizedField } from "../../modules/helpers";
import { MUUTOS_TYPES } from "locales/uusiHakemusFormConstants";

export function getDataForKieletList(opetuskielet, kohde, changes = []) {
  return {
    items: _.map(opetuskielet.data, (opetuskieli, i) => {
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
