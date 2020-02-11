import React, { useMemo } from "react";
import PropTypes from "prop-types";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { getDataForKoulutusList } from "../../../../../../../utils/koulutusUtil";
import Lomake from "../../../../../../../components/02-organisms/Lomake";
import { useIntl } from "react-intl";
import { toUpper } from "ramda";

const Kuljettajakoulutukset = ({
  changeObjects,
  koulutukset,
  lupa,
  onChangesRemove,
  onChangesUpdate
}) => {
  const intl = useIntl();
  const sectionId = "koulutukset_kuljettajakoulutukset";
  const koodisto = "kuljettajakoulutus";

  const koulutusdata = useMemo(() => {
    return getDataForKoulutusList(
      koulutukset.muut[koodisto],
      toUpper(intl.locale),
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
          koulutusdata
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
  lupa: PropTypes.object,
  koulutukset: PropTypes.object,
  onChangesRemove: PropTypes.func,
  onChangesUpdate: PropTypes.func
};

export default Kuljettajakoulutukset;
