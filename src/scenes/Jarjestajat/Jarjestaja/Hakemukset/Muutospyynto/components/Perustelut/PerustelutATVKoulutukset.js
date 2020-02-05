import React, { useMemo } from "react";
import { getDataForKoulutusList } from "../../../../../../../utils/koulutusUtil";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";
import Lomake from "../../../../../../../components/02-organisms/Lomake";
import { rules } from "../../../../../../../services/lomakkeet/perustelut/atv-koulutukset/rules";

const PerustelutATVKoulutukset = props => {
  const intl = useIntl();
  const sectionId = "perustelut_koulutukset_atvKoulutukset";
  const { onChangesRemove, onChangesUpdate } = props;

  const koulutusdata = useMemo(() => {
    return getDataForKoulutusList(
      props.koulutukset.muut.ammatilliseentehtavaanvalmistavakoulutus,
      R.toUpper(intl.locale)
    );
  }, [
    intl.locale,
    props.koulutukset.muut.ammatilliseentehtavaanvalmistavakoulutus
  ]);

  return (
    <ExpandableRowRoot
      anchor={sectionId}
      key={`expandable-row-root`}
      categories={[]}
      changes={props.changeObjects.perustelut.koulutukset.atvKoulutukset}
      disableReverting={props.isReadOnly}
      hideAmountOfChanges={true}
      isExpanded={true}
      onChangesRemove={onChangesRemove}
      onUpdate={onChangesUpdate}
      title={intl.formatMessage(wizardMessages.vocationalTraining)}>
      <Lomake
        anchor={sectionId}
        changeObjects={
          props.changeObjects.perustelut.koulutukset.atvKoulutukset
        }
        data={{
          changeObjectsPage1: props.changeObjects.koulutukset.atvKoulutukset,
          koulutusdata,
          kohde: props.kohde,
          maaraystyyppi: props.maaraystyyppi
        }}
        isReadOnly={props.isReadOnly}
        onChangesUpdate={onChangesUpdate}
        path={["perustelut", "koulutukset", "atvKoulutukset"]}
        rules={rules}
        showCategoryTitles={true}></Lomake>
    </ExpandableRowRoot>
  );
};

PerustelutATVKoulutukset.defaultProps = {
  changeObjects: {},
  isReadOnly: false
};

PerustelutATVKoulutukset.propTypes = {
  changeObjects: PropTypes.object,
  isReadOnly: PropTypes.bool,
  kohde: PropTypes.object,
  koulutukset: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  onChangesRemove: PropTypes.func,
  onChangesUpdate: PropTypes.func,
  onStateUpdate: PropTypes.func
};

export default PerustelutATVKoulutukset;
