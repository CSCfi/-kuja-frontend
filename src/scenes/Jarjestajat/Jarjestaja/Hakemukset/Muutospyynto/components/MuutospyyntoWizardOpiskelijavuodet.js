import _ from "lodash";
import React, { useEffect, useState } from "react";
import Section from '../../../../../../components/03-templates/Section'
import { injectIntl } from "react-intl";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import wizardMessages from "../../../../../../i18n/definitions/wizard";

import { ContentContainer } from "../../../../../../modules/elements";
import { Kohdenumero, Otsikko, Row } from "./MuutospyyntoWizardComponents";
import { getOpiskelijavuosiIndex } from "../../../../../../services/koulutukset/koulutusUtil";
import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants";
import {
  MUUTOS_TYPES,
  OPISKELIJAVUODET_KATEGORIAT
} from "../modules/uusiHakemusFormConstants";
import {
  getKohdeByTunniste,
  getMaaraystyyppiByTunniste
} from "services/muutospyynnot/muutospyyntoUtil";
import { KOHTEET, MAARAYSTYYPIT } from "../../../modules/constants";

const Voimassaoleva = styled.div`
  flex: 1;
  margin: auto;
  margin-right: 10px;
`;
const HaettuMuutos = styled.div`
  flex: 1;
  margin: auto;
  margin-right: 10px;
`;
const Yhteensa = styled.div`
  flex: 1;
  margin: auto;
  margin-right: 10px;
`;

const Pakollinen = styled.h4`
  background-color: #ffc;
  padding: 3px;
`;

const MuutospyyntoWizardOpiskelijavuodet = React.memo((props) => {

  const sectionId = "opiskelijavuodet";

  const {
    lupa,
    opiskelijavuosimuutoksetValue,
    muutmuutoksetValue
  } = props;
  const { kohteet } = lupa;
  const { headingNumber, opiskelijavuodet } = kohteet[4];
  const heading = props.intl.formatMessage(wizardMessages.header_section4)
  const { muutCombined } = kohteet[5];

  // componentDidUpdate() {
  //   const fixedHeaderHeight = 100;
  //   const marginaali = 10;
  //   const { opiskelijavuosimuutoksetValue, muutmuutoksetValue } = this.props;

  //   const pakollisetVuosikentat = [
  //     { koodiarvo: "2", ref: this.refs.opiskelijavuodetVaativatuki },
  //     { koodiarvo: "4", ref: this.refs.opiskelijavuodetSisaoppilaitos }
  //   ];

  //   pakollisetVuosikentat.some(kentta => {
  //     // Jos lupaan on lisätty vähimmäisvuodet vaativa tehtävä, kentän arvo on tyhjä
  //     // eikä kenttä ole näkyvissä, skrollaa kentän luo
  //     if (
  //       _.find(muutmuutoksetValue, obj => {
  //         return (
  //           obj.koodiarvo === kentta.koodiarvo &&
  //           obj.type === MUUTOS_TYPES.ADDITION
  //         );
  //       }) &&
  //       (!opiskelijavuosimuutoksetValue ||
  //         !_.find(opiskelijavuosimuutoksetValue, obj => {
  //           return obj.koodiarvo === kentta.koodiarvo;
  //         }) ||
  //         _.find(opiskelijavuosimuutoksetValue, obj => {
  //           return obj.koodiarvo === kentta.koodiarvo && !obj.arvo;
  //         }))
  //     ) {
  //       const elementti = ReactDOM.findDOMNode(kentta.ref);
  //       if (elementti) {
  //         // Skrollaa elementti ensin sivun yläreunaan ja siirrä sitten alaspäin,
  //         // jotta elementti ei jää kiinteän headerin taakse
  //         elementti.scrollIntoView();
  //         const scrolledY = window.scrollY;
  //         if (scrolledY) {
  //           window.scroll(0, scrolledY - fixedHeaderHeight - marginaali);
  //         }
  //       }
  //       // Skrollaa vain yhden kentän luo
  //       return true;
  //     }
  //     return false;
  //   });
  // }

  // Vahimmaisopiskelijavuosimäärä
  const obj = _.find(opiskelijavuodet, obj => {
    return obj.tyyppi === "Ammatillinen koulutus";
  });
  let vahimmaisArvoInitial = 0;
  if (obj) {
    vahimmaisArvoInitial = obj.arvo;
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

  let haettuVahimmaismaaraObj = _.find(
    opiskelijavuosimuutoksetValue,
    value => {
      return value.kategoria === "vahimmaisopiskelijavuodet";
    }
  );
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

  let haettuSisaoppilaitosObj = _.find(
    opiskelijavuosimuutoksetValue,
    value => {
      return value.kategoria === "sisaoppilaitos";
    }
  );
  let muutosSisaoppilaitos = 0;

  if (haettuSisaoppilaitosObj) {
    muutosSisaoppilaitos =
      Number.parseInt(haettuSisaoppilaitosObj.arvo, 10) -
      (sisaoppilaitosArvoInitial ? sisaoppilaitosArvoInitial : 0);
    if (muutosSisaoppilaitos > 0)
      muutosSisaoppilaitos = "+" + muutosSisaoppilaitos;
  }

    return (
      <Section
        code={headingNumber}
        title={heading}
      >
        <Row>
          <h4>
            {MUUTOS_WIZARD_TEKSTIT.MUUTOS_OPISKELIJAVUODET.VAHIMMAISMAARA.FI}
          </h4>
          <div className="flex">
            <Voimassaoleva>NYKYINEN</Voimassaoleva>
            <HaettuMuutos>HAETTAVA</HaettuMuutos>
            <Yhteensa>MUUTOS</Yhteensa>
          </div>
          <div className="flex">
            <Voimassaoleva>{vahimmaisArvoInitial}</Voimassaoleva>
            <HaettuMuutos>
              <TextField type="number"/>
            </HaettuMuutos>
            <Yhteensa>{muutos}</Yhteensa>
          </div>
        </Row>

        {showVaativa ? (
          <Row>
            <Pakollinen>
              {MUUTOS_WIZARD_TEKSTIT.MUUTOS_OPISKELIJAVUODET.VAATIVA_TUKI.FI}
            </Pakollinen>
            <div className="flex">
              <Voimassaoleva>NYKYINEN</Voimassaoleva>
              <HaettuMuutos>HAETTAVA</HaettuMuutos>
              <Yhteensa>MUUTOS</Yhteensa>
            </div>
            <div className="flex">
              <Voimassaoleva>{vaativaArvoInitial}</Voimassaoleva>
              <HaettuMuutos>
                <TextField type="number"/> />
              </HaettuMuutos>
              <Yhteensa>{muutosVaativa}</Yhteensa>
            </div>
          </Row>
        ) : null}

        {showSisaoppilaitos ? (
          <Row>
            <Pakollinen>
              {MUUTOS_WIZARD_TEKSTIT.MUUTOS_OPISKELIJAVUODET.SISAOPPILAITOS.FI}
            </Pakollinen>
            <div className="flex">
              <Voimassaoleva>NYKYINEN</Voimassaoleva>
              <HaettuMuutos>HAETTAVA</HaettuMuutos>
              <Yhteensa>MUUTOS</Yhteensa>
            </div>
            <div className="flex">
              <Voimassaoleva>{sisaoppilaitosArvoInitial}</Voimassaoleva>
              <HaettuMuutos>
                <TextField type="number"/>
              </HaettuMuutos>
              <Yhteensa>{muutosSisaoppilaitos}</Yhteensa>
            </div>
          </Row>
        ) : null}
      </Section>
    );
  });

//   renderOpiskelijavuodet(props) {
//     const {
//       initialValue,
//       editValues,
//       fields,
//       kategoria,
//       koodiarvo,
//       koodisto,
//       tyyppi
//     } = props;

//     let arvo = initialValue;

//     if (editValues) {
//       // aseta uusi arvo
//       let obj = _.find(editValues, value => {
//         return value.kategoria === kategoria;
//       });
//       if (obj) {
//         arvo = obj.arvo;
//       }
//     }

//     const kohde = getKohdeByTunniste(KOHTEET.OPISKELIJAVUODET);
//     const tunniste =
//       kategoria === OPISKELIJAVUODET_KATEGORIAT.VAHIMMAISOPISKELIJAVUODET
//         ? MAARAYSTYYPIT.OIKEUS
//         : kategoria === OPISKELIJAVUODET_KATEGORIAT.SISAOPPILAITOS ||
//           OPISKELIJAVUODET_KATEGORIAT.VAATIVA
//         ? MAARAYSTYYPIT.RAJOITE
//         : MAARAYSTYYPIT.OIKEUS;
//     const maaraystyyppi = getMaaraystyyppiByTunniste(tunniste);

//     return (
//       <input
//         type="number"
//         value={arvo}
//         onChange={e => {
//           const { value } = e.target;
//           if (editValues) {
//             const i = getOpiskelijavuosiIndex(editValues, koodiarvo);
//             if (i !== undefined) {
//               if (
//                 (value === "" && initialValue === undefined) ||
//                 value === initialValue
//               ) {
//                 fields.remove(i);
//               } else {
//                 const obj = {
//                   type: tyyppi,
//                   kategoria,
//                   koodiarvo,
//                   koodisto,
//                   kohde,
//                   maaraystyyppi,
//                   arvo: value,
//                   meta: { perusteluteksti: null },
//                   muutosperustelukoodiarvo: null
//                 };
//                 fields.remove(i);
//                 fields.insert(i, obj);
//               }
//             } else {
//               fields.push({
//                 type: tyyppi,
//                 kategoria,
//                 koodiarvo,
//                 koodisto,
//                 kohde,
//                 maaraystyyppi,
//                 arvo: value,
//                 meta: { perusteluteksti: null },
//                 muutosperustelukoodiarvo: null
//               });
//             }
//           } else {
//             fields.push({
//               type: tyyppi,
//               kategoria,
//               koodiarvo,
//               koodisto,
//               kohde,
//               maaraystyyppi,
//               arvo: value,
//               meta: { perusteluteksti: null },
//               muutosperustelukoodiarvo: null
//             });
//           }
//         }}
//       />
//     );
//   }
// }

export default injectIntl(MuutospyyntoWizardOpiskelijavuodet);