import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

import { parseLocalizedField } from "../../../modules/helpers"
import { API_BASE_URL } from 'modules/constants'
import { LUVAT_BASE } from 'modules/routeConstants'
import { Table, Thead, Tbody, Th, Tr } from "../../../modules/Table"
import pdf from 'static/images/icon-pdf-small.png'

const Lupa = (props) => {
  const { lupa } = props
  const maakunta = parseLocalizedField(lupa.jarjestaja.maakuntaKoodi.metadata)

  console.log(lupa.jarjestaja.maakuntaKoodi.metadata)

  return (
    <Tr>
      <Th><a href={`${API_BASE_URL}/pdf/${lupa.diaarinumero}`} target="_blank">{lupa.diaarinumero}</a></Th>
      <Th flex="3">{lupa.jarjestaja.nimi.fi}</Th>
      <Th>{maakunta}</Th>
      <Th alignItems="center"><img src={pdf} alt="pdf" title="pdf"/><a href={`${API_BASE_URL}/pdf/${lupa.diaarinumero}`} target="_blank"><Moment format="DD.MM.YYYY">{lupa.alkupvm}</Moment></a></Th>
    </Tr>
  )
} 

export default Lupa
