import { isInLupa, isAdded, isRemoved } from "../../../css/label";
import * as R from "ramda";
import _ from "lodash";

const categories = {};

export function getCategories(index, article, koulutustyypit, kohde, locale) {
  if (!categories[index]) {
    categories[index] = R.values(
      R.map(koulutustyyppi => {
        return {
          anchor: koulutustyyppi.koodiArvo,
          code: koulutustyyppi.koodiArvo,
          title:
            _.find(koulutustyyppi.metadata, m => {
              return m.kieli === locale;
            }).nimi || "[Koulutustyypin otsikko tähän]",
          categories: R.map(koulutus => {
            const isInLupaBool = article
              ? !!_.find(article.koulutusalat, koulutusala => {
                  return !!_.find(koulutusala.koulutukset, {
                    koodi: koulutus.koodiArvo
                  });
                })
              : false;
            const isAddedBool = false;
            const isRemovedBool = false;

            return {
              anchor: koulutus.koodiArvo,
              meta: {
                kohde,
                koodisto: koulutus.koodisto,
                metadata: koulutus.metadata,
                isInLupa: isInLupaBool,
              },
              components: [
                {
                  name: "CheckboxWithLabel",
                  properties: {
                    name: "CheckboxWithLabel",
                    code: koulutus.koodiArvo,
                    title:
                      _.find(koulutus.metadata, m => {
                        return m.kieli === locale;
                      }).nimi || "[Koulutuksen otsikko tähän]",
                    labelStyles: {
                      addition: isAdded,
                      removal: isRemoved,
                      custom: Object.assign({}, isInLupaBool ? isInLupa : {})
                    },
                    isChecked: (isInLupaBool && !isRemovedBool) || isAddedBool
                  }
                }
              ],
              categories: koulutus.osaamisala
                ? [
                    (osaamisala => {
                      const isInLupaBool = article
                        ? !!_.find(article.koulutusalat, koulutusala => {
                            return !!_.find(koulutusala.koulutukset, {
                              koodi: osaamisala.koodiArvo
                            });
                          })
                        : false;
                      const isAddedBool = false;
                      const isRemovedBool = false;
                      return {
                        anchor: osaamisala.koodiArvo,
                        meta: {
                          kohde,
                          koodisto: osaamisala.koodisto,
                          metadata: osaamisala.metadata,
                          isInLupa: isInLupaBool
                        },
                        components: [
                          {
                            name: "CheckboxWithLabel",
                            properties: {
                              name: "CheckboxWithLabel",
                              code: osaamisala.koodiArvo,
                              title:
                                _.find(osaamisala.metadata, m => {
                                  return m.kieli === "FI";
                                }).nimi || "[Osaamisalan otsikko tähän]",
                              labelStyles: {
                                addition: isAdded,
                                removal: isRemoved
                              },
                              isChecked:
                                (isInLupaBool && !isRemovedBool) || isAddedBool
                            }
                          }
                        ]
                      };
                    })(koulutus.osaamisala)
                  ]
                : undefined
            };
          }, koulutustyyppi.koulutukset)
        };
      }, koulutustyypit)
    );
  }
  return categories[index];
}
