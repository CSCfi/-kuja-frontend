import React from "react";
import PropTypes from "prop-types";
import SelectableItem from "../SelectableItem";
import _ from "lodash";

const CategorizedList = props => {
  return (
    <div>
      {_.map(props.categories, (category, i) => {
        return (
          <div key={i} className="p-4">
            <div className="p-2">
              <strong>
                {category.code && <span className="mr-4">{category.code}</span>}
                <span>{category.title}</span>
              </strong>
            </div>
            {_.map(category.items, (item, ii) => {
              return (
                <div key={`item-${ii}`} className="px-2">
                  <SelectableItem item={item} onChanges={props.onChanges} />
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
