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

// opetuskielet.map((opetuskieli, i) => {
//   const { koodiArvo, koodisto, metadata } = opetuskieli;
//   const { koodistoUri } = koodisto;
//   const nimi = parseLocalizedField(metadata);
//   const identifier = `input-${koodiArvo}-${i}`;
//   let isInLupa = false;
//   let isAdded = false;
//   let isRemoved = false;
//   let isChecked = false;
//   let customClassName = "";
//   kohdeArvot.forEach(arvo => {
//     if (arvo.koodiarvo === koodiArvo) {
//       isInLupa = true;
//     }
//   });
//   if (editValues) {
//     editValues.forEach(val => {
//       if (val.koodiarvo === koodiArvo && val.nimi === nimi) {
//         isAdded = val.type === MUUTOS_TYPES.ADDITION || null;
//         isRemoved = val.type === MUUTOS_TYPES.REMOVAL || null;
//       }
//     });
//   }
//   customClassName = isInLupa ? "is-in-lupa" : null;
//   customClassName = isAdded ? "is-added" : null;
//   customClassName = isRemoved ? "is-removed" : null;
//   if ((isInLupa && !isRemoved) || isAdded) {
//     isChecked = true;
//   }
// });
