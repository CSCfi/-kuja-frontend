import _ from 'lodash'
import React from 'react'
import { Route } from 'react-router-dom'

import RequireCasAuth from 'scenes/Login/services/RequireCasAuth'
import CasAuthenticated from 'scenes/CasAuthenticated'
import Login from 'scenes/Login'
import Logout from 'scenes/Logout'
import DestroyCasAuth from "scenes/Logout/services/DestroyCasAuth";

import Home from 'scenes/Home'
// import Jarjestajat from 'routes/Jarjestajat'
// import Asiat from 'routes/Asiat'
// import Jarjestaja from '../routes/Jarjestajat/Jarjestaja'
// import Valmistelu from '../routes/Asiat/Valmistelu'
// import EsiJaPerusopetus from 'routes/EsiJaPerusopetus'
// import Lukiokoulutus from 'routes/Lukiokoulutus'
// import VapaaSivistystyo from 'routes/VapaaSivistystyo';
// import Tilastot from 'routes/Tilastot';

const appRoutes = _.union(
  Home,
  Login,
  Logout
//   Jarjestaja,
//   Jarjestajat,
//   Asiat,
//   Valmistelu,
//   EsiJaPerusopetus,
//   Lukiokoulutus,
//   VapaaSivistystyo,
//   Tilastot
)

const Routes = () => {
  return (
    <div>
      {appRoutes.map((route, i) => <Route key={i} {...route} />)}
      {<Route path="/cas-auth" component={RequireCasAuth} />}
      {<Route path="/cas-ready" component={CasAuthenticated} />}
      {<Route path="/cas-logout" component={DestroyCasAuth} />}
    </div>
  )
}

export default Routes