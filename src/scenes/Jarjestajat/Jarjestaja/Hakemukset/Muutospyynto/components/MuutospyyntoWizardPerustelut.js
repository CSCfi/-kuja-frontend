import React, { useContext, useEffect, useState, useCallback } from "react";
import Section from "../../../../../../components/03-templates/Section";
import PerustelutKoulutukset from "./Perustelut/PerustelutKoulutukset";
import PerustelutMuut from "./Perustelut/PerustelutMuut";
import PerustelutOpetuskielet from "./Perustelut/PerustelutOpetuskielet";
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

const MuutospyyntoWizardPerustelut = ({
  changeObjects,
  intl,
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
  const [kohdetiedot, setKohdetiedot] = useState(null);
  const [maaraystyypitState, setMaaraystyypitState] = useState({});
  const {
    state: muutosperustelut,
    dispatch: muutosperustelutDispatch
  } = useContext(MuutosperustelutContext);
  const { state: lomakkeet, dispatch: lomakkeetDispatch } = useContext(
    LomakkeetContext
  );

  // const handleChanges = useCallback(
  //   (sectionId, payload) => {
  //     onUpdate(Object.assign({}, { sectionId }, { ...payload }));
  //   },
  //   [onUpdate]
  // );

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

  return (
    <React.Fragment>
      {muutoshakemus && koulutustyypit && kohteet ? (
        <div>
          {muutosperustelut.muutosperusteluList && (
            <FormSection
              changeObjects={{
                tutkinnot: R.prop("tutkinnot", changeObjects) || {},
                perustelut: {
                  tutkinnot:
                    R.path(["perustelut", "tutkinnot"], changeObjects) || {}
                }
              }}
              code={1}
              id="perustelut_tutkinnot"
              render={props => (
                <PerustelutTutkinnot
                  kohde={kohdetiedot.tutkinnotjakoulutukset}
                  koulutukset={koulutukset}
                  koulutusalat={koulutusalat}
                  koulutustyypit={koulutustyypit.data}
                  lupa={lupa}
                  maaraystyyppi={maaraystyypitState.OIKEUS}
                  muutosperustelut={muutosperustelut}
                  lomakkeet={lomakkeet.perustelut.tutkinnot}
                  {...props}
                />
              )}
              runOnStateUpdate={onStateUpdate}
              runOnChanges={onChangesUpdate}
              title={kohdetiedot[0].title}
            />
          )}
          {/* <FormSection code={1} title={kohteet[0].title}>
            {muutosperustelut.muutosperusteluList && (
              <PerustelutTutkinnot
                changeObjects={{
                  tutkinnot: R.prop("tutkinnot", changeObjects) || {},
                  perustelut:
                    R.path(["perustelut", "tutkinnot"], changeObjects) ||
                    {}
                }}
                kohde={kohteet.tutkinnotjakoulutukset}
                koulutukset={koulutukset}
                koulutusalat={koulutusalat}
                koulutustyypit={koulutustyypit.data}
                lupa={lupa}
                maaraystyyppi={maaraystyypit.OIKEUS}
                muutosperustelut={muutosperustelut}
                onChangesUpdate={onChangesUpdate}
                onStateUpdate={onStateUpdate}
                lomakkeet={lomakkeet.perustelut.tutkinnot}
              />
            )} */}

          {/* {lomakkeet.perustelut.koulutukset ? (
              <PerustelutKoulutukset
                changes={changeObjects.koulutukset}
                kohde={kohteet.tutkinnotjakoulutukset}
                koulutukset={koulutukset}
                maaraystyyppi={maaraystyypit.OIKEUS}
                onUpdate={onUpdate}
                lomakkeet={lomakkeet.perustelut.koulutukset}
              />
            ) : null} */}
          {/* </FormSection> */}

          {/* {!!changeObjects.kielet.opetuskielet ? (
            <Section code={2} title={kohteet[1].title}>
              <PerustelutOpetuskielet
                changes={changeObjects.kielet.opetuskielet}
                opetuskielet={kielet.opetuskielet}
                kohde={lupa.kohteet[2]}
                onUpdate={onUpdate}
                lupa={lupa}
                maaraystyyppi={maaraystyyppi}
              />
            </Section>
          ) : null}

          {!!changeObjects.toimintaalue.length ? (
            <PerustelutToimintaalue
              changes={changeObjects.toimintaalue}
              handleChanges={handleChanges}
              headingNumber={3}
              title={kohteet[2].title}
            ></PerustelutToimintaalue>
          ) : null}

          <Section code={4} title={kohteet[3].title}></Section>

          {!!R.keys(changeObjects.muut).length ? (
            <PerustelutMuut
              changes={changeObjects.muut}
              handleChanges={handleChanges}
              kohde={kohteet.muut}
              headingNumber={lupa.kohteet[5].headingNumber}
              maaraykset={lupa.data.maaraykset}
              muut={muut}
              title={kohteet[4].title}
            />
          ) : null} */}
        </div>
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
  onStateUpdate: PropTypes.func
};

export default injectIntl(MuutospyyntoWizardPerustelut);
