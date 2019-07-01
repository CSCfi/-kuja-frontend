import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CategorizedList from "./CategorizedList";
import _ from "lodash";
import * as R from "ramda";
import { getChangesByLevel } from "./utils";

const CategorizedListRoot = React.memo(props => {
  const [changes, setChanges] = useState([]);
  const [allChanges, setAllChanges] = useState([]);

  useEffect(() => {
    setAllChanges(props.changes);
  }, [props.changes]);

  const getChangeByPath = (anchor, path) => {
    const changeObj = (R.filter(change => {
      return R.equals(change.path, path) && R.equals(change.anchor, anchor);
    }, allChanges) || {})[0];
    return changeObj;
  };

  const runOperations = operations => {
    console.info(operations);
    let allChangesClone = R.clone(allChanges);
    _.forEach(operations, operation => {
      if (operation.type === "addition") {
        allChangesClone = R.insert(-1, operation.payload, allChangesClone);
      } else if (operation.type === "removal") {
        allChangesClone = R.filter(change => {
          return (
            !R.equals(change.path, operation.payload.path) &&
            !R.equals(change.anchor, operation.payload.anchor)
          );
        }, allChangesClone);
      }
    });
    setAllChanges(allChangesClone);
    setChanges(getChangesByLevel(0, props.changes));
    props.onUpdate({
      anchor: props.anchor,
      categories: props.categories,
      changes: allChangesClone,
      index: props.index,
      sectionId: props.sectionId
    });
  };

  useEffect(() => {
    const changesByLevel = getChangesByLevel(0, props.changes);
    if (!R.equals(changesByLevel, changes)) {
      setChanges();
    }
  }, [props.changes, changes]);

  return (
    <CategorizedList
      anchor={props.anchor}
      level={0}
      categories={props.categories}
      allChanges={allChanges}
      getChangeByPath={getChangeByPath}
      runOperations={runOperations}
      rootPath={[]}
      showCategoryTitles={props.showCategoryTitles}
      changes={changes}
    />
  );
});

CategorizedListRoot.defaultProps = {
  changes: [],
  showCategoryTitles: false,
  debug: false
};

CategorizedListRoot.propTypes = {
  anchor: PropTypes.string,
  categories: PropTypes.array,
  changes: PropTypes.array,
  index: PropTypes.number,
  onUpdate: PropTypes.func,
  sectionId: PropTypes.string,
  showCategoryTitles: PropTypes.bool,
  debug: PropTypes.bool
};

export default CategorizedListRoot;
