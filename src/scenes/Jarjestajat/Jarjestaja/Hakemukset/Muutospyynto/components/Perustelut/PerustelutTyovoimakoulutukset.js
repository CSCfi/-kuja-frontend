import React, { useEffect, useMemo } from "react";
import { getDataForKoulutusList } from "../../../../../../../utils/koulutusUtil";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import {
  curriedGetAnchorPartsByIndex,
  getAnchorPart
} from "../../../../../../../utils/common";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";
import Lomake from "../../../../../../../components/02-organisms/Lomake";
import { rules } from "../../../../../../../services/lomakkeet/perustelut/koulutukset/tyovoimakoulutukset/rules";

const PerustelutTyovoimakoulutukset = React.memo(props => {
  const intl = useIntl();
  const sectionId = "perustelut_koulutukset_tyovoimakoulutukset";
  const koodisto = "oivatyovoimakoulutus";
  const { onChangesRemove, onChangesUpdate } = props;

  const getCategories = useMemo(() => {
    const getAnchorPartsByIndex = curriedGetAnchorPartsByIndex(
      props.changeObjects.koulutukset.tyovoimakoulutukset
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
                anchor: "perustelut",
                title: "Perustele lyhyesti miksi tälle muutokselle on tarvetta",
                components: [
                  {
                    anchor: "A",
                    name: "TextBox",
                    properties: {
                      isReadOnly: props.isReadOnly,
                      placeholder: "Perustelut..."
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
  }, [props.isReadOnly, props.changeObjects.koulutukset.tyovoimakoulutukset]);

  const lomakkeet = useMemo(() => {
    return (
      <React.Fragment>
        {R.map(changeObj => {
          const code = getAnchorPart(changeObj.anchor, 1);
          const isReasoningRequired = R.path(
            ["properties", "metadata", "isReasoningRequired"],
            changeObj
          );

          let lomake = null;
          if (isReasoningRequired) {
            lomake = changeObj.properties.isChecked ? (
              <Lomake
                anchor={"perustelut_koulutukset_tyovoimakoulutukset"}
                changeObjects={
                  props.changeObjects.perustelut.koulutukset.tyovoimakoulutukset
                }
                data={{
                  code,
                  elykeskukset: props.elykeskukset
                }}
                key={code}
                isReadOnly={props.isReadOnly}
                onChangesUpdate={onChangesUpdate}
                path={["perustelut", "koulutukset", "tyovoimakoulutukset"]}
                rules={rules}></Lomake>
            ) : (
              <Lomake
                action="removal"
                anchor={`perustelut_koulutukset_tyovoimakoulutukset`}
                prefix={code}
                changeObjects={
                  props.changeObjects.perustelut.koulutukset.tyovoimakoulutukset
                }
                isReadOnly={props.isReadOnly}
                key={code}
                onChangesUpdate={onChangesUpdate}
                path={[
                  "perustelut",
                  "koulutukset",
                  "tyovoimakoulutukset"
                ]}></Lomake>
            );
          }
          return lomake;
        }, props.changeObjects.koulutukset.tyovoimakoulutukset || []).filter(
          Boolean
        )}
      </React.Fragment>
    );
  }, [
    onChangesUpdate,
    props.elykeskukset,
    props.isReadOnly,
    props.changeObjects.koulutukset.tyovoimakoulutukset,
    props.changeObjects.perustelut.koulutukset.tyovoimakoulutukset
  ]);

  return (
    <React.Fragment>
      {lomakkeet && (
        <ExpandableRowRoot
          anchor={sectionId}
          key={`expandable-row-root`}
          changes={
            props.changeObjects.perustelut.koulutukset.tyovoimakoulutukset
          }
          disableReverting={props.isReadOnly}
          hideAmountOfChanges={true}
          isExpanded={true}
          onChangesRemove={onChangesRemove}
          title={intl.formatMessage(wizardMessages.workforceTraining)}>
          {lomakkeet}
        </ExpandableRowRoot>
      )}
    </React.Fragment>
  );
});

PerustelutTyovoimakoulutukset.defaultProps = {
  changeObjects: {},
  isReadOnly: false
};

PerustelutTyovoimakoulutukset.propTypes = {
  changeObjects: PropTypes.object,
  code: PropTypes.string,
  elykeskukset: PropTypes.array,
  isReadOnly: PropTypes.bool,
  koulutukset: PropTypes.object
};

export default PerustelutTyovoimakoulutukset;
