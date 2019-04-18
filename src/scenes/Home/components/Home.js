import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Hero from './Hero'
import InfoBox from './InfoBox'
import { ContentContainer } from '../../../modules/elements'

class Home extends Component {
  render() {
    return (
      <ContentContainer>
        <Helmet>
          <title>Oiva | Etusivu</title>
        </Helmet>
        <Hero height="50px" maxWidth="600px">
          <h2>Oiva - Opetushallinnon ohjaus- ja säätelypalvelu</h2>
        </Hero>
        <InfoBox maxWidth="600px">
          <p>
            Palvelusta löytyvät kaikki ajantasaiset ammatillisen koulutuksen järjestämisluvat. Palvelu tulee sisältämään hakemusten laatimisen ja päätöksenteon lisäksi väestö-, koulutus- ja lupatietoja ja erilaisia tilastoja. Myöhemmin Oiva laajennetaan koskemaan myös yleissivistävän koulutuksen järjestämisluvat ja ylläpitämisluvat ja lupien hakupalvelut.
          </p>
          {/* <Palaute><a href="https://link.webropolsurveys.com/S/F156FEC089139BF4" target="_blank">Palautelomake</a></Palaute> */}
        </InfoBox>
      </ContentContainer>
    )
  }
}

export default Home
