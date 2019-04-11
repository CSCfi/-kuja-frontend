import React from "react";
import ExpandableRow from "components/ExpandableRow";
import { Wrapper } from "./MuutospyyntoWizardComponents";
import PropTypes from "prop-types";
import _ from "lodash";
import { MUUTOS_TYPES } from "../modules/uusiHakemusFormConstants";

class TutkintoList extends React.Component {
  constructor(props) {
    super(props);

    var article = _.find(props.articles, article => {
      return article.koodi === props.areaCode;
    });

    var changes = _.map(props.changes, change => {
      return !!_.find(props.koulutustyypit, koulutustyyppi => {
        return !!_.find(koulutustyyppi.koulutukset, {
          koodiArvo: change.koodiarvo
        });
      })
        ? change
        : null;
    }).filter(Boolean);

    this.state = {
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
              _.filter(changes, { koodiarvo: koulutus.koodiArvo }),
              { type: MUUTOS_TYPES.ADDITION }
            );
            const hasPermission = article
              ? !!_.find(article.koulutusalat, koulutusala => {
                  return !!_.find(koulutusala.koulutukset, {
                    koodi: koulutus.koodiArvo
                  });
                })
              : false;
            const isRemoved = !!_.find(
              _.filter(changes, { koodiarvo: koulutus.koodiArvo }),
              { type: MUUTOS_TYPES.REMOVAL }
            );
            return {
              code: koulutus.koodiArvo,
              title:
                _.find(koulutus.metadata, m => {
                  return m.kieli === "FI";
                }).nimi || "[Koulutuksen otsikko tähän]",
              hasPermission,
              isAdded,
              isRemoved,
              shouldBeSelected: (hasPermission && !isRemoved) || isAdded
            };
          })
        };
      }),
      changes
    };

    this.onFormModification = this.onFormModification.bind(this);
  }

  onFormModification = (item) => {
    console.info(item)
  };

  render() {
    return (
      <Wrapper>
        <ExpandableRow
          article={this.state.article}
          areaCode={this.props.koodiarvo}
          code={this.props.koodiarvo}
          categories={this.state.categories}
          changes={this.state.changes}
          shouldBeExpanded={false}
          title={this.props.nimi}
          onFormModification={this.onFormModification}
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
  koulutustyypit: PropTypes.object
};

export default TutkintoList;
