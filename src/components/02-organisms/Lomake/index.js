import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CategorizedListRoot from "../CategorizedListRoot";
import { getLomake } from "../../../services/lomakkeet";
import { forEach } from "ramda";
import { cloneDeep } from "lodash";
import { useIntl } from "react-intl";

function markRequiredFields(lomake, changeObjects = [], rules = []) {
  let modifiedLomake = cloneDeep(lomake);
  forEach(rule => {
    const isRequired = rule.isRequired(modifiedLomake, changeObjects);
    modifiedLomake = rule.markRequiredFields(modifiedLomake, isRequired);
    const isValid = rule.isValid(modifiedLomake, changeObjects, isRequired)();
    modifiedLomake = rule.showErrors(modifiedLomake, isValid);
  }, rules);
  return modifiedLomake;
}

const defaultProps = {
  changeObjects: []
};

const Lomake = React.memo(
  ({
    action,
    anchor,
    changeObjects = defaultProps.changeObjects,
    data,
    isReadOnly,
    onChangesUpdate,
    path,
    prefix = "",
    rules = [],
    showCategoryTitles = true
  }) => {
    const intl = useIntl();

    const categories = useMemo(() => {
      const lomake = getLomake(
        action,
        data,
        isReadOnly,
        intl.locale,
        path,
        prefix
      );
      return rules.length
        ? markRequiredFields(lomake, changeObjects, rules)
        : lomake;
    }, [
      action,
      changeObjects,
      data,
      intl.locale,
      isReadOnly,
      path,
      prefix,
      rules
    ]);

    if (categories.length && onChangesUpdate) {
      return (
        <div className="p-8">
          <CategorizedListRoot
            anchor={anchor}
            categories={categories}
            changes={changeObjects}
            onUpdate={onChangesUpdate}
            showCategoryTitles={showCategoryTitles}
          />
        </div>
      );
    } else {
      return <div>Nothing to show.</div>;
    }
  }
);

Lomake.propTypes = {
  anchor: PropTypes.string,
  changeObjects: PropTypes.array,
  data: PropTypes.object,
  onChangesUpdate: PropTypes.func,
  path: PropTypes.array,
  // Is used for matching the anchor of reasoning field to the anchor of
  // original change object.
  prefix: PropTypes.string,
  rules: PropTypes.array
};

export default Lomake;
