import React from 'react'
import Moment from 'react-moment'
import styled from 'styled-components'
import Media from 'react-media'

import { API_BASE_URL } from "../../../../modules/constants"
import { Td, Tr, TdButton } from "../../../../modules/Table"

import { COLORS, MEDIA_QUERIES } from "../../../../modules/styles"

const LupaText = styled.span`
  margin: 10px;
  
  @media ${MEDIA_QUERIES.MOBILE} {
    display: flex;
    flex-direction: column;
  }
`

const TextPartial = styled.span`
  margin-right: 10px;
`

const Button = styled.div`
  color: ${props => props.textColor ? props.textColor : COLORS.WHITE};
  background-color: ${props => props.disabled ? COLORS.LIGHT_GRAY : props.bgColor ? props.bgColor : COLORS.OIVA_GREEN};
  border: 1px solid ${props => props.disabled ? COLORS.LIGHT_GRAY : props.bgColor ? props.bgColor : COLORS.OIVA_GREEN};
  cursor: pointer;
  display: inline-block;
  position: relative;
  padding: 0 8px;
  line-height: 36px;
  vertical-align: middle;
  text-align: center;
  border-radius: 2px;
  z-index: 10;
  &:hover {
    color: ${props => props.disabled ? COLORS.WHITE : props.bgColor ? props.bgColor : COLORS.OIVA_GREEN};
    background-color: ${props => props.disabled ? COLORS.LIGHT_GRAY : props.textColor ? props.textColor : COLORS.WHITE};
    ${props => props.disabled ? 'cursor: not-allowed;' : null}
  }
`

const JarjestamislupaAsiaListItem = (props) => {
  const { filename, diaarinumero, voimassaoloalkupvm, voimassaololoppupvm, paatospvm } = props.lupaHistoria

  function Test(e) {
    console.log("test");
    e.preventDefault()
  }

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
                ? <TextPartial>Kumottu: <Moment format="DD.MM.YYYY">{voimassaololoppupvm}</Moment></TextPartial>
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
            <Td flex="2">{diaarinumero}</Td>
            <Td flex="2">
            </Td>
            <Td flex="2">
            </Td>
            <Td flex="3">
              <Moment format="DD.MM.YYYY">{paatospvm}</Moment>
            </Td>
            <Td flex="3">
              <Moment format="DD.MM.YYYY">{voimassaoloalkupvm}</Moment>
            </Td>
            <Td flex="2">
              <Moment format="DD.MM.YYYY">{voimassaololoppupvm}</Moment>
            </Td>
            <TdButton>
              <Button onClick={Test}>Peruuta</Button>
            </TdButton>
          </Tr>
        } />
    </a>
  )
}

export default JarjestamislupaAsiaListItem
