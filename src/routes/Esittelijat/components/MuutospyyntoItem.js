import React from 'react'
import Moment from 'react-moment'
import { Th, Tr } from "../../../modules/Table"

const MuutospyyntoItem = (props) => {
  const { muutospyynto } = props
  const { hakupvm, tila, paatoskierros, jarjestaja } = muutospyynto

  return (
    // TODO: validations and null checks and localizations
    <Tr>
      <Th className="lupa-maakunta">{jarjestaja.nimi.fi}</Th>
      <Th className="lupa-jarjestaja"><Moment format="DD.MM.YYYY">{hakupvm}</Moment></Th>
      <Th className="lupa-maakunta">{paatoskierros.meta.fi}</Th>
      <Th className="lupa-maakunta">{jarjestaja.maakuntaKoodi.metadata[2].nimi}</Th>
      <Th className="lupa-maakunta">{tila}</Th>
    </Tr>
  )
}

export default MuutospyyntoItem
