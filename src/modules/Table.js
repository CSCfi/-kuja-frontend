import styled from 'styled-components'

import { COLORS, MEDIA_QUERIES } from "./styles"

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #D5D5D5;
`

export const Thead = styled.div`
  display: flex;
  flex-direction: column;
  color: ${COLORS.WHITE};
  background: ${COLORS.OIVA_TABLE_BG_COLOR};
  
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
    
    @media ${MEDIA_QUERIES.MOBILE} {
      font-size: 16px;
      padding: 10px;
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
  
  @media ${MEDIA_QUERIES.MOBILE} {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px 0;
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
  
  &:hover {
    cursor: pointer;
    background: #ffffff20;
  }

  @media ${MEDIA_QUERIES.MOBILE} {
    &.lupa-diaarinumero {
      padding-bottom: 4px;
    }
    
    &.lupa-jarjestaja {
      font-size: 18px;
      padding-bottom: 2px;
    }
    
    &.lupa-maakunta {
      padding-top: 2px;
    }
  }
`

export const Td = styled.div`
  display: flex;
  flex: ${props => props.flex ? props.flex : 1};
  padding: 10px 20px;
  align-items: ${props => props.alignItems ? props.alignItems : 'stretch'};
  
  img {
    margin-right: 5px;
  }
  
  @media ${MEDIA_QUERIES.MOBILE} {
    &.lupa-diaarinumero {
      padding-bottom: 4px;
    }
    
    &.lupa-jarjestaja {
      font-size: 18px;
      padding-bottom: 2px;
    }
    
    &.lupa-maakunta {
      padding-top: 2px;
    }
  }
`