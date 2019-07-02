import _ from "lodash";
import React from "react";
import Section from "../../../../../../components/03-templates/Section";
import Opiskelijavuodet from "../components/Opiskelijavuodet";
import { injectIntl } from "react-intl";
import commonMessages from "../../../../../../i18n/definitions/common";
import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants";
import {
  MUUTOS_TYPES,
} from "../modules/uusiHakemusFormConstants";

const MuutospyyntoWizardOpiskelijavuodet = React.memo(props => {
  // const sectionId = "opiskelijavuodet";

  const { lupa, opiskelijavuosimuutoksetValue, muutmuutoksetValue } = props;
  const { kohteet } = lupa;
  const { headingNumber, heading, opiskelijavuodet } = kohteet[4];
  const { muutCombined } = kohteet[5];

  // Vahimmaisopiskelijavuosimäärä
  const obj = _.find(opiskelijavuodet, obj => {
    return obj.tyyppi === "Ammatillinen koulutus";
  });
  let vahimmaisArvoInitial = 0;
  if (obj) {
    vahimmaisArvoInitial = parseInt(obj.arvo, 10);
  }

  // Vaativa erityisopetus (2)

  // tarkistetaan onko voimassaolevassa luvassa tälle määräystä:
  const vaativaTukiVoimassa = _.find(muutCombined, obj => {
    return obj.koodiarvo === "2";
  });
  // tarkitetaan onko käyttäjä valinnut lisättäväksi lupaan kohdassa 5
  const vaativaTukiLisattava = _.find(muutmuutoksetValue, obj => {
    return obj.koodiarvo === "2";
  });
  // oletusarvo
  let vaativaArvoInitial = undefined;
  let showVaativa = false;

  if (vaativaTukiVoimassa) {
    showVaativa = true;
  }

  if (vaativaTukiLisattava) {
    vaativaTukiLisattava.type === MUUTOS_TYPES.ADDITION
      ? (showVaativa = true)
      : (showVaativa = false);
  }

  // Sisäoppilaitos (4)

  // tarkistetaan onko voimassaolevassa luvassa tälle määräystä:
  const sisaoppilaitosVoimassa = _.find(muutCombined, obj => {
    return obj.koodiarvo === "4";
  });

  // tarkistetaan käyttäjä valinnut lisättäväksi lupaan kohdassa 5:
  const sisaoppilaitosLisattava = _.find(muutmuutoksetValue, obj => {
    return obj.koodiarvo === "4";
  });

  // oletusarvo
  let sisaoppilaitosArvoInitial = undefined;
  let showSisaoppilaitos = false;

  if (sisaoppilaitosVoimassa) {
    showSisaoppilaitos = true;
  }

  if (sisaoppilaitosLisattava) {
    sisaoppilaitosLisattava.type === MUUTOS_TYPES.ADDITION
      ? (showSisaoppilaitos = true)
      : (showSisaoppilaitos = false);
  }

  let haettuVahimmaismaaraObj = _.find(opiskelijavuosimuutoksetValue, value => {
    return value.kategoria === "vahimmaisopiskelijavuodet";
  });
  let muutos = 0;

  if (haettuVahimmaismaaraObj) {
    muutos = haettuVahimmaismaaraObj.arvo - vahimmaisArvoInitial;
    if (muutos > 0) muutos = "+" + muutos;
  }

  let haettuVaativaObj = _.find(opiskelijavuosimuutoksetValue, value => {
    return value.kategoria === "vaativa";
  });
  let muutosVaativa = 0;

  if (haettuVaativaObj) {
    muutosVaativa =
      Number.parseInt(haettuVaativaObj.arvo, 10) -
      (vaativaArvoInitial ? vaativaArvoInitial : 0);
    if (muutosVaativa > 0) muutosVaativa = "+" + muutosVaativa;
  }

  let haettuSisaoppilaitosObj = _.find(opiskelijavuosimuutoksetValue, value => {
    return value.kategoria === "sisaoppilaitos";
  });
  let muutosSisaoppilaitos = 0;

  if (haettuSisaoppilaitosObj) {
    muutosSisaoppilaitos =
      Number.parseInt(haettuSisaoppilaitosObj.arvo, 10) -
      (sisaoppilaitosArvoInitial ? sisaoppilaitosArvoInitial : 0);
    if (muutosSisaoppilaitos > 0)
      muutosSisaoppilaitos = "+" + muutosSisaoppilaitos;
  }

  return (
    <Section code={headingNumber} title={heading}>
      <Opiskelijavuodet
        initialValue={vahimmaisArvoInitial}
        mainTitle={
          MUUTOS_WIZARD_TEKSTIT.MUUTOS_OPISKELIJAVUODET.VAHIMMAISMAARA.FI
        }
        titles={[
          props.intl.formatMessage(commonMessages.current),
          props.intl.formatMessage(commonMessages.applyFor),
          props.intl.formatMessage(commonMessages.difference)
        ]}
      />

      {showVaativa ? (
        <React.Fragment>
          <Opiskelijavuodet
            isRequired={true}
            initialValue={vaativaArvoInitial}
            mainTitle={
              MUUTOS_WIZARD_TEKSTIT.MUUTOS_OPISKELIJAVUODET.VAATIVA_TUKI.FI
            }
            titles={[
              props.intl.formatMessage(commonMessages.current),
              props.intl.formatMessage(commonMessages.applyFor),
              props.intl.formatMessage(commonMessages.difference)
            ]}
          />
        </React.Fragment>
      ) : null}

      {showSisaoppilaitos ? (
        <React.Fragment>
          <Opiskelijavuodet
            isRequired={true}
            initialValue={vaativaArvoInitial}
            mainTitle={
              MUUTOS_WIZARD_TEKSTIT.MUUTOS_OPISKELIJAVUODET.SISAOPPILAITOS.FI
            }
            titles={[
              props.intl.formatMessage(commonMessages.current),
              props.intl.formatMessage(commonMessages.applyFor),
              props.intl.formatMessage(commonMessages.difference)
            ]}
          />
        </React.Fragment>
      ) : null}
    </Section>
  );
});

export default injectIntl(MuutospyyntoWizardOpiskelijavuodet);
