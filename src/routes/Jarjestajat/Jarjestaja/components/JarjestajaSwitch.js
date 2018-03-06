import React from 'react'
import { Switch, Route } from 'react-router-dom'

import MuutospyyntoWizardContainer from '../Hakemukset/Muutospyynto/containers/MuutospyyntoWizardContainer'
import MuutospyyntoContainer from '../Hakemukset/Muutospyynto/containers/MuutospyyntoContainer'
import JarjestajaContainer from '../containers/JarjestajaContainer'

const JarjestajaSwitch = () => {
  return (
    <Switch>
      <Route exact path="/jarjestajat/:ytunnus/hakemukset-ja-paatokset/uusi" render={() =>{
        return <MuutospyyntoWizardContainer />
      } } />
      <Route path="/jarjestajat/:ytunnus/hakemukset-ja-paatokset/:diaarinumero" render={() =>{
        return <MuutospyyntoContainer />
      } } />
      <Route path="/jarjestajat/:ytunnus" component={JarjestajaContainer} />
    </Switch>
  )
}

export default JarjestajaSwitch
