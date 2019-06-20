import React from "react";
import PropTypes from "prop-types";
import ExpandableRow from "./ExpandableRow";
import CategorizedListRoot from "../CategorizedListRoot";
import NumberOfChanges from "components/00-atoms/NumberOfChanges";
import * as R from "ramda";

const compare = (prevProps, nextProps) => {
  const sameCategories = R.equals(prevProps.categories, nextProps.categories);
  const sameChanges = R.equals(prevProps.changes, nextProps.changes);
  return sameCategories && sameChanges;
}

const ExpandableRowRoot = React.memo(props => {
  return (
    <React.Fragment>
      <ExpandableRow shouldBeExpanded={props.isExpanded}>
        <div data-slot="title">
          {props.code && <span className="pr-6">{props.code}</span>}
          <span>{props.title}</span>
        </div>
        <span data-slot="info">
          <NumberOfChanges changes={props.changes} />
        </span>
        <div data-slot="content" className="w-full">
          <CategorizedListRoot
            categories={props.categories}
            changes={props.changes}
            index={props.index}
            onUpdate={props.onUpdate}
            sectionId={props.sectionId}
            showCategoryTitles={true}
          />
        </div>
      </ExpandableRow>
    </React.Fragment>
  );
}, compare);

ExpandableRowRoot.propTypes = {
  categories: PropTypes.array,
  changes: PropTypes.array,
  code: PropTypes.string,
  index: PropTypes.number,
  isExpanded: PropTypes.bool,
  onUpdate: PropTypes.func,
  sectionId: PropTypes.string,
  title: PropTypes.string
};

export default ExpandableRowRoot;
