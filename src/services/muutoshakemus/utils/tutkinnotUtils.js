import { isInLupa, isAdded, isRemoved } from "../../../css/label";
import * as R from "ramda";
import _ from "lodash";

const categories = {};

export function getCategories(index, article, koulutustyypit, locale) {
  if (!categories[index]) {
    categories[index] = R.values(
      R.map(koulutustyyppi => {
        return {
          code: koulutustyyppi.koodiArvo,
          title:
            _.find(koulutustyyppi.metadata, m => {
              return m.kieli === locale;
            }).nimi || "[Koulutustyypin otsikko tähän]",
          categories: _.map(koulutustyyppi.koulutukset, koulutus => {
            const labelClasses = {
              isInLupa: article
                ? !!_.find(article.koulutusalat, koulutusala => {
                    return !!_.find(koulutusala.koulutukset, {
                      koodi: koulutus.koodiArvo
                    });
                  })
                : false
            };

            return {
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
                      custom: Object.assign(
                        {},
                        labelClasses.isInLupa ? isInLupa : {}
                      )
                    },
                    isChecked:
                      (labelClasses.isInLupa && !labelClasses.isRemoved) ||
                      labelClasses.isAdded
                  }
                }
              ],
              categories: koulutus.osaamisala
                ? [
                    (osaamisala => {
                      const labelClasses = {
                        isInLupa: article
                          ? !!_.find(article.koulutusalat, koulutusala => {
                              return !!_.find(koulutusala.koulutukset, {
                                koodi: osaamisala.koodiArvo
                              });
                            })
                          : false
                      };
                      return {
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
                              labelStyles: Object.assign(
                                {},
                                labelClasses.isAdded ? isAdded : {},
                                labelClasses.isInLupa ? isInLupa : {},
                                labelClasses.isRemoved ? isRemoved : {}
                              ),
                              isChecked:
                                (labelClasses.isInLupa &&
                                  !labelClasses.isRemoved) ||
                                labelClasses.isAdded
                            }
                          }
                        ]
                      };
                    })(koulutus.osaamisala)
                  ]
                : []
            };
          })
        };
      }, koulutustyypit)
    );
  }
  return categories[index];
}
