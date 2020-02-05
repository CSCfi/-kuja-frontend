import React, { useMemo } from "react";
import PropTypes from "prop-types";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { getDataForKoulutusList } from "../../../../../../../utils/koulutusUtil";
import Lomake from "../../../../../../../components/02-organisms/Lomake";
import { useIntl } from "react-intl";
import * as R from "ramda";

const Kuljettajakoulutukset = ({
  changeObjects,
  kohde,
  koulutukset,
  lupa,
  maaraystyyppi,
  onChangesRemove,
  onChangesUpdate
}) => {
  const intl = useIntl();
  const sectionId = "koulutukset_kuljettajakoulutukset";
  const koodisto = "kuljettajakoulutus";

  const koulutusdata = useMemo(() => {
    return getDataForKoulutusList(
      koulutukset.muut[koodisto],
      R.toUpper(intl.locale),
      lupa,
      "kuljettajakoulutus"
    );
  }, [intl.locale, koulutukset, lupa]);

  return (
    <ExpandableRowRoot
      anchor={sectionId}
      key={`expandable-row-root`}
      categories={[]}
      changes={changeObjects}
      onChangesRemove={onChangesRemove}
      onUpdate={onChangesUpdate}
      title={intl.formatMessage(wizardMessages.driverTraining)}>
      <Lomake
        action="modification"
        anchor={sectionId}
        changeObjects={changeObjects}
        data={{
          kohde,
          koulutusdata,
          maaraystyyppi
        }}
        onChangesUpdate={onChangesUpdate}
        path={["koulutukset", "kuljettajakoulutukset"]}
        rules={[]}
        showCategoryTitles={true}></Lomake>
    </ExpandableRowRoot>
  );
};

Kuljettajakoulutukset.propTypes = {
  changeObjects: PropTypes.array,
  kohde: PropTypes.object,
  lupa: PropTypes.object,
  koulutukset: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  onChangesRemove: PropTypes.func,
  onChangesUpdate: PropTypes.func
};

export default Kuljettajakoulutukset;
