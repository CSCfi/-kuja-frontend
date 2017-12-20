import React, { Component } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'


import Hero from './Hero'
import LinkBox from './LinkBox'
import InfoBox from './InfoBox'
import { BackgroundImage } from 'modules/styles'

const Title = styled.h1`
  color: #555;
  margin: 60px 0 0 20px;
  position: relative;
  top: 20px;
`

const Description = styled.p`
  font-size: 18px;
  width: 500px;
  margin: 50px 0 0 20px;
  position: relative;
`

class Home extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Oiva | Etusivu</title>
        </Helmet>
        <BackgroundImage />
        <Hero  height="300px">
          <Title>Oiva - Opetushallinnon ohjaus- ja sääntelypalvelu</Title>
          <Description>Palvelu ammatillisen peruskoulutuksen järjestämislupien ja koulutustehtävien muutosten hakemiseen</Description>
          <LinkBox text="Siirry lupiin" to="/jarjestajat" />
        </Hero>
        <InfoBox maxWidth="600px">
          <h3>PALVELUN KUVAUS</h3>
          <p>
            Opetushallinnon ohjaus- ja säätelypalvelu on opetus- ja kulttuuriministeriön kehittämä ja ylläpitämä palvelu
            ammatillisen peruskoulutuksen järjestämislupien ja koulutustehtävien muutosten hakemiseen. Palvelu tulee sisältämään hakemus-
            ja päätöspalveluiden lisäksi hakemisen ja päätöksenteon tueksi erilaisia tilastoja ja raportteja.
          </p>
          <p>Palvelu otetaan käyttöön vaiheittain ja se palvelee ensivaiheessa ammatillisen peruskoulutuksen lupapalveluna.</p>
        </InfoBox>
      </div>
    )
  }
}

export default Home
