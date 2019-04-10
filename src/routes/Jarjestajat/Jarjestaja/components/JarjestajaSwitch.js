import React from 'react'
import { Switch, Route } from 'react-router-dom'

import MuutospyyntoWizardContainer from '../Hakemukset/Muutospyynto/containers/MuutospyyntoWizardContainer'
import JarjestajaContainer from '../containers/JarjestajaContainer'

const JarjestajaSwitch = () => {

  return (
    <Switch>
      <Route path="/jarjestajat/:ytunnus/hakemukset-ja-paatokset/uusi/:page" render={() =>{
        return <MuutospyyntoWizardContainer />
      } } />
      <Route path="/jarjestajat/:ytunnus/hakemukset-ja-paatokset/:uuid/:page" render={() =>{
        return <MuutospyyntoWizardContainer />
      } } />
      <Route path="/jarjestajat/:ytunnus" component={JarjestajaContainer} />
    </Switch>
  )
}

export default JarjestajaSwitch
