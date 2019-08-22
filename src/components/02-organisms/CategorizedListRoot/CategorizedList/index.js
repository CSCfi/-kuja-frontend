import React from "react";
import PropTypes from "prop-types";
import CheckboxWithLabel from "../../../01-molecules/CheckboxWithLabel";
import Dropdown from "../../../00-atoms/Dropdown";
import RadioButtonWithLabel from "../../../01-molecules/RadioButtonWithLabel";
import TextBox from "../../../00-atoms/TextBox";
import StatusTextRow from "../../../01-molecules/StatusTextRow";
import Difference from "../../../02-organisms/Difference";
import Autocomplete from "../../Autocomplete";
import * as R from "ramda";
import _ from "lodash";

/**
 *
 * @param {string} anchor
 * @param {array} changes
 */
const getChangeObjByAnchor = (anchor, changes) => {
  return R.find(R.propEq("anchor", anchor), changes) || { properties: {} };
};

/**
 * Tarkastellaan sekä alkuperäistä komponenttia että sille tehtyjä muutoksia.
 * Yhdistetään propertyt siten, että muutokset yliajavat alkuperäiset arvot.
 * Mikäli muutoksia ei ole, palautuu komponentin alkuperäinen properties-
 * objekti.
 * @param {string} changeObj
 * @param {object} component
 */
const getPropertiesObject = (changeObj, component) => {
  return Object.assign({}, component.properties, changeObj.properties || {});
};

const CategorizedList = React.memo(props => {
  const getOperation = (component, changeObj, payload, changeProps) => {
    const addition = {
      type: "addition",
      payload: {
        anchor: payload.anchor,
        properties: changeProps
      }
    };
    const removal = {
      type: "removal",
      payload: {
        anchor: payload.anchor
      }
    };
    if (payload.shouldBeChecked) {
      if (component.properties.isChecked) {
        if (changeObj && !changeObj.properties.isChecked) {
          return removal;
        }
      } else {
        if (R.isEmpty(changeObj.properties)) {
          return addition;
        }
      }
    } else {
      if (component.properties.isChecked) {
        return addition;
      } else {
        if (
          R.has("isChecked")(changeObj.properties) &&
          changeObj.properties.isChecked
        ) {
          return removal;
        }
      }
    }
    return false;
  };

  const handleDescendants = (changeProps, payload, operations = []) => {
    R.addIndex(R.map)((category, i) => {
      const component = category.components[0];
      const anchor = R.join(".", [payload.anchor, category.anchor]);
      const fullAnchor = `${anchor}.${component.anchor}`;
      const fullPath = R.slice(0, -2, payload.fullPath).concat([
        "categories",
        i,
        "components",
        0
      ]);
      const changeObj = getChangeObjByAnchor(fullAnchor, props.changes);
      const operation = getOperation(
        component,
        changeObj,
        {
          anchor: fullAnchor,
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
          anchor,
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
    const anchor = R.join(".", R.init(payload.anchor.split(".")));
    const fullAnchor = `${anchor}.${component.anchor}`;
    const fullPath = R.concat(R.slice(0, -1, payload.rootPath), [
      "components",
      0
    ]);
    const changeObj = getChangeObjByAnchor(fullAnchor, props.changes);

    const operation = getOperation(
      component,
      changeObj,
      {
        anchor: fullAnchor,
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
          anchor,
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

  const runOperations = (payload, changeProps) => {
    const fullAnchor = `${payload.anchor}.${payload.component.anchor}`;
    const changeObj = getChangeObjByAnchor(fullAnchor, props.changes);
    let operations = [];
    if (R.isEmpty(changeObj.properties)) {
      operations.push({
        type: "addition",
        payload: {
          anchor: fullAnchor,
          path: payload.fullPath,
          properties: changeProps
        }
      });
    } else {
      operations.push({
        type: "modification",
        payload: {
          anchor: fullAnchor,
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
    const fullAnchor = `${payload.anchor}.${payload.component.anchor}`;
    const changeObj = getChangeObjByAnchor(fullAnchor, props.changes);

    let _operations = _.cloneDeep(operations);

    // Handle the current component
    const operation = getOperation(
      payload.component,
      changeObj,
      {
        anchor: fullAnchor,
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
                const fullAnchor = `${anchor}.${component.anchor}`;
                const fullPath = props.rootPath.concat([i, "components", ii]);
                const idSuffix = `${i}-${ii}`;
                const changeObj = getChangeObjByAnchor(
                  fullAnchor,
                  props.changes
                );
                const propsObj = getPropertiesObject(changeObj, component);
                const isAddition = !!changeObj.properties.isChecked;
                const isRemoved =
                  R.has("isChecked")(changeObj.properties) &&
                  !changeObj.properties.isChecked;
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
                      <div className="flex-2">
                        <CheckboxWithLabel
                          id={`checkbox-with-label-${idSuffix}`}
                          name={propsObj.name}
                          isChecked={propsObj.isChecked}
                          isDisabled={propsObj.isDisabled}
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
                      <div className="flex-2">
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
                          value={propsObj.value}
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
                          const previousSibling =
                            category.components[ii - 1] || {};
                          const isPreviousSiblingCheckedByDefault = !!(
                            previousSibling.properties || {}
                          ).isChecked;
                          const previousSiblingFullAnchor = `${anchor}.${
                            previousSibling.anchor
                          }`;
                          const change = getChangeObjByAnchor(
                            previousSiblingFullAnchor,
                            props.changes
                          );
                          const isDisabled =
                            (previousSibling.name === "CheckboxWithLabel" ||
                              previousSibling.name ===
                                "RadioButtonWithLabel") && 
                            !(isPreviousSiblingCheckedByDefault || change.properties.isChecked);

                          return (
                            <div className="px-2">
                              <Dropdown
                                id={`dropdown-${idSuffix}`}
                                onChanges={runOperations}
                                options={propsObj.options}
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
                          const change = getChangeObjByAnchor(
                            fullAnchor,
                            props.changes
                          );
                          const parentChange = getChangeObjByAnchor(
                            `${props.parent.anchor}.${
                              props.parent.category.components[0].anchor
                            }`,
                            props.changes
                          );
                          const isDisabled =
                            R.isEmpty(parentChange.properties) ||
                            !parentChange.properties.isChecked;
                          const value = change
                            ? change.properties.value
                            : propsObj.defaultValue;
                          return (
                            <div className="pt-4 pr-2 w-full">
                              <TextBox
                                id={`textbox-${idSuffix}`}
                                isDisabled={isDisabled}
                                isHidden={isDisabled}
                                onChanges={runOperations}
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
                    {component.name === "StatusTextRow" && (
                      <div className="flex-2">
                        <StatusTextRow labelStyles={labelStyles}>
                          <div className="flex">
                            <span className="leading-none">
                              {propsObj.code}
                            </span>
                            <p className="ml-4 leading-none">{title}</p>
                          </div>
                        </StatusTextRow>
                      </div>
                    )}
                    {component.name === "Autocomplete"
                      ? (category => {
                          const siblingName = (
                            category.components[ii - 1] || {}
                          ).name;
                          const isSiblingCheckedByDefault = (
                            (category.components[ii - 1] || {}).properties || {}
                          ).isChecked;
                          const change = props.getChangesByAnchor(
                            anchor,
                            props.rootPath.concat([i, "components", ii - 1])
                          );
                          const isDisabled =
                            siblingName === "CheckboxWithLabel" ||
                            siblingName === "RadioButtonWithLabel"
                              ? (isSiblingCheckedByDefault && !change) ||
                                (change && change.properties.isChecked)
                              : propsObj.isDisabled;
                          return (
                            <div className="flex-1 px-2">
                              <Autocomplete
                                callback={runOperations}
                                id={`autocomplete-${idSuffix}`}
                                options={propsObj.options}
                                payload={{
                                  anchor,
                                  categories: category.categories,
                                  component,
                                  fullPath,
                                  parent: props.parent,
                                  rootPath: props.rootPath,
                                  siblings: props.categories
                                }}
                                value={propsObj.value}
                                isDisabled={isDisabled}
                              />
                            </div>
                          );
                        })(category)
                      : null}
                    {component.name === "Difference" && (
                      <div className="flex-2">
                        <Difference
                          applyForValue={propsObj.applyForValue}
                          initialValue={propsObj.initialValue}
                          onChanges={runOperations}
                          payload={{
                            anchor,
                            categories: category.categories,
                            component,
                            fullPath,
                            parent: props.parent,
                            rootPath: props.rootPath,
                            siblings: props.categories
                          }}
                          titles={propsObj.titles}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            {category.categories && (
              <CategorizedList
                anchor={anchor}
                categories={category.categories}
                changes={props.changes}
                debug={props.debug}
                id={`${props.id}-${category.code}`}
                level={props.level + 1}
                parent={{
                  anchor,
                  category,
                  parent: props.parent,
                  rootPath: props.rootPath,
                  siblings: props.categories
                }}
                parentRootPath={props.rootPath}
                rootPath={props.rootPath.concat([i, "categories"])}
                runOperations={props.runOperations}
                showCategoryTitles={props.showCategoryTitles}
              />
            )}
          </div>
        );
      })}
    </div>
  );
});

CategorizedList.propTypes = {
  anchor: PropTypes.string,
  categories: PropTypes.array,
  changes: PropTypes.array,
  debug: PropTypes.bool,
  onChanges: PropTypes.func,
  parentCategory: PropTypes.object,
  path: PropTypes.array,
  showCategoryTitles: PropTypes.bool
};

export default CategorizedList;
