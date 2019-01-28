import React from 'react'
import Moment from 'react-moment'
import styled from 'styled-components'
import Media from 'react-media'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

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
  width: 42px;
  line-height: 36px;
  vertical-align: middle;
  text-align: center;
  border-radius: 2px;
  min-width: 24px;
  margin: 1px;
  z-index: 10;
  &:hover {
    color: ${props => props.disabled ? COLORS.WHITE : props.bgColor ? props.bgColor : COLORS.OIVA_GREEN};
    background-color: ${props => props.disabled ? COLORS.LIGHT_GRAY : props.textColor ? props.textColor : COLORS.WHITE};
    ${props => props.disabled ? 'cursor: not-allowed;' : null}
  }
  svg {
    margin-bottom: -2px;
  }
`

const JarjestamislupaAsiakirjatItem = (props) => {

  const { filename, diaarinumero, voimassaoloalkupvm, voimassaololoppupvm, paatospvm } = props.lupaHistoria;

  const state = {
    draft: "Luonnos",
    ready: "Valmis"
  }

  const type = {
    application: "Hakemus",
    attachement: "Liite",
    attachementConfidential: "Liite (salassa pidettävä)",
    supplement: "Täydennys",
    answer: "Vastaus kuulemispyyntöön",
    cancelation: "Hakemuksen peruutu",
    supplementRequest: "Täydennyspyyntö",
    auditionRequest: "Kuulemispyyntö",
    decision: "Päätös",
    correctionDecision: "Korjauspäätös",
    remediationDecision: "Oikaisupäätös",
    arrangementCancelation: "Järjestämisluvan peruutus",
    decisionArrangementCancelation: "Päätös järjestämisluvan peruuttamisesta"
  }

  function open(e,nro) {
    console.log(nro);
    props.setOpened(nro);
    e.preventDefault()
  }

  return (
    <a onClick={(e) => open(e,diaarinumero)}>
      <Media query={MEDIA_QUERIES.MOBILE} render={() =>
          <Tr>
            <LupaText>
              <TextPartial>Diaarinumero: OKM/{diaarinumero}</TextPartial>
              <TextPartial>
                Asia:&nbsp;
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
            <Td flex="2">
              {/* Mok */}
              { diaarinumero.endsWith("7") ? type.application : type.supplement }
            </Td>
            <Td flex="2">
              {/* Mok */}
              { diaarinumero.endsWith("7") ? state.ready : state.draft }
            </Td>
            <Td flex="3">
              Jyväskylän koulutuskuntayhtymä
            </Td>
            <Td flex="2">
              <Moment format="DD.MM.YYYY">{voimassaoloalkupvm}</Moment>
            </Td>
            <TdButton>
              {/* Mok */}
              { diaarinumero.endsWith("7") ?
                <Button 
                  title="Täydennä hakemusta" 
                  onClick={(e) => open(e,diaarinumero)}>
                    <FaEdit />
                </Button>
                :
                  null 
                }
            </TdButton>
            <TdButton>
            { !diaarinumero.endsWith("7") ?
                <Button 
                  title="Poista täydennys" 
                  onClick={(e) => open(e,diaarinumero)}>
                    <FaTrash />
                </Button>
              :
              <Button 
                title="Peruuta hakemus" 
                onClick={(e) => open(e,diaarinumero)}>
                  <MdCancel />
              </Button>
              }
            </TdButton>
          </Tr>
        } />
    </a>
  )
}

export default JarjestamislupaAsiakirjatItem
