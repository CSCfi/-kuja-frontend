import _ from 'lodash'
import React from 'react'
import { Route } from 'react-router-dom'

// import RequireCasAuth from 'routes/Login/components/RequireCasAuth'
// import CasAuthenticated from 'routes/Login/containers/CasAuthenticated'

import Home from 'routes/Home'
import Jarjestajat from 'routes/Jarjestajat'
// import Login from 'routes/Login'
// import Logout from 'routes/Logout'
import Jarjestaja from 'routes/Jarjestajat/Jarjestaja'

const appRoutes = _.union(
  Home,
  Jarjestajat,
  // Login, disabloitu toistaiseksi
  // Logout, disabloitu toistaiseksi
  Jarjestaja
)

const Routes = () => {
  return (
    <div>
      {appRoutes.map((route, i) => <Route key={i} {...route} />)}
      {/*<Route path="/cas-auth" component={RequireCasAuth} />*/}
      {/*<Route path="/cas-ready" component={CasAuthenticated} />*/}
    </div>
  )
}

export default Routes
