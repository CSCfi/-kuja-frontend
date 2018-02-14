import React from 'react'
import styled from 'styled-components'

import arrow from 'static/images/koulutusala-arrow.svg'
import { COLORS } from "../../../../modules/styles"
import Tutkinto from "./Tutkinto"

const Wrapper = styled.div`
  margin: 4px 0;
  background-color: ${COLORS.BG_GRAY};
  max-width: 625px;
`

const Heading = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding:  10px 20px;
  
  &:hover {
    background-color: ${COLORS.BG_DARKER_GRAY};
  }
`

const Arrow = styled.img`
  margin-right: 20px;
`

const Span = styled.span`
  margin-right: 15px;
`

const TutkintoList = styled.div`
  padding:  5px 20px 10px;
`

const Koulutusala = (props) => {
  const { koodi, nimi, tutkinnot } = props

  return (
    <Wrapper>
      <Heading>
        <Arrow src={arrow} alt="Koulutusala"/>
        <Span>{koodi}</Span>
        <Span>{nimi}</Span>
        <Span>{`( ${tutkinnot.length} kpl )`}</Span>
      </Heading>
      <TutkintoList>
        {tutkinnot.map((tutkinto, i) => <Tutkinto {...tutkinto} />)}
      </TutkintoList>

    </Wrapper>
  )
}

export default Koulutusala
