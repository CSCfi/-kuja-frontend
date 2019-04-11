import React from "react";
import PropTypes from "prop-types";
import { Span } from "utils/UIComponents";
import { Container05, Container1 } from "utils/UIComponents";
import SelectableItem from "components/SelectableItem";
import _ from "lodash";

class ExpandableRowContent extends React.Component {
  constructor() {
    super();
  }

  onSelectableItemStatusChange = (item, operation) => {
    this.props.onFormModification(item, operation);
  };

  render() {
    const editValues = this.props.changes;
    let muutokset = [];

    if (editValues) {
      _.forEach(editValues, value => {
        _.forEach(this.props.content, koulutus => {
          if (koulutus.koodiArvo === value.koodiarvo) {
            muutokset.push(value);
          }
        });
      });
    }

    return (
      <div>
        {_.map(this.props.categories, (category, i) => {
          return (
            <Container1 key={i}>
              <Container05>
                <strong>
                  <Span>{category.code}</Span>
                  <Span>{category.title}</Span>
                </strong>
              </Container05>
              {_.map(category.items, (item, ii) => {
                return (
                  <Container05 key={`item-${ii}`}>
                    <SelectableItem
                      item={item}
                      onStatusChange={this.onSelectableItemStatusChange}
                    />
                  </Container05>
                );
              })}
            </Container1>
          );
        })}
      </div>
    );
  }
}

ExpandableRowContent.propTypes = {
  areaCode: PropTypes.string,
  article: PropTypes.object,
  categories: PropTypes.array,
  code: PropTypes.string,
  onFormModification: PropTypes.func
};

export default ExpandableRowContent;
