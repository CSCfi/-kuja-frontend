import React, { Component } from 'react'
import styled from 'styled-components'

import Muutos from './Muutos'

const MuutosListWrapper = styled.div`
`

const MuutosWrapper = styled.div`
  margin-left: 30px;
  display: flex;
`

const Heading = styled.h4`
  margin: 18px 0;
`

class MuutosList extends Component {
  render() {
    const { muutokset, kategoria, fields, headingNumber, heading } = this.props
    const { length } = fields

    return (
      <MuutosListWrapper>
        {length > 0 &&
          <Heading>{`${headingNumber}. ${heading}`}</Heading>
        }
        {fields.map((field, index) => {
          const muutos = fields.get(index)
          const { koodiarvo, koodisto } = muutos
          const identifier = `muutoscomponent-${koodisto}-${koodiarvo}-${index}`

          return (
            <MuutosWrapper key={identifier}>
              <Muutos
                key={index}
                muutos={muutos}
                muutokset={muutokset}
                fields={fields}
                kategoria={kategoria}
              />
            </MuutosWrapper>
          )
        })}
      </MuutosListWrapper>
    )
  }
}

export default MuutosList
