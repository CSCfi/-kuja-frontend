import _ from "lodash";
import { parseLocalizedField } from "../../modules/helpers";
import { MUUTOS_TYPES } from "locales/uusiHakemusFormConstants";

export function getDataForTutkintokieletList(kielet, kohde, changes = []) {
    return {
      items: _.map(kielet, kieli => {
        const { koodiArvo, metadata } = kieli;
        const isAdded = !!_.find(
          _.filter(changes, { koodiarvo: kieli.koodiArvo }),
          { type: MUUTOS_TYPES.ADDITION }
        );
        const isInLupa = !!_.find(kohde.kohdeArvot, { koodiarvo: koodiArvo });
        const isRemoved = !!_.find(
          _.filter(changes, { koodiarvo: kieli.koodiArvo }),
          { type: MUUTOS_TYPES.REMOVAL }
        );
        return {
          code: kieli.koodiArvo,
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
  