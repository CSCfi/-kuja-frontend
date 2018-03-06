import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter, Link } from 'react-router-dom'

import Koulutusala from './Koulutusala'
import MuuMaarays from './MuuMaarays'

import { slugify } from "../../../../modules/helpers"
import { KOHTEET } from '../modules/constants'
import { COLORS, FONT_STACK } from "../../../../modules/styles"
import { TUTKINTO_TEKSTIT } from "../modules/constants"


const SectionWrapper = styled.div`
  margin-left: 30px;
  position: relative;
  border-bottom: 1px solid ${COLORS.BORDER_GRAY};
  padding: 0 0 26px;
  
  &:last-child {
    border-bottom: none;
  }
`

const Otsikko = styled.div`
  font-size: 16px;
`

const Span = styled.span`
  font-size: 20px;
  position: absolute;
  left: -30px;
  margin-top:19px;
`

const H3 = styled.h3`
  text-transform: uppercase;
  font-size: 20px;
`

const MuutosLink = styled(Link)`
  position: absolute;
  right: 15px;
  top: 6px;
`

const Capitalized = styled.p`
  text-transform: capitalize;
  margin-left: 30px;
`

const Bold = styled.span`
  font-family: ${FONT_STACK.GOTHAM_NARROW_BOLD};
`

const Tietoa = styled.div`
  font-size: 14px;
  margin-bottom: 30px;
  margin-left:20px;
`

const Tutkinnot = styled.div`
  margin-bottom: 30px;
`

const MuutMaaraykset = styled.div`
  margin-bottom: 30px;
`

class LupaSection extends Component {



  render() {
    const { kohde, diaarinumero, ytunnus, renderMuutosLink } = this.props

    // const { isRemoving } = this.state

    if (kohde) {
      const { kohdeid, heading } = kohde

      // Logiikka eri kohteille
      switch (kohdeid) {

        // Kohde 1: Tutkinnot
        case KOHTEET.TUTKINNOT: {
          const { maaraykset, muutMaaraykset } = kohde
          const muutosUrl = `/jarjestajat/${ytunnus}/hakemukset-ja-paatokset/${slugify(diaarinumero)}`

          return (
            <SectionWrapper>

              <Otsikko>{TUTKINTO_TEKSTIT.otsikkoKaikkiLuvat.FI}</Otsikko>

              <Span>{`${kohdeid}.`}</Span>
              <H3>{heading}</H3>
              {renderMuutosLink
                ? <MuutosLink to={muutosUrl} diaarinumero={diaarinumero} kohdeid={kohdeid}>Hae muutosta</MuutosLink>
                : null
              }
              <div>
                <Tutkinnot>
                  {_.map(maaraykset, (ala, i) => <Koulutusala key={i} {...ala} />)}
                </Tutkinnot>
                <Tietoa>
                    {TUTKINTO_TEKSTIT.otsikkoTaydentava.FI}
                </Tietoa>
                <MuutMaaraykset>
                  {_.map(muutMaaraykset, (poikkeus, i) => <MuuMaarays key={i} {...poikkeus} />)}
                </MuutMaaraykset>
              </div>
            </SectionWrapper>
          )
        }

        // Kohde 2: Opetuskieli
        case KOHTEET.KIELI: {
          const { kohdeKuvaus, kohdeArvot } = kohde

          return (
            <SectionWrapper>
              <Span>{`${kohdeid}.`}</Span><H3>{heading}</H3>
              <p>{kohdeKuvaus}</p>
              {_.map(kohdeArvot, (arvo, i) => <Capitalized key={i}>{arvo}</Capitalized>)}
            </SectionWrapper>
          )
        }

        // Kohde 3: Toiminta-alueet
        case KOHTEET.TOIMIALUE: {
          const { kohdeKuvaus, kohdeArvot } = kohde

          return (
            <SectionWrapper>
              <Span>{`${kohdeid}.`}</Span><H3>{heading}</H3>
              <p>{kohdeKuvaus}</p>
              {_.map(kohdeArvot, (arvo, i) => <Capitalized key={i}>{arvo}</Capitalized>)}
            </SectionWrapper>
          )
        }

        // Kohde 4: Opiskelijavuodet
        case KOHTEET.OPISKELIJAVUODET: {
          const { opiskelijavuodet } = kohde

          return (
            <SectionWrapper>
              <Span>{`${kohdeid}.`}</Span><H3>{heading}</H3>
              {_.map(opiskelijavuodet, (obj, i) => {
                const { tyyppi, arvo } = obj
                return <span key={i}>{tyyppi}:&nbsp;{arvo}</span>
              })}
            </SectionWrapper>
          )
        }

        // Kohde 5: Muut määräykset
        case KOHTEET.MUUT: {
          const { muut } = kohde

          return (
            <SectionWrapper>
              <Span>{`${kohdeid}.`}</Span><H3>{heading}</H3>
              {_.map(muut, (muu, i) => {
                const { tyyppi, kuvaus } = muu
                return (
                  <div key={i}>
                    <h4><Bold>{tyyppi}</Bold></h4>
                    <p>{kuvaus}</p>
                  </div>
                )
              })}
            </SectionWrapper>
          )
        }

        default: {
          return (
            <SectionWrapper>
              <Span>{`${kohdeid}.`}</Span><H3>{heading}</H3>
            </SectionWrapper>
          )
        }
      }

    } else {
      return <SectionWrapper><H3>Ei kohdetietoja</H3></SectionWrapper>
    }


  }
}

export default withRouter(LupaSection)
