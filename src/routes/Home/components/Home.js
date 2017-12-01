import React, { Component } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

import background from 'static/images/palikat.png'
import Hero from './Hero'
import LinkBox from './LinkBox'

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
          <title>Etusivu | Oiva</title>
        </Helmet>
        <Hero background={background} height="400px">
          <Title>Oiva - Opetushallinnon ohjaus- ja säätelypalvelu</Title>
          <Description>Palvelu ammatillisen peruskoulutuksen järjestämislupien ja koulutustehtävien muutosten hakemiseen</Description>
          <LinkBox text="Siirry lupiin" to="/luvat" />
        </Hero>
      </div>
    )
  }
}

export default Home
