import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import Luvat from 'components/Luvat'
import Etusivu from 'components/Etusivu'
import TilastotJaRaportit from 'components/TilastotJaRaportit'
import Kirjautuminen from 'components/Login'
import Logout from 'components/Logout'
import CasReady from 'components/CasReady'
import { CAS_LOGIN_REDIRECT_URL, APP_WIDTH } from 'helpers/Constants'

const RoutesWrapper = styled.div`
  width: 100%;
  max-width: ${APP_WIDTH}px;
  margin: 0 auto;
  padding: 16px;
  box-sizing: border-box;
`

const Routes = () => {
  return (
    <RoutesWrapper>
      <Route path="/" component={Etusivu} exact />
      <Route path="/luvat" component={Luvat} />
      <Route path="/tilastot-raportit" component={TilastotJaRaportit} />
      <Route path="/kirjaudu" component={Kirjautuminen} />
      <Route path="/kirjaudu-ulos" component={Logout} />
      <Route path="/cas-auth" component={() => window.location = CAS_LOGIN_REDIRECT_URL} />
      <Route path="/cas-ready" component={CasReady} />
    </RoutesWrapper>
  )
}

export default Routes
