import * as R from "ramda";
import _ from "lodash";
import "../i18n-config";
import { __ } from "i18n-for-browser";
import { isAdded, isRemoved, isInLupa } from "../../../css/label";

const categories = {};

function getModificationForm(
  index,
  article,
  koulutustyypit,
  kohde,
  maaraystyyppi,
  title,
  areaCode,
  locale
) {
  if (!categories[index]) {
    categories[index] = R.values(
      R.map(koulutustyyppi => {
        return {
          anchor: koulutustyyppi.koodiArvo,
          code: koulutustyyppi.koodiArvo,
          meta: {
            areaCode,
            title
          },
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

            const osaamisalaTitle = {
              anchor: "lukuun-ottamatta",
              components: [
                {
                  name: "StatusTextRow",
                  properties: {
                    title: `${__("except")}:`
                  }
                }
              ]
            };

            const osaamisalat = (koulutus.osaamisalat || []).map(osaamisala => {
              const isInLupaBool = article
                ? !!_.find(article.koulutusalat, koulutusala => {
                    return !!_.find(koulutusala.koulutukset, koulutus => {
                      return !!_.find(koulutus.rajoitteet, {
                        koodi: osaamisala.koodiArvo
                      });
                    });
                  })
                : false;
              const isAddedBool = false;
              const isRemovedBool = false;
              return {
                anchor: osaamisala.koodiArvo,
                meta: {
                  kohde,
                  maaraystyyppi,
                  koodisto: osaamisala.koodisto,
                  metadata: osaamisala.metadata,
                  isInLupa: isInLupaBool
                },
                components: [
                  {
                    anchor: "A",
                    fullAnchor: `${koulutustyyppi.koodiArvo}.lukuun-ottamatta.${osaamisala.koodiArvo}.A`,
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
                        removal: isRemoved,
                        custom: Object.assign({}, isInLupaBool ? isInLupa : {})
                      },
                      isChecked: (isInLupaBool && !isRemovedBool) || isAddedBool
                    }
                  }
                ]
              };
            });

            return {
              anchor: koulutus.koodiArvo,
              meta: {
                kohde,
                maaraystyyppi,
                koodisto: koulutus.koodisto,
                metadata: koulutus.metadata,
                isInLupa: isInLupaBool
              },
              components: [
                {
                  anchor: "A",
                  fullAnchor: `${koulutustyyppi.koodiArvo}.${koulutus.koodiArvo}.A`,
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
                    isChecked: isInLupaBool
                  }
                }
              ],
              categories:
                R.length(osaamisalat) > 0
                  ? R.prepend(osaamisalaTitle, osaamisalat)
                  : osaamisalat
            };
          }, koulutustyyppi.koulutukset)
        };
      }, koulutustyypit)
    );
  }
  return categories[index];
}

export default function getTutkinnotLomake(action, data, isReadOnly, locale) {
  switch (action) {
    case "modification":
      return getModificationForm(
        data.index,
        data.article,
        data.koulutustyypit,
        data.kohde,
        data.maaraystyyppi,
        data.title,
        data.areaCode,
        R.toUpper(locale)
      );
    default:
      return [];
  }
}
