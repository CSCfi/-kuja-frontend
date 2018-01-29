import React from 'react'
import styled from 'styled-components'

import { API_BASE_URL } from "../../../../modules/constants"

import pdf from 'static/images/icon-pdf-small.png'

const LupaHistoryItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`

const LupaHistoryItem = (props) => {
  const { filename, diaarinumero, voimassaolo } = props.lupaHistoria

  return (
    <a href={`${API_BASE_URL}/pebble/resources/liitteet/lupahistoria/${filename}`} target="_blank">
      <LupaHistoryItemWrapper>
        <img src={pdf} alt="Päättynyt lupa"/>
        <span>Diaarinumero: {diaarinumero} Voimassa: {voimassaolo}</span>
      </LupaHistoryItemWrapper>
    </a>
  )
}

export default LupaHistoryItem
