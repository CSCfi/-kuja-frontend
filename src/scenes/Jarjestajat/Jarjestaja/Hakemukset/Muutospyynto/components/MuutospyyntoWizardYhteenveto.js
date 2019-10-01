import React from "react";
import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants";
import FormSection from "../../../../../../components/03-templates/FormSection";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";
import YhteenvetoYleisetTiedot from "./Yhteenveto/YhteenvetoYleisetTiedot";
import YhteenvetoKooste from "./Yhteenveto/YhteenvetoKooste";
import YhteenvetoLiitteet from "./Yhteenveto/YhteenvetoLiitteet";

const MuutospyyntoWizardYhteenveto = ({
  changeObjects,
  kielet,
  kohteet,
  koulutukset,
  koulutusalat,
  koulutustyypit,
  lupa,
  maaraystyypit,
  muut,
  muutoshakemus,
  onChangesUpdate,
  onStateUpdate
}) => {
  return (
    <React.Fragment>
      <h2 className="my-6">{MUUTOS_WIZARD_TEKSTIT.YHTEENVETO.HEADING.FI}</h2>

      <FormSection
        id="yhteenveto_yleisettiedot"
        className="my-0"
        render={_props => (
          <React.Fragment>
            <YhteenvetoYleisetTiedot
              stateObject={R.path(
                ["yhteenveto", "yleisettiedot"],
                muutoshakemus
              )}
              changeObjects={{
                yhteenveto: R.path(
                  ["yhteenveto", "yleisettiedot"],
                  changeObjects
                )
              }}
              {..._props}
            />
            <YhteenvetoKooste
              changeObjects={changeObjects}
              kielet={kielet}
              kohteet={kohteet}
              koulutukset={koulutukset}
              koulutusalat={koulutusalat}
              koulutustyypit={koulutustyypit}
              lupa={lupa}
              maaraystyypit={maaraystyypit}
              muut={muut}
              muutoshakemus={muutoshakemus}
              onChangesUpdate={onChangesUpdate}
              onStateUpdate={onStateUpdate}
            ></YhteenvetoKooste>
          </React.Fragment>
        )}
        runOnStateUpdate={onStateUpdate}
        runOnChanges={onChangesUpdate}
      />
      <FormSection
        id="yhteenveto_hakemuksenliitteet"
        className="my-0"
        render={_props => (
          <React.Fragment>
            <YhteenvetoLiitteet
              stateObject={R.path(
                ["yhteenveto", "hakemuksenliitteet"],
                muutoshakemus
              )}
              changeObjects={{
                yhteenveto: R.path(
                  ["yhteenveto", "hakemuksenliitteet"],
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
    </React.Fragment>
  );
};

MuutospyyntoWizardYhteenveto.propTypes = {
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

export default injectIntl(MuutospyyntoWizardYhteenveto);
