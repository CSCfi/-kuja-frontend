import React, { useContext, useEffect, useState } from "react";
import Section from "../../../../../../components/03-templates/Section";
import PerustelutKoulutukset from "./Perustelut/PerustelutKoulutukset";
import PerustelutMuut from "./Perustelut/PerustelutMuut";
import PerustelutTutkinnot from "./Perustelut/PerustelutTutkinnot";
import { MuutosperustelutContext } from "../../../../../../context/muutosperustelutContext";
import { fetchMuutosperustelut } from "../../../../../../services/muutosperustelut/actions";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import * as R from "ramda";

const MuutospyyntoWizardPerustelut = props => {
  const [kohteet, setKohteet] = useState(null);
  const [maaraystyypit, setMaaraystyypit] = useState({});
  const {
    state: muutosperustelut,
    dispatch: muutosperustelutDispatch
  } = useContext(MuutosperustelutContext);

  useEffect(() => {
    fetchMuutosperustelut()(muutosperustelutDispatch);
  }, [muutosperustelutDispatch]);

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
              />
            )}

            <PerustelutKoulutukset
              changes={
                props.muutoshakemus.backendChanges.tutkinnotjakoulutukset
              }
              kohde={kohteet.tutkinnotjakoulutukset}
              koulutukset={props.koulutukset}
              maaraystyyppi={maaraystyypit.OIKEUS}
              onUpdate={props.onUpdate}
            />
          </Section>

          <Section code={2} title={kohteet[1].title} />

          <Section code={3} title={kohteet[2].title} />

          <Section code={4} title={kohteet[3].title} />
          {R.keys(props.muutoshakemus.backendChanges.muut).length && (
            <PerustelutMuut
              backendChanges={props.muutoshakemus.backendChanges.muut}
              kohde={kohteet.muut}
              headingNumber={props.lupa.kohteet[5].headingNumber}
              maaraykset={props.lupa.data.maaraykset}
              muut={props.muut}
              onUpdate={props.onUpdate}
            />
          )}
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
