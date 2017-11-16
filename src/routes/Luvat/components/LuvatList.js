import _ from 'lodash'
import React, { Component } from 'react'

import LupaItem from 'routes/Luvat/components/LupaItem'

class LuvatList extends Component {
  renderPermits() {
    return _.map(this.props.luvat, lupa => <LupaItem lupa={lupa} key={lupa.id} />)
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Diaarinumero</th>
              <th>Järjestäjä</th>
              <th>Maakunta</th>
              <th>Asia</th>
              <th>Koulutustehtävän voimassaolo</th>
              <th>Päätös</th>
              <th>Esittelijä</th>
            </tr>
          </thead>
          <tbody>
            {this.renderPermits()}  
          </tbody>
        </table>
      </div>
    )
  }
}

export default LuvatList
