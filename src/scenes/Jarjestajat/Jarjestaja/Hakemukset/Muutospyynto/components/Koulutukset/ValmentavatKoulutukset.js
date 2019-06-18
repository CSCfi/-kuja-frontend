import React, { useContext, useEffect, useState } from "react";
import { fetchKoulutus } from "services/koulutukset/actions";
import { KoulutuksetContext } from "context/koulutuksetContext";
import { getDataForKoulutusList } from "../../../../../../../services/koulutukset/koulutusUtil";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

const ValmentavatKoulutukset = props => {
  const { state: koulutukset, dispatch: koulutuksetDispatch } = useContext(
    KoulutuksetContext
  );

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
    if (koulutukset.poikkeukset.fetched.length === 2) {
      setCategories(
        getCategories(
          getDataForKoulutusList(
            koulutukset.poikkeukset.data,
            props.changes,
            R.toUpper(props.intl.locale)
          )
        )
      );
    }
  }, [koulutukset.poikkeukset, props.changes, props.intl]);

  useEffect(() => {
    fetchKoulutus("999901")(koulutuksetDispatch);
    fetchKoulutus("999903")(koulutuksetDispatch);
  }, [koulutuksetDispatch]);

  const [categories, setCategories] = useState([]);
  const [changes] = useState([]);

  return (
    <ExpandableRowRoot
      key={`expandable-row-root`}
      categories={categories}
      changes={changes}
      title={props.intl.formatMessage(wizardMessages.preparatoryTraining)}
    />
  );
};

ValmentavatKoulutukset.propTypes = {
  changes: PropTypes.array,
  onChanges: PropTypes.func
};

export default injectIntl(ValmentavatKoulutukset);
