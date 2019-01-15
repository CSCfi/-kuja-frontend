import React from 'react'
import Moment from 'react-moment'

import { API_BASE_URL } from "../../../../modules/constants"
import { Td, Tr } from "../../../../modules/Table"

import pdf from 'static/images/icon-pdf-small.png'

const LupaHistoryItem = (props) => {
  const { filename, diaarinumero, voimassaoloalkupvm, voimassaololoppupvm, paatospvm } = props.lupaHistoria

  return (
    <a href={`${API_BASE_URL}/pebble/resources/liitteet/lupahistoria/${filename}`} target="_blank">
      <Tr>
          <Td>{diaarinumero}</Td>
          <Td>
            <Moment format="DD.MM.YYYY">{paatospvm}</Moment>
          </Td>
          <Td>
            <Moment format="DD.MM.YYYY">{voimassaoloalkupvm}</Moment>
          </Td>
          <Td>
            <Moment format="DD.MM.YYYY">{voimassaololoppupvm}</Moment>
          </Td>
          { voimassaoloalkupvm === "2018-01-01" && voimassaololoppupvm === "2018-01-01"
              ? <Td>Kumottu: 12.12.2017</Td>
              : <Td></Td>
          }
      </Tr>
    </a>
  )
}



export default LupaHistoryItem
