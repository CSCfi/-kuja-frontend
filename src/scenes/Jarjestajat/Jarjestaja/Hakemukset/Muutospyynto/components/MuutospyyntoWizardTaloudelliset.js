import React from "react";
import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants";
import FormSection from "../../../../../../components/03-templates/FormSection";
import { injectIntl } from "react-intl";
import TaloudellisetYleisettiedot from "./Taloudelliset/TaloudellisetYleisettiedot";
import TaloudellisetInvestoinnit from "./Taloudelliset/TaloudellisetInvestoinnit";
import PropTypes from "prop-types";
import * as R from "ramda";

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
  return (
    <FormSection>
      <h2 className="mb-4">
        {MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.PAAOTSIKKO.FI}
      </h2>

      {!changeObjects && (
        <p>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.EI_LISATTYJA_TUTKINTOJA.FI}</p>
      )}
      {changeObjects && (
        <React.Fragment>
          <FormSection
            id="tutkinnot"
            render={_props => (
              <React.Fragment>
                <TaloudellisetYleisettiedot
                  stateObject={R.path(
                    ["taloudelliset", "yleisettiedot"],
                    muutoshakemus
                  )}
                  changeObjects={{
                    tutkinnot: R.path(["tutkinnot"], changeObjects),
                    taloudelliset: R.path(
                      ["taloudelliset", "yleisettiedot"],
                      changeObjects
                    )
                  }}
                  {..._props}
                />
              </React.Fragment>
            )}
            runOnStateUpdate={onStateUpdate}
            runOnChanges={onChangesUpdate}
          />

          {/* <TaloudellisetInvestoinnit
            stateObject={{}}
            onStateUpdate={onStateUpdate}
            onChangesUpdate={onChangesUpdate}
            changeObjects={changeObjects}
          /> */}
        </React.Fragment>
      )}
    </FormSection>
  );
};

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
