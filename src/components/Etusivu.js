import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import background from '../assets/images/palikat.png'

const EtusivuHero = styled.div`
  background-image: url(${background});
  height: 400px;
`

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

const LupaLink = styled.div`
  margin: 50px 0 0 20px;
  background-color: #3B7A9A;
  color: white;
  display: inline-block;
  padding: 20px 40px;
`

class Etusivu extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Etusivu | Oiva</title>
        </Helmet>
        <EtusivuHero>
          <Title>Oiva - Opetushallinnon ohjaus- ja säätelypalvelu</Title>
          <Description>Palvelu ammatillisen peruskoulutuksen järjestämislupien ja koulutustehtävien muutosten hakemiseen</Description>
          <Link to="/luvat">
            <LupaLink>Siirry lupiin</LupaLink>
          </Link>
        </EtusivuHero>
      </div>
    )
  }
}

export default Etusivu
