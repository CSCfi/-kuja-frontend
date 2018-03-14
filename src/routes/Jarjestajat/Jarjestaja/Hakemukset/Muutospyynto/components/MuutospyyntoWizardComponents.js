import React from 'react'
import styled from 'styled-components'

import { COLORS } from "../../../../../../modules/styles"

export const Wrapper = styled.div`
  margin: 4px 0;
  background-color: ${COLORS.BG_GRAY};
  max-width: 625px;
`

export const Heading = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding:  10px 20px;
  
  &:hover {
    background-color: ${COLORS.BG_DARKER_GRAY};
  }
`

export const Arrow = styled.img`
  margin-right: 20px;
  ${props => props.rotated ? `transform: rotate(90deg);` : null}
`

export const Span = styled.span`
  margin-right: 15px;
  color: ${props => props.color ? props.color : COLORS.BLACK}
`

export const KoulutusalaListWrapper = styled.div`
  padding:  5px 20px 10px;
`

export const KoulutusTyyppiWrapper = styled.div`
  margin: 5px 0 20px;
  font-size: 15px;
  font-weight: bold;
`

export const TutkintoWrapper = styled.div`
  margin: 6px 0 6px 30px;
  font-size: 15px;
  display: flex;
  position: relative;
  
  &.is-removed {
    color: ${COLORS.OIVA_RED}
  }
  
  &.is-added {
    color: ${COLORS.OIVA_GREEN}
  }
`

export const Koodi = styled.span`
  flex: 1;
`

export const Nimi = styled.span`
  flex: 6;
`

export const Kohdenumero = styled.span`
  font-size: 20px;
  position: absolute;
  left: -30px;
`

export const Otsikko = styled.h3`
  text-transform: uppercase;
  font-size: 20px;
`

export const ControlsWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

export const BottomWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const AddWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 3;
  overflow: hidden;
`

export const ScrollWrapper = styled.div`
  overflow: auto;
  max-height: 100%;
`

export const AddContent = styled.div`
  position: relative;
  padding: 30px;
  background-color: ${COLORS.WHITE};
`
export const Row = styled.div`
  margin-bottom: 30px;
  margin-left: ${props => props.marginLeft ? props.marginLeft : 0};
`

export const Kohde = styled.div`
  margin-left: 30px;
  position: relative;
  padding: 0 0 26px;
  
  &:last-child {
    border-bottom: none;
  }
`
