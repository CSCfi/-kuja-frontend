import React, { useEffect, useState } from "react";
import ExpandableRow from "components/ExpandableRow";
import { Wrapper } from "./MuutospyyntoWizardComponents";
import PropTypes from "prop-types";
import _ from "lodash";
import { MUUTOS_TYPES } from "../modules/uusiHakemusFormConstants";

const TutkintoList = props => {
  
  const getArticle = articles => {
    return _.find(articles, article => {
      return article.koodi === props.areaCode;
    });
  };
  
  const formState = () => {
    const article = getArticle(props.articles);
    const state = {
      article,
      categories: _.map(props.koulutustyypit, koulutustyyppi => {
        return {
          code: koulutustyyppi.koodiArvo,
          title:
            _.find(koulutustyyppi.metadata, m => {
              return m.kieli === "FI";
            }).nimi || "[Koulutustyypin otsikko tähän]",
          items: _.map(koulutustyyppi.koulutukset, koulutus => {
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
              code: koulutus.koodiArvo,
              title:
                _.find(koulutus.metadata, m => {
                  return m.kieli === "FI";
                }).nimi || "[Koulutuksen otsikko tähän]",
              isAdded,
              isInLupa,
              isRemoved,
              shouldBeSelected: (isInLupa && !isRemoved) || isAdded,
              subItems: koulutus.osaamisala
                ? (osaamisala => {
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
                    return [
                      {
                        code: osaamisala.koodiArvo,
                        title:
                          _.find(osaamisala.metadata, m => {
                            return m.kieli === "FI";
                          }).nimi || "[Osaamisalan otsikko tähän]",
                        isAdded,
                        isInLupa,
                        isRemoved,
                        shouldBeSelected: (isInLupa && !isRemoved) || isAdded
                      }
                    ];
                  })(koulutus.osaamisala)
                : []
            };
          })
        };
      }),
      changes: props.changes || []
    };
    return state;
  };

  const [state, setState] = useState(formState());

  const onChanges = (item, isSubItemTarget) => {
    props.onChanges(item, isSubItemTarget, props.listId);
  };



  useEffect(() => {
    setState(formState());
  }, [props]);

  return (
    <Wrapper>
      <ExpandableRow
        categories={state.categories}
        changes={state.changes}
        code={props.koodiarvo}
        onChanges={onChanges}
        shouldBeExpanded={false}
        title={props.nimi}
      />
    </Wrapper>
  );
};

TutkintoList.propTypes = {
  areaCode: PropTypes.string,
  articles: PropTypes.array,
  changes: PropTypes.array,
  fields: PropTypes.object,
  koulutustyypit: PropTypes.object,
  onChanges: PropTypes.func,
  listId: PropTypes.string
};

export default TutkintoList;
