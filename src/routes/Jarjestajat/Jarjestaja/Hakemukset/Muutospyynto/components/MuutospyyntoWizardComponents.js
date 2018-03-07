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
`

export const Koodi = styled.span`
  flex: 1;
`

export const Nimi = styled.span`
  flex: 6;
`
