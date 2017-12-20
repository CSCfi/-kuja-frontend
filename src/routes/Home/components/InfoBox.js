import React, { Component } from 'react'
import styled from 'styled-components'

import { COLORS } from 'modules/styles'

const InfoBox = styled.div`
  margin: 20px;
  padding: 20px 40px;
  background-color: rgba(237, 237, 237, 0.5);
  width: 100%;
  max-width: ${props => props.maxWidth ? props.maxWidth : '100%'};
  
`

export default InfoBox
