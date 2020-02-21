import _ from "lodash";
import React from "react";
import styled from "styled-components";

import Koulutusala from "./Koulutusala";
import MuuMaarays from "./MuuMaarays";
import VT from "./VT";

import { KOHTEET } from "../modules/constants";
import { FONT_STACK } from "../../../modules/styles";
import { TUTKINTO_TEKSTIT, LUPA_TEKSTIT } from "../modules/constants";
import Tutkintokieli from "./Tutkintokieli";
import Section from "../../../components/03-templates/Section";

const Otsikko = styled.div`
  font-size: 16px;
`;

const H3 = styled.h3`
  text-transform: uppercase;
  margin-left: 30px;
  font-size: 18px;
  margin-left: 10px;
`;

const List = styled.p`
  margin-left: 30px;
  margin-bottom: 20px;
`;
const Capitalized = styled.span`
  text-transform: capitalize;
  &:after {
    content: ", ";
  }
  &:last-child:after {
    content: "";
  }
`;
const MuutToimialueet = styled.p`
  margin-bottom: 20px;
`;

const Bold = styled.span`
  font-family: ${FONT_STACK.GOTHAM_NARROW_BOLD};
`;

const Tietoa = styled.div`
  margin: 20px 0 20px 0;
`;

const Tutkinnot = styled.div`
  margin: 0 0 10px 0;
`;

const Koulutukset = styled.div``;

const VALMATELMA = styled.div`
  margin: 0 0 20px 0;
`;

const OpiskelijavuosiRajoitukset = styled.div`
  margin-left: 30px;
  margin-bottom: 20px;
`;

const KohdeKuvaus = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const LupaSection = props => {
  const { kohde, ytunnus } = props;

  // const { isRemoving } = this.state

  if (kohde) {
    const { tunniste, heading, headingNumber } = kohde;

    // Logiikka eri kohteille
    switch (tunniste) {
      // Kohde 1: Tutkinnot
      case KOHTEET.TUTKINNOT: {
        const { maaraykset, muutMaaraykset } = kohde;

        // VALMA ja TELMA
        const vt = muutMaaraykset.filter(
          item => item.koodi === "999901" || item.koodi === "999903"
        );

        return (
          <div className="border-b border-b-gray">
            <Otsikko>{TUTKINTO_TEKSTIT.otsikkoKaikkiLuvat.FI}</Otsikko>

            <Section code={headingNumber} title={heading}>
              <Tutkinnot>
                {_.map(maaraykset, (ala, i) => (
                  <Koulutusala key={i} {...ala} />
                ))}
              </Tutkinnot>
              <Tietoa>{TUTKINTO_TEKSTIT.otsikkoTaydentava.FI}</Tietoa>

              <Koulutukset>
                {vt && vt[0] && (
                  <VALMATELMA>
                    {/* Selite vain yhden kerran */}
                    <p>{vt[0].selite}</p>
                    {_.map(vt, (items, i) => (
                      <VT key={"vt" + i} {...items} />
                    ))}
                  </VALMATELMA>
                )}
                {_.map(
                  muutMaaraykset.filter(
                    item =>
                      item.koodisto === "koulutus" ||
                      item.koodisto ===
                        "ammatilliseentehtavaanvalmistavakoulutus"
                  ),
                  (items, i) => (
                    <MuuMaarays key={i} {...items} />
                  )
                )}
                {_.map(
                  muutMaaraykset.filter(
                    item => item.koodisto === "kuljettajakoulutus"
                  ),
                  (items, i) => (
                    <MuuMaarays key={"k" + i} {...items} />
                  )
                )}
                {_.map(
                  muutMaaraykset.filter(
                    item => item.koodisto === "oivatyovoimakoulutus"
                  ),
                  (items, i) => (
                    <MuuMaarays key={"t" + i} {...items} />
                  )
                )}
              </Koulutukset>
            </Section>
          </div>
        );
      }

      // Kohde 2: Opetuskieli
      case KOHTEET.KIELI: {
        const {
          kohdeKuvaus,
          kohdeArvot,
          tutkinnotjakieletEn,
          tutkinnotjakieletSv,
          tutkinnotjakieletFi,
          tutkinnotjakieletRu
        } = kohde;

        return (
          <div className="border-b border-b-gray">
            <Section code={headingNumber} title={heading}>
              <p>{kohdeKuvaus}</p>
              <List>
                {_.map(kohdeArvot, (arvo, i) => (
                  <Capitalized key={i}>{_.capitalize(arvo.label)}</Capitalized>
                ))}
              </List>
              <Tutkinnot>
                {tutkinnotjakieletEn.length > 1
                  ? LUPA_TEKSTIT.KIELI.LISA_ENGLANTI_MONIKKO.FI
                  : null}
                {tutkinnotjakieletEn.length === 1
                  ? LUPA_TEKSTIT.KIELI.LISA_ENGLANTI_YKSIKKO.FI
                  : null}
                {_.map(tutkinnotjakieletEn, (obj, i) => (
                  <Tutkintokieli key={i} {...obj} />
                ))}

                {tutkinnotjakieletSv.length > 1
                  ? LUPA_TEKSTIT.KIELI.LISA_RUOTSI_MONIKKO.FI
                  : null}
                {tutkinnotjakieletSv.length === 1
                  ? LUPA_TEKSTIT.KIELI.LISA_RUOTSI_YKSIKKO.FI
                  : null}
                {_.map(tutkinnotjakieletSv, (obj, i) => (
                  <Tutkintokieli key={i} {...obj} />
                ))}

                {tutkinnotjakieletFi.length > 1
                  ? LUPA_TEKSTIT.KIELI.LISA_SUOMI_MONIKKO.FI
                  : null}
                {tutkinnotjakieletFi.length === 1
                  ? LUPA_TEKSTIT.KIELI.LISA_SUOMI_YKSIKKO.FI
                  : null}
                {_.map(tutkinnotjakieletFi, (obj, i) => (
                  <Tutkintokieli key={i} {...obj} />
                ))}

                {tutkinnotjakieletRu.length > 1
                  ? LUPA_TEKSTIT.KIELI.LISA_VENAJA_MONIKKO.FI
                  : null}
                {tutkinnotjakieletRu.length === 1
                  ? LUPA_TEKSTIT.KIELI.LISA_VENAJA_YKSIKKO.FI
                  : null}
                {_.map(tutkinnotjakieletRu, (obj, i) => (
                  <Tutkintokieli key={i} {...obj} />
                ))}
              </Tutkinnot>
            </Section>
          </div>
        );
      }

      // Kohde 3: Toiminta-alueet
      case KOHTEET.TOIMIALUE: {
        const { kohdeKuvaus, maakunnat, kunnat } = kohde;

        return (
          <div className="border-b border-b-gray">
            <Section code={headingNumber} title={heading}>
              <p>{kohdeKuvaus}</p>
              <List>
                {_.map(maakunnat, (maakunta, i) => (
                  <Capitalized key={i}>{maakunta.arvo}</Capitalized>
                ))}
              </List>
              <List>
                {_.map(kunnat, (kunta, i) => (
                  <Capitalized key={i}>{kunta.arvo}</Capitalized>
                ))}
              </List>
              {maakunnat.length > 0 || kunnat.length > 0 ? (
                <MuutToimialueet>
                  {LUPA_TEKSTIT.TOIMINTA_ALUE.VALTAKUNNALLINEN.FI}
                </MuutToimialueet>
              ) : null}
            </Section>
          </div>
        );
      }

      // Kohde 4: Opiskelijavuodet
      case KOHTEET.OPISKELIJAVUODET: {
        const { opiskelijavuodet, rajoitukset, kohdeKuvaus } = kohde;
        return (
          <div className="border-b border-b-gray">
            <Section code={headingNumber} title={heading}>
              {_.map(opiskelijavuodet, (obj, i) => {
                const { arvo } = obj;
                return (
                  <span key={i}>
                    {LUPA_TEKSTIT.OPISKELIJAVUODET.VAHIMMAISMAARA.FI}&nbsp;
                    {arvo}.
                  </span>
                );
              })}
              <KohdeKuvaus>
                {ytunnus === "0244767-4"
                  ? LUPA_TEKSTIT.OPISKELIJAVUODET.VALTIO.FI
                  : kohdeKuvaus}
              </KohdeKuvaus>
              {_.map(rajoitukset, (obj, i) => {
                const { tyyppi, arvo } = obj;
                return (
                  <OpiskelijavuosiRajoitukset key={i}>
                    {tyyppi}&nbsp;{LUPA_TEKSTIT.OPISKELIJAVUODET.ENINTAAN.FI}{" "}
                    {arvo} {LUPA_TEKSTIT.OPISKELIJAVUODET.OPISKELIJAVUOTTA.FI}
                  </OpiskelijavuosiRajoitukset>
                );
              })}
            </Section>
          </div>
        );
      }

      // Kohde 5: Muut määräykset
      case KOHTEET.MUUT: {
        const { muut, vaativat, vankilat, kokeilut } = kohde;

        return (
          <div>
            <Section code={headingNumber} title={heading}>
              {_.map(muut, (muu, i) => {
                const { tyyppi, kuvaus } = muu;
                return (
                  <div key={i}>
                    <h4>
                      <Bold>{tyyppi}</Bold>
                    </h4>
                    <p>{kuvaus}</p>
                    <br/>
                  </div>
                );
              })}

              {vaativat.length > 0 ? (
                <h4>
                  <Bold>{vaativat[0].tyyppi}</Bold>
                </h4>
              ) : null}
              {_.map(vaativat, (vaativa, i) => {
                const { kuvaus } = vaativa;
                return (
                  <div key={i}>
                    <p>{kuvaus}</p>
                  </div>
                );
              })}
              {kokeilut.length > 0 ? (
                <h4>
                  <Bold>{kokeilut[0].tyyppi}</Bold>
                </h4>
              ) : null}
              {_.map(kokeilut, (kokeilu, i) => {
                const { kuvaus } = kokeilu;
                return (
                  <div key={i}>
                    <p>{kuvaus}</p>
                  </div>
                );
              })}
              {vankilat.length > 0 ? (
                <h4>
                  <Bold>{vankilat[0].tyyppi}</Bold>
                </h4>
              ) : null}
              {_.map(vankilat, (vankila, i) => {
                const { kuvaus } = vankila;
                return (
                  <div key={i}>
                    <p>{kuvaus}</p>
                  </div>
                );
              })}

              {kokeilut.length === 0 &&
              vankilat.length === 0 &&
              vaativat.length === 0 &&
              muut.length === 0 ? (
                <p>{LUPA_TEKSTIT.MUUT.EI_MAARAYKSIA.FI}</p>
              ) : null}
            </Section>
          </div>
        );
      }

      default: {
        return (
          <div className="border-b border-b-gray">
            <Section code={headingNumber} title={heading} />
          </div>
        );
      }
    }
  } else {
    return (
      <div className="border-b border-b-gray">
        <H3>Ei kohdetietoja</H3>
      </div>
    );
  }
};

export default LupaSection;
