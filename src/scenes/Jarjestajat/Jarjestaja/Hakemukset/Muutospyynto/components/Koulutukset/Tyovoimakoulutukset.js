import React, { useMemo } from "react";
import { getDataForKoulutusList } from "../../../../../../../utils/koulutusUtil";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import PropTypes from "prop-types";
import Lomake from "../../../../../../../components/02-organisms/Lomake";
import { useIntl } from "react-intl";
import * as R from "ramda";

const Tyovoimakoulutukset = React.memo(
  ({
    changeObjects,
    kohde,
    koulutukset,
    lupa,
    maaraystyyppi,
    onChangesRemove,
    onChangesUpdate
  }) => {
    const intl = useIntl();
    const sectionId = "koulutukset_tyovoimakoulutukset";
    const koodisto = "oivatyovoimakoulutus";

    const koulutusdata = useMemo(() => {
      return getDataForKoulutusList(
        koulutukset.muut[koodisto],
        R.toUpper(intl.locale),
        lupa,
        "oivatyovoimakoulutus"
      );
    }, [intl.locale, koulutukset, lupa]);

    return (
      <ExpandableRowRoot
        anchor={sectionId}
        key={`expandable-row-root`}
        categories={[]}
        changes={changeObjects}
        onUpdate={onChangesUpdate}
        onChangesRemove={onChangesRemove}
        title={intl.formatMessage(wizardMessages.workforceTraining)}>
        {koulutusdata && (
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
            path={["koulutukset", "tyovoimakoulutukset"]}
            rules={[]}
            showCategoryTitles={true}></Lomake>
        )}
      </ExpandableRowRoot>
    );
  }
);

Tyovoimakoulutukset.propTypes = {
  changeObjects: PropTypes.array,
  kohde: PropTypes.object,
  koulutukset: PropTypes.object,
  lupa: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  onChangesRemove: PropTypes.func,
  onChangesUpdate: PropTypes.func
};

export default Tyovoimakoulutukset;
