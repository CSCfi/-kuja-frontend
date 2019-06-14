import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CheckboxWithLabel from "../../../01-molecules/CheckboxWithLabel";
import Dropdown from "../../../00-atoms/Dropdown";
import RadioButtonWithLabel from "../../../01-molecules/RadioButtonWithLabel";
import _ from "lodash";
import * as R from "ramda";
import { getChangesByLevel } from "../utils";

const CategorizedList = props => {
  const [changes, setChanges] = useState([]);
  const getPropertiesObject = (path, categories) => {
    const fullPath = (props.rootPath || []).concat(path);
    const c =
      (_.find(changes || [], change => R.equals(change.path, fullPath)) || {})
        .properties || {};
    return Object.assign({}, R.path(path, categories).properties, c);
  };

  useEffect(() => {
    setChanges(getChangesByLevel(props.level, props.allChanges));
  }, [props.changes, props.level, props.allChanges]);

  const uncheckHierarchyBelow = (
    categories,
    rootPath,
    operations,
    skipPath
  ) => {
    if (categories) {
      R.addIndex(R.forEach)((category, i) => {
        R.addIndex(R.forEach)((component, ii) => {
          const isComponentCheckedByDefault = component.properties.isChecked;
          const path = rootPath.concat([i, "components", ii]);
          const changeObj = props.getChangeByPath(path);
          if (
            component.name === "RadioButtonWithLabel" ||
            path.length !== skipPath.length
          ) {
            if (isComponentCheckedByDefault && !changeObj) {
              // Let's create a change for checked by default
              operations.push([
                "addChange",
                {
                  path,
                  properties: {
                    isChecked: false
                  }
                }
              ]);
            } else {
              // Let's delete the change object if it sets the component as checked
              if (changeObj && changeObj.properties.isChecked) {
                operations.push(["removeChange", path]);
              }
            }
          }
        }, category.components || []);
        return uncheckHierarchyBelow(
          category.categories,
          rootPath.concat([i, "categories"]),
          operations,
          skipPath
        );
      }, categories);
    }
    return operations;
  };

  const checkParentPath = (props, operations) => {
    if (props.parentCategory) {
      _.map(props.parentCategory.components, (component, i) => {
        const isComponentCheckedByDefault = component.properties.isChecked;
        const path = R.init(props.rootPath).concat(["components", i]);
        const changeObj = props.getChangeByPath(path);
        if (!isComponentCheckedByDefault) {
          if (!changeObj) {
            // Let's create a change for checked by default
            operations.push([
              "addChange",
              {
                path,
                properties: {
                  isChecked: true
                }
              }
            ]);
          }
        } else {
          // Let's delete the change object if it sets the component as checked
          if (changeObj && !changeObj.properties.isChecked) {
            operations.push(["removeChange", path]);
          }
        }
        if (
          component.name === "RadioButtonWithLabel" ||
          component.name === "CheckboxWithLabel"
        ) {
          operations = uncheckSiblings(
            props.parentCategoryListProps,
            operations,
            path
          );
        }
      });
      return checkParentPath(props.parentCategoryListProps, operations);
    }
    return operations;
  };

  const uncheckSiblings = (props, operations, skipPath) => {
    _.forEach(props.categories, (category, i) => {
      _.forEach(category.components, (component, ii) => {
        if (component.name === "RadioButtonWithLabel") {
          const isComponentCheckedByDefault = component.properties.isChecked;
          const path = props.rootPath.concat([i, "components", ii]);
          const changeObj = props.getChangeByPath(path);
          if (!R.equals(path, skipPath)) {
            if (isComponentCheckedByDefault) {
              if (!changeObj) {
                // Let's create a change for checked by default
                operations.push([
                  "addChange",
                  {
                    path,
                    properties: {
                      isChecked: false
                    }
                  }
                ]);
              }
            } else {
              // Let's delete the change object if it sets the component as checked
              if (changeObj && changeObj.properties.isChecked) {
                operations.push(["removeChange", path]);
              }
            }
          }
        }
      });
    });
    return operations;
  };

  const handleChanges = (payload, c) => {
    let operations = [];
    const component = R.path(payload.path, props.categories);
    const fullPath = (props.rootPath || []).concat(payload.path);
    const allChanges = props.allChanges;
    const isChangeAvailable = !!R.find(R.propEq("path", fullPath))(allChanges);
    if (isChangeAvailable) {
      // If there is a change let's remove it
      operations.push(["removeChange", fullPath]);
    } else {
      // No change? Let's add one.
      operations.push([
        "addChange",
        {
          path: fullPath,
          properties: c
        }
      ]);
    }
    if (component.name === "CheckboxWithLabel") {
      if (!c.isChecked) {
        // Let's uncheck all the child checkboxes
        operations = uncheckHierarchyBelow(
          props.categories[payload.path[0]].categories,
          props.rootPath.concat([payload.path[0], "categories"]),
          operations,
          props.rootPath.concat(payload.path)
        );
      } else {
        // Let's check the parent component(s)
        operations = checkParentPath(props, operations);
      }
    } else if (component.name === "RadioButtonWithLabel") {
      operations = checkParentPath(props, operations);
      operations = uncheckHierarchyBelow(
        props.categories,
        props.rootPath,
        operations,
        props.rootPath.concat(payload.path)
      );
    }
    props.runOperations(operations);
  };

  return (
    <div>
      {_.map(props.categories, (category, i) => {
        const isCategoryTitleVisible = props.showCategoryTitles && (category.code || category.title);
        return (
          <div
            key={i}
            className={`${
              !R.equals(props.rootPath, []) ? "px-10" : (i !== 0 && isCategoryTitleVisible ? "pt-10" : "")
            } select-none"`}
          >
            {isCategoryTitleVisible && (
              <div className="p-2">
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
                const idSuffix = `${i}-${ii}`;
                const propsObj = getPropertiesObject(
                  [i, "components", ii],
                  props.categories
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
                            id: `checkbox-with-label-${idSuffix}`,
                            path: [i, "components", ii],
                            fullPath: props.rootPath.concat([
                              i,
                              "components",
                              ii
                            ])
                          }}
                          labelStyles={propsObj.labelStyles}
                        >
                          <span>{propsObj.code}</span>
                          <span className="ml-4">{title}</span>
                        </CheckboxWithLabel>
                      </div>
                    )}
                    {component.name === "RadioButtonWithLabel" && (
                      <div className="px-2">
                        <RadioButtonWithLabel
                          id={`radio-button-with-label-${idSuffix}`}
                          name={propsObj.name}
                          isChecked={propsObj.isChecked}
                          onChanges={handleChanges}
                          payload={{
                            id: `radio-button-with-label-${idSuffix}`,
                            path: [i, "components", ii],
                            fullPath: props.rootPath.concat([
                              i,
                              "components",
                              ii
                            ])
                          }}
                          value={properties.value}
                        >
                          <span>{propsObj.code}</span>
                          <span className="ml-4">{title}</span>
                        </RadioButtonWithLabel>
                      </div>
                    )}
                    {component.name === "Dropdown"
                      ? (category => {
                          const isSiblingCheckedByDefault = (
                            (category.components[ii - 1] || {}).properties || {}
                          ).isChecked;
                          const change = props.getChangeByPath(
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
                                options={properties.options}
                                isDisabled={isDisabled}
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
                level={props.level + 1}
                categories={category.categories}
                debug={props.debug}
                changes={changes}
                allChanges={props.allChanges}
                getChangeByPath={props.getChangeByPath}
                id={`${props.id}-${category.code}`}
                runOperations={props.runOperations}
                rootPath={props.rootPath.concat([i, "categories"])}
                parentCategory={category}
                parentCategoryListProps={props}
                showCategoryTitles={props.showCategoryTitles}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

CategorizedList.defaultProps = {
  rootPath: []
};

CategorizedList.propTypes = {
  categories: PropTypes.array,
  debug: PropTypes.bool,
  onChanges: PropTypes.func,
  parentCategory: PropTypes.object,
  path: PropTypes.array,
  showCategoryTitles: PropTypes.bool
};

export default CategorizedList;
