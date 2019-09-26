import React, { useCallback, useMemo, useState, useEffect } from "react";
import { handleNodeMain, findCategoryAnchor } from "../utils";
import * as R from "ramda";
import PropTypes from "prop-types";

const Stage = props => {
  const [changes, setChanges] = useState(props.changes);
  const [nodeIndex, setNodeIndex] = useState(0);

  const handleUpdate = payload => {
    console.info("handling update");
    setChanges(payload.changes);
  };

  const reducedStructure = useMemo(() => {
    return R.uniq(
      R.flatten(
        R.map(category => {
          return findCategoryAnchor(category, category.anchor, [], 0);
        }, props.categories)
      )
    );
  }, [props.categories]);

  const updateNodeIndex = useCallback(
    nodeIndex => {
      if (props.loopChanges[nodeIndex + 1]) {
        setNodeIndex(nodeIndex + 1);
      } else {
        setNodeIndex(0);
      }
    },
    [props.loopChanges]
  );

  const targetNode = useMemo(() => {
    const loopChange = R.view(R.lensIndex(nodeIndex))(props.loopChanges);
    const targetNode = {
      original: R.find(
        R.propEq("fullAnchor", R.prop("anchor", loopChange)),
        reducedStructure
      ),
      requestedChanges: loopChange ? loopChange.properties : {}
    };
    console.group();
    console.info("Target node", targetNode);
    console.info("Reduced structure", reducedStructure);
    console.groupEnd();
    return targetNode;
  }, [nodeIndex, props.loopChanges, reducedStructure]);

  useEffect(() => {
    // const propsObj = R.view(R.lensIndex(nodeIndex))(props.loopChanges);
    if (reducedStructure && targetNode) {
      const nextChanges = handleNodeMain(
        targetNode,
        props.anchor,
        reducedStructure,
        changes
      );
      if (!R.equals(changes, nextChanges)) {
        setChanges(nextChanges);
      }
    }
  }, [changes, props.anchor, reducedStructure, targetNode]);

  return (
    <React.Fragment>
      {!!props.render
        ? props.render({
            anchor: props.anchor,
            categories: props.categories,
            changes,
            interval: props.interval || 2000,
            onUpdate: handleUpdate,
            updateNodeIndex,
            nodeIndex
          })
        : null}
      {props.children}
      {targetNode.original ? (
        <div className="p-20">
          Target node:{" "}
          <span className="font-bold">{targetNode.original.fullAnchor}</span>{" "}
          <br />
          <span className="pr-4">Latest operations:</span>
          <code>{JSON.stringify(targetNode.requestedChanges)}</code>
        </div>
      ) : null}
    </React.Fragment>
  );
};

Stage.defaultProps = {
  loopChanges: []
};

Stage.propTypes = {
  loopChanges: PropTypes.array
};

export default Stage;
