import React, { useEffect, useState } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { parseLocalizedField } from "../../../../../../../modules/helpers";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { MUUTOS_TYPES } from "../../modules/uusiHakemusFormConstants";
import Section from "../../../../../../../components/03-templates/Section";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";
import _ from "lodash";

const Tutkinnot = props => {
  const [koulutusdata, setKoulutusdata] = useState([]);
  const [locale, setLocale] = useState([]);

  useEffect(() => {
    setKoulutusdata(
      R.sortBy(R.prop("koodiArvo"), R.values(props.koulutukset.koulutusdata))
    );
  }, [props.koulutukset]);

  useEffect(() => {
    setLocale(R.toUpper(props.intl.locale));
  }, [props.intl.locale]);

  const getArticle = (areaCode, articles = []) => {
    return R.find(article => {
      return article.koodi === areaCode;
    }, articles);
  };

  const getCategories = (article, koulutustyypit) => {
    return R.values(
      R.map(koulutustyyppi => {
        return {
          code: koulutustyyppi.koodiArvo,
          title:
            _.find(koulutustyyppi.metadata, m => {
              return m.kieli === locale;
            }).nimi || "[Koulutustyypin otsikko tähän]",
          categories: _.map(koulutustyyppi.koulutukset, koulutus => {
            const labelClasses = {
              isAdded: !!_.find(
                _.filter(props.changes, { koodiarvo: koulutus.koodiArvo }),
                { type: MUUTOS_TYPES.ADDITION }
              ),
              isInLupa: article
                ? !!_.find(article.koulutusalat, koulutusala => {
                    return !!_.find(koulutusala.koulutukset, {
                      koodi: koulutus.koodiArvo
                    });
                  })
                : false,
              isRemoved: !!_.find(
                _.filter(props.changes, { koodiarvo: koulutus.koodiArvo }),
                { type: MUUTOS_TYPES.REMOVAL }
              )
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
                        isAdded: !!_.find(
                          _.filter(props.changes, {
                            koodiArvo: osaamisala.koodiArvo
                          }),
                          { type: MUUTOS_TYPES.ADDITION }
                        ),
                        isInLupa: article
                          ? !!_.find(article.koulutusalat, koulutusala => {
                              return !!_.find(koulutusala.koulutukset, {
                                koodi: osaamisala.koodiArvo
                              });
                            })
                          : false,
                        isRemoved: !!_.find(
                          _.filter(props.changes, {
                            koodiarvo: osaamisala.koodiArvo
                          }),
                          { type: MUUTOS_TYPES.REMOVAL }
                        )
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
  };

  return (
    <Section code={props.lupa.kohteet[1].headingNumber} title={props.lupa.kohteet[1].heading}>
      {R.addIndex(R.map)((koulutusala, i) => {
        const areaCode = koulutusala.koodiarvo || koulutusala.koodiArvo;
        const article = getArticle(areaCode, props.lupa.kohteet[1].maaraykset);
        const title = parseLocalizedField(
          koulutusala.metadata,
          R.toUpper(props.intl.locale)
        );
        return (
          <ExpandableRowRoot
            key={`expandable-row-root-${i}`}
            categories={getCategories(article, koulutusala.koulutukset)}
            changes={[]}
            code={areaCode}
            title={title}
          />
        );
      }, koulutusdata)}
    </Section>
  );
};

Tutkinnot.propTypes = {
  koulutukset: PropTypes.object,
  koulutusalat: PropTypes.object,
  koulutustyypit: PropTypes.array,
  lupa: PropTypes.object,
  onChanges: PropTypes.func
};

export default injectIntl(Tutkinnot);
