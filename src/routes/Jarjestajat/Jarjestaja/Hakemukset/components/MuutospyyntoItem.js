import React from 'react'
import Moment from 'react-moment'
import { Th, Tr } from "../../../../../modules/Table"

const MuutospyyntoItem = (props) => {
  const { muutospyynto } = props
  const { hakupvm, tila, diaarinumero, paatoskierrosId, muutosperusteluId } = muutospyynto
  console.log(muutospyynto)

  return (
    <Tr>
      <Th className="lupa-diaarinumero">{diaarinumero}</Th>
      <Th className="lupa-jarjestaja"><Moment format="DD.MM.YYYY">{hakupvm}</Moment></Th>
      <Th className="lupa-maakunta">{tila}</Th>
      <Th className="lupa-maakunta">{paatoskierrosId}</Th>
      <Th className="lupa-maakunta">{muutosperusteluId}</Th>
    </Tr>
  )
}

export default MuutospyyntoItem
