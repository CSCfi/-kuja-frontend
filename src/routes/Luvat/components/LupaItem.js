import React from 'react'
import Moment from 'react-moment'

import { API_BASE_URL } from 'modules/constants'

const Lupa = (props) => {
  const { lupa } = props

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
} 

export default Lupa
