import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CategorizedList from "./CategorizedList";
import _ from "lodash";
import * as R from "ramda";
import { getChangesByLevel } from './utils';

const CategorizedListRoot = props => {
  const [changes, setChanges] = useState([]);
  const [allChanges, setAllChanges] = useState(R.clone(props.changes));

  const getChangeByPath = path => {
    return R.find(R.propEq("path", path))(allChanges);
  };

  const runOperations = operations => {
    let allChangesClone = R.clone(allChanges);
    _.forEach(operations, operation => {
      if (operation[0] === "addChange") {
        allChangesClone = R.insert(-1, operation[1], allChangesClone);
      } else if (operation[0] === "removeChange") {
        allChangesClone = _.filter(
          allChangesClone,
          change => !R.equals(change.path, operation[1])
        );
      }
    });
    setAllChanges(allChangesClone);
    setChanges(getChangesByLevel(0, props.changes));
  };

  useEffect(() => {
    setChanges(getChangesByLevel(0, props.changes));
  }, [props.changes]);

  return (
    <CategorizedList
      level={0}
      categories={props.categories}
      allChanges={allChanges}
      getChangeByPath={getChangeByPath}
      runOperations={runOperations}
      rootPath={[]}
      changes={changes}
    />
  );
};

CategorizedListRoot.propTypes = {
  categories: PropTypes.array,
  changes: PropTypes.array
};

export default CategorizedListRoot;