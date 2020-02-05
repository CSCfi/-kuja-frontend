import React, { useMemo } from "react";
import { getDataForKoulutusList } from "../../../../../../../utils/koulutusUtil";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import Lomake from "../../../../../../../components/02-organisms/Lomake";
import * as R from "ramda";

const ValmentavatKoulutukset = React.memo(
  ({
    changeObjects,
    kohde,
    koulutukset,
    maaraystyyppi,
    onChangesRemove,
    onChangesUpdate
  }) => {
    const intl = useIntl();
    const sectionId = "koulutukset_valmentavatKoulutukset";

    const koulutusdata = useMemo(() => {
      return getDataForKoulutusList(
        R.values(koulutukset.poikkeukset),
        R.toUpper(intl.locale)
      );
    }, [intl.locale, koulutukset]);

    return (
      <ExpandableRowRoot
        anchor={sectionId}
        key={`expandable-row-root`}
        categories={[]}
        changes={changeObjects}
        title={intl.formatMessage(wizardMessages.preparatoryTraining)}
        index={0}
        onChangesRemove={onChangesRemove}
        onUpdate={onChangesUpdate}
        sectionId={sectionId}>
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
            path={["koulutukset", "valmentavatKoulutukset"]}
            rules={[]}
            showCategoryTitles={true}></Lomake>
        )}
      </ExpandableRowRoot>
    );
  }
);

ValmentavatKoulutukset.propTypes = {
  changeObjects: PropTypes.array,
  kohde: PropTypes.object,
  koulutukset: PropTypes.object,
  maaraystyyppi: PropTypes.object
};

export default ValmentavatKoulutukset;
