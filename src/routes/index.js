import _ from 'lodash'
import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import RequireCasAuth from 'routes/Login/components/RequireCasAuth'
import CasAuthenticated from 'routes/Login/containers/CasAuthenticated'

import { APP_WIDTH } from 'modules/constants'

import Home from 'routes/Home'
import Luvat from 'routes/Luvat'
import Login from 'routes/Login'
import Logout from 'routes/Logout'
import Lupa from 'routes/Luvat/Lupa'

const appRoutes = _.union(
  Home,
  Luvat,
  Login,
  Logout,
  Lupa
)

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
      {appRoutes.map((route, i) => (<Route key={i} {...route} />))}
      <Route path="/cas-auth" component={RequireCasAuth} />
      <Route path="/cas-ready" component={CasAuthenticated} />
    </RoutesWrapper>
  )
}

export default Routes
