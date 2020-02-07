import * as R from "ramda";
import { removeAnchorPart } from "../../../utils/common";

/**
 * @module CategorizedListRoot/utils
 **/

/**
 * Returns changes by level.
 *
 * @param {number} level
 * @param {array} changes
 */
export const getChangesByLevel = (level, changes) => {
  return changes.filter(change => {
    const categoryDepth = R.filter(v => {
      return v === "categories";
    }, change.path || []).length;
    return categoryDepth === level;
  });
};

/**
 * Function returns an array of path parts. User can access the
 * related component on the given form e.g. using Ramda's
 * (ramdajs.com) path related functions.
 * @param {*} anchorArr - Splitted anchor.
 * @param {*} lomake - A categories structure.
 * @param {*} anchorPartIndex - Initial value 0. Used for recursion.
 * @param {*} _path - Return value. Initial value is "".
 */
export function getPathByAnchor(
  anchorArr = [],
  lomake,
  anchorPartIndex = 0,
  _path = []
) {
  const anchorPart = anchorArr[anchorPartIndex];
  if (typeof anchorPart === "number") {
    console.error(
      `Anchor must be a string not a number.`,
      anchorPart,
      anchorArr
    );
  }
  let pathPart = [];
  if (anchorPartIndex === 0) {
    pathPart = [R.findIndex(R.propEq("anchor", anchorPart), lomake)];
  } else if (anchorPartIndex + 1 < anchorArr.length) {
    const updatedPath = R.append("categories", _path);
    const lomakePart = R.path(updatedPath, lomake);
    if (lomakePart) {
      pathPart = [
        "categories",
        R.findIndex(R.propEq("anchor", anchorPart), lomakePart)
      ];
    } else {
      console.error(
        `Can't find the requested part of the form.`,
        lomake,
        _path,
        updatedPath
      );
    }
  } else {
    const updatedPath = R.append("components", _path);
    const lomakePart = R.path(updatedPath, lomake);
    if (lomakePart) {
      const componentPathPart = R.findIndex(
        R.propEq("anchor", anchorPart),
        lomakePart
      );
      if (componentPathPart !== -1) {
        pathPart = [
          "components",
          R.findIndex(R.propEq("anchor", anchorPart), lomakePart)
        ];
      }
    } else {
      console.error(`Can't find anchor ${anchorPart} of ${lomakePart}.`);
    }
  }

  _path = R.concat(_path, pathPart);

  if (anchorArr[anchorPartIndex + 1]) {
    return getPathByAnchor(anchorArr, lomake, anchorPartIndex + 1, _path);
  }
  return _path;
}

const checkTerms = (terms, lomake, changeObjects) => {
  return R.map(term => {
    const _path = getPathByAnchor(R.split(".", term.anchor), lomake);
    const component = R.path(_path, lomake);
    let isValid = true;
    if (component) {
      const changeObject = R.find(changeObj => {
        const anchor = removeAnchorPart(changeObj.anchor, 0);
        return R.equals(anchor, term.anchor);
      }, changeObjects);
      /**
       * Let's loop through the properties of the component.
       **/
      R.mapObjIndexed((value, key) => {
        const source = changeObject || component;
        if (
          (value instanceof Function && !value(source.properties[key])) ||
          (!(value instanceof Function) &&
            !R.equals(value, component.properties[key]) &&
            (!changeObject || !R.equals(changeObject.properties[key], value)))
        ) {
          isValid = false;
        }
      }, term.properties);
    } else {
      isValid = false;
    }

    return isValid;
  }, terms);
};

const checkTerm = (term, lomake, changeObjects) => {
  return checkTerms([term], lomake, changeObjects);
};

export const ifOne = R.includes(true);
export const ifAll = R.all(R.equals(true));
export const ifAllTerms = R.compose(ifAll, checkTerms);
export const ifOneTerm = R.compose(R.includes(true), checkTerms);
export const ifTerm = R.compose(R.includes(true), checkTerm);

export const findCategoryAnchor = (
  category,
  anchor,
  structure = [],
  level = 0,
  path = []
) => {
  if (category.components) {
    path = R.insert(-1, "components", path);
    R.addIndex(R.forEach)((component, index) => {
      path = R.insert(-1, index, path);
      const fullAnchor = R.join(".", [anchor, component.anchor]);
      structure = R.insert(
        -1,
        {
          ...component,
          anchorParts: R.split(".", fullAnchor),
          fullAnchor,
          level,
          columnIndex: index,
          path
        },
        structure
      );
    }, category.components);
  }

  if (category.categories && category.categories.length) {
    path = R.insert(-1, "categories", path);
    return R.map(_category => {
      return findCategoryAnchor(
        _category,
        R.join(".", [anchor, _category.anchor]),
        structure,
        level + 1,
        path
      );
    }, category.categories);
  }
  return structure;
};

export const getReducedStructure = categories => {
  return R.uniq(
    R.flatten(
      R.map(category => {
        return findCategoryAnchor(category, category.anchor);
      }, categories)
    )
  );
};

export const getTargetNode = (loopChange, reducedStructure) => {
  return {
    original: R.find(
      R.propEq("fullAnchor", R.prop("anchor", loopChange)),
      reducedStructure
    ),
    requestedChanges: loopChange ? loopChange.properties : {}
  };
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
      changes = R.filter(R.compose(R.not, R.propEq("anchor")(node.fullAnchor)))(
        changes
      );
    }
  } else if (node.properties.isChecked) {
    changes = R.insert(
      -1,
      {
        anchor: node.fullAnchor,
        properties: {
          metadata: node.properties.forChangeObject,
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
  if (changeObj && !changeObj.properties.isChecked) {
    changes = R.filter(R.compose(R.not, R.propEq("anchor")(node.fullAnchor)))(
      changes
    );
  } else if (!changeObj && !node.properties.isChecked) {
    changes = R.insert(
      -1,
      {
        anchor: node.fullAnchor,
        properties: {
          metadata: node.properties.forChangeObject,
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
    changes = checkNode(parentNode, reducedStructure, changes);
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
  if (changeObj && !changeObj.properties.isChecked) {
    changesWithoutRootAnchor = R.filter(
      R.compose(R.not, R.propEq("anchor")(node.fullAnchor))
    )(changesWithoutRootAnchor);
  } else if (!changeObj && !node.properties.isChecked) {
    changesWithoutRootAnchor = R.insert(
      -1,
      {
        anchor: node.fullAnchor,
        properties: {
          metadata: node.properties.forChangeObject,
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

  if (
    parentNode &&
    (parentNode.name === "CheckboxWithLabel" ||
      parentNode.name === "RadioButtonWithLabel")
  ) {
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
      R.compose(R.not, R.propEq("anchor")(node.fullAnchor))
    )(changesWithoutRootAnchor);
  } else if (!changeObj && node.properties.isChecked === true) {
    changesWithoutRootAnchor = R.insert(
      -1,
      {
        anchor: node.fullAnchor,
        properties: {
          metadata: node.properties.forChangeObject,
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

const getPropertiesObject = (changeObj = {}, requestedChanges) => {
  return Object.assign({}, changeObj.properties || {}, requestedChanges);
};

/**
 * Main function. This will be run when user makes changes.
 *
 * @param {object} nodeWithRequestedChanges
 * @param {object} nodeWithRequestedChanges.requestedChanges - Property object.
 * @param {array} changes - Array of change objects.
 */
export const handleNodeMain = (
  nodeWithRequestedChanges,
  rootAnchor,
  reducedStructure,
  changes = []
) => {
  const node = R.prop("original", nodeWithRequestedChanges);
  const requestedChanges = R.prop("requestedChanges", nodeWithRequestedChanges);
  let changesWithoutRootAnchor = rootAnchor
    ? R.map(changeObj => {
        const reducedAnchor = removeAnchorPart(changeObj.anchor, 0);
        return R.assoc("anchor", reducedAnchor, changeObj);
      }, changes)
    : changes;

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
  } else {
    const changeObj = getChangeObjByAnchor(
      node.fullAnchor,
      changesWithoutRootAnchor
    );
    const propsObj = getPropertiesObject(changeObj, requestedChanges);
    const updatedChangeObj = { anchor: node.fullAnchor, properties: propsObj };
    if (changeObj) {
      changesWithoutRootAnchor = R.map(_changeObj => {
        if (R.equals(_changeObj.anchor, updatedChangeObj.anchor)) {
          return updatedChangeObj;
        }
        return _changeObj;
      }, changesWithoutRootAnchor);
    } else {
      changesWithoutRootAnchor = R.insert(
        -1,
        updatedChangeObj,
        changesWithoutRootAnchor
      );
    }
  }

  const updatedChangesArr = rootAnchor
    ? R.map(changeObj => {
        return R.assoc(
          "anchor",
          `${rootAnchor}.${changeObj.anchor}`,
          changeObj
        );
      }, changesWithoutRootAnchor)
    : changesWithoutRootAnchor;
  return updatedChangesArr;
};

export const getChangesForReadOnlyLomake = (
  reducedStructure,
  index = 0,
  changes = []
) => {
  const changeObj = {
    anchor: reducedStructure[index].fullAnchor,
    properties: { isReadOnly: true }
  };
  const targetNode = getTargetNode(changeObj, reducedStructure);
  const cumulativeChanges = handleNodeMain(
    targetNode,
    null,
    reducedStructure,
    changes
  );
  if (R.view(R.lensIndex(index + 1))(reducedStructure)) {
    return getChangesForReadOnlyLomake(
      reducedStructure,
      index + 1,
      cumulativeChanges
    );
  }
  return cumulativeChanges;
};
