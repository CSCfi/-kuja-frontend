import React from 'react'
import Moment from 'react-moment'
import { Th, Tr } from "../../../../../modules/Table"

const MuutospyyntoItem = (props) => {
  const { muutospyynto } = props
  const { lupaId, jarjestajaYtunnus, hakupvm, tila } = muutospyynto
  console.log(muutospyynto)

  return (
    <Tr>
      <Th className="lupa-diaarinumero">{lupaId}</Th>
      <Th flex="3" className="lupa-jarjestaja">{jarjestajaYtunnus}</Th>
      <Th className="lupa-maakunta"><Moment format="DD.MM.YYYY">{hakupvm}</Moment></Th>
      <Th className="lupa-maakunta">{tila}</Th>
      <Th></Th>
    </Tr>
  )
}

export default MuutospyyntoItem
