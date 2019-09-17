import React, { useEffect, useMemo } from "react";
import { getDataForKoulutusList } from "services/koulutukset/koulutusUtil";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { curriedGetAnchorPartsByIndex } from "../../../../../../../utils/common";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";
import KuljettajienJatkokoulutuslomake from "../../../../../../../components/04-forms/koulutukset/Kuljettajakoulutukset/Jatkokoulutuslomake";
const PerustelutKuljettajakoulutukset = props => {
  const sectionId = "perustelut_koulutukset_kuljettajakoulutukset";
  const koodisto = "kuljettajakoulutus";
  const { onChangesRemove, onChangesUpdate, onStateUpdate } = props;

  const getCategories = useMemo(() => {
    const getAnchorPartsByIndex = curriedGetAnchorPartsByIndex(
      R.path(["koulutukset", "kuljettajakoulutukset"])(props.changeObjects)
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
            categories: props.lomakkeet.kuljettajienJatkokoulutus
          };
        }
        return structure;
      }, koulutusData.items);
      return categories.filter(Boolean);
    };
  }, [props.changeObjects, props.lomakkeet.kuljettajienJatkokoulutus]);

  useEffect(() => {
    if (R.includes(koodisto, props.koulutukset.muut.fetched)) {
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
    }
  }, [
    getCategories,
    onStateUpdate,
    props.kohde,
    props.koulutukset.muut,
    props.intl.locale,
    props.lomakkeet.kuljettajienJatkokoulutus,
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
            props.changeObjects.perustelut.koulutukset.kuljettajakoulutukset
          }
          disableReverting={true}
          hideAmountOfChanges={false}
          isExpanded={true}
          onChangesRemove={onChangesRemove}
          onUpdate={onChangesUpdate}
          title={props.intl.formatMessage(wizardMessages.driverTraining)}
        >
          <KuljettajienJatkokoulutuslomake></KuljettajienJatkokoulutuslomake>
        </ExpandableRowRoot>
      ) : null}
    </React.Fragment>
  );
};

PerustelutKuljettajakoulutukset.defaultProps = {
  changeObjects: {},
  stateObject: {}
};

PerustelutKuljettajakoulutukset.propTypes = {
  changeObjects: PropTypes.object,
  kohde: PropTypes.object,
  koulutukset: PropTypes.object,
  lomakkeet: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  onChangesRemove: PropTypes.func,
  onChangesUpdate: PropTypes.func,
  onStateUpdate: PropTypes.func,
  stateObject: PropTypes.object
};

export default injectIntl(PerustelutKuljettajakoulutukset);
