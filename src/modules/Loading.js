import React from 'react'
import styled from 'styled-components'

import { ContentContainer } from "./elements"

const LOADING_TEXT = {
  FI: "Ladataan..."
}

const LoadingWrapper = styled.div`
  position: relative;
`

const LoadingElement = styled.div`
  margin: 0 auto;
  text-align: center;  
`

const Loading = (props) => {
  const text = LOADING_TEXT.FI
  return (
    <LoadingWrapper>
      <ContentContainer>
        <LoadingElement>
          <h3>{text}</h3>
        </LoadingElement>
      </ContentContainer>
    </LoadingWrapper>
  )
}

export default Loading
