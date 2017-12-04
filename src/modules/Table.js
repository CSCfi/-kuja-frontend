import styled from 'styled-components'

import { COLORS } from "./styles"

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #D5D5D5;
`

export const Thead = styled.div`
  display: flex;
  flex-direction: column;
  color: ${COLORS.WHITE};
  background: ${COLORS.OIVA_GREEN};
  
  div {
    font-size: 13px;
    position: relative;
    
    &:after {
      content: '';
      width: 1px;
      height: 22px;
      background-color: rgba(255, 255, 255, 1);
      position: absolute;
      right: 0;
      top: 7px;
    }
    
    &:last-child {
      &:after {
        display: none;
      }
    }
  }
`

export const Tbody = styled.div`
  display: flex;
  flex-direction: column;
`

export const Tr = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
  &:nth-child(even) {
    background: #F9F9F9;
  }
`

export const Th = styled.div`
  display: flex;
  flex: ${props => props.flex ? props.flex : 1};
  padding: 10px 20px;
  align-items: ${props => props.alignItems ? props.alignItems : 'stretch'};
  
  img {
    margin-right: 5px;
  }
`
