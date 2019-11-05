import _ from "lodash";

export function getDataForKoulutusList(koulutukset, locale) {
  return {
    items: _.map(koulutukset, koulutus => {
      return {
        code: koulutus.koodiArvo,
        koodisto: koulutus.koodisto,
        metadata: koulutus.metadata,
        title:
          _.find(koulutus.metadata, m => {
            return m.kieli === locale;
          }).nimi || "[Koulutuksen otsikko tähän]"
      };
    })
  };
}
