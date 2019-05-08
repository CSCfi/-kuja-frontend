import React from "react";
import PropTypes from "prop-types";
import { Span } from "utils/UIComponents";
import SelectableItem from "components/SelectableItem";
import _ from "lodash";

const CategorizedList = props => {
  return (
    <div>
      {_.map(props.categories, (category, i) => {
        return (
          <div key={i} className="p-4">
            <div className="p-2">
              <strong>
                <Span>{category.code}</Span>
                <Span>{category.title}</Span>
              </strong>
            </div>
            {_.map(category.items, (item, ii) => {
              return (
                <div key={`item-${ii}`} className="p-2">
                  <SelectableItem
                    item={item}
                    onChanges={props.onChanges}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

CategorizedList.propTypes = {
  categories: PropTypes.array,
  onChanges: PropTypes.func
};

export default CategorizedList;
