import React, { useContext, useEffect, useState } from "react";
import PerustelutKoulutukset from "./Perustelut/PerustelutKoulutukset";
import PerustelutMuut from "./Perustelut/PerustelutMuut";
import PerustelutOpetuskielet from "./Perustelut/PerustelutOpetuskielet";
import PerustelutTutkintokielet from "./Perustelut/PerustelutTutkintokielet";
import PerustelutTutkinnot from "./Perustelut/PerustelutTutkinnot";
import { MuutosperustelutContext } from "../../../../../../context/muutosperustelutContext";
import { LomakkeetContext } from "../../../../../../context/lomakkeetContext";
import { fetchMuutosperustelut } from "../../../../../../services/muutosperustelut/actions";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import * as R from "ramda";
import PerustelutToimintaalue from "./Perustelut/PerustelutToimintaalue";
import { updateFormStructure } from "../../../../../../services/lomakkeet/actions";
import {
  getAdditionFormStructure,
  getOsaamisalaFormStructure
} from "../../../../../../services/lomakkeet/perustelut/tutkinnot";
import { getRemovalFormStructure } from "../../../../../../services/lomakkeet/perustelut/tutkinnot";
import FormSection from "../../../../../../components/03-templates/FormSection";
import PerustelutOpiskelijavuodet from "./Perustelut/PerustelutOpiskelijavuodet";
import YhteenvetoLiitteet from "./Yhteenveto/YhteenvetoLiitteet";
import PerustelutLiitteet from "./Perustelut/PerustelutLiitteet";
import wizard from "../../../../../../i18n/definitions/wizard";

const MuutospyyntoWizardPerustelut = ({
  changeObjects,
  intl,
  intl: { formatMessage },
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
  onStateUpdate,
  vankilat = []
}) => {
  const [kohdetiedot, setKohdetiedot] = useState(null);
  const [maaraystyypitState, setMaaraystyypitState] = useState({});
  const {
    state: muutosperustelut,
    dispatch: muutosperustelutDispatch
  } = useContext(MuutosperustelutContext);
  const { state: lomakkeet, dispatch: lomakkeetDispatch } = useContext(
    LomakkeetContext
  );
  const [isTutkinnotChanges, setIsTutkinnotChanges] = useState(false);
  const [isKoulutuksetChanges, setIsKoulutuksetChanges] = useState(false);
  const [isOpetuskieletChanges, setIsOpetuskieletChanges] = useState(false);
  const [isTutkintokieletChanges, setIsTutkintokieletChanges] = useState(false);
  const [isToimintaalueChanges, setIsToimintaalueChanges] = useState(false);
  const [isOpiskelijavuodetChanges, setIsOpiskelijavuodetChanges] = useState(
    false
  );
  const [isMuutChanges, setIsMuutChanges] = useState(false);
  const [isAnyChanges, setIsAnyChanges] = useState(false);

  useEffect(() => {
    fetchMuutosperustelut()(muutosperustelutDispatch);
  }, [muutosperustelutDispatch]);

  useEffect(() => {
    /**
     * Let's get the structures of different tutkinto based reasoning forms and update the context.
     * These will be needed later.
     */
    if (muutosperustelut.data.length) {
      const additionFormStructure = getAdditionFormStructure(
        R.sortBy(R.prop("koodiArvo"))(muutosperustelut.muutosperusteluList),
        R.toUpper(intl.locale)
      );
      updateFormStructure(
        ["perustelut", "tutkinnot", "addition"],
        additionFormStructure
      )(lomakkeetDispatch);
      const removalFormStructure = getRemovalFormStructure();
      updateFormStructure(
        ["perustelut", "tutkinnot", "removal"],
        removalFormStructure
      )(lomakkeetDispatch);
      const osaamisalaFormStructure = getOsaamisalaFormStructure();
      updateFormStructure(
        ["perustelut", "tutkinnot", "osaamisala"],
        osaamisalaFormStructure
      )(lomakkeetDispatch);
    }
  }, [lomakkeetDispatch, muutosperustelut, intl.locale]);

  useEffect(() => {
    const kohdeTiedot = R.map(kohde => {
      return {
        title: R.path(["meta", "otsikko", [intl.locale]], kohde),
        code: R.find(R.propEq("tunniste", kohde.tunniste))(lupa.kohteet)
      };
    }, kohteet);
    setKohdetiedot(kohdeTiedot);
  }, [intl.locale, kohteet, lupa.kohteet]);

  useEffect(() => {
    setMaaraystyypitState(
      R.mergeAll(
        R.flatten(
          R.map(item => {
            return {
              [R.props(["tunniste"], item)]: item
            };
          }, maaraystyypit)
        )
      )
    );
  }, [maaraystyypit]);

  useEffect(() => {
    let tutkinnotChanges;
    let koulutuksetChanges;
    let opetuskieletChanges;
    let tutkintokieletChanges;
    let toimintaalueChanges;
    let opiskelijavuodetChanges;
    let muutChanges;

    tutkinnotChanges = R.path(["tutkinnot"], changeObjects);
    R.forEachObjIndexed(item => {
      if (!R.isEmpty(item)) {
        setIsTutkinnotChanges(true);
      }
    }, tutkinnotChanges || []);

    koulutuksetChanges = R.path(["koulutukset"], changeObjects);
    R.forEachObjIndexed(item => {
      if (!R.isEmpty(item)) {
        setIsKoulutuksetChanges(true);
      }
    }, koulutuksetChanges || []);

    opetuskieletChanges = R.path(["kielet", "opetuskielet"], changeObjects);
    setIsOpetuskieletChanges(
      opetuskieletChanges && !R.isEmpty(opetuskieletChanges)
    );

    tutkintokieletChanges = R.path(["kielet", "tutkintokielet"], changeObjects);
    setIsTutkintokieletChanges(
      tutkintokieletChanges && !R.isEmpty(tutkintokieletChanges)
    );

    toimintaalueChanges = R.path(["toimintaalue"], changeObjects);
    setIsToimintaalueChanges(
      toimintaalueChanges && !R.isEmpty(toimintaalueChanges)
    );

    opiskelijavuodetChanges = R.path(["opiskelijavuodet"], changeObjects);
    setIsOpiskelijavuodetChanges(
      opiskelijavuodetChanges && !R.isEmpty(opiskelijavuodetChanges)
    );

    muutChanges = R.path(["muut"], changeObjects);
    R.forEachObjIndexed(item => {
      if (!R.isEmpty(item)) {
        setIsMuutChanges(true);
      }
    }, muutChanges || []);

    setIsAnyChanges(
      isTutkinnotChanges ||
        isKoulutuksetChanges ||
        isOpetuskieletChanges ||
        isTutkintokieletChanges ||
        isToimintaalueChanges ||
        isOpiskelijavuodetChanges ||
        isMuutChanges
    );
  }, [
    isTutkinnotChanges,
    isKoulutuksetChanges,
    isOpetuskieletChanges,
    isTutkintokieletChanges,
    isToimintaalueChanges,
    isOpiskelijavuodetChanges,
    isMuutChanges,
    isAnyChanges,
    changeObjects
  ]);

  return (
    <React.Fragment>
      <h2 className="my-6">{formatMessage(wizard.pageTitle_2)}</h2>

      {!isAnyChanges && <p>{formatMessage(wizard.noChanges)}</p>}

      {isAnyChanges &&
      muutosperustelut.muutosperusteluList &&
      muutoshakemus &&
      koulutustyypit &&
      kohdetiedot ? (
        <React.Fragment>
          {(isTutkinnotChanges || isKoulutuksetChanges) && (
            <FormSection
              code={1}
              id="perustelut_tutkinnot"
              muutoshakemus={muutoshakemus}
              render={_props => (
                <React.Fragment>
                  {isTutkinnotChanges && (
                    <PerustelutTutkinnot
                      changeObjects={{
                        tutkinnot: R.prop("tutkinnot", changeObjects) || {},
                        perustelut: {
                          tutkinnot:
                            R.path(
                              ["perustelut", "tutkinnot"],
                              changeObjects
                            ) || {}
                        }
                      }}
                      kohde={R.find(
                        R.propEq("tunniste", "tutkinnotjakoulutukset")
                      )(kohteet)}
                      koulutukset={koulutukset}
                      koulutusalat={koulutusalat}
                      koulutustyypit={koulutustyypit.data}
                      lupa={lupa}
                      maaraystyyppi={maaraystyypitState.OIKEUS}
                      muutosperustelut={muutosperustelut}
                      lomakkeet={lomakkeet.perustelut.tutkinnot}
                      stateObject={R.path(["perustelut", "tutkinnot"])(
                        muutoshakemus
                      )}
                      {..._props}
                    />
                  )}
                  {isKoulutuksetChanges ? (
                    <PerustelutKoulutukset
                      changeObjects={{
                        koulutukset: R.prop("koulutukset", changeObjects),
                        perustelut: {
                          koulutukset: R.path(
                            ["perustelut", "koulutukset"],
                            changeObjects
                          )
                        }
                      }}
                      kohde={R.find(
                        R.propEq("tunniste", "tutkinnotjakoulutukset")
                      )(kohteet)}
                      koulutukset={koulutukset}
                      maaraystyyppi={maaraystyypitState.OIKEUS}
                      maaraykset={lupa.data.maaraykset}
                      lomakkeet={lomakkeet.perustelut.koulutukset}
                      stateObject={R.path([
                        "perustelut",
                        "koulutukset",
                        "valmentavatKoulutukset"
                      ])(muutoshakemus)}
                      {..._props}
                    />
                  ) : null}
                  {/* Attachments for Tutkinnot ja koulutukset */}
                  <FormSection
                    id="perustelut_liitteet"
                    className="my-0"
                    render={_props => (
                      <React.Fragment>
                        <PerustelutLiitteet
                          stateObject={R.path(
                            ["perustelut", "liitteet"],
                            muutoshakemus
                          )}
                          changeObjects={{
                            perustelut: R.path(
                              ["perustelut", "liitteet"],
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
              )}
              runOnStateUpdate={onStateUpdate}
              runOnChanges={onChangesUpdate}
              title={kohdetiedot[0].title}
            />
          )}
          {(isTutkintokieletChanges || isOpetuskieletChanges) && (
            <FormSection
              code={2}
              id="perustelut_kielet"
              muutoshakemus={muutoshakemus}
              render={_props => (
                <React.Fragment>
                  {isOpetuskieletChanges ? (
                    <PerustelutOpetuskielet
                      changeObjects={{
                        opetuskielet:
                          R.path(["kielet", "opetuskielet"], changeObjects) ||
                          [],
                        perustelut:
                          R.path(
                            ["perustelut", "kielet", "opetuskielet"],
                            changeObjects
                          ) || []
                      }}
                      kohde={R.find(
                        R.propEq("tunniste", "opetusjatutkintokieli")
                      )(kohteet)}
                      lupa={lupa}
                      maaraystyyppi={maaraystyypitState.OIKEUS}
                      opetuskielet={kielet.opetuskielet}
                      stateObject={R.path([
                        "perustelut",
                        "kielet",
                        "opetuskielet"
                      ])(muutoshakemus)}
                      {..._props}
                    />
                  ) : null}

                  {isTutkintokieletChanges ? (
                    <PerustelutTutkintokielet
                      changeObjects={{
                        tutkintokielet:
                          R.path(["kielet", "tutkintokielet"], changeObjects) ||
                          [],
                        perustelut:
                          R.path(
                            ["perustelut", "kielet", "tutkintokielet"],
                            changeObjects
                          ) || []
                      }}
                      kohde={R.find(
                        R.propEq("tunniste", "opetusjatutkintokieli")
                      )(kohteet)}
                      koulutukset={koulutukset}
                      maaraystyyppi={maaraystyypitState.OIKEUS}
                      maaraykset={lupa.data.maaraykset}
                      opetuskielet={kielet.opetuskielet}
                      stateObjects={{
                        tutkintokielet: R.path(["kielet", "tutkintokielet"])(
                          muutoshakemus
                        ),
                        perustelut: R.path([
                          "perustelut",
                          "kielet",
                          "tutkintokielet"
                        ])(muutoshakemus)
                      }}
                      {..._props}
                    />
                  ) : null}
                </React.Fragment>
              )}
              runOnStateUpdate={onStateUpdate}
              runOnChanges={onChangesUpdate}
              title={kohdetiedot[1].title}
            />
          )}
          {isToimintaalueChanges ? (
            <FormSection
              code={3}
              id="perustelut_toimintaalue"
              muutoshakemus={muutoshakemus}
              render={_props => (
                <React.Fragment>
                  {!!R.path(["toimintaalue"], changeObjects) ? (
                    <PerustelutToimintaalue
                      changeObjects={{
                        toimintaalue: R.path(["toimintaalue"], changeObjects),
                        perustelut: R.path(
                          ["perustelut", "toimintaalue"],
                          changeObjects
                        )
                      }}
                      stateObjects={{
                        perustelut: R.path(["perustelut", "toimintaalue"])(
                          muutoshakemus
                        )
                      }}
                      {..._props}
                    />
                  ) : null}
                </React.Fragment>
              )}
              runOnStateUpdate={onStateUpdate}
              runOnChanges={onChangesUpdate}
              title={kohdetiedot[2].title}
            />
          ) : null}
          {isOpiskelijavuodetChanges ? (
            <FormSection
              code={4}
              id="perustelut_opiskelijavuodet"
              muutoshakemus={muutoshakemus}
              render={_props => (
                <React.Fragment>
                  {!!R.path(["opiskelijavuodet"], changeObjects) ? (
                    <PerustelutOpiskelijavuodet
                      changeObjects={{
                        opiskelijavuodet: R.path(
                          ["opiskelijavuodet"],
                          changeObjects
                        ),
                        perustelut: R.path(
                          ["perustelut", "opiskelijavuodet"],
                          changeObjects
                        )
                      }}
                      kohde={R.find(R.propEq("tunniste", "opiskelijavuodet"))(
                        kohteet
                      )}
                      muutosperustelut={R.sortBy(R.prop("koodiArvo"))(
                        muutosperustelut.muutosperusteluList
                      )}
                      stateObject={R.path(["perustelut", "opiskelijavuodet"])(
                        muutoshakemus
                      )}
                      {..._props}
                    />
                  ) : null}
                </React.Fragment>
              )}
              runOnStateUpdate={onStateUpdate}
              runOnChanges={onChangesUpdate}
              title={kohdetiedot[3].title}
            />
          ) : null}
          {isMuutChanges ? (
            <FormSection
              code={5}
              id="perustelut_muut"
              muutoshakemus={muutoshakemus}
              render={_props => (
                <React.Fragment>
                  {!!R.path(["muut"], changeObjects) ? (
                    <PerustelutMuut
                      changeObjects={{
                        muut: R.path(["muut"], changeObjects),
                        perustelut: R.path(
                          ["perustelut", "muut"],
                          changeObjects
                        )
                      }}
                      kohde={R.find(R.propEq("tunniste", "muut"))(kohteet)}
                      maaraykset={lupa.data.maaraykset}
                      muut={muut}
                      stateObject={R.path(["perustelut", "muut"])(
                        muutoshakemus
                      )}
                      vankilat={vankilat}
                      {..._props}
                    />
                  ) : null}
                </React.Fragment>
              )}
              runOnStateUpdate={onStateUpdate}
              runOnChanges={onChangesUpdate}
              title={kohdetiedot[4].title}
            />
          ) : null}
          {/* Common attachments, the same also in Yhteenveto */}
          {isAnyChanges && (
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
          )}
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

MuutospyyntoWizardPerustelut.propTypes = {
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
  onStateUpdate: PropTypes.func,
  vankilat: PropTypes.array
};

export default injectIntl(MuutospyyntoWizardPerustelut);
