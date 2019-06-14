import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import ExpandableRow from "components/01-molecules/ExpandableRow";
import { Wrapper } from "./MuutospyyntoWizardComponents";
import { MUUTOS_TYPES } from "../modules/uusiHakemusFormConstants";
import CategorizedListRoot from "components/02-organisms/CategorizedListRoot";
import NumberOfChanges from "components/00-atoms/NumberOfChanges";
import _ from "lodash";

const TutkintoList = props => {
  const getArticle = useCallback(
    articles => {
      return _.find(articles, article => {
        return article.koodi === props.areaCode;
      });
    },
    [props.areaCode]
  );

  const formState = useCallback(() => {
    const article = getArticle(props.articles);
    const state = {
      article,
      categories: _.map(props.koulutustyypit, koulutustyyppi => {
        return {
          // code: koulutustyyppi.koodiArvo,
          title:
            _.find(koulutustyyppi.metadata, m => {
              return m.kieli === "FI";
            }).nimi || "[Koulutustyypin otsikko tähän]",
          categories: _.map(koulutustyyppi.koulutukset, koulutus => {
            const isAdded = !!_.find(
              _.filter(props.changes, { koodiarvo: koulutus.koodiArvo }),
              { type: MUUTOS_TYPES.ADDITION }
            );
            const isInLupa = article
              ? !!_.find(article.koulutusalat, koulutusala => {
                  return !!_.find(koulutusala.koulutukset, {
                    koodi: koulutus.koodiArvo
                  });
                })
              : false;
            const isRemoved = !!_.find(
              _.filter(props.changes, { koodiarvo: koulutus.koodiArvo }),
              { type: MUUTOS_TYPES.REMOVAL }
            );
            return {
              components: [
                {
                  name: "CheckboxWithLabel",
                  properties: {
                    name: "CheckboxWithLabel",
                    code: koulutus.koodiArvo,
                    title:
                      _.find(koulutus.metadata, m => {
                        return m.kieli === "FI";
                      }).nimi || "[Koulutuksen otsikko tähän]",
                    isAdded,
                    isInLupa,
                    isRemoved,
                    isChecked: (isInLupa && !isRemoved) || isAdded
                  }
                }
              ],
              categories: koulutus.osaamisala
                ? [
                    (osaamisala => {
                      const isAdded = !!_.find(
                        _.filter(props.changes, {
                          koodiArvo: osaamisala.koodiArvo
                        }),
                        { type: MUUTOS_TYPES.ADDITION }
                      );
                      const isInLupa = article
                        ? !!_.find(article.koulutusalat, koulutusala => {
                            return !!_.find(koulutusala.koulutukset, {
                              koodi: osaamisala.koodiArvo
                            });
                          })
                        : false;
                      const isRemoved = !!_.find(
                        _.filter(props.changes, {
                          koodiarvo: osaamisala.koodiArvo
                        }),
                        { type: MUUTOS_TYPES.REMOVAL }
                      );
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
                              isAdded,
                              isInLupa,
                              isRemoved,
                              isChecked: (isInLupa && !isRemoved) || isAdded
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
      }),
      changes: props.changes || []
    };
    return state;
  }, [props.changes, getArticle, props.articles, props.koulutustyypit]);

  const [state] = useState(formState());

  return (
    <Wrapper>
      <ExpandableRow>
        <div data-slot="title">
          {props.koodiarvo && <span className="pr-6">{props.koodiarvo}</span>}
          <span>{props.title}</span>
        </div>
        <span data-slot="info">
          <NumberOfChanges changes={props.changes} />
        </span>
        <div data-slot="content">
          <CategorizedListRoot
            categories={state.categories}
            changes={state.changes}
            showCategoryTitles={true}
          />
        </div>
      </ExpandableRow>
    </Wrapper>
  );
};

TutkintoList.propTypes = {
  areaCode: PropTypes.string,
  articles: PropTypes.array,
  changes: PropTypes.array,
  fields: PropTypes.object,
  koulutustyypit: PropTypes.object,
  title: PropTypes.string,
  onChanges: PropTypes.func,
  listId: PropTypes.string
};

export default TutkintoList;
