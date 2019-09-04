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

const MuutospyyntoWizardPerustelut = props => {
  const [kohteet, setKohteet] = useState(null);
  const [maaraystyypit, setMaaraystyypit] = useState({});
  const {
    state: muutosperustelut,
    dispatch: muutosperustelutDispatch
  } = useContext(MuutosperustelutContext);
  const { state: lomakkeet, dispatch: lomakkeetDispatch } = useContext(
    LomakkeetContext
  );
  const { onUpdate } = props;

  const handleChanges = useCallback(
    (sectionId, payload) => {
      onUpdate(Object.assign({}, { sectionId }, { ...payload }));
    },
    [onUpdate]
  );

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
        R.toUpper(props.intl.locale)
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
  }, [
    lomakkeetDispatch,
    muutosperustelut,
    props.intl.locale
  ]);

  useEffect(() => {
    const kohteet = R.map(kohde => {
      return {
        title: R.path(["meta", "otsikko", [props.intl.locale]], kohde),
        code: R.find(R.propEq("tunniste", kohde.tunniste))(props.lupa.kohteet)
      };
    }, props.kohteet);
    setKohteet(kohteet);
  }, [props.intl.locale, props.kohteet, props.lupa.kohteet]);

  useEffect(() => {
    console.info(props.muutoshakemus);
  }, [props.muutoshakemus]);

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
      {props.muutoshakemus && kohteet && (
        <div>
          <Section code={1} title={kohteet[0].title}>
            {muutosperustelut.muutosperusteluList && (
              <PerustelutTutkinnot
                backendChanges={
                  props.muutoshakemus.backendChanges.tutkinnotjakoulutukset
                }
                kohde={kohteet.tutkinnotjakoulutukset}
                koulutukset={props.koulutukset}
                koulutusalat={props.koulutusalat}
                koulutustyypit={props.koulutustyypit.data}
                lupa={props.lupa}
                maaraystyyppi={maaraystyypit.OIKEUS}
                muutosperustelut={muutosperustelut}
                onUpdate={props.onUpdate}
                lomakkeet={lomakkeet.perustelut.tutkinnot}
              />
            )}

            {lomakkeet.perustelut.koulutukset ? (
              <PerustelutKoulutukset
                changes={
                  props.muutoshakemus.backendChanges.tutkinnotjakoulutukset
                }
                kohde={kohteet.tutkinnotjakoulutukset}
                koulutukset={props.koulutukset}
                maaraystyyppi={maaraystyypit.OIKEUS}
                onUpdate={props.onUpdate}
                lomakkeet={lomakkeet.perustelut.koulutukset}
              />
            ) : null}
          </Section>

          {!!props.muutoshakemus.backendChanges.kielet.opetuskielet.length ||
          !!props.muutoshakemus.backendChanges.kielet.opetuskielet.length ? (
            <Section code={2} title={kohteet[1].title}>
              {!!props.muutoshakemus.backendChanges.kielet.opetuskielet
                .length ? (
                <PerustelutOpetuskielet
                  changes={
                    props.muutoshakemus.backendChanges.kielet.opetuskielet
                  }
                  opetuskielet={props.kielet.opetuskielet}
                  kohde={props.lupa.kohteet[2]}
                  onUpdate={props.onUpdate}
                  lupa={props.lupa}
                  maaraystyyppi={props.maaraystyyppi}
                />
              ) : null}
            </Section>
          ) : null}

          {!!props.muutoshakemus.backendChanges.toimintaalue.length ? (
            <PerustelutToimintaalue
              changes={props.muutoshakemus.backendChanges.toimintaalue}
              handleChanges={handleChanges}
              headingNumber={3}
              title={kohteet[2].title}
            ></PerustelutToimintaalue>
          ) : null}

          <Section code={4} title={kohteet[3].title}></Section>

          {!!R.keys(props.muutoshakemus.backendChanges.muut).length ? (
            <PerustelutMuut
              backendChanges={props.muutoshakemus.backendChanges.muut}
              handleChanges={handleChanges}
              kohde={kohteet.muut}
              headingNumber={props.lupa.kohteet[5].headingNumber}
              maaraykset={props.lupa.data.maaraykset}
              muut={props.muut}
              title={kohteet[4].title}
            />
          ) : null}
        </div>
      )}
    </React.Fragment>
  );
};

MuutospyyntoWizardPerustelut.propTypes = {
  kohteet: PropTypes.array,
  koulutukset: PropTypes.object,
  koulutusalat: PropTypes.object,
  koulutustyypit: PropTypes.object,
  maaraystyypit: PropTypes.array,
  muut: PropTypes.object,
  onUpdate: PropTypes.func,
  lupa: PropTypes.object,
  muutoshakemus: PropTypes.object
};

export default injectIntl(MuutospyyntoWizardPerustelut);
