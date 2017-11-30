import _ from 'lodash'
import React from 'react'
import { Route } from 'react-router-dom'

import RequireCasAuth from 'routes/Login/components/RequireCasAuth'
import CasAuthenticated from 'routes/Login/containers/CasAuthenticated'

import { APP_WIDTH } from 'modules/constants'

import Home from 'routes/Home'
import Jarjestajat from 'routes/Jarjestajat'
import Login from 'routes/Login'
import Logout from 'routes/Logout'
import Lupa from 'routes/Jarjestajat/Lupa'

const appRoutes = _.union(
  Home,
  Jarjestajat,
  Login,
  Logout,
  Lupa
)

const Routes = () => {
  return (
    <div>
      {appRoutes.map((route, i) => (<Route key={i} {...route} />))}
      <Route path="/cas-auth" component={RequireCasAuth} />
      <Route path="/cas-ready" component={CasAuthenticated} />
    </div>
  )
}

export default Routes
