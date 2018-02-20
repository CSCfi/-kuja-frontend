import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'

const TutkintoWrapper = styled.div`
  margin: 6px 0 6px 30px;
  font-size: 15px;
  display: flex;
  position: relative;
`

const Koodi = styled.span`
  flex: 1;
`

const Nimi = styled.span`
  flex: 6;
`

const RajoiteStyle = styled.div`
  margin-left: 125px;
`

const Rajoite = (props) => {
  const { koodi, nimi } = props
  return (
    <RajoiteStyle>lukuun&nbsp;ottamatta:&nbsp;{koodi}&nbsp;{nimi}</RajoiteStyle>
  )
}

const Tutkinto = (props) => {
  const { koodi, nimi, rajoitteet } = props

  return (
    <div>
      <TutkintoWrapper>
        <Koodi>{koodi}</Koodi>
        <Nimi>{nimi}</Nimi>
      </TutkintoWrapper>
      {rajoitteet ? _.map(rajoitteet, (rajoite, i) => <Rajoite {...rajoite} key={i}/>) : null}
    </div>

  )
}

export default Tutkinto
