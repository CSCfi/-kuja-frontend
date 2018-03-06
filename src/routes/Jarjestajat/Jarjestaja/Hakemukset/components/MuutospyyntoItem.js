import React from 'react'
import Moment from 'react-moment'
import { Th, Tr } from "../../../../../modules/Table"

const MuutospyyntoItem = (props) => {
  const { muutospyynto } = props
  const { hakupvm, tila, diaarinumero, paatoskierros, muutosperustelu } = muutospyynto

  return (
    <Tr>
      <Th className="lupa-jarjestaja"><Moment format="DD.MM.YYYY">{hakupvm}</Moment></Th>
      <Th className="lupa-maakunta">{tila}</Th>
      <Th className="lupa-maakunta">{paatoskierros.meta.fi}</Th>
      <Th className="lupa-maakunta">{muutosperustelu.meta.perusteluteksti}</Th>
    </Tr>
  )
}

export default MuutospyyntoItem
