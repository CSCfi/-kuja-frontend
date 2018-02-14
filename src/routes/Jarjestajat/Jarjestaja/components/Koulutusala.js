import React from 'react'
import styled from 'styled-components'

import arrow from 'static/images/koulutusala-arrow.svg'
import { COLORS } from "../../../../modules/styles"

const Wrapper = styled.div`
  padding: 10px 20px;
  margin: 4px 0;
  background-color: ${COLORS.BG_GRAY};
  max-width: 625px;
  cursor: pointer;
`

const Heading = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`

const Arrow = styled.img`
  margin-right: 20px;
`

const Span = styled.span`
  margin-right: 15px;
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

    </Wrapper>
  )
}

export default Koulutusala
