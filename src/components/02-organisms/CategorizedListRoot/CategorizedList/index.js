import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CheckboxWithLabel from "../../../01-molecules/CheckboxWithLabel";
import Dropdown from "../../../00-atoms/Dropdown";
import RadioButtonWithLabel from "../../../01-molecules/RadioButtonWithLabel";
import TextBox from "../../../00-atoms/TextBox";
import _ from "lodash";
import * as R from "ramda";
import { getChangesByLevel } from "../utils";

const CategorizedList = React.memo(props => {
  const [changes, setChanges] = useState([]);
  const getPropertiesObject = (path, categories) => {
    const fullPath = (props.rootPath || []).concat(path);
    const c =
      (_.find(changes || [], change => R.equals(change.path, fullPath)) || {})
        .properties || {};
    return Object.assign({}, R.path(path, categories).properties, c);
  };

  useEffect(() => {
    const changesByLevel = getChangesByLevel(props.level, props.allChanges);
    if (changesByLevel) {
      setChanges(changesByLevel);
    }
  }, [props.changes, props.level, props.allChanges]);

  const getOperation = (component, changeObj, payload, changeProps) => {
    const addition = {
      type: "addition",
      payload: {
        anchor: payload.anchor,
        path: payload.fullPath,
        properties: changeProps
      }
    };
    const removal = {
      type: "removal",
      payload: {
        anchor: payload.anchor,
        path: payload.fullPath
      }
    };
    if (payload.shouldBeChecked) {
      if (component.properties.isChecked) {
        if (changeObj && !changeObj.properties.isChecked) {
          return removal;
        }
      } else {
        if (!changeObj) {
          return addition;
        }
      }
    } else {
      if (component.properties.isChecked) {
        return addition;
      } else {
        if (changeObj) {
          return removal;
        }
      }
    }
    return false;
  };

  const handleDescendants = (changeProps, payload, operations = []) => {
    R.addIndex(R.map)((category, i) => {
      const component = category.components[0];
      const fullPath = R.slice(0, -2, payload.fullPath).concat([
        "categories",
        i,
        "components",
        0
      ]);
      const nextAnchor = R.join(".", [payload.anchor, category.anchor]);
      const changeObj = R.find(R.propEq("path", fullPath))(props.allChanges);
      const operation = getOperation(
        component,
        changeObj,
        {
          anchor: nextAnchor,
          fullPath,
          shouldBeChecked: false
        },
        changeProps
      );

      if (operation) {
        operations.push(operation);
      }

      return handleDescendants(
        changeProps,
        {
          anchor: nextAnchor,
          categories: category.categories,
          fullPath
        },
        operations
      );
    }, payload.categories || []);
    return operations;
  };

  const handlePredecessors = (changeProps, payload, operations = []) => {
    const component = payload.parent
      ? payload.parent.category.components[0]
      : payload.component;
    const fullPath = R.concat(R.slice(0, -1, payload.rootPath), [
      "components",
      0
    ]);
    const nextAnchor = R.join(".", R.init(payload.anchor.split(".")));
    const changeObj = R.find(R.propEq("path", fullPath))(props.allChanges);

    const operation = getOperation(
      component,
      changeObj,
      {
        anchor: nextAnchor,
        fullPath,
        shouldBeChecked: true
      },
      changeProps
    );

    if (operation) {
      operations.push(operation);
    }

    if (component.name === "RadioButtonWithLabel") {
      // Walk through the siblings
      R.addIndex(R.forEach)((category, i) => {
        const component = category.components[0];
        if (component.name === "RadioButtonWithLabel") {
          const _fullPath = R.concat(payload.parent.rootPath, [
            i,
            "components",
            0
          ]);
          // R.concat(payload.rootPath, [i, "components", 0]);
          if (
            !R.equals(
              R.concat(payload.parent.rootPath, [i]),
              R.init(payload.rootPath)
            )
          ) {
            // All the radio button siblings must be unchecked
            const nextPayload = {
              anchor: `${R.join(
                ".",
                R.init(payload.parent.anchor.split("."))
              )}.${payload.parent.siblings[i].anchor}`,
              categories: category.categories,
              component,
              fullPath: _fullPath,
              parent: payload.parent.parent,
              rootPath: payload.parent.rootPath,
              siblings: payload.parent.siblings
            };
            const nextChangeProps = {
              isChecked: false
            };
            operations = handleTree(nextPayload, nextChangeProps, operations);
          }
        }
      }, payload.parent.siblings);
    }

    if (payload.parent.parent && payload.parent.parent.category.components) {
      return handlePredecessors(
        changeProps,
        {
          anchor: nextAnchor,
          component,
          parent: payload.parent.parent,
          rootPath: payload.parent.rootPath
        },
        operations
      );
    }

    return operations;
  };

  const handleChanges = (payload, changeProps) => {
    const operations = handleTree(payload, changeProps);
    return props.runOperations(operations);
  };

  const handleDropdownOrTextBox = (payload, changeProps) => {
    const changeObj = R.find(R.propEq("path", payload.fullPath))(
      props.allChanges
    );
    let operations = [];
    if (changeObj) {
      operations.push({
        type: "modification",
        payload: {
          anchor: payload.anchor,
          path: payload.fullPath,
          properties: changeProps
        }
      });
    } else {
      operations.push({
        type: "addition",
        payload: {
          anchor: payload.anchor,
          path: payload.fullPath,
          properties: changeProps
        }
      });
    }
    return props.runOperations(operations);
  };

  /**
   * Main handler
   * Returns array of changes
   */
  const handleTree = (payload, changeProps, operations = []) => {
    const changeObj = R.find(R.propEq("path", payload.fullPath))(
      props.allChanges
    );

    let _operations = R.clone(operations);

    // Handle the current component
    const operation = getOperation(
      payload.component,
      changeObj,
      {
        anchor: payload.anchor,
        fullPath: payload.fullPath,
        shouldBeChecked: changeProps.isChecked
      },
      changeProps
    );

    if (operation) {
      _operations = R.concat(operations, [operation]);
    }

    // Walk through the descendants
    if (!changeProps.isChecked && payload.categories) {
      _operations = R.concat(
        _operations,
        handleDescendants(changeProps, payload, [])
      );
    }

    if (changeProps.isChecked) {
      // Walk through the predecessors
      if (
        payload.parent &&
        payload.parent.category &&
        payload.parent.category.components
      ) {
        _operations = R.concat(
          _operations,
          handlePredecessors(changeProps, payload, [])
        );
      }
      if (payload.component.name === "RadioButtonWithLabel") {
        // Walk through the siblings
        R.addIndex(R.forEach)((category, i) => {
          const component = category.components[0];
          if (component.name === "RadioButtonWithLabel") {
            const fullPath = R.concat(payload.rootPath, [i, "components", 0]);
            if (!R.equals(fullPath, payload.fullPath)) {
              // All the radio button siblings must be unchecked
              const nextPayload = {
                anchor: `${R.join(".", R.init(payload.anchor.split(".")))}.${
                  category.anchor
                }`,
                categories: category.categories,
                component,
                fullPath,
                parent: payload.parent,
                rootPath: payload.rootPath,
                siblings: payload.siblings
              };
              const nextChangeProps = {
                isChecked: false
              };
              _operations = handleTree(
                nextPayload,
                nextChangeProps,
                _operations
              );
            }
          }
        }, payload.siblings);
      }
    }

    // Put all changes into one array for later handing
    return _operations;
  };

  return (
    <div>
      {_.map(props.categories, (category, i) => {
        const isCategoryTitleVisible =
          props.showCategoryTitles && (category.code || category.title);
        const anchor = `${props.anchor}.${category.anchor}`;
        return (
          <div
            key={i}
            className={`${
              !R.equals(props.rootPath, [])
                ? "pl-10"
                : i !== 0 && isCategoryTitleVisible
                ? "pt-10"
                : ""
            } select-none"`}
          >
            {isCategoryTitleVisible && (
              <div className="py-2">
                <h4>
                  {category.code && (
                    <span className="mr-4">{category.code}</span>
                  )}
                  <span>{category.title}</span>
                </h4>
              </div>
            )}
            <div className="flex items-center justify-between">
              {_.map(category.components, (component, ii) => {
                const { properties } = component;
                const fullPath = props.rootPath.concat([i, "components", ii]);
                const idSuffix = `${i}-${ii}`;
                const propsObj = getPropertiesObject(
                  [i, "components", ii],
                  props.categories
                );
                const changeObj = props.getChangeByPath(anchor, fullPath);
                const isAddition = ((changeObj || {}).properties || {})
                  .isChecked;
                const isRemoved = changeObj && !changeObj.properties.isChecked;
                const labelStyles = Object.assign(
                  {},
                  isAddition ? (propsObj.labelStyles || {}).addition : {},
                  isRemoved ? (propsObj.labelStyles || {}).removal : {},
                  (propsObj.labelStyles || {}).custom || {}
                );
                const title =
                  propsObj.title +
                  (props.debug
                    ? props.rootPath.concat([i, "components", ii])
                    : "");
                return (
                  <React.Fragment key={`item-${ii}`}>
                    {component.name === "CheckboxWithLabel" && (
                      <div>
                        <CheckboxWithLabel
                          id={`checkbox-with-label-${idSuffix}`}
                          name={propsObj.name}
                          isChecked={propsObj.isChecked}
                          onChanges={handleChanges}
                          payload={{
                            anchor,
                            categories: category.categories,
                            component,
                            fullPath,
                            parent: props.parent,
                            rootPath: props.rootPath,
                            siblings: props.categories
                          }}
                          labelStyles={labelStyles}
                        >
                          <div className="flex">
                            <span className="leading-none">
                              {propsObj.code}
                            </span>
                            <p className="ml-4 leading-none">{title}</p>
                          </div>
                        </CheckboxWithLabel>
                      </div>
                    )}
                    {component.name === "RadioButtonWithLabel" && (
                      <div>
                        <RadioButtonWithLabel
                          id={`radio-button-with-label-${idSuffix}`}
                          name={propsObj.name}
                          isChecked={propsObj.isChecked}
                          onChanges={handleChanges}
                          payload={{
                            anchor,
                            categories: category.categories,
                            component,
                            fullPath,
                            parent: props.parent,
                            rootPath: props.rootPath,
                            siblings: props.categories
                          }}
                          labelStyles={labelStyles}
                          value={properties.value}
                          className="flex-row"
                        >
                          <div className="flex">
                            <span className="leading-none">
                              {propsObj.code}
                            </span>
                            <p className="ml-4 leading-none">{title}</p>
                          </div>
                        </RadioButtonWithLabel>
                      </div>
                    )}
                    {component.name === "Dropdown"
                      ? (category => {
                          const isSiblingCheckedByDefault = (
                            (category.components[ii - 1] || {}).properties || {}
                          ).isChecked;
                          const change = props.getChangeByPath(
                            anchor,
                            props.rootPath.concat([i, "components", ii - 1])
                          );
                          const isDisabled = !(
                            (isSiblingCheckedByDefault && !change) ||
                            (change && change.properties.isChecked)
                          );
                          return (
                            <div className="px-2">
                              <Dropdown
                                id={`dropdown-${idSuffix}`}
                                onChanges={handleDropdownOrTextBox}
                                options={properties.options}
                                payload={{
                                  anchor,
                                  categories: category.categories,
                                  component,
                                  fullPath,
                                  parent: props.parent,
                                  rootPath: props.rootPath,
                                  siblings: props.categories
                                }}
                                value={propsObj.selectedOption}
                                isDisabled={isDisabled}
                              />
                            </div>
                          );
                        })(category)
                      : null}
                    {component.name === "TextBox"
                      ? (category => {
                          const isSiblingCheckedByDefault = (
                            (category.components[ii - 1] || {}).properties || {}
                          ).isChecked;
                          const change = props.getChangeByPath(
                            anchor,
                            props.rootPath.concat([i, "components", ii])
                          );
                          const parentChange = props.getChangeByPath(
                            props.anchor,
                            R.concat(R.init(props.rootPath), ["components", 0])
                          );
                          const isDisabled = !(
                            (isSiblingCheckedByDefault && !parentChange) ||
                            (parentChange && parentChange.properties.isChecked)
                          );
                          const value = change
                            ? change.properties.value
                            : properties.defaultValue;
                          return (
                            <div className="pt-4 pr-2 w-full">
                              <TextBox
                                id={`textbox-${idSuffix}`}
                                isDisabled={isDisabled}
                                isHidden={isDisabled}
                                onChanges={handleDropdownOrTextBox}
                                payload={{
                                  anchor,
                                  categories: category.categories,
                                  component,
                                  fullPath,
                                  parent: props.parent,
                                  rootPath: props.rootPath,
                                  siblings: props.categories
                                }}
                                value={value}
                              />
                            </div>
                          );
                        })(category)
                      : null}
                  </React.Fragment>
                );
              })}
            </div>
            {category.categories && (
              <CategorizedList
                anchor={anchor}
                level={props.level + 1}
                categories={category.categories}
                debug={props.debug}
                changes={changes}
                allChanges={props.allChanges}
                getChangeByPath={props.getChangeByPath}
                id={`${props.id}-${category.code}`}
                runOperations={props.runOperations}
                rootPath={props.rootPath.concat([i, "categories"])}
                parent={{
                  anchor,
                  category,
                  parent: props.parent,
                  rootPath: props.rootPath,
                  siblings: props.categories
                }}
                parentRootPath={props.rootPath}
                showCategoryTitles={props.showCategoryTitles}
              />
            )}
          </div>
        );
      })}
    </div>
  );
});

CategorizedList.defaultProps = {
  anchor: "root",
  rootPath: []
};

CategorizedList.propTypes = {
  allChanges: PropTypes.array,
  anchor: PropTypes.string,
  categories: PropTypes.array,
  debug: PropTypes.bool,
  onChanges: PropTypes.func,
  parentCategory: PropTypes.object,
  path: PropTypes.array,
  showCategoryTitles: PropTypes.bool
};

export default CategorizedList;
