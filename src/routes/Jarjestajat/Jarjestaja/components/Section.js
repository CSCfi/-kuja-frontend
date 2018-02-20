import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'

import Koulutusala from './Koulutusala'

import { parseLocalizedField } from "../../../../modules/helpers"
import { KOHTEET, KOODISTOT, LUPA_TEKSTIT, TUTKINTO_TEKSTIT } from '../modules/constants'
import { COLORS, FONT_STACK } from "../../../../modules/styles"
import MuuMaarays from './MuuMaarays'

const SectionWrapper = styled.div`
  margin-left: 30px;
  position: relative;
  border-bottom: 1px solid ${COLORS.BORDER_GRAY};
  padding: 0 0 26px;
  
  &:last-child {
    border-bottom: none;
  }
`

const Span = styled.span`
  font-size: 20px;
  position: absolute;
  left: -30px;
`

const H3 = styled.h3`
  text-transform: uppercase;
  font-size: 20px;
`

const Capitalized = styled.span`
  text-transform: capitalize;
  margin-left: 30px;
`

const Bold = styled.span`
  font-family: ${FONT_STACK.GOTHAM_NARROW_BOLD};
`

const Tutkinnot = styled.div`
  margin-bottom: 30px;
`

const MuutMaaraykset = styled.div`
  margin-bottom: 30px;
`

const Section = (props) => {
  const { heading, target, maaraykset } = props

  if (maaraykset) {
    let tutkinnot = []
    let muutMaaraykset = []

    // kohdeid = 1: Erikoiskäsittely tutkinnoille ja koulutuksille
    if (Number(target) === KOHTEET.TUTKINNOT) {
      // Parsitaan aloittain
      _.forEach(maaraykset, (maarays) => {
        // Käsitellään määräykset koodistoittain

        const { koodisto } = maarays

        switch (koodisto) {
          case KOODISTOT.KOULUTUS: {
            const { koodi, ylaKoodit, aliMaaraykset } = maarays
            const { koodiArvo, metadata } = koodi
            const tutkintoNimi = parseLocalizedField(metadata)
            let tutkinto = {}

            // Käsitellään poikkeukset: valma (999901) ja telma (999903)
            if (koodiArvo === "999901") {
              muutMaaraykset.push({
                koodi: koodiArvo,
                nimi: tutkintoNimi,
                selite: TUTKINTO_TEKSTIT.valma.selite,
                indeksi: muutMaaraykset.length + 1
              })
              return
            }

            if (koodiArvo === "999903") {
              muutMaaraykset.push({
                koodi: koodiArvo,
                nimi: tutkintoNimi,
                selite: TUTKINTO_TEKSTIT.telma.selite,
                indeksi: muutMaaraykset.length + 1
              })
              return
            }

            // Alimääräykset
            if (aliMaaraykset) {
              tutkinto.rajoitteet = []
              _.forEach(aliMaaraykset, (alimaarays) => {
                const { koodi } = alimaarays
                const { koodiArvo, metadata } = koodi
                const nimi = parseLocalizedField(metadata)
                tutkinto.rajoitteet.push({ koodi: koodiArvo, nimi })
              })
            }

            // Määritetään määräyksissä olevat alat yläkoodeista
            _.forEach(ylaKoodit, (ylaKoodi) => {
              const ylaKoodiKoodiArvo = ylaKoodi.koodiArvo
              const ylaKoodiMetadata = ylaKoodi.metadata
              const ylakoodiMetadataArvo = parseLocalizedField(ylaKoodiMetadata)

              if (ylaKoodi.koodisto.koodistoUri === "isced2011koulutusalataso1") {
                tutkinto.koodi = koodiArvo
                tutkinto.nimi = tutkintoNimi
                tutkinto.alakoodi = ylaKoodiKoodiArvo
                tutkinto.alanimi = ylakoodiMetadataArvo
              } else if (ylaKoodi.koodisto.koodistoUri === "koulutustyyppi") {
                tutkinto.koulutustyyppikoodi = ylaKoodiKoodiArvo
                tutkinto.koulutustyyppi = ylakoodiMetadataArvo
              }
            })
            tutkinnot.push(tutkinto)
            break
          }

          case KOODISTOT.AMMATILLISEEN_TEHTAVAAN_VALMISTAVA_KOULUTUS: {
            const { koodiarvo } = maarays
            muutMaaraykset.push({
              selite: TUTKINTO_TEKSTIT.ammatilliseentehtavaanvalmistavakoulutus.selite,
              nimi: TUTKINTO_TEKSTIT.ammatilliseentehtavaanvalmistavakoulutus[koodiarvo].FI,
              indeksi: muutMaaraykset.length + 1
            })
            break
          }

          case KOODISTOT.TEHTAVAAN_VALMISTAVA_KOULUTUS: {
            const { koodiarvo } = maarays
            muutMaaraykset.push({
              selite: TUTKINTO_TEKSTIT.tehtavaanvalmistavakoulutus.selite,
              nimi: TUTKINTO_TEKSTIT.tehtavaanvalmistavakoulutus[koodiarvo].FI,
              indeksi: muutMaaraykset.length + 1
            })
            break
          }

          case KOODISTOT.KULJETTAJAKOULUTUS: {
            const { koodiarvo } = maarays
            muutMaaraykset.push({
              selite: TUTKINTO_TEKSTIT.kuljettajakoulutus.selite,
              nimi: TUTKINTO_TEKSTIT.kuljettajakoulutus[koodiarvo].FI,
              indeksi: muutMaaraykset.length + 1
            })
            break
          }

          case KOODISTOT.OIVA_TYOVOIMAKOULUTUS: {
            const { koodiarvo } = maarays
            muutMaaraykset.push({
              selite: TUTKINTO_TEKSTIT.oivatyovoimakoulutus.selite,
              nimi: TUTKINTO_TEKSTIT.oivatyovoimakoulutus[koodiarvo].FI,
              indeksi: muutMaaraykset.length + 1
            })
            break
          }

          case KOODISTOT.OSAAMISALA: {
            console.log("osaamisala")
            console.log(maarays)
            break
          }

          default: {
            console.log('default')
            console.log(maarays)
            break
          }
        }
      })

      let alat = sortTutkinnot(tutkinnot);
      muutMaaraykset = _.sortBy(muutMaaraykset, (poikkeus) => { return poikkeus.indeksi })

      // Palautetaan JSX
      return (
        <SectionWrapper>
          <Span>{`${target}.`}</Span><H3>{`${heading}`}</H3>
          <div>
            <Tutkinnot>
              {_.map(alat, (ala, i) => <Koulutusala key={i} {...ala} />)}
            </Tutkinnot>
            <MuutMaaraykset>
              {_.map(muutMaaraykset, (poikkeus, i) => <MuuMaarays key={i} {...poikkeus} />)}
            </MuutMaaraykset>
          </div>
        </SectionWrapper>
      )

      // kohdeid = 2: Opetuskieli
    } else if (Number(target) === KOHTEET.KIELI) {

      return (
        <SectionWrapper>
          <Span>{`${target}.`}</Span><H3>{`${heading}`}</H3>
          <p>{LUPA_TEKSTIT.KIELI.VELVOLLISUUS_YKSIKKO.FI}</p>
          {_.map(maaraykset, (maarays, i) => {
            const { koodi } = maarays
            const { metadata } = koodi
            if (koodi && metadata) {
              const kieli = parseLocalizedField(metadata, 'FI', 'nimi', 'kieli')

              return (
                <div key={i}>
                  <Capitalized>{kieli}</Capitalized>
                </div>
              )
            }
          })}
        </SectionWrapper>
      )
      // kohdeid = 3: Toiminta-alueet
    } else if (Number(target) === KOHTEET.TOIMIALUE) {
      return (
        <SectionWrapper>
          <Span>{`${target}.`}</Span><H3>{`${heading}`}</H3>
          <p>{LUPA_TEKSTIT.TOIMINTA_ALUE.VELVOLLISUUS_MONIKKO.FI}</p>
          {_.map(maaraykset, (maarays, i) => {
            const { koodi } = maarays
            const { metadata } = koodi
            if (koodi && metadata) {
              const kunta = parseLocalizedField(metadata, 'FI', 'nimi', 'kieli')

              return (
                <div key={i}>
                  <Capitalized>{kunta}</Capitalized>
                </div>
              )
            }
          })}
        </SectionWrapper>
      )
    } else {
      return (
        <SectionWrapper>
          <Span>{`${target}.`}</Span><H3>{`${heading}`}</H3>
          <div>
            {maaraykset.map((maarays, i) => {
              if (maarays.koodi && maarays.kohde) {
                const { koodi } = maarays
                const { metadata } = koodi
                const kohdeId = maarays.kohde.id

                switch (kohdeId) {
                  // kohdeid = 4: Opiskelijavuodet → lukumäärä, joka kertoo luvan opiskelijavuosien lukumäärän. Voidaan asettaa minimi velvoitteena ja maksimi rajoitteena.
                  case KOHTEET.OPISKELIJAVUODET: {
                    if (koodi && metadata) {
                      const tyyppi = parseLocalizedField(metadata, 'FI', 'nimi', 'kieli')
                      const { arvo } = maarays

                      return (
                        <div key={i}>
                          <span>{tyyppi}: {arvo}</span>
                        </div>
                      )
                    }

                    break;
                  }

                  // kohdeid = 5: Muut määräykset→ ns. kaatoluokka kaikille muille määräyksille, jotka eivät sovi neljään ensimmäiseen kohteeseen.
                  case KOHTEET.MUUT: {
                    if (koodi && metadata) {

                      const type = parseLocalizedField(metadata, 'FI', 'nimi', 'kieli')
                      const desc = parseLocalizedField(metadata, 'FI', 'kuvaus', 'kieli')

                      return (
                        <div key={i}>
                          <h4><Bold>{type}</Bold></h4>
                          {desc ? <p>{desc}</p> : <p>Ei kuvausta saatavilla</p>}
                        </div>
                      )
                    }

                    break;
                  }

                  default: {
                    break;
                  }
                }
              }

              return null
            })}
          </div>
        </SectionWrapper>
      )
    }
  } else {
    return (
      <div>
        <h2>{`${target}. ${heading}`}</h2>
        <p>Ladataan...</p>
      </div>
    )
  }
}

const sortTutkinnot = (tutkintoArray) => {
  let obj = {}

  _.map(tutkintoArray, (tutkinto, i) => {
    const {
      alakoodi,
      alanimi,
      koodi,
      nimi,
      rajoitteet,
      koulutustyyppi,
      koulutustyyppikoodi
    } = tutkinto
    const ala = obj[alakoodi]
    let koulutusalaObj = {}
    const tutkintoObj = { koodi, nimi, rajoitteet }

    if (ala === undefined) {
      // Alaa ei ole alat-objektissa
      // Tehdään koulutusala-objekti ja lisätään se juuritason objektiin
      koulutusalaObj[koulutustyyppikoodi] = { koodi: koulutustyyppikoodi, nimi: koulutustyyppi, tutkinnot: [tutkintoObj] }
      obj[alakoodi] = { koodi: alakoodi, nimi: alanimi, koulutusalat: koulutusalaObj }
    } else {
      // Ala oli jo alat-objektissa
      // Tarkastetaan onko alalla koulutusalaa
      let koulAlaObj = ala.koulutusalat[koulutustyyppikoodi]

      if (koulAlaObj === undefined) {
        // koulutusalaa ei ollut koulutusaloissa, luodaan se
        ala.koulutusalat[koulutustyyppikoodi] = { koodi: koulutustyyppikoodi, nimi: koulutustyyppi, tutkinnot: [tutkintoObj] }
      } else {
        // koulutusala löytyi koulutusaloista, lisätään tutkinto koulutusalan tutkintoihib
        koulAlaObj.tutkinnot.push(tutkintoObj)
      }
    }
  })

  // Poistetaan mahdolliset tyhjät objektit
  obj = _.pickBy(obj, (ala) => { return ala.koodi !== undefined })

  // Järjestetään objektit numerojärjestykseen
  obj = _.sortBy(obj, (ala) => {
    _.forEach(ala.koulutusalat, (koulutusala) => {
      koulutusala.tutkinnot = _.sortBy(koulutusala.tutkinnot, (tutkinto) => { return tutkinto.koodi })
    })
    return ala.koodi
  })

  return obj
}

export default Section
