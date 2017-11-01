import _ from 'lodash'
import React, { Component } from 'react'
import Moment from 'react-moment'

import { API_BASE_URL } from '../helpers/Constants'

class LuvatList extends Component {
  renderPermits() {
    return _.map(this.props.luvat, lupa => {
      return (
        <tr key={lupa.id}>
          <th><a href={`${API_BASE_URL}/pdf/${lupa.diaarinumero}`} target="_blank">{lupa.diaarinumero}</a></th>
          <th>{lupa.jarjestajaYtunnus}</th>
          <th>todo</th>
          <th>todo</th>
          <th><Moment format="DD.MM.YYYY">{lupa.alkupvm}</Moment> - </th>
          <th><Moment format="DD.MM.YYYY">{lupa.paatospvm}</Moment></th>
          <th>{lupa.meta.esittelija}</th>
        </tr>
      )
    })
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
