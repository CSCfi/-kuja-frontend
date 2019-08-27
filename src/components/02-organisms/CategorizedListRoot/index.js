import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import CategorizedList from "./CategorizedList";
import * as R from "ramda";
import _ from "lodash";

const defaultProps = {
  anchor: "anchornamemissing",
  categories: [],
  changes: [null],
  debug: false,
  sectionId: "sectionidmissing",
  showCategoryTitles: false
};

const CategorizedListRoot = React.memo(
  ({
    anchor = defaultProps.anchor,
    categories = defaultProps.categories,
    changes = defaultProps.changes,
    index,
    onUpdate,
    sectionId = defaultProps.sectionId,
    showCategoryTitles = defaultProps.showCategoryTitles,
    debug = defaultProps.debug
  }) => {
    const [allChanges, setAllChanges] = useState([null]);

    useEffect(() => {
      setAllChanges(changes);
    }, [changes]);

    const runOperations = useMemo(() => {
      return operations => {
        let allChangesClone = _.cloneDeep(allChanges);
        R.forEach(operation => {
          if (operation.type === "addition") {
            allChangesClone = R.insert(-1, operation.payload, allChangesClone);
          } else if (operation.type === "removal") {
            allChangesClone = R.filter(
              R.compose(
                R.not,
                R.propEq("anchor")(operation.payload.anchor)
              )
            )(allChangesClone);
          } else if (operation.type === "modification") {
            const withoutTargetChange = R.filter(
              R.compose(
                R.not,
                R.equals(operation.payload.anchor),
                R.prop("anchor")
              ))(allChangesClone);
            allChangesClone = R.insert(
              -1,
              operation.payload,
              withoutTargetChange
            );
          }
        }, operations);
        setAllChanges(allChangesClone);
        // setChanges(getChangesByLevel(0, changes));
        onUpdate({
          anchor: anchor,
          categories: categories,
          changes: allChangesClone,
          index: index,
          sectionId: sectionId
        });
      };
    }, [allChanges, onUpdate, anchor, categories, index, sectionId]);

    return (
      <React.Fragment>
        {R.compose(
          R.not,
          R.equals(null),
          R.head
        )(allChanges) && (
          <CategorizedList
            anchor={anchor}
            categories={categories}
            changes={allChanges}
            rootPath={[]}
            runOperations={runOperations}
            showCategoryTitles={showCategoryTitles}
          />
        )}
      </React.Fragment>
    );
  }
);

CategorizedListRoot.propTypes = {
  anchor: PropTypes.string,
  categories: PropTypes.array,
  changes: PropTypes.array,
  index: PropTypes.number,
  onUpdate: PropTypes.func.isRequired,
  sectionId: PropTypes.string,
  showCategoryTitles: PropTypes.bool,
  debug: PropTypes.bool
};

export default CategorizedListRoot;
