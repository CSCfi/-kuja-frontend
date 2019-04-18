import React from "react";
import ExpandableRow from "components/ExpandableRow";
import { Wrapper } from "./MuutospyyntoWizardComponents";
import PropTypes from "prop-types";
import _ from "lodash";
import { MUUTOS_TYPES } from "../modules/uusiHakemusFormConstants";

class TutkintoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.formState();
    this.onChanges = this.onChanges.bind(this)
  }

  getArticle = articles => {
    return _.find(articles, article => {
      return article.koodi === this.props.areaCode;
    });
  };

  onChanges = (item, isSubItemTarget) => {
    this.props.onChanges(item, isSubItemTarget, this.props.listId)
  }

  formState = () => {
    const article = this.getArticle(this.props.articles);
    const state = {
      article,
      categories: _.map(this.props.koulutustyypit, koulutustyyppi => {
        return {
          code: koulutustyyppi.koodiArvo,
          title:
            _.find(koulutustyyppi.metadata, m => {
              return m.kieli === "FI";
            }).nimi || "[Koulutustyypin otsikko tähän]",
          items: _.map(koulutustyyppi.koulutukset, koulutus => {
            const isAdded = !!_.find(
              _.filter(this.props.changes, { koodiarvo: koulutus.koodiArvo }),
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
              _.filter(this.props.changes, { koodiarvo: koulutus.koodiArvo }),
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
                      _.filter(this.props.changes, {
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
                      _.filter(this.props.changes, {
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
      changes: this.props.changes || []
    };
    return state;
  };

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props, prevProps)) {
      this.setState(this.formState);
    }
  }

  render() {
    return (
      <Wrapper>
        <ExpandableRow
          categories={this.state.categories}
          changes={this.state.changes}
          code={this.props.koodiarvo}
          onChanges={this.onChanges}
          shouldBeExpanded={false}
          title={this.props.nimi}
        />
      </Wrapper>
    );
  }
}

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
