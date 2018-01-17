import React from 'react'

import { parseLocalizedField } from "../../../../modules/helpers"
import { KOHTEET, KOODISTOT } from '../modules/constants'

const rootStyles = {
  spanStyle: {
    fontSize: '14px',
    fontWeight: 100,
    marginLeft: '16px'
  }
}

const Section = (props) => {
  const { heading, target, maaraykset } = props

  if (maaraykset) {
    return (
      <div>
        <h3>{`${target}. ${heading}`}<span style={rootStyles.spanStyle}>{`(~${maaraykset.length} määräystä)`}</span></h3>
        <div>
          {maaraykset.map((maarays, i) => {
            if (maarays.koodi && maarays.kohde) {
              const { koodi } = maarays
              const { metadata } = koodi
              const kohdeId = maarays.kohde.id

              switch (kohdeId) {
                // 1. Tutkinnot ja koulutukset → sisältää koulutusalat, osaamisala-rajoitukset, tutkinnot sekä mahdollisia muita määräyksiä
                case KOHTEET.TUTKINNOT: {
                  if (koodi && metadata && maarays.koodisto === KOODISTOT.KOULUTUS) {
                    const { koodiArvo } = maarays.koodi
                    const tutkinto = parseLocalizedField(metadata, 'FI', 'nimi', 'kieli')

                    return (
                      <div key={i}>
                        <span>{koodiArvo} {tutkinto}</span>
                      </div>
                    )
                  }

                  break;
                }

                // 2. Opetuskieli → oppilaitoksen opetuskieli tai tutkintokohtainen vieraskieli. Kieli tallentuu määräykseen koodina, joka puretaan opintopolun koodiston avulla
                case KOHTEET.KIELI: {
                  if (koodi && metadata) {
                    const kieli = parseLocalizedField(metadata, 'FI', 'nimi', 'kieli')

                    return (
                      <div key={i}>
                        <span>{kieli}</span>
                      </div>
                    )
                  }

                  break;
                }

                // 3. Toimialue → kunnat, maakunnat tai valtakunta-taso, joissa koulutuksen järjestäjällä on koulutuslupa
                case KOHTEET.TOIMIALUE: {
                  if (koodi && metadata) {
                    const kunta = parseLocalizedField(metadata, 'FI', 'nimi', 'kieli')

                    return (
                      <div key={i}>
                        <span>{kunta}</span>
                      </div>
                    )
                  }

                  break;
                }

                // 4. Opiskelijavuodet → lukumäärä, joka kertoo luvan opiskelijavuosien lukumäärän. Voidaan asettaa minimi velvoitteena ja maksimi rajoitteena.
                case KOHTEET.OPISKELIJAVUODET: {
                  if (koodi && metadata) {
                    const tyyppi = parseLocalizedField(metadata, 'FI', 'nimi', 'kieli')
                    const { arvo } = maarays

                    return (
                      <div key={i}>
                        <span>{tyyppi} {arvo}</span>
                      </div>
                    )
                  }

                  break;
                }

                // 5. Muut määräykset→ ns. kaatoluokka kaikille muille määräyksille, jotka eivät sovi neljään ensimmäiseen kohteeseen.
                case KOHTEET.MUUT: {
                  if (koodi && metadata) {

                    const type = parseLocalizedField(metadata, 'FI', 'nimi', 'kieli')
                    const desc = parseLocalizedField(metadata, 'FI', 'kuvaus', 'kieli')

                    return (
                      <div key={i}>
                        <span><b>{type}</b></span><br/>
                        <span>{desc}</span>
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
      </div>
    )
  } else {
    return (
      <div>
        <h2>{`${target}. ${heading}`}</h2>
        <p>Ladataan...</p>
      </div>
    )
  }
}

export default Section
