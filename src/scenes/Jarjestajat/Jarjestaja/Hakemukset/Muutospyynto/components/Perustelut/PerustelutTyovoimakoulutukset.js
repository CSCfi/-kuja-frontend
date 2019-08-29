import React, { useEffect, useState } from "react";
import { getDataForKoulutusList } from "../../../../../../../services/koulutukset/koulutusUtil";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { curriedGetAnchorPartsByIndex } from "../../../../../../../utils/common";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

const PerustelutTyovoimakoulutukset = React.memo(props => {
  const sectionId = "tyovoimakoulutukset";
  const koodisto = "oivatyovoimakoulutus";
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
    props.maaraystyyppi,
    changes
  ]);

  const saveChanges = payload => {
    setChanges(payload.changes);
  };

  useEffect(() => {
    onUpdate({ sectionId, categories, changes });
  }, [categories, onUpdate, changes]);

  useEffect(() => {
    setChanges(props.changes);
  }, [props.changes]);

  const removeChanges = () => {
    return saveChanges({ changes: [] });
  };

  return (
    <ExpandableRowRoot
      anchor={sectionId}
      key={`expandable-row-root`}
      categories={categories}
      changes={changes}
      disableReverting={true}
      hideAmountOfChanges={false}
      isExpanded={true}
      onUpdate={saveChanges}
      onChangesRemove={removeChanges}
      title={props.intl.formatMessage(wizardMessages.workforceTraining)}
    />
  );
});

PerustelutTyovoimakoulutukset.propTypes = {
  changes: PropTypes.array,
  koulutukset: PropTypes.object
};

export default injectIntl(PerustelutTyovoimakoulutukset);
