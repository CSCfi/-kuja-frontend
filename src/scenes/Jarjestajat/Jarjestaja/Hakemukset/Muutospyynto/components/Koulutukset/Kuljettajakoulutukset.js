import React, { useEffect, useMemo } from "react";
import { getDataForKoulutusList } from "services/koulutukset/koulutusUtil";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

const Kuljettajakoulutukset = React.memo(props => {
  const sectionId = "koulutukset_kuljettajakoulutukset";
  const koodisto = "kuljettajakoulutus";
  const { onChangesRemove, onChangesUpdate, onStateUpdate } = props;

  const getCategories = useMemo(() => {
    return (koulutusData, kohde, maaraystyyppi) => {
      const categories = R.map(item => {
        return {
          anchor: item.code,
          components: [
            {
              anchor: "A",
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
  }, []);

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
    props.maaraystyyppi
  ]);

  return (
    <ExpandableRowRoot
      anchor={sectionId}
      key={`expandable-row-root`}
      categories={props.stateObject.categories}
      changes={props.changeObjects}
      onChangesRemove={onChangesRemove}
      onUpdate={onChangesUpdate}
      title={props.intl.formatMessage(wizardMessages.driverTraining)}
    />
  );
});

Kuljettajakoulutukset.defaultProps = {
  stateObject: {}
};

Kuljettajakoulutukset.propTypes = {
  changeObjects: PropTypes.array,
  kohde: PropTypes.object,
  koulutukset: PropTypes.object,
  maaraystyyppi: PropTypes.object
};

export default injectIntl(Kuljettajakoulutukset);
