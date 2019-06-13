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

  const checkHierarchyBelow = (categories, rootPath, operations) => {
    if (categories) {
      R.addIndex(R.forEach)((category, i) => {
        R.addIndex(R.forEach)((component, ii) => {
            const isComponentCheckedByDefault = component.properties.isChecked;
            const path = rootPath.concat([i, 'components', ii]);
            const changeObj = props.getChangeByPath(path);
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
        }, category.components || []);
        return checkHierarchyBelow(
          category.categories,
          rootPath.concat([i, 'categories']),
          operations
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
      });
      return checkParentPath(props.parentCategoryListProps, operations);
    }
    return operations;
  };

  const handleChanges = (payload, c) => {
    let operations = [];
    const component = R.path(payload.path, props.categories);
    const fullPath = (props.rootPath || []).concat(payload.path);
    const allChanges = props.allChanges;
    if (component.name === "CheckboxWithLabel") {
      // If there is a change let's remove it
      const isChangeAvailable = !!R.find(R.propEq("path", fullPath))(
        allChanges
      );
      if (isChangeAvailable) {
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

      if (!c.isChecked) {
        // Let's uncheck all the child checkboxes
        operations = checkHierarchyBelow(
          props.categories[payload.path[0]].categories,
          props.rootPath.concat([payload.path[0], "categories"]),
          operations
        );
        props.runOperations(operations);
      } else {
        // Let's check the parent component(s)
        operations = checkParentPath(props, operations);
        props.runOperations(operations);
      }
    }
  };

  return (
    <div>
      {_.map(props.categories, (category, i) => {
        return (
          <div key={i} className="px-6 select-none">
            {(category.code || category.title) && (
              <div className="p-2">
                <strong>
                  {category.code && (
                    <span className="mr-4">{category.code}</span>
                  )}
                  <span>{category.title}</span>
                </strong>
              </div>
            )}
            <div className="flex items-center justify-between border-b border-solid border-grey-100">
              {_.map(category.components, (component, ii) => {
                const { properties } = component;
                const idSuffix = `${i}-${ii}`;
                const propsObj = getPropertiesObject(
                  [i, "components", ii],
                  props.categories
                );
                return (
                  <React.Fragment key={`item-${ii}`}>
                    {component.name === "CheckboxWithLabel" && (
                      <div className="px-2">
                        <CheckboxWithLabel
                          id={`checkbox-with-label-${idSuffix}`}
                          name={propsObj.name}
                          isChecked={propsObj.isChecked}
                          onChanges={handleChanges}
                          payload={{
                            id: `checkbox-with-label-${idSuffix}`,
                            path: props.path.concat([i, "components", ii])
                          }}
                          labelStyles={propsObj.labelStyles}
                        >
                          <span>{propsObj.code}</span>
                          <span className="ml-4">{`${propsObj.title} (level-${
                            props.level
                          })`}</span>
                        </CheckboxWithLabel>
                      </div>
                    )}
                    {component.name === "RadioButtonWithLabel" && (
                      <div className="px-2">
                        <RadioButtonWithLabel
                          id={`radio-button-with-label-${idSuffix}`}
                          name={properties.name}
                          isChecked={properties.isChecked}
                          onChanges={handleChanges}
                          payload={{
                            id: `radio-button-with-label-${idSuffix}`,
                            path: props.path.concat([i, "components", ii])
                          }}
                          value={properties.value}
                        >
                          <span>{properties.code}</span>
                          <span className="ml-4">{properties.title}</span>
                        </RadioButtonWithLabel>
                      </div>
                    )}
                    {component.name === "Dropdown" && (
                      <div className="px-2">
                        <Dropdown
                          id={`dropdown-${idSuffix}`}
                          options={properties.options}
                          isDisabled={
                            !(
                              (category.components[ii - 1] || {}).properties ||
                              {}
                            ).isChecked
                          }
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            {category.categories && (
              <CategorizedList
                level={props.level + 1}
                categories={category.categories}
                changes={changes}
                allChanges={props.allChanges}
                getChangeByPath={props.getChangeByPath}
                id={`${props.id}-${category.code}`}
                runOperations={props.runOperations}
                path={props.path.concat[("components", i)]}
                rootPath={[i, "categories"].concat(props.rootPath)}
                parentCategory={category}
                parentCategoryListProps={props}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

CategorizedList.defaultProps = {
  path: [],
  rootPath: []
};

CategorizedList.propTypes = {
  categories: PropTypes.array,
  onChanges: PropTypes.func,
  parentCategory: PropTypes.object,
  path: PropTypes.array
};

export default CategorizedList;
