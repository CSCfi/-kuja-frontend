import React, { useEffect, useMemo } from "react";
import { getDataForKoulutusList } from "../../../../../../../services/koulutukset/koulutusUtil";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { curriedGetAnchorPartsByIndex } from "../../../../../../../utils/common";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

const PerustelutTyovoimakoulutukset = React.memo(props => {
  const sectionId = "perustelut_koulutukset_tyovoimakoulutukset";
  const koodisto = "oivatyovoimakoulutus";
  const { onChangesRemove, onChangesUpdate, onStateUpdate } = props;

  const getCategories = useMemo(() => {
    const getAnchorPartsByIndex = curriedGetAnchorPartsByIndex(
      R.path(["koulutukset", "tyovoimakoulutukset"])(props.changeObjects)
    );

    return (koulutusData, kohde, maaraystyyppi) => {
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
  }, [props.changeObjects]);

  useEffect(() => {
    onStateUpdate(
      {
        categories: getCategories(
          getDataForKoulutusList(
            props.koulutukset.muut.muudata[koodisto],
            R.toUpper(props.intl.locale)
          ),
          props.kohde,
          props.maaraystyyppi
        )
      },
      sectionId
    );
  }, [
    getCategories,
    onStateUpdate,
    props.kohde,
    props.koulutukset.muut,
    props.intl.locale,
    props.maaraystyyppi
  ]);

  return (
    <React.Fragment>
      {props.stateObject.categories ? (
        <ExpandableRowRoot
          anchor={sectionId}
          key={`expandable-row-root`}
          categories={props.stateObject.categories}
          changes={
            props.changeObjects.perustelut.koulutukset.tyovoimakoulutukset
          }
          disableReverting={true}
          hideAmountOfChanges={false}
          isExpanded={true}
          onUpdate={onChangesUpdate}
          onChangesRemove={onChangesRemove}
          title={props.intl.formatMessage(wizardMessages.workforceTraining)}
        />
      ) : null}
    </React.Fragment>
  );
});

PerustelutTyovoimakoulutukset.defaultProps = {
  changeObjects: {},
  stateObject: {}
};

PerustelutTyovoimakoulutukset.propTypes = {
  changeObjects: PropTypes.object,
  koulutukset: PropTypes.object,
  stateObject: PropTypes.object
};

export default injectIntl(PerustelutTyovoimakoulutukset);
