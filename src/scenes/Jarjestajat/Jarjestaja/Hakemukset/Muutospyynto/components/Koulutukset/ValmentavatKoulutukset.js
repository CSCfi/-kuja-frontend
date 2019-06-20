import React, { useEffect, useState } from "react";
import { getDataForKoulutusList } from "../../../../../../../services/koulutukset/koulutusUtil";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

const ValmentavatKoulutukset = React.memo(props => {
  const sectionId = "valmentavatkoulutukset";
  const getCategories = koulutusData => {
    const categories = R.map(item => {
      return {
        components: [
          {
            name: "CheckboxWithLabel",
            properties: {
              name: "CheckboxWithLabel",
              code: item.code,
              title: item.title,
              isChecked: item.shouldBeChecked,
              labelStyles: {
                addition: isAdded,
                removal: isRemoved,
                custom: Object({}, item.isInLupa ? isInLupa : {})
              }
            }
          }
        ]
      };
    }, koulutusData.items);
    return categories;
  };

  useEffect(() => {
    if (props.koulutukset.poikkeukset.fetched.length === 2) {
      setCategories(
        getCategories(
          getDataForKoulutusList(
            props.koulutukset.poikkeukset.data,
            props.changes,
            R.toUpper(props.intl.locale)
          )
        )
      );
    }
  }, [props.koulutukset.poikkeukset, props.changes, props.intl]);

  const [categories, setCategories] = useState([]);
  const [changes] = useState([]);

  return (
    <ExpandableRowRoot
      key={`expandable-row-root`}
      categories={categories}
      changes={changes}
      title={props.intl.formatMessage(wizardMessages.preparatoryTraining)}
      index={0}
      onUpdate={props.onUpdate}
      sectionId={sectionId}
    />
  );
});

ValmentavatKoulutukset.propTypes = {
  koulutukset: PropTypes.object,
  changes: PropTypes.array
};

export default injectIntl(ValmentavatKoulutukset);
