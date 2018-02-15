import React from 'react'
import styled from 'styled-components'

const TutkintoWrapper = styled.div`
  margin: 6px 0 6px 46px;
  font-size: 15px;
  display: flex;
  
`

const Koodi = styled.span`
  flex: 1;
`

const Nimi = styled.span`
  flex: 5;
`

const Tutkinto = (props) => {
  const { koodi, nimi } = props
  return (
    <TutkintoWrapper>
      <Koodi>{koodi}</Koodi>
      <Nimi>{nimi}</Nimi>
    </TutkintoWrapper>
  )
}

export default Tutkinto
