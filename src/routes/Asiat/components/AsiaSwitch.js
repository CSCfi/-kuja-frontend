import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AsiatContainer from '../containers/AsiatContainer'
import AvoimetAsiatContainer from '../containers/AvoimetAsiatContainer'
import ValmistelussaAsiat from "./ValmistelussaAsiat";

const AsiaSwitch = () => {
    return (
        <Switch>
            <Route path="/asiat" component={AsiatContainer} />
        </Switch>
    )
}

export default AsiaSwitch
