import React, { useCallback } from "react";
import PropTypes from "prop-types";
import CheckboxWithLabel from "../../../01-molecules/CheckboxWithLabel";
import SimpleButton from "../../../00-atoms/SimpleButton";
import Dropdown from "../../../00-atoms/Dropdown";
import RadioButtonWithLabel from "../../../01-molecules/RadioButtonWithLabel";
import Input from "../../../00-atoms/Input";
import StatusTextRow from "../../../01-molecules/StatusTextRow";
import Difference from "../../../02-organisms/Difference";
import Autocomplete from "../../Autocomplete";
import Attachments from "../../Attachments";
import { heights } from "../../../../css/autocomplete";
import * as R from "ramda";
import _ from "lodash";
import CategorizedListTextBox from "./components/CategorizedListTextBox";

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

const CategorizedList = React.memo(
  props => {
    const { getAllChanges, onChangesUpdate, runRootOperations } = props;

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

    const handleDescendants = useCallback(
      (changeProps, payload, operations = []) => {
        const allChanges = getAllChanges();
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
          const changeObj = getChangeObjByAnchor(fullAnchor, allChanges);
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
      },
      [getAllChanges]
    );

    const handleAttachmentChanges = (payload, changeProps) => {
      console.log(changeProps);
      const operations = R.map(attachment => {
        return {
          type: "addition",
          payload: {
            anchor: payload.anchor,
            properties: attachment
          }
        };
      }, changeProps.attachments);
      console.log(operations);
      const result = runRootOperations(operations);
      return onChangesUpdate(result);
    };

    /**
     * Main handler
     * Returns array of changes
     */
    const handleTree = useCallback(
      (payload, changeProps, operations = []) => {
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
                const fullPath = R.concat(payload.rootPath, [
                  i,
                  "components",
                  0
                ]);
                if (!R.equals(fullPath, payload.fullPath)) {
                  // All the radio button siblings must be unchecked
                  const nextPayload = {
                    anchor: `${R.join(
                      ".",
                      R.init(payload.anchor.split("."))
                    )}.${category.anchor}`,
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
      },
      [handleDescendants, handlePredecessors, props.changes]
    );

    const handlePredecessors = useCallback(
      (changeProps, payload, operations = []) => {
        const allChanges = getAllChanges();
        const component = payload.parent
          ? payload.parent.category.components[0]
          : payload.component;
        const anchor = R.join(".", R.init(payload.anchor.split(".")));
        const fullAnchor = `${anchor}.${component.anchor}`;
        const fullPath = R.concat(R.slice(0, -1, payload.rootPath), [
          "components",
          0
        ]);
        const changeObj = getChangeObjByAnchor(fullAnchor, allChanges);

        if (
          component.name === "CheckboxWithLabel" ||
          component.name === "RadioButtonWithLabel"
        ) {
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
                operations = handleTree(
                  nextPayload,
                  nextChangeProps,
                  operations
                );
              }
            }
          }, payload.parent.siblings);
        }

        if (
          payload.parent.parent &&
          payload.parent.parent.category.components
        ) {
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
      },
      [handleTree, getAllChanges]
    );

    const handleButtonClick = (payload, changeProps) => {
      payload.component.onClick(payload, changeProps);
    };

    const handleChanges = useCallback(
      (payload, changeProps) => {
        const operations = handleTree(payload, changeProps);
        const result = runRootOperations(operations);
        return onChangesUpdate(result);
      },
      [handleTree, onChangesUpdate, runRootOperations]
    );

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
            properties: changeProps,
            attachments: payload.attachments
          }
        });
      } else {
        operations.push({
          type: "modification",
          payload: {
            anchor: fullAnchor,
            path: payload.fullPath,
            properties: changeProps,
            attachments: payload.attachments
          }
        });
      }
      const result = runRootOperations(operations);
      return onChangesUpdate(result);
    };

    return (
      <div>
        {_.map(props.categories, (category, i) => {
          const isCategoryTitleVisible =
            props.showCategoryTitles && (category.code || category.title);
          const anchor = `${props.anchor}.${category.anchor}`;
          const splittedAnchor = R.split(".", anchor);
          const categoryChanges = R.filter(
            R.compose(
              R.equals(splittedAnchor),
              R.slice(0, splittedAnchor.length),
              R.split("."),
              R.prop("anchor")
            ),
            props.changes
          );
          const categoryStyles = [
            "flex",
            "sm:items-center",
            "justify-between",
            "flex-wrap",
            "flex-col",
            "sm:flex-row"
          ].join(" ");
          const defaultIntendationClasses = !R.equals(props.rootPath, [])
            ? ["pl-10"]
            : i !== 0 && isCategoryTitleVisible
            ? ["pt-10"]
            : [];
          const styleClasses = R.join(
            " ",
            R.concat(category.styleClasses || defaultIntendationClasses, [
              "select-none"
            ])
          );
          return (
            <div key={i} className={styleClasses}>
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
              <div className={categoryStyles}>
                {_.map(category.components, (component, ii) => {
                  // console.info("Rendering...", component);
                  const fullAnchor = `${anchor}.${component.anchor}`;
                  const fullPath = props.rootPath.concat([i, "components", ii]);
                  const idSuffix = `${i}-${ii}`;
                  const changeObj = getChangeObjByAnchor(
                    fullAnchor,
                    props.changes
                  );
                  const parentComponent =
                    props.parent && props.parent.category.components
                      ? props.parent.category.components[0]
                      : null;
                  const parentChangeObj = parentComponent
                    ? getChangeObjByAnchor(
                        `${props.parent.anchor}.${parentComponent.anchor}`,
                        props.changes
                      )
                    : {};
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
                  const styleClasses = component.styleClasses || [];
                  const title =
                    propsObj.title +
                    (props.debug
                      ? props.rootPath.concat([i, "components", ii])
                      : "");
                  // console.info(fullAnchor, component);
                  return (
                    <React.Fragment key={`item-${ii}`}>
                      {component.name === "CheckboxWithLabel" && (
                        <div className="flex-2">
                          <CheckboxWithLabel
                            id={`checkbox-with-label-${idSuffix}`}
                            name={component.name}
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
                            const previousSiblingFullAnchor = `${anchor}.${previousSibling.anchor}`;
                            const change = getChangeObjByAnchor(
                              previousSiblingFullAnchor,
                              props.changes
                            );
                            const isDisabled =
                              (previousSibling.name === "CheckboxWithLabel" ||
                                previousSibling.name ===
                                  "RadioButtonWithLabel") &&
                              !(
                                isPreviousSiblingCheckedByDefault ||
                                change.properties.isChecked
                              );
                            return (
                              <div className="px-2 mb-1">
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
                      {component.name === "TextBox" && (
                        <CategorizedListTextBox
                          changeObj={changeObj}
                          parentComponent={parentComponent}
                          payload={{
                            anchor,
                            categories: category.categories,
                            component,
                            fullPath,
                            parent: props.parent,
                            rootPath: props.rootPath,
                            siblings: props.categories
                          }}
                          _props={props}
                          onChanges={runOperations}
                          idSuffix
                          propsObj={propsObj}
                          parentChangeObj={parentChangeObj}
                        ></CategorizedListTextBox>
                      )}
                      {component.name === "Input"
                        ? (category => {
                            const change = getChangeObjByAnchor(
                              fullAnchor,
                              props.changes
                            );
                            let parentComponent = null;
                            let isDisabled = false;
                            if (
                              props.parent &&
                              props.parent.category.components
                            ) {
                              parentComponent =
                                props.parent.category.components[0];
                              const parentChange = getChangeObjByAnchor(
                                `${props.parent.anchor}.${parentComponent.anchor}`,
                                props.changes
                              );
                              isDisabled =
                                R.includes(parentComponent.name, [
                                  "CheckboxWithLabel",
                                  "RadioButtonWithLabel"
                                ]) &&
                                ((!parentComponent.properties.isChecked &&
                                  R.isEmpty(parentChange.properties)) ||
                                  !parentChange.properties.isChecked);
                            }
                            const value = change
                              ? change.properties.value
                              : propsObj.defaultValue;
                            return (
                              <div
                                className={`${component.styleClasses} flex row content-center pt-2 pr-2 my-2 sm:my-0 sm:mb-1`}
                              >
                                {propsObj.label && (
                                  <label className="my-auto mr-2 font-sans">
                                    {propsObj.label}
                                  </label>
                                )}
                                <Input
                                  id={`input-${idSuffix}`}
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
                                  placeholder={propsObj.placeholder}
                                  width={propsObj.width}
                                  error={propsObj.error}
                                  fullWidth={propsObj.fullWidth}
                                  value={value}
                                  type={propsObj.type}
                                />
                              </div>
                            );
                          })(category)
                        : null}
                      {component.name === "Attachments"
                        ? (category => {
                            const previousSibling =
                              category.components[ii - 1] || {};
                            const isPreviousSiblingCheckedByDefault = !!(
                              previousSibling.properties || {}
                            ).isChecked;
                            const previousSiblingFullAnchor = `${anchor}.${previousSibling.anchor}`;
                            const change = getChangeObjByAnchor(
                              previousSiblingFullAnchor,
                              props.changes
                            );
                            const isDisabled =
                              (previousSibling.name === "CheckboxWithLabel" ||
                                previousSibling.name ===
                                  "RadioButtonWithLabel") &&
                              !(
                                isPreviousSiblingCheckedByDefault ||
                                change.properties.isChecked
                              );
                            let attachments = propsObj.attachments || [];
                            return (
                              <div className="flex-2">
                                <Attachments
                                  id={`attachments-${idSuffix}`}
                                  onUpdate={handleAttachmentChanges}
                                  placement={props.placement}
                                  payload={{
                                    anchor,
                                    categories: category.categories,
                                    component,
                                    fullPath,
                                    parent: props.parent,
                                    rootPath: props.rootPath,
                                    siblings: props.categories,
                                    attachments: attachments
                                  }}
                                  isDisabled={isDisabled}
                                />
                              </div>
                            );
                          })(category)
                        : null}
                      {component.name === "StatusTextRow"
                        ? (category => {
                            const codeMarkup = propsObj.code ? (
                              <span className="pr-4">{propsObj.code}</span>
                            ) : null;
                            return (
                              <div className="flex-2">
                                <StatusTextRow
                                  labelStyles={labelStyles}
                                  styleClasses={styleClasses}
                                  statusText={propsObj.statusText}
                                  statusTextStyleClasses={
                                    propsObj.statusTextStyleClasses
                                  }
                                >
                                  <div className="flex">
                                    <div className="flex-1">
                                      {codeMarkup}
                                      <span>{title}</span>
                                    </div>
                                  </div>
                                </StatusTextRow>
                              </div>
                            );
                          })(category)
                        : null}
                      {component.name === "Autocomplete"
                        ? (category => {
                            const previousSibling =
                              category.components[ii - 1] || {};
                            const isPreviousSiblingCheckedByDefault = !!(
                              previousSibling.properties || {}
                            ).isChecked;
                            const previousSiblingFullAnchor = `${anchor}.${previousSibling.anchor}`;
                            const change = getChangeObjByAnchor(
                              previousSiblingFullAnchor,
                              props.changes
                            );
                            const isDisabled =
                              (previousSibling.name === "CheckboxWithLabel" ||
                                previousSibling.name ===
                                  "RadioButtonWithLabel") &&
                              !(
                                isPreviousSiblingCheckedByDefault ||
                                change.properties.isChecked
                              );
                            return (
                              <div className="flex-1 px-2 my-2 sm:my-0 sm:mb-1">
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
                                  height={heights.SHORT}
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
                      {component.name === "SimpleButton" && (
                        <div className={`${component.styleClasses} flex-2`}>
                          <SimpleButton
                            text={propsObj.text}
                            variant={propsObj.variant}
                            onClick={handleButtonClick}
                            payload={{
                              anchor,
                              categories: category.categories,
                              component,
                              fullPath,
                              parent: props.parent,
                              rootPath: props.rootPath,
                              siblings: props.categories
                            }}
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
                  changes={categoryChanges}
                  debug={props.debug}
                  getAllChanges={props.getAllChanges}
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
                  runRootOperations={props.runRootOperations}
                  showCategoryTitles={props.showCategoryTitles}
                  onChangesUpdate={props.onChangesUpdate}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
  // (prevState, currentState) => {
  //   const splittedAnchor = R.split(".", currentState.anchor);
  //   // console.info(splittedAnchor);
  //   // console.info(prevState, currentState)
  //   const prevCategoryChanges = R.filter(
  //     R.compose(
  //       R.equals(splittedAnchor),
  //       R.slice(0, splittedAnchor.length),
  //       R.split("."),
  //       R.prop("anchor")
  //     ),
  //     prevState.changes
  //   );
  //   const categoryChanges = R.filter(
  //     R.compose(
  //       R.equals(splittedAnchor),
  //       R.slice(0, splittedAnchor.length),
  //       R.split("."),
  //       R.prop("anchor")
  //     ),
  //     currentState.changes
  //   );
  //   console.group();
  //   console.info("prevState: ", prevState);
  //   console.info("Anchor: ", currentState.anchor);
  //   console.info("Prev changes:", prevCategoryChanges);
  //   console.info("Current changes:", categoryChanges);
  //   console.info("Equals: ", R.equals(prevCategoryChanges, categoryChanges));
  //   console.groupEnd();
  //   return (
  //     R.equals(prevCategoryChanges, categoryChanges) &&
  //     prevState.categories.length
  //   );
  // }
);

CategorizedList.propTypes = {
  anchor: PropTypes.string,
  categories: PropTypes.array,
  changes: PropTypes.array,
  debug: PropTypes.bool,
  onChanges: PropTypes.func,
  parentCategory: PropTypes.object,
  path: PropTypes.array,
  runRootOperations: PropTypes.func,
  showCategoryTitles: PropTypes.bool,
  onChangesUpdate: PropTypes.func
};

export default CategorizedList;
