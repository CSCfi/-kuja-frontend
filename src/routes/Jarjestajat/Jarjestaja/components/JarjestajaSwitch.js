import React from 'react'
import { Switch, Route } from 'react-router-dom'

import MuutospyyntoWizardContainer from '../Hakemukset/Muutospyynto/containers/MuutospyyntoWizardContainer'
import MuutospyyntoEditWizardContainer from '../Hakemukset/Muutospyynto/containers/MuutospyyntoEditWizardContainer'
import JarjestajaContainer from '../containers/JarjestajaContainer'

const JarjestajaSwitch = (props) => {

  return (
    <Switch>
      <Route exact path="/jarjestajat/:ytunnus/hakemukset-ja-paatokset/uusi" render={() =>{
        return <MuutospyyntoWizardContainer />
      } } />
      <Route path="/jarjestajat/:ytunnus/hakemukset-ja-paatokset/:uuid" render={() =>{
        return <MuutospyyntoEditWizardContainer />
      } } />
      <Route path="/jarjestajat/:ytunnus" component={JarjestajaContainer} />
    </Switch>
  )
}

export default JarjestajaSwitch
