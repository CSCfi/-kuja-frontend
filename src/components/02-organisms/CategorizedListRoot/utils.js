import * as R from "ramda";

export const getChangesByLevel = (level, changes) => {
  return changes.filter(change => {
    const categoryDepth = R.filter(v => {
      return v === "categories";
    }, change.path || []).length;
    return categoryDepth === level;
  });
};

export const findCategoryAnchor = (category, anchor, structure, level) => {
  R.addIndex(R.forEach)((component, index) => {
    const fullAnchor = R.join(".", [anchor, component.anchor]);
    structure = R.insert(
      -1,
      {
        ...component,
        anchorParts: R.split(".", fullAnchor),
        fullAnchor,
        level,
        columnIndex: index
      },
      structure
    );
  }, category.components);

  if (category.categories) {
    return R.map(_category => {
      return findCategoryAnchor(
        _category,
        R.join(".", [anchor, _category.anchor]),
        structure,
        level + 1
      );
    }, category.categories);
  }
  return structure;
};

const findParent = (node, reducedStructure) => {
  const parentNode = R.find(_node => {
    return (
      _node.level === node.level - 1 &&
      _node.columnIndex === 0 &&
      R.equals(
        R.dropLast(1, _node.anchorParts),
        R.dropLast(2, node.anchorParts)
      )
    );
  }, reducedStructure);
  return parentNode;
};

const findSiblings = (node, reducedStructure) => {
  const component = R.find(
    R.propEq("fullAnchor", node.fullAnchor),
    reducedStructure
  );
  let siblings = R.filter(_component => {
    const isSibling = !R.equals(node.fullAnchor, _component.fullAnchor);
    return isSibling && R.equals(component.level, _component.level);
  }, reducedStructure);
  if (component.level > 0) {
    siblings = R.filter(component => {
      const isAnchorLengthEqual = R.equals(
        R.prop("anchorParts", component).length,
        node.anchorParts.length
      );
      const isFirstPartOfAnchorEqual = R.compose(
        R.equals(R.head(node.anchorParts)),
        R.head,
        R.split("."),
        R.prop("fullAnchor")
      )(component);
      const isSibling = !R.equals(node.fullAnchor, component.fullAnchor);

      return isAnchorLengthEqual && isFirstPartOfAnchorEqual && isSibling;
    }, reducedStructure);
  }
  return siblings;
};

const getChangeObjByAnchor = (anchor, changes) => {
  return R.find(R.propEq("anchor", anchor), changes);
};

const disableNodes = (nodes, reducedStructure, changes, index = 0) => {
  const node = R.view(R.lensIndex(index))(nodes);
  const categoryAnchor = R.dropLast(1, node.anchorParts);
  const childNodes = R.filter(_node => {
    return R.equals(R.dropLast(2, _node.anchorParts), categoryAnchor);
  }, reducedStructure);
  const changeObj = getChangeObjByAnchor(node.fullAnchor, changes);
  if (changeObj) {
    if (changeObj.properties.isChecked) {
      changes = R.filter(
        R.compose(
          R.not,
          R.propEq("anchor")(node.fullAnchor)
        )
      )(changes);
    }
  } else if (node.properties.isChecked) {
    changes = R.insert(
      -1,
      {
        anchor: node.fullAnchor,
        properties: {
          isChecked: false
        }
      },
      changes
    );
  }

  if (childNodes.length) {
    changes = disableNodes(childNodes, reducedStructure, changes);
  }

  if (index < nodes.length - 1) {
    return disableNodes(nodes, reducedStructure, changes, index + 1);
  }
  return changes;
};

export const checkLeafNode = (node, changes) => {
  const changeObj = getChangeObjByAnchor(node.fullAnchor, changes);
  if (changeObj && changeObj.properties.isChecked === false) {
    changes = R.filter(
      R.compose(
        R.not,
        R.propEq("anchor")(node.fullAnchor)
      )
    )(changes);
  } else if (!changeObj && node.properties.isChecked === false) {
    changes = R.insert(
      -1,
      {
        anchor: node.fullAnchor,
        properties: {
          isChecked: true
        }
      },
      changes
    );
  }
  return changes;
};

export const checkNode = (node, reducedStructure, changes) => {
  changes = checkLeafNode(node, changes);
  const parentNode = findParent(node, reducedStructure);
  if (parentNode) {
    if (parentNode.name === "RadioButtonWithLabel") {
      changes = disableSiblings(node, reducedStructure, changes);
    }
    return checkNode(parentNode, reducedStructure, changes);
  }
  if (node.name === "RadioButtonWithLabel") {
    return disableSiblings(node, reducedStructure, changes);
  }
  return changes;
};

const disableSiblings = (node, reducedStructure, changes) => {
  const radioSiblings = R.filter(
    R.and(
      R.propEq("columnIndex", node.columnIndex),
      R.propEq("name", "RadioButtonWithLabel")
    )
  )(findSiblings(node, reducedStructure));
  if (radioSiblings.length) {
    return disableNodes(radioSiblings, reducedStructure, changes);
  }
  return changes;
};

const runActivationProcedure = (
  node,
  reducedStructure,
  changesWithoutRootAnchor
) => {
  const changeObj = getChangeObjByAnchor(
    node.fullAnchor,
    changesWithoutRootAnchor
  );
  if (changeObj && changeObj.properties.isChecked === false) {
    changesWithoutRootAnchor = R.filter(
      R.compose(
        R.not,
        R.propEq("anchor")(node.fullAnchor)
      )
    )(changesWithoutRootAnchor);
  } else if (!changeObj && node.properties.isChecked === false) {
    changesWithoutRootAnchor = R.insert(
      -1,
      {
        anchor: node.fullAnchor,
        properties: {
          isChecked: true
        }
      },
      changesWithoutRootAnchor
    );
  }
  if (node.name === "RadioButtonWithLabel") {
    changesWithoutRootAnchor = disableSiblings(
      node,
      reducedStructure,
      changesWithoutRootAnchor
    );
  }

  const parentNode = findParent(node, reducedStructure);

  if (parentNode) {
    changesWithoutRootAnchor = checkNode(
      parentNode,
      reducedStructure,
      changesWithoutRootAnchor
    );
  }
  return changesWithoutRootAnchor;
};

const runDeactivationProcedure = (
  node,
  reducedStructure,
  changesWithoutRootAnchor
) => {
  const changeObj = getChangeObjByAnchor(
    node.fullAnchor,
    changesWithoutRootAnchor
  );
  if (changeObj && changeObj.properties.isChecked === true) {
    changesWithoutRootAnchor = R.filter(
      R.compose(
        R.not,
        R.propEq("anchor")(node.fullAnchor)
      )
    )(changesWithoutRootAnchor);
  } else if (!changeObj && node.properties.isChecked === true) {
    changesWithoutRootAnchor = R.insert(
      -1,
      {
        anchor: node.fullAnchor,
        properties: {
          isChecked: false
        }
      },
      changesWithoutRootAnchor
    );
  }
  const categoryAnchor = R.dropLast(1, node.anchorParts);
  const childNodes = R.filter(_node => {
    return R.equals(R.dropLast(2, _node.anchorParts), categoryAnchor);
  }, reducedStructure);
  if (childNodes.length) {
    return disableNodes(childNodes, reducedStructure, changesWithoutRootAnchor);
  }
  return changesWithoutRootAnchor;
};

/**
 * Main function. This will be run when a user enables a radio button.
 *
 * @param {*} node
 * @param {*} changes
 */
export const handleNodeMain = (
  nodeWithRequestedChanges,
  rootAnchor,
  reducedStructure,
  changes = []
) => {
  const node = R.prop("original", nodeWithRequestedChanges);
  const requestedChanges = R.prop("requestedChanges", nodeWithRequestedChanges);
  let changesWithoutRootAnchor = R.map(changeObj => {
    return R.assoc(
      "anchor",
      R.compose(
        R.join("."),
        R.tail(),
        R.split("."),
        R.prop("anchor")
      )(changeObj),
      changeObj
    );
  }, changes);

  // If user wants to deactivate the target node
  if (requestedChanges.isChecked) {
    changesWithoutRootAnchor = runActivationProcedure(
      node,
      reducedStructure,
      changesWithoutRootAnchor
    );
  } else if (requestedChanges.isChecked === false) {
    changesWithoutRootAnchor = runDeactivationProcedure(
      node,
      reducedStructure,
      changesWithoutRootAnchor
    );
  }

  const updatedChangesArr = R.map(changeObj => {
    return R.assoc("anchor", `${rootAnchor}.${changeObj.anchor}`, changeObj);
  }, changesWithoutRootAnchor);

  return updatedChangesArr;
};
