import React, { useCallback, useEffect, useState } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { getDataForOpetuskieletList } from "../../../../../../../services/kielet/opetuskieletUtil";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

const Opetuskielet = props => {
  const sectionId = "opetuskielet";
  const [categories, setCategories] = useState([]);
  const [changes, setChanges] = useState([]);
  const getCategories = useCallback(({ items }) => {
    return R.map(item => {
      return {
        components: [
          {
            name: "CheckboxWithLabel",
            properties: {
              name: "CheckboxWithLabel",
              isChecked: item.shouldBeSelected,
              title: item.title,
              labelStyles: {
                addition: isAdded,
                removal: isRemoved,
                custom: Object.assign({}, item.isInLupa ? isInLupa : {})
              }
            }
          }
        ]
      };
    }, items);
  }, []);

  useEffect(() => {
    setCategories(
      getCategories(
        getDataForOpetuskieletList(
          props.kielet.opetuskielet,
          props.kohde,
          props.changes,
          props.intl.locale
        )
      )
    );
  }, [
    props.kielet.opetuskielet,
    props.changes,
    props.kohde,
    getCategories,
    props.intl.locale
  ]);

  const onUpdate = payload => {
    setChanges(payload.changes);
  };

  const removeChanges = () => {
    return onUpdate({ changes: [] });
  };

  return (
    <ExpandableRowRoot
      key={`expandable-row-root`}
      categories={categories}
      changes={changes}
      index={0}
      onChangesRemove={removeChanges}
      onUpdate={onUpdate}
      sectionId={sectionId}
      title={props.intl.formatMessage(wizardMessages.teachingLanguages)}
      isExpanded={true}
    />
  );
};

Opetuskielet.defaultProps = {
  changes: []
};

Opetuskielet.propTypes = {
  changes: PropTypes.array,
  kielet: PropTypes.object,
  onUpdate: PropTypes.func,
  kohde: PropTypes.object
};

export default injectIntl(Opetuskielet);
