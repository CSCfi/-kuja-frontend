import React from 'react'
import styled from 'styled-components'

import JarjestamislupaAsiatContainer from '../containers/JarjestamislupaAsiatContainer'

import { InnerContentContainer } from "../../../../modules/elements"

const LupaInfoWrapper = styled.div`
  margin: 0 0 20px 0;
  
  h2 {
    font-weight: bold;
  }
`
const LupaInnerContentWrapper = styled.div`
  margin: 40px 50px;
`

const JarjestamislupaAsiat = (props) => {
  const { lupadata } = props
  const { jarjestajaOid } = lupadata

  return (
    <InnerContentContainer>
      <LupaInnerContentWrapper>
        <LupaInfoWrapper>
          <h2>Ammatillisen koulutuksen järjestämislupa-asiat</h2>
        </LupaInfoWrapper>

        <JarjestamislupaAsiatContainer jarjestajaOid={jarjestajaOid} />
      </LupaInnerContentWrapper>

    </InnerContentContainer>
  )
}

export default JarjestamislupaAsiat
