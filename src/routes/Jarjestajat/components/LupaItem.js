import _ from 'lodash'
import React from 'react'
import Moment from 'react-moment'

import { parseLocalizedField, slugify } from "../../../modules/helpers"
import { API_BASE_URL } from 'modules/constants'
import { LUPA_EXCEPTIONS } from "../modules/constants"
import { Th, Tr } from "../../../modules/Table"
import pdf from 'static/images/icon-pdf-small.png'

const Lupa = (props) => {
  const { lupa } = props
  const maakunta = parseLocalizedField(lupa.jarjestaja.maakuntaKoodi.metadata)
  const jarjestaja = lupa.jarjestaja.nimi.fi || lupa.jarjestaja.nimi.sv || ''

  let pdfLink = (
    <Th alignItems="center">
      <img src={pdf} alt="pdf" title="pdf"/>
      <a href={`${API_BASE_URL}/pdf/${lupa.diaarinumero}`} target="_blank">
        <Moment format="DD.MM.YYYY">{lupa.alkupvm}</Moment>
      </a>
    </Th>
  )

  // Luvan poikkeuskäsittely erikoisluville (17kpl)
  _.find(LUPA_EXCEPTIONS, (exception) => {
    if (exception === lupa.jarjestajaYtunnus) {
      pdfLink = <Th alignItems="center"></Th>
    }
  })

  return (
    <Tr>
      <Th>{lupa.diaarinumero}</Th>
      {/*<Th flex="3"><Link to={slugify(jarjestaja)}>{jarjestaja}</Link></Th>*/}
      <Th flex="3">{jarjestaja}</Th>
      <Th>{maakunta}</Th>
      {pdfLink}
    </Tr>
  )
}

export default Lupa
