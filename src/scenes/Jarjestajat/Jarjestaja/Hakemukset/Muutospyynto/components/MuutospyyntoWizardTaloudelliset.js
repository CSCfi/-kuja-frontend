import _ from "lodash";
import React, { Component } from "react";
import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants";
import FormSection from "../../../../../../components/03-templates/FormSection";
import { injectIntl } from "react-intl";
import TaloudellisetYleisettiedot from "./Taloudelliset/TaloudellisetYleisettiedot";
import TaloudellisetInvestoinnit from "./Taloudelliset/TaloudellisetInvestoinnit";
import PropTypes from "prop-types";

const MuutospyyntoWizardTaloudelliset = ({
  changeObjects,
  intl,
  kielet,
  kohteet = [],
  koulutukset,
  koulutusalat,
  koulutustyypit,
  maaraystyypit,
  muut,
  lupa,
  muutoshakemus,
  onChangesUpdate,
  onStateUpdate
}) => {
  // let { taloudellisetValue } = this.props;
  // const tutkintojaLisatty = _.find(tutkinnotjakoulutuksetValue, function(t) {
  //   return t.type === MUUTOS_TYPES.ADDITION;
  // });

  // if (initialValues) console.log(initialValues);
  // if (!taloudellisetValue) {
  //   if (
  //     initialValues &&
  //     initialValues.taloudelliset &&
  //     initialValues.taloudelliset.taloudelliset
  //   ) {
  //     taloudellisetValue = initialValues.taloudelliset.taloudelliset[0];
  //   } else taloudellisetValue = taloudellisetValue;

  //   if (!taloudellisetValue || taloudellisetValue.length === 0) {
  //     taloudellisetValue = [
  //       {
  //         edellytykset: null,
  //         vaikutukset: null,
  //         sopeuttaminen: null,
  //         investoinnit: null,
  //         kustannukset: null,
  //         rahoitus: null,
  //         omavaraisuusaste: null,
  //         maksuvalmius: null,
  //         velkaantuneisuus: null,
  //         kannattavuus: null,
  //         kumulatiivinen: null
  //       }
  //     ];
  //   }
  //   console.log(taloudellisetValue);
  // }

  return (
    <FormSection
    // onSubmit={handleSubmit}
    >
      <h2 className="mb-4">
        {MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.PAAOTSIKKO.FI}
      </h2>

      {!changeObjects && (
        <p>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.EI_LISATTYJA_TUTKINTOJA.FI}</p>
      )}
      {changeObjects && (
        <React.Fragment>
          <TaloudellisetYleisettiedot
            stateObject={{}}
            onStateUpdate={onStateUpdate}
            onChangesUpdate={onChangesUpdate}
            changeObjects={changeObjects}
          />
          <TaloudellisetInvestoinnit
            stateObject={{}}
            onStateUpdate={onStateUpdate}
            onChangesUpdate={onChangesUpdate}
            changeObjects={changeObjects}
          />
        </React.Fragment>
      )}
    </FormSection>
  );
};

// const selector = formValueSelector(FORM_NAME_UUSI_HAKEMUS)

// MuutospyyntoWizardTaloudelliset = connect(state => {
//   const tutkinnotjakoulutuksetValue = selector(state, FIELD_ARRAY_NAMES.TUTKINNOT_JA_KOULUTUKSET)
//   // const taloudellisetValue = selector(state, FIELD_ARRAY_NAMES.TALOUDELLISET)
//   let formVals = undefined
//   let taloudellisetValue = undefined
//   if (state.form && state.form.uusiHakemus && state.form.uusiHakemus.values) {
//     formVals = state.form.uusiHakemus.values;
//     if (state.form.uusiHakemus.values.taloudelliset && state.form.uusiHakemus.values.taloudelliset.length>0) taloudellisetValue = state.form.uusiHakemus.values.taloudelliset[0];
//   }

//   return {
//     tutkinnotjakoulutuksetValue,
//     taloudellisetValue,
//     formValues: formVals
//   }
// })(MuutospyyntoWizardTaloudelliset)

// export default reduxForm({
//   form: FORM_NAME_UUSI_HAKEMUS,
//   destroyOnUnmount: false,
//   forceUnregisterOnUnmount: true,
//   validate
// })(MuutospyyntoWizardTaloudelliset)

MuutospyyntoWizardTaloudelliset.propTypes = {
  changeObjects: PropTypes.object,
  kohteet: PropTypes.array,
  koulutukset: PropTypes.object,
  koulutusalat: PropTypes.object,
  koulutustyypit: PropTypes.object,
  maaraystyypit: PropTypes.array,
  muut: PropTypes.object,
  lupa: PropTypes.object,
  muutoshakemus: PropTypes.object,
  onChangesUpdate: PropTypes.func,
  onStateUpdate: PropTypes.func
};

export default injectIntl(MuutospyyntoWizardTaloudelliset);
