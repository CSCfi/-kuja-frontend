import React, { useState } from "react";
import PropTypes from "prop-types";
import ExpandableRow from "./ExpandableRow";
import CategorizedListRoot from "../CategorizedListRoot";
import NumberOfChanges from "components/00-atoms/NumberOfChanges";

const ExpandableRowRoot = props => {
  const [changes, setChanges] = useState([]);

  return (
    <React.Fragment>
      <ExpandableRow shouldBeExpanded={props.isExpanded}>
        <div data-slot="title">
          {props.code && <span className="pr-6">{props.code}</span>}
          <span>{props.title}</span>
        </div>
        <span data-slot="info">
          <NumberOfChanges changes={changes} />
        </span>
        <div data-slot="content">
          <CategorizedListRoot
            categories={props.categories}
            changes={changes}
            onUpdate={setChanges}
            showCategoryTitles={true}
          />
        </div>
      </ExpandableRow>
    </React.Fragment>
  );
};

ExpandableRowRoot.propTypes = {
  categories: PropTypes.array,
  changes: PropTypes.array,
  code: PropTypes.string,
  isExpanded: PropTypes.bool,
  title: PropTypes.string
};

export default ExpandableRowRoot;
