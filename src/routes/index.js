import _ from 'lodash'
import React from 'react'
import { Route } from 'react-router-dom'

import RequireCasAuth from 'routes/Login/components/RequireCasAuth'
import CasAuthenticated from 'routes/Login/containers/CasAuthenticated'

import Home from 'routes/Home'
import Jarjestajat from 'routes/Jarjestajat'
import Esittelijat from 'routes/Esittelijat'
import Login from 'routes/Login'
import Logout from 'routes/Logout'
import Jarjestaja from '../routes/Jarjestajat/Jarjestaja'

// import JarjestajaMuutospyynto from '../routes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto'

const appRoutes = _.union(
  Home,
  Login,
  Logout,
  Jarjestaja,
  Jarjestajat,
  Esittelijat
    // JarjestajaMuutospyynto
)

const Routes = () => {
  return (
    <div>
      {appRoutes.map((route, i) => <Route key={i} {...route} />)}
      {<Route path="/cas-auth" component={RequireCasAuth} />}
      {<Route path="/cas-ready" component={CasAuthenticated} />}
    </div>
  )
}

export default Routes
