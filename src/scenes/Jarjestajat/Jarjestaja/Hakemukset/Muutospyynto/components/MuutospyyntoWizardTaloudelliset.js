import React, { useCallback } from "react";
import FormSection from "../../../../../../components/03-templates/FormSection";
import { useIntl } from "react-intl";
import TaloudellisetYleisettiedot from "./Taloudelliset/TaloudellisetYleisettiedot";
import TaloudellisetInvestoinnit from "./Taloudelliset/TaloudellisetInvestoinnit";
import TaloudellisetTilinpaatostiedot from "./Taloudelliset/TaloudellisetTilinpaatostiedot";
import TaloudellisetLiitteet from "./Taloudelliset/TaloudellisetLiitteet";
import wizard from "../../../../../../i18n/definitions/wizard";
import PropTypes from "prop-types";
import * as R from "ramda";
import Section from "components/03-templates/Section";

const MuutospyyntoWizardTaloudelliset = ({
  changeObjects = {},
  onChangesUpdate
}) => {
  const intl = useIntl();
  const checkIfIsAdditions = changeObjects => {
    const findIsChecked = obj => {
      if (obj instanceof Array) {
        return R.any(findIsChecked, obj);
      } else if (obj instanceof Object) {
        const isChecked = R.prop("isChecked", obj);
        return (
          isChecked ||
          R.compose(
            R.any(([k, v]) => findIsChecked(v)),
            R.toPairs
          )(obj)
        );
      }
      return false;
    };

    return findIsChecked(changeObjects);
  };

  const onChangesRemove = useCallback(
    sectionId => {
      return onChangesUpdate(sectionId, []);
    },
    [onChangesUpdate]
  );

  const updateChanges = useCallback(
    payload => {
      onChangesUpdate(payload.anchor, payload.changes);
    },
    [onChangesUpdate]
  );

  return (
    <React.Fragment>
      <h2 className="my-6">{intl.formatMessage(wizard.pageTitle_3)}</h2>

      {!checkIfIsAdditions(
        R.props(["tutkinnot", "koulutukset"], changeObjects)
      ) ? (
        <p>{intl.formatMessage(wizard.noAddedTutkinnot)}</p>
      ) : (
        <React.Fragment>
          <p className={"mb-10"}>
            {intl.formatMessage(wizard.allFieldsRequired)}
          </p>
          <Section title={intl.formatMessage(wizard.yleisetTiedot)}>
            <TaloudellisetYleisettiedot
              changeObjects={changeObjects.taloudelliset.yleisettiedot}
              onChangesUpdate={updateChanges}
              onChangesRemove={onChangesRemove}
            />
          </Section>
          <Section title={intl.formatMessage(wizard.taloudellisetInvestoinnit)}>
            <TaloudellisetInvestoinnit
              changeObjects={changeObjects.taloudelliset.investoinnit}
              onChangesUpdate={updateChanges}
              onChangesRemove={onChangesRemove}
            />
          </Section>
          <Section title={intl.formatMessage(wizard.taloudellisetTilinpaatostiedot)}>
            <TaloudellisetTilinpaatostiedot
              changeObjects={changeObjects.taloudelliset.tilinpaatostiedot}
              onChangesUpdate={updateChanges}
              onChangesRemove={onChangesRemove}
            />
          </Section>
          <Section title={intl.formatMessage(wizard.liitteet)}>
            <TaloudellisetLiitteet
              changeObjects={changeObjects.taloudelliset.liitteet}
              onChangesUpdate={updateChanges}
              onChangesRemove={onChangesRemove}
            />
          </Section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

MuutospyyntoWizardTaloudelliset.propTypes = {
  changeObjects: PropTypes.object,
  muutoshakemus: PropTypes.object,
  onChangesUpdate: PropTypes.func,
  isReadOnly: PropTypes.bool
};

export default MuutospyyntoWizardTaloudelliset;
