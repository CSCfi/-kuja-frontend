import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

import { parseLocalizedField, slugify } from "../../../modules/helpers"
import { API_BASE_URL, HOST_BASE_URL } from 'modules/constants'
import { LUPA_LISAKOULUTTAJAT } from "../modules/constants"
import { Th, Tr } from "../../../modules/Table"
import pdf from 'static/images/icon-pdf-small.png'

const Lupa = (props) => {
  const { lupa } = props
  const maakunta = parseLocalizedField(lupa.jarjestaja.maakuntaKoodi.metadata)
  const jarjestaja = lupa.jarjestaja.nimi.fi || lupa.jarjestaja.nimi.sv || ''

  let pdfLink = (
    <Th alignItems="center" className="lupa-pdf">
      <img src={pdf} alt="pdf" title="pdf"/>
      <a href={`${API_BASE_URL}/pdf/${lupa.diaarinumero}`} target="_blank">
        <Moment format="DD.MM.YYYY">{lupa.alkupvm}</Moment>
      </a>
    </Th>
  )

  // Luvan poikkeuskäsittely erikoisluville (17kpl)
  const lupaException = LUPA_LISAKOULUTTAJAT[lupa.jarjestajaYtunnus]
  if (lupaException) {
    pdfLink = (
      <Th alignItems="center" className="lupa-pdf">
        <img src={pdf} alt="pdf" title="pdf"/>
        <a href={`${API_BASE_URL}/pebble/resources/liitteet/lisakoulutusluvat/${lupaException.pdflink}`} target="_blank">
          <Moment format="DD.MM.YYYY">{lupaException.pvm}</Moment>
        </a>
      </Th>
    )
  }

  return (
    <Tr>
      <Th className="lupa-diaarinumero">{lupaException === undefined ? lupa.diaarinumero : lupaException.diaarinumero}</Th>
      <Th flex="3" className="lupa-jarjestaja"><Link lupaid={lupa.id} to={{pathname: "/jarjestajat/" + lupa.id, lupaId: lupa.id}}>{jarjestaja}</Link></Th>
      <Th className="lupa-maakunta">{maakunta}</Th>
      {pdfLink}
    </Tr>
  )
}

export default Lupa
