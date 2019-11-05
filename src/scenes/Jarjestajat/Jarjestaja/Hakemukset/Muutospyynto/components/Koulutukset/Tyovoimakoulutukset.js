import React, { useEffect, useMemo } from "react";
import { getDataForKoulutusList } from "../../../../../../../utils/koulutusUtil";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

const Tyovoimakoulutukset = React.memo(props => {
  const sectionId = "koulutukset_tyovoimakoulutukset";
  const koodisto = "oivatyovoimakoulutus";
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
    onStateUpdate(
      {
        categories: getCategories(
          getDataForKoulutusList(
            props.koulutukset.muut[koodisto],
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
          changes={props.changeObjects}
          onUpdate={onChangesUpdate}
          onChangesRemove={onChangesRemove}
          title={props.intl.formatMessage(wizardMessages.workforceTraining)}
        />
      ) : null}
    </React.Fragment>
  );
});

Tyovoimakoulutukset.defaultProps = {
  stateObject: {}
};

Tyovoimakoulutukset.propTypes = {
  changeObjects: PropTypes.array,
  koulutukset: PropTypes.object
};

export default injectIntl(Tyovoimakoulutukset);
