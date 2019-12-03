import React, { useEffect, useState } from "react";
import Tutkinnot from "./Tutkinnot";
import MuutospyyntoWizardKoulutukset from "./MuutospyyntoWizardKoulutukset";
import MuutospyyntoWizardKielet from "./MuutospyyntoWizardKielet";
import MuutospyyntoWizardToimintaalue from "./MuutospyyntoWizardToimintaalue";
import MuutospyyntoWizardOpiskelijavuodet from "./MuutospyyntoWizardOpiskelijavuodet";
import MuutospyyntoWizardMuut from "./MuutospyyntoWizardMuut";
import wizardMessages from "../../../../../../i18n/definitions/wizard";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import * as R from "ramda";
import FormSection from "../../../../../../components/03-templates/FormSection";

const MuutospyyntoWizardMuutokset = React.memo(props => {
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
        <p className="py-10">
          {props.intl.formatMessage(wizardMessages.info_01)}
        </p>

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
                      kohde={kohteet.tutkinnotjakoulutukset}
                      tutkinnot={props.tutkinnot}
                      lupaKohteet={props.lupaKohteet}
                      maaraystyyppi={maaraystyypit.OIKEUS}
                      stateObject={props.muutoshakemus.tutkinnot}
                      {..._props}
                    />
                    <MuutospyyntoWizardKoulutukset
                      changeObjects={R.prop("koulutukset", props.changeObjects)}
                      kohde={kohteet.tutkinnotjakoulutukset}
                      koulutukset={props.koulutukset}
                      maaraystyyppi={maaraystyypit.OIKEUS}
                      stateObjects={props.muutoshakemus.koulutukset}
                      {..._props}
                    />
                  </React.Fragment>
                )}
                runOnStateUpdate={props.onStateUpdate}
                runOnChanges={props.onChangesUpdate}
                title={props.lupaKohteet[1].heading}
              />

              {!!R.path(["tutkinnot", "items"], props.muutoshakemus) ? (
                <FormSection
                  code={props.lupaKohteet[2].headingNumber}
                  id="tutkinnot"
                  render={_props => (
                    <React.Fragment>
                      <MuutospyyntoWizardKielet
                        changeObjects={{
                          kielet: R.prop("kielet", props.changeObjects),
                          tutkinnot: R.prop("tutkinnot", props.changeObjects)
                        }}
                        kohde={kohteet.kielet}
                        lupa={props.lupa}
                        lupaKohteet={props.lupaKohteet}
                        kielet={props.kielet}
                        koulutukset={props.koulutukset}
                        onUpdate={props.onUpdate}
                        maaraystyyppi={maaraystyypit.VELVOITE}
                        stateObjects={{
                          kielet: R.prop("kielet", props.muutoshakemus),
                          tutkinnot: R.prop("tutkinnot", props.muutoshakemus)
                        }}
                        {..._props}
                      />
                    </React.Fragment>
                  )}
                  runOnStateUpdate={props.onStateUpdate}
                  runOnChanges={props.onChangesUpdate}
                  title={props.intl.formatMessage(
                    wizardMessages.header_section2
                  )}
                />
              ) : null}

              {!!R.path(["toimintaalue"], props.muutoshakemus) && (
                <FormSection
                  code={3}
                  id="toimintaalue"
                  render={_props => (
                    <MuutospyyntoWizardToimintaalue
                      changeObjects={{
                        muutokset: props.changeObjects.toimintaalue
                      }}
                      lupakohde={props.lupaKohteet[3]}
                      kohde={kohteet.toimintaalue}
                      kunnat={props.kunnat}
                      maakuntakunnatList={props.maakuntakunnatList}
                      maakunnat={props.maakunnat}
                      maaraystyyppi={maaraystyypit.VELVOITE}
                      stateObjects={{
                        toimintaalue: R.prop(
                          "toimintaalue",
                          props.muutoshakemus
                        )
                      }}
                      {..._props}
                    />
                  )}
                  runOnStateUpdate={props.onStateUpdate}
                  runOnChanges={props.onChangesUpdate}
                  title={R.path(
                    ["meta", "otsikko", props.intl.locale],
                    kohteet.toimintaalue
                  )}
                />
              )}

              {kohteet.opiskelijavuodet &&
                !!R.path(["muut", "muutdata"], props.muutoshakemus) && (
                  <FormSection
                    code={props.lupaKohteet[4].headingNumber}
                    id="opiskelijavuodet"
                    render={_props => (
                      <React.Fragment>
                        <MuutospyyntoWizardOpiskelijavuodet
                          changeObjects={{
                            opiskelijavuodet: R.prop(
                              "opiskelijavuodet",
                              props.changeObjects
                            ),
                            muut: R.prop("muut", props.changeObjects)
                          }}
                          kohde={kohteet.opiskelijavuodet}
                          lupa={props.lupa}
                          lupaKohteet={props.lupaKohteet}
                          maaraystyyppi={maaraystyypit.OIKEUS}
                          muut={props.muut}
                          opiskelijavuodet={props.opiskelijavuodet}
                          stateObjects={{
                            opiskelijavuodet: R.prop(
                              "opiskelijavuodet",
                              props.muutoshakemus
                            ),
                            muut: R.prop("muut", props.muutoshakemus)
                          }}
                          {..._props}
                        />
                      </React.Fragment>
                    )}
                    runOnStateUpdate={props.onStateUpdate}
                    runOnChanges={props.onChangesUpdate}
                    title={props.intl.formatMessage(
                      wizardMessages.header_section4
                    )}
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
                            muut: props.muutoshakemus.muut
                          }}
                          {..._props}
                        />
                      )}
                    </React.Fragment>
                  )}
                  runOnStateUpdate={props.onStateUpdate}
                  runOnChanges={props.onChangesUpdate}
                  title={props.intl.formatMessage(
                    wizardMessages.header_section5
                  )}
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
  lupa: PropTypes.object,
  lupaKohteet: PropTypes.object,
  maaraystyypit: PropTypes.array,
  muut: PropTypes.array,
  muutoshakemus: PropTypes.object,
  onStateUpdate: PropTypes.func,
  onChangesUpdate: PropTypes.func,
  tutkinnot: PropTypes.object
};

export default injectIntl(MuutospyyntoWizardMuutokset);
