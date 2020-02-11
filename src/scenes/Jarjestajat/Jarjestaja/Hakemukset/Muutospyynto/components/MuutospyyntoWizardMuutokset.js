import React, { useEffect, useState } from "react";
import Tutkinnot from "./Tutkinnot";
import MuutospyyntoWizardKoulutukset from "./MuutospyyntoWizardKoulutukset";
import MuutospyyntoWizardKielet from "./MuutospyyntoWizardKielet";
import MuutospyyntoWizardToimintaalue from "./MuutospyyntoWizardToimintaalue";
import MuutospyyntoWizardOpiskelijavuodet from "./MuutospyyntoWizardOpiskelijavuodet";
import MuutospyyntoWizardMuut from "./MuutospyyntoWizardMuut";
import wizardMessages from "../../../../../../i18n/definitions/wizard";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import * as R from "ramda";
import FormSection from "../../../../../../components/03-templates/FormSection";

const MuutospyyntoWizardMuutokset = React.memo(props => {
  const intl = useIntl();
  const [kohteet, setKohteet] = useState({});
  const [maaraystyypit, setMaaraystyypit] = useState(null);

  useEffect(() => {
    setKohteet(
      R.mergeAll(
        R.flatten(
          R.map(item => {
            return {
              [R.props(["tunniste"], item)]: item
            };
          }, props.kohteet)
        )
      )
    );
  }, [props.kohteet]);

  useEffect(() => {
    setMaaraystyypit(
      R.mergeAll(
        R.flatten(
          R.map(item => {
            return {
              [R.props(["tunniste"], item)]: item
            };
          }, props.maaraystyypit)
        )
      )
    );
  }, [props.maaraystyypit]);

  return (
    <React.Fragment>
      <div>
        <p className="py-10">{intl.formatMessage(wizardMessages.info_01)}</p>

        <form onSubmit={props.handleSubmit}>
          {R.is(Object, maaraystyypit) ? (
            <React.Fragment>
              <FormSection
                code={props.lupaKohteet[1].headingNumber}
                id="tutkinnot"
                render={_props => (
                  <React.Fragment>
                    <Tutkinnot
                      changeObjects={R.prop("tutkinnot", props.changeObjects)}
                      tutkinnot={props.tutkinnot}
                      lupaKohteet={props.lupaKohteet}
                      {..._props}
                    />
                    <MuutospyyntoWizardKoulutukset
                      changeObjects={props.changeObjects.koulutukset}
                      koulutukset={props.koulutukset}
                      lupa={props.lupa}
                      {..._props}
                    />
                  </React.Fragment>
                )}
                runOnChanges={props.onChangesUpdate}
                title={props.lupaKohteet[1].heading}
              />

              <FormSection
                code={props.lupaKohteet[2].headingNumber}
                id="tutkinnot"
                render={_props => (
                  <React.Fragment>
                    <MuutospyyntoWizardKielet
                      changeObjects={{
                        kielet: props.changeObjects.kielet,
                        tutkinnot: props.changeObjects.tutkinnot
                      }}
                      kohde={kohteet.kielet}
                      lupa={props.lupa}
                      lupaKohteet={props.lupaKohteet}
                      kielet={props.kielet}
                      koulutukset={props.koulutukset}
                      tutkintolomakkeet={props.lomakkeet.tutkinnot}
                      onUpdate={props.onUpdate}
                      maaraystyyppi={maaraystyypit.VELVOITE}
                      {..._props}
                    />
                  </React.Fragment>
                )}
                runOnChanges={props.onChangesUpdate}
                title={intl.formatMessage(wizardMessages.header_section2)}
              />

              <FormSection
                code={3}
                id="toimintaalue"
                render={_props => (
                  <MuutospyyntoWizardToimintaalue
                    changeObjects={{
                      muutokset: props.changeObjects.toimintaalue
                    }}
                    lupakohde={props.lupaKohteet[3]}
                    kunnat={props.kunnat}
                    maakuntakunnatList={props.maakuntakunnatList}
                    maakunnat={props.maakunnat}
                    {..._props}
                  />
                )}
                runOnChanges={props.onChangesUpdate}
                title={R.path(
                  ["meta", "otsikko", intl.locale],
                  kohteet.toimintaalue
                )}
              />

              {kohteet.opiskelijavuodet && !R.isEmpty(props.lomakkeet.muut) && (
                <FormSection
                  code={props.lupaKohteet[4].headingNumber}
                  id="opiskelijavuodet"
                  render={_props => (
                    <React.Fragment>
                      <MuutospyyntoWizardOpiskelijavuodet
                        changeObjects={{
                          opiskelijavuodet:
                            props.changeObjects.opiskelijavuodet,
                          muut: props.changeObjects.muut
                        }}
                        lupa={props.lupa}
                        lupaKohteet={props.lupaKohteet}
                        muut={props.muut}
                        opiskelijavuodet={props.opiskelijavuodet}
                        lomakkeet={{
                          opiskelijavuodet: props.lomakkeet.opiskelijavuodet,
                          muut: props.lomakkeet.muut
                        }}
                        {..._props}
                      />
                    </React.Fragment>
                  )}
                  runOnChanges={props.onChangesUpdate}
                  title={intl.formatMessage(wizardMessages.header_section4)}
                />
              )}

              {kohteet.muut && props.muut && maaraystyypit && (
                <FormSection
                  code={props.lupaKohteet[5].headingNumber}
                  id="muut"
                  render={_props => (
                    <React.Fragment>
                      {kohteet.muut && props.muut && maaraystyypit && (
                        <MuutospyyntoWizardMuut
                          changeObjects={{
                            muut: R.prop("muut", props.changeObjects)
                          }}
                          kohde={kohteet.muut}
                          maaraykset={props.lupa.maaraykset}
                          muut={props.muut}
                          koulutukset={props.koulutukset}
                          maaraystyyppi={maaraystyypit.VELVOITE}
                          stateObjects={{
                            muut: props.lomakkeet.muut
                          }}
                          {..._props}
                        />
                      )}
                    </React.Fragment>
                  )}
                  runOnChanges={props.onChangesUpdate}
                  title={intl.formatMessage(wizardMessages.header_section5)}
                />
              )}
            </React.Fragment>
          ) : null}
        </form>
      </div>
    </React.Fragment>
  );
});

MuutospyyntoWizardMuutokset.defaultProps = {
  changeObjects: {}
};

MuutospyyntoWizardMuutokset.propTypes = {
  changeObjects: PropTypes.object,
  kielet: PropTypes.object,
  kohteet: PropTypes.array,
  koulutukset: PropTypes.object,
  kunnat: PropTypes.array,
  maakuntakunnatList: PropTypes.array,
  maakunnat: PropTypes.array,
  lomakkeet: PropTypes.object,
  lupa: PropTypes.object,
  lupaKohteet: PropTypes.object,
  maaraystyypit: PropTypes.array,
  muut: PropTypes.array,
  onChangesUpdate: PropTypes.func,
  tutkinnot: PropTypes.object
};

export default MuutospyyntoWizardMuutokset;
