import React, { Component } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

import Hero from './Hero'
import LinkBox from './LinkBox'
import InfoBox from './InfoBox'
import { BackgroundImage, MEDIA_QUERIES } from 'modules/styles'
import { ContentContainer } from '../../../modules/elements'

const Title = styled.h1`
  color: #555;
  margin: 60px 0 0 20px;
  position: relative;
  top: 20px;
  
  @media ${MEDIA_QUERIES.MOBILE} {
    margin: 15px;
    top: 0;
  }
`

const Description = styled.p`
  font-size: 18px;
  max-width: 500px;
  margin: 50px 0 0 20px;
  position: relative;
  
  @media ${MEDIA_QUERIES.MOBILE} {
    margin: 15px;
  }
`

const InfoTitle = styled.h3`
  margin-top: 10px;
`

class Home extends Component {
  render() {
    return (
      <ContentContainer>
        <Helmet>
          <title>Oiva | Etusivu</title>
        </Helmet>
        <BackgroundImage />
        <Hero height="300px">
          <Title>Oiva - Opetushallinnon ohjaus- ja säätelypalvelu</Title>
          <Description>Palvelu ammatillisen koulutuksen järjestämislupien ja koulutustehtävien muutosten hakemiseen</Description>
          <LinkBox text="Siirry lupiin" to="/jarjestajat" />
        </Hero>
        <InfoBox maxWidth="600px">
          <InfoTitle>PALVELUN KUVAUS</InfoTitle>
          <p>
            Opetushallinnon ohjaus- ja säätelypalvelu on opetus- ja kulttuuriministeriön kehittämä ja ylläpitämä palvelu
            ammatillisen koulutuksen järjestämislupien ja koulutustehtävien muutosten hakemiseen. Palvelu tulee sisältämään hakemus-
            ja päätöspalveluiden lisäksi hakemisen ja päätöksenteon tueksi erilaisia tilastoja ja raportteja.
          </p>
          <p>Palvelu otetaan käyttöön vaiheittain ja se palvelee ensivaiheessa ammatillisen koulutuksen lupapalveluna.</p>
        </InfoBox>
      </ContentContainer>
    )
  }
}

export default Home
