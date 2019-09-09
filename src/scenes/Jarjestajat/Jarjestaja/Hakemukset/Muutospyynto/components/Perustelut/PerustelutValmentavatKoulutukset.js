import React, { useEffect, useMemo } from "react";
import { getDataForKoulutusList } from "../../../../../../../services/koulutukset/koulutusUtil";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { curriedGetAnchorPartsByIndex } from "../../../../../../../utils/common";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

const PerustelutValmentavatKoulutukset = React.memo(
  props => {
    const sectionId = "perustelut_koulutukset_valmentavatKoulutukset";
    const { onChangesRemove, onChangesUpdate, onStateUpdate } = props;

    const getCategories = useMemo(() => {
      const getAnchorPartsByIndex = curriedGetAnchorPartsByIndex(
        R.path(["koulutukset", "valmentavatKoulutukset"])(props.changeObjects)
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
                  title:
                    "Perustele lyhyesti miksi tälle muutokselle on tarvetta",
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
    }, [props.changeObjects])

    useEffect(() => {
      onStateUpdate(
        {
          categories: getCategories(
            getDataForKoulutusList(
              props.koulutukset.poikkeukset.data,
              R.toUpper(props.intl.locale)
            ),
            props.kohde,
            props.maaraystyyppi
          )
        },
        sectionId
      );
    }, [
      props.kohde,
      props.koulutukset.poikkeukset.data,
      props.intl,
      props.maaraystyyppi
    ]);

    return (
      <React.Fragment>
        {props.stateObject.categories ? (
          <ExpandableRowRoot
            anchor={sectionId}
            key={`expandable-row-root`}
            categories={props.stateObject.categories}
            changes={props.changeObjects.perustelut.koulutukset.valmentavatKoulutukset}
            disableReverting={false}
            hideAmountOfChanges={false}
            index={0}
            isExpanded={true}
            onChangesRemove={onChangesRemove}
            onUpdate={onChangesUpdate}
            sectionId={sectionId}
            title={props.intl.formatMessage(wizardMessages.preparatoryTraining)}
          />
        ) : null}
      </React.Fragment>
    );
  }
);

PerustelutValmentavatKoulutukset.defaultProps = {
  changeObjects: {},
  stateObject: {}
};

PerustelutValmentavatKoulutukset.propTypes = {
  changeObjects: PropTypes.object,
  kohde: PropTypes.object,
  koulutukset: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  onChangesRemove: PropTypes.func,
  onChangesUpdate: PropTypes.func,
  onStateUpdate: PropTypes.func,
  stateObject: PropTypes.object
};

export default injectIntl(PerustelutValmentavatKoulutukset);
