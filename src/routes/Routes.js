import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import LuvatContainer from 'routes/Luvat/containers/LuvatContainer'
import Home from 'routes/Home/components/Home'
import StatsReports from 'routes/StatsReports/components/StatsReports'
import Login from 'routes/Login'
import Logout from 'routes/Logout'
import RequireCasAuth from 'routes/Login/components/RequireCasAuth'
import CasAuthenticated from 'routes/Login/containers/CasAuthenticated'
import { APP_WIDTH } from 'modules/constants'

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
      <Route path="/" component={Home} exact />
      <Route path="/luvat" component={LuvatContainer} />
      <Route path="/tilastot-raportit" component={StatsReports} />
      <Route path="/kirjaudu" component={Login} />
      <Route path="/kirjaudu-ulos" component={Logout} />
      <Route path="/cas-auth" component={RequireCasAuth} />
      <Route path="/cas-ready" component={CasAuthenticated} />
    </RoutesWrapper>
  )
}

export default Routes
