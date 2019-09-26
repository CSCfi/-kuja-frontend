import React, { useCallback } from "react";
import PropTypes from "prop-types";
import CheckboxWithLabel from "../../../01-molecules/CheckboxWithLabel";
import SimpleButton from "../../../00-atoms/SimpleButton";
import Dropdown from "../../../00-atoms/Dropdown";
import RadioButtonWithLabel from "../../../01-molecules/RadioButtonWithLabel";
import Input from "../../../00-atoms/Input";
import StatusTextRow from "../../../01-molecules/StatusTextRow";
import Difference from "../../../02-organisms/Difference";
import Datepicker from "../../../00-atoms/Datepicker";
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

const CategorizedList = React.memo(props => {
  const { onChangesUpdate, runRootOperations } = props;

  const handleAttachmentChanges = (payload, changeProps) => {
    const fullAnchor = `${payload.anchor}.${payload.component.anchor}`;
    const operations = [
      {
        type: "addition",
        payload: {
          anchor: fullAnchor,
          path: payload.fullPath,
          properties: {
            attachments: changeProps.attachments
          }
        }
      }
    ];
    const result = runRootOperations(operations);
    return onChangesUpdate(result);
  };

  const handleButtonClick = (payload, changeProps) => {
    payload.component.onClick(payload, changeProps);
  };

  const handleChanges = useCallback(
    (payload, changeProps) => {
      return onChangesUpdate({
        anchor: `${R.compose(
          R.join("."),
          R.tail(),
          R.split(".")
        )(payload.anchor)}.${payload.component.anchor}`,
        properties: changeProps
      });
    },
    [onChangesUpdate]
  );

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
                                onChanges={handleChanges}
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
                        onChanges={handleChanges}
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
                            <div className={component.styleClasses}>
                              <Input
                                id={`input-${idSuffix}`}
                                isDisabled={isDisabled}
                                isHidden={isDisabled}
                                label={propsObj.label}
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
                            <div className={component.styleClasses}>
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
                                callback={handleChanges}
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
});

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
