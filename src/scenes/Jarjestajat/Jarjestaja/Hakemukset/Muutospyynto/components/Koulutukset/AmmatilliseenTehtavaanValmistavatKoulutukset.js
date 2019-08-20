import React, { useEffect, useState } from "react";
import { getDataForKoulutusList } from "../../../../../../../services/koulutukset/koulutusUtil";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

const AmmatilliseenTehtavaanValmistavatKoulutukset = props => {
  const sectionId = "ammatilliseentehtavaanvalmistavatkoulutukset";
  const { onUpdate } = props;
  const [categories, setCategories] = useState([]);
  const [changes, setChanges] = useState([]);

  const getCategories = (koulutusData, kohde, maaraystyyppi) => {
    const categories = R.map(item => {
      return {
        anchor: item.code,
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
    if (
      R.includes(
        "ammatilliseentehtavaanvalmistavakoulutus",
        props.koulutukset.muut.fetched
      )
    ) {
      setCategories(
        getCategories(
          getDataForKoulutusList(
            props.koulutukset.muut.muudata
              .ammatilliseentehtavaanvalmistavakoulutus,
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
    setChanges(
      R.map(muutos => {
        return muutos.meta.changeObj;
      }, props.changes)
    );
  }, [props.changes]);

  useEffect(() => {
    onUpdate({ sectionId, state: { categories, changes } });
  }, [categories, onUpdate, changes]);

  const removeChanges = () => {
    return saveChanges({ changes: [] });
  };

  return (
    <ExpandableRowRoot
      anchor={sectionId}
      key={`expandable-row-root`}
      categories={categories}
      changes={changes}
      onChangesRemove={removeChanges}
      onUpdate={saveChanges}
      title={props.intl.formatMessage(wizardMessages.vocationalTraining)}
    />
  );
};

AmmatilliseenTehtavaanValmistavatKoulutukset.defaultProps = {
  changes: []
};

AmmatilliseenTehtavaanValmistavatKoulutukset.propTypes = {
  changes: PropTypes.array,
  kohde: PropTypes.object,
  koulutukset: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  onUpdate: PropTypes.func.isRequired
};

export default injectIntl(AmmatilliseenTehtavaanValmistavatKoulutukset);
