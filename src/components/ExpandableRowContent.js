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

  render() {
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
                      onChanges={this.props.onChanges}
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
  categories: PropTypes.array,
  onChanges: PropTypes.func
};

export default ExpandableRowContent;
