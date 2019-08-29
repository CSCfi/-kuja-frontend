import React, { useEffect, useState } from "react";
import { getDataForKoulutusList } from "../../../../../../../services/koulutukset/koulutusUtil";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { curriedGetAnchorPartsByIndex } from "../../../../../../../utils/common";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

const PerustelutValmentavatKoulutukset = React.memo(props => {
  const sectionId = "valmentavatkoulutukset";
  const { onUpdate } = props;
  const [categories, setCategories] = useState([]);
  const [changes, setChanges] = useState([]);

  useEffect(() => {
    const getAnchorPartsByIndex = curriedGetAnchorPartsByIndex(changes);
    const getCategories = (koulutusData, kohde, maaraystyyppi) => {
      const categories = R.map(item => {
        let structure = null;
        if (R.includes(item.code, getAnchorPartsByIndex(1))) {
          structure = {
            anchor: item.code,
            components: [
              {
                anchor: "A",
                name: "StatusTextRow",
                properties: {
                  name: "StatusTextRow",
                  code: item.code,
                  title: item.title,
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
            },
            categories: [
              {
                anchor: "vapaa-tekstikentta",
                title: "Perustele lyhyesti miksi tälle muutokselle on tarvetta",
                components: [
                  {
                    anchor: "A",
                    name: "TextBox",
                    properties: {
                      defaultValue: "Text 2"
                    }
                  }
                ]
              }
            ]
          };
        }
        return structure;
      }, koulutusData.items);
      return categories.filter(Boolean);
    };

    if (props.koulutukset.poikkeukset.fetched.length === 2 && changes.length) {
      setCategories(
        getCategories(
          getDataForKoulutusList(
            props.koulutukset.poikkeukset.data,
            R.toUpper(props.intl.locale)
          ),
          props.kohde,
          props.maaraystyyppi
        )
      );
    }
  }, [
    props.kohde,
    props.koulutukset.poikkeukset,
    props.intl,
    props.maaraystyyppi,
    changes
  ]);

  const saveChanges = payload => {
    setChanges(payload.changes || []);
  };

  useEffect(() => {
    setChanges(props.changes);
  }, [props.changes]);

  useEffect(() => {
    onUpdate({ sectionId, categories, changes });
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
      title={props.intl.formatMessage(wizardMessages.preparatoryTraining)}
      index={0}
      isExpanded={true}
      onChangesRemove={removeChanges}
      onUpdate={saveChanges}
      sectionId={sectionId}
    />
  );
});

PerustelutValmentavatKoulutukset.propTypes = {
  changes: PropTypes.array,
  kohde: PropTypes.object,
  koulutukset: PropTypes.object,
  maaraystyyppi: PropTypes.object
};

export default injectIntl(PerustelutValmentavatKoulutukset);
