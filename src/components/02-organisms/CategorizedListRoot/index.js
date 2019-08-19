import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import CategorizedList from "./CategorizedList";
import * as R from "ramda";
import _ from "lodash";
import { getChangesByLevel } from "./utils";

const CategorizedListRoot = React.memo(props => {
  const [changes, setChanges] = useState([]);
  const [allChanges, setAllChanges] = useState(null);
  const { onUpdate } = props;

  useEffect(() => {
    setAllChanges(props.changes);
  }, [props.changes]);

  const getChangeByPath = (anchor, path) => {
    const changeObj = (R.filter(change => {
      return R.equals(change.path, path) && R.equals(change.anchor, anchor);
    }, allChanges) || {})[0];
    return changeObj;
  };

  const runOperations = useMemo(() => {
    return operations => {
      let allChangesClone = _.cloneDeep(allChanges);
      R.forEach(operation => {
        if (operation.type === "addition") {
          allChangesClone = R.insert(-1, operation.payload, allChangesClone);
        } else if (operation.type === "removal") {
          allChangesClone = R.filter(change => {
            return (
              !R.equals(change.path, operation.payload.path) ||
              !R.equals(change.anchor, operation.payload.anchor)
            );
          }, allChangesClone);
        } else if (operation.type === "modification") {
          const withoutTargetChange = R.filter(change => {
            return (
              !R.equals(change.path, operation.payload.path) ||
              !R.equals(change.anchor, operation.payload.anchor)
            );
          }, allChangesClone);
          allChangesClone = R.insert(
            -1,
            operation.payload,
            withoutTargetChange
          );
        }
      }, operations);
      setAllChanges(allChangesClone);
      setChanges(getChangesByLevel(0, props.changes));
      onUpdate({
        anchor: props.anchor,
        categories: props.categories,
        changes: allChangesClone,
        index: props.index,
        sectionId: props.sectionId
      });
    };
  }, [
    allChanges,
    onUpdate,
    props.anchor,
    props.categories,
    props.changes,
    props.index,
    props.sectionId
  ]);

  useEffect(() => {
    const changesByLevel = getChangesByLevel(0, props.changes);
    if (!R.equals(changesByLevel, changes)) {
      setChanges();
    }
  }, [props.changes, changes]);

  return (
    <React.Fragment>
      {allChanges && (
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
      )}
    </React.Fragment>
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
