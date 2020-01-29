import React, { useEffect, useMemo } from "react";
import { getDataForKoulutusList } from "../../../../../../../utils/koulutusUtil";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

const ATVKoulutukset = props => {
  const intl = useIntl();
  const sectionId = "koulutukset_atvKoulutukset";
  const { onChangesRemove, onChangesUpdate, onStateUpdate } = props;

  const getCategories = useMemo(() => {
    return (koulutusData, kohde, maaraystyyppi) => {
      const categories = R.map(item => {
        return {
          anchor: item.code,
          components: [
            {
              anchor: "A",
              name: "CheckboxWithLabel",
              properties: {
                name: "CheckboxWithLabel",
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
            props.koulutukset.muut
              .ammatilliseentehtavaanvalmistavakoulutus,
            R.toUpper(intl.locale)
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
    intl.locale,
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
          onChangesRemove={onChangesRemove}
          onUpdate={onChangesUpdate}
          title={intl.formatMessage(wizardMessages.vocationalTraining)}
        />
      ) : null}
    </React.Fragment>
  );
};

ATVKoulutukset.defaultProps = {
  stateObject: {}
};

ATVKoulutukset.propTypes = {
  changeObjects: PropTypes.array,
  kohde: PropTypes.object,
  koulutukset: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  stateObject: PropTypes.object
};

export default ATVKoulutukset;
