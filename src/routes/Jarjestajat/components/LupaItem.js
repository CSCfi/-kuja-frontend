import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

import { parseLocalizedField, slugify } from "../../../modules/helpers"
import { API_BASE_URL } from 'modules/constants'
import { Th, Tr } from "../../../modules/Table"
import pdf from 'static/images/icon-pdf-small.png'

const Lupa = (props) => {
  const { lupa } = props
  const maakunta = parseLocalizedField(lupa.jarjestaja.maakuntaKoodi.metadata)
  const jarjestaja = lupa.jarjestaja.nimi.fi || lupa.jarjestaja.nimi.sv || ''

  return (
    <Tr>
      <Th>{lupa.diaarinumero}</Th>
      {/*<Th flex="3"><Link to={slugify(jarjestaja)}>{jarjestaja}</Link></Th>*/}
      <Th flex="3">{jarjestaja}</Th>
      <Th>{maakunta}</Th>
      <Th alignItems="center">
        <img src={pdf} alt="pdf" title="pdf"/>
        <a href={`${API_BASE_URL}/pdf/${lupa.diaarinumero}`} target="_blank">
          <Moment format="DD.MM.YYYY">{lupa.alkupvm}</Moment>
        </a>
      </Th>
    </Tr>
  )
} 

export default Lupa
