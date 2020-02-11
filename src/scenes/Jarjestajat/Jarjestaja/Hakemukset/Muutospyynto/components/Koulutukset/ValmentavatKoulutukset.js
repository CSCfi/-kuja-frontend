import React, { useMemo } from "react";
import { getDataForKoulutusList } from "../../../../../../../utils/koulutusUtil";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import Lomake from "../../../../../../../components/02-organisms/Lomake";
import { toUpper, values } from "ramda";

const ValmentavatKoulutukset = React.memo(
  ({ changeObjects, koulutukset, onChangesRemove, onChangesUpdate }) => {
    const intl = useIntl();
    const sectionId = "koulutukset_valmentavatKoulutukset";

    const koulutusdata = useMemo(() => {
      return getDataForKoulutusList(
        values(koulutukset.poikkeukset),
        toUpper(intl.locale)
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
              koulutusdata
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
  koulutukset: PropTypes.object
};

export default ValmentavatKoulutukset;
