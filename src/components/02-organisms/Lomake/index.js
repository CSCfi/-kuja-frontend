import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import CategorizedListRoot from "../CategorizedListRoot";
import { getLomake } from "../../../services/lomakkeet";

const Lomake = React.memo(
  ({
    action,
    anchor,
    changeObjects = [],
    data,
    isReadOnly,
    locale,
    onChangesUpdate,
    path,
    showCategoryTitles = true
  }) => {
    const categories = useMemo(() => {
      return getLomake(action, data, isReadOnly, locale, path);
    }, [action, data, isReadOnly, locale, path]);

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
      return <div>Nothing so show.</div>;
    }
  }
);

Lomake.propTypes = {
  anchor: PropTypes.string,
  changeObjects: PropTypes.array,
  data: PropTypes.object,
  onChangesUpdate: PropTypes.func,
  path: PropTypes.array
};

export default injectIntl(Lomake);
