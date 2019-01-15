import React from 'react'
import Moment from 'react-moment'
import styled from 'styled-components'
import Media from 'react-media'

import { MEDIA_QUERIES } from "../../../../modules/styles"

import { API_BASE_URL } from "../../../../modules/constants"
import { Td, Tr } from "../../../../modules/Table"

import pdf from 'static/images/icon-pdf-small.png'

const LupaHistoryItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
`

const LupaText = styled.span`
  margin: 3px 10px 0 10px;
  
  @media ${MEDIA_QUERIES.MOBILE} {
    display: flex;
    flex-direction: column;
  }
`

const TextPartial = styled.span`
  margin-right: 10px;
`

const LupaHistoryItem = (props) => {
  const { filename, diaarinumero, voimassaoloalkupvm, voimassaololoppupvm, paatospvm } = props.lupaHistoria

  return (
    <a href={`${API_BASE_URL}/pebble/resources/liitteet/lupahistoria/${filename}`} target="_blank">
      <Media query={MEDIA_QUERIES.MOBILE} render={() =>
          <Tr>
            <LupaText>
              <TextPartial>Diaarinumero: {diaarinumero}</TextPartial>
              <TextPartial>
                Paatos tehty:&nbsp;
              <Moment format="DD.MM.YYYY">{paatospvm}</Moment>
              </TextPartial>
              {voimassaoloalkupvm === "2018-01-01" && voimassaololoppupvm === "2018-01-01"
                ? <TextPartial>Kumottu: 12.12.2017</TextPartial>
                : (
                  <TextPartial>Voimassa:&nbsp;
                    <Moment format="DD.MM.YYYY">{voimassaoloalkupvm}</Moment>
                    &nbsp;-&nbsp;
                    <Moment format="DD.MM.YYYY">{voimassaololoppupvm}</Moment>
                  </TextPartial>)
              }
            </LupaText>
          </Tr>
        } />
        <Media query={MEDIA_QUERIES.TABLET_MIN} render={() =>
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
            {voimassaoloalkupvm === "2018-01-01" && voimassaololoppupvm === "2018-01-01"
              ? <Td>Kumottu: 12.12.2017</Td>
              : <Td></Td>
            }
          </Tr>
        } />
    </a>
  )
}



export default LupaHistoryItem
