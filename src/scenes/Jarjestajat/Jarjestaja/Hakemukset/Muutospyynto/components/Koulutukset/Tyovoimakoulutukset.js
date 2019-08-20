import React, { useEffect, useState } from "react";
import { getDataForKoulutusList } from "../../../../../../../services/koulutukset/koulutusUtil";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

const Tyovoimakoulutukset = React.memo(props => {
  const sectionId = "tyovoimakoulutukset";
  const koodisto = "oivatyovoimakoulutus";
  const { onUpdate } = props;

  const [categories, setCategories] = useState([]);
  const [changes, setChanges] = useState([]);

  const getCategories = (koulutusData, kohde, maaraystyyppi) => {
    const categories = R.map(item => {
      return {
        anchor: item.code,
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
        ],
        meta: {
          kohde,
          maaraystyyppi,
          isInLupa: item.isInLupa,
          koodisto: item.koodisto,
          metadata: item.metadata
        }
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
            R.toUpper(props.intl.locale)
          ),
          props.kohde,
          props.maaraystyyppi
        )
      );
    }
  }, [
    props.kohde,
    props.koulutukset.muut,
    props.intl.locale,
    props.maaraystyyppi
  ]);

  const saveChanges = payload => {
    setChanges(payload.changes);
  };

  useEffect(() => {
    onUpdate({ sectionId, state: { categories, changes } });
  }, [categories, onUpdate, changes]);

  useEffect(() => {
    setChanges(
      R.map(muutos => {
        return muutos.meta.changeObj;
      }, props.changes)
    );
  }, [props.changes]);

  const removeChanges = () => {
    return onUpdate({ changes: [] });
  };

  return (
    <ExpandableRowRoot
      anchor={sectionId}
      key={`expandable-row-root`}
      categories={categories}
      changes={changes}
      onUpdate={saveChanges}
      onChangesRemove={removeChanges}
      title={props.intl.formatMessage(wizardMessages.workforceTraining)}
    />
  );
});

Tyovoimakoulutukset.defaultProps = {
  changes: []
};

Tyovoimakoulutukset.propTypes = {
  changes: PropTypes.array,
  koulutukset: PropTypes.object
};

export default injectIntl(Tyovoimakoulutukset);
