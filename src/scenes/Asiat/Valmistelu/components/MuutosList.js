import React, { Component } from 'react'
import styled from 'styled-components'

import Muutos from './Muutos'
import { COMPONENT_TYPES } from "../../modules/constants"

const MuutosListWrapper = styled.div`
`

const MuutosWrapper = styled.div`
  margin-left: 30px;
  display: flex;
`

const Heading = styled.h4`
  margin: 18px 0;
`

const components = {
    [COMPONENT_TYPES.MUUTOS]: Muutos
}

class MuutosList extends Component {
    render() {
        const { muutokset, kategoria, fields, headingNumber, heading } = this.props
        const { length } = fields
        let { componentType } = this.props

        if (!componentType) {
            componentType = COMPONENT_TYPES.MUUTOS
        }

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
                            <MuutosComponent
                                key={index}
                                muutos={muutos}
                                muutokset={muutokset}
                                fields={fields}
                                kategoria={kategoria}
                                componentType={componentType}
                            />
                        </MuutosWrapper>
                    )
                })}
            </MuutosListWrapper>
        )
    }
}

const MuutosComponent = (props) => {
    const MuutosSubComponent = components[props.componentType]
    return <MuutosSubComponent {...props} />
}

export default MuutosList