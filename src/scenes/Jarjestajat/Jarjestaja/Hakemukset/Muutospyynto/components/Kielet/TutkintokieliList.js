import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import ExpandableRow from "../../../../../../../components/02-organisms/ExpandableRowRoot/ExpandableRow";
import { Wrapper } from "../MuutospyyntoWizardComponents";
import { MUUTOS_TYPES } from "../../modules/uusiHakemusFormConstants";
import CategorizedListRoot from "components/02-organisms/CategorizedListRoot";
import NumberOfChanges from "components/00-atoms/NumberOfChanges";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import _ from "lodash";
import * as R from "ramda";

const TutkintokieliList = props => {
  const getArticle = useCallback(
    articles => {
      return _.find(articles, article => {
        return article.koodi === props.areaCode;
      });
    },
    [props.areaCode]
  );

  const getChanges = useCallback(() => {
    return [];
  }, []);

  const getCategories = useCallback(
    article => {
      return _.map(props.koulutustyypit, koulutustyyppi => {
        return {
          // code: koulutustyyppi.koodiArvo,
          title:
            _.find(koulutustyyppi.metadata, m => {
              return m.kieli === R.toUpper(props.locale);
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
                        return m.kieli === R.toUpper(props.locale);
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
                },
                {
                  name: "Dropdown",
                  properties: {
                    options: R.map(language => {
                      return {
                        label:
                          _.find(language.metadata, m => {
                            return m.kieli === R.toUpper(props.locale);
                          }).nimi || "[Kielen nimi tähän]",
                        value: language.value
                      };
                    }, props.kielet)
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
                                  return m.kieli === R.toUpper(props.locale);
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
      });
    },
    [props.changes, props.koulutustyypit, props.kielet, props.locale]
  );

  useEffect(() => {
    setCategories(getCategories(getArticle(props.articles)));
    setChanges(getChanges());
  }, [getArticle, getChanges, getCategories, props.articles]);

  const [categories, setCategories] = useState([]);
  const [changes, setChanges] = useState([]);

  return (
    <Wrapper>
      <ExpandableRow>
        <h4 data-slot="title">
          {props.koodiarvo && <span className="pr-6">{props.koodiarvo}</span>}
          <span>{props.title}</span>
        </h4>
        <span data-slot="info">
          <NumberOfChanges changes={changes} />
        </span>
        <div data-slot="content" className="w-full">
          <CategorizedListRoot
            categories={categories}
            changes={changes}
            onUpdate={setChanges}
            showCategoryTitles={true}
          />
        </div>
      </ExpandableRow>
    </Wrapper>
  );
};

TutkintokieliList.propTypes = {
  areaCode: PropTypes.string,
  articles: PropTypes.array,
  changes: PropTypes.array,
  kielet: PropTypes.array,
  locale: PropTypes.string,
  koulutustyypit: PropTypes.object,
  title: PropTypes.string,
  onChanges: PropTypes.func,
  listId: PropTypes.string
};

export default TutkintokieliList;
