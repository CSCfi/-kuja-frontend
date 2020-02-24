import * as R from "ramda";
import { sortArticlesByHuomioitavaKoodi } from "../services/lomakkeet/utils";

export function getDataForKoulutusList(
  koulutukset,
  locale,
  maaraykset = [],
  koodisto
) {
  const luvassaOlevatKoodiarvot = koodisto
    ? R.map(maarays => {
        return maarays.koodisto === koodisto ? maarays.koodiarvo : null;
      }, maaraykset).filter(Boolean)
    : [];

  let isInLupaTrueFound = false;
  const sortedKoulutukset = sortArticlesByHuomioitavaKoodi(koulutukset, locale);
  return {
    items: R.addIndex(R.map)((koulutus, index) => {
      const isInLupa = !!(
        koodisto && R.includes(koulutus.koodiArvo, luvassaOlevatKoodiarvot)
      );

      if (isInLupa) {
        isInLupaTrueFound = true;
      }
      return {
        code: koulutus.koodiArvo,
        isInLupa,
        isReasoningRequired: index !== koulutukset.length - 1,
        shouldBeChecked:
          isInLupa ||
          (koodisto && !isInLupaTrueFound && index === koulutukset.length - 1),
        koodisto: koulutus.koodisto,
        metadata: koulutus.metadata,
        title:
          R.prop(
            "nimi",
            R.find(m => {
              return m.kieli === locale;
            }, koulutus.metadata)
          ) || "[Koulutuksen otsikko tähän]"
      };
    }, sortedKoulutukset)
  };
}
