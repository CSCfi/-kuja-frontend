import React, { useEffect, useState } from "react";
import { getDataForKoulutusList } from "services/koulutukset/koulutusUtil";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

const Kuljettajakoulutukset = props => {
  const koodisto = "kuljettajakoulutus";

  const getCategories = koulutusData => {
    const categories = R.map(item => {
      return {
        components: [
          {
            name: "RadioButtonWithLabel",
            properties: {
              name: "RadioButtonWithLabel",
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
    if (R.includes(koodisto, props.koulutukset.muut.fetched)) {
      setCategories(
        getCategories(
          getDataForKoulutusList(
            props.koulutukset.muut.muudata[koodisto],
            props.changes,
            R.toUpper(props.intl.locale)
          )
        )
      );
    }
  }, [props.koulutukset.muut, props.changes, props.intl.locale]);

  const [categories, setCategories] = useState([]);
  const [changes] = useState([]);

  return (
    <ExpandableRowRoot
      key={`expandable-row-root`}
      categories={categories}
      changes={changes}
      title={props.intl.formatMessage(wizardMessages.driverTraining)}
    />
  );
};

Kuljettajakoulutukset.propTypes = {
  changes: PropTypes.array,
  koulutukset: PropTypes.object
};

export default injectIntl(Kuljettajakoulutukset);
