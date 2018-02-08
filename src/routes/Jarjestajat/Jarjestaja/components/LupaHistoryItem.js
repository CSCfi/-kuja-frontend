import React from 'react'
import styled from 'styled-components'
import { MEDIA_QUERIES } from "../../../../modules/styles"

import { API_BASE_URL } from "../../../../modules/constants"

import pdf from 'static/images/icon-pdf-small.png'

const LupaHistoryItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
`

const LupaText = styled.span`
  margin: 3px 0 0 6px;
  
  @media ${MEDIA_QUERIES.MOBILE} {
    display: flex;
    flex-direction: column;
  }
`

const TextPartial = styled.span`
  margin-right: 10px;
`

const LupaHistoryItem = (props) => {
  const { filename, diaarinumero, voimassaolo, paatospvm } = props.lupaHistoria

  return (
    <a href={`${API_BASE_URL}/pebble/resources/liitteet/lupahistoria/${filename}`} target="_blank">
      <LupaHistoryItemWrapper>
        <img src={pdf} alt="Päättynyt lupa"/>
        <LupaText>
          <TextPartial>Diaarinumero: {diaarinumero}</TextPartial>
          <TextPartial>Paatos tehty: {paatospvm}</TextPartial>
          {voimassaolo ? `Voimassa: ${voimassaolo}` : ''}
        </LupaText>
      </LupaHistoryItemWrapper>
    </a>
  )
}

export default LupaHistoryItem
