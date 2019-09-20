import React, { useCallback } from "react";
import PropTypes from "prop-types";
import CategorizedList from "./CategorizedList";
import CategorizedListMemory from "./CategorizedListMemory";
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
    onUpdate,
    showCategoryTitles = defaultProps.showCategoryTitles,
    debug = defaultProps.debug
  }) => {
    const onChangesUpdate = useCallback(
      changes => {
        onUpdate({
          anchor: anchor,
          changes
        });
      },
      [anchor, onUpdate]
    );

    const runRootOperations = useCallback((operations, _allChanges) => {
      let allChangesClone = _.cloneDeep(_allChanges);
      R.forEach(operation => {
        if (operation.type === "addition") {
          if (
            !!!R.find(R.propEq("anchor", operation.payload.anchor))(
              allChangesClone
            )
          ) {
            allChangesClone = R.insert(-1, operation.payload, allChangesClone);
          }
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
            )
          )(allChangesClone);
          allChangesClone = R.insert(
            -1,
            operation.payload,
            withoutTargetChange
          );
        }
      }, operations);
      return allChangesClone;
    }, []);

    return (
      <React.Fragment>
        {!R.equals(R.head(changes), null)
          ? (() => {
              return (
                <CategorizedListMemory
                  changes={changes}
                  runRootOperations={runRootOperations}
                  render={_props => (
                    <CategorizedList
                      anchor={anchor}
                      categories={categories}
                      changes={_props.changes}
                      getAllChanges={_props.getAllChanges}
                      rootPath={[]}
                      runRootOperations={_props.runRootOperations}
                      showCategoryTitles={showCategoryTitles}
                      onChangesUpdate={onChangesUpdate}
                    />
                  )}
                ></CategorizedListMemory>
              );
            })()
          : null}
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
