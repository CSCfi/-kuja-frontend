import React, { Component } from 'react'
import styled from 'styled-components'

import Muutos from './Muutos'
import MuutosYhteenveto from './MuutosYhteenveto'
import { COMPONENT_TYPES } from "../modules/uusiHakemusFormConstants"

const MuutosListWrapper = styled.div`
`

const MuutosWrapper = styled.div`
  margin-left: 30px;
  flex-shrink: 0;
`

const MuutosAla = styled.div`
    margin: 10px 0 5px 0;
    width: 100%;
`

const MuutosTyyppi = styled.div`
    margin: 10px 0 5px 0;
    width: 100%;
`

const Heading = styled.h4`
  margin: 18px 0;
`

const components = {
  [COMPONENT_TYPES.MUUTOS]: Muutos,
  [COMPONENT_TYPES.MUUTOS_YHTEENVETO]: MuutosYhteenveto
}

class MuutosListTutkinnot extends Component {
  render() {

    var { muutokset } = this.props
    const { kategoria, fields, headingNumber, heading } = this.props
    const { length } = fields
    let { componentType } = this.props

    if (!componentType) {
      componentType = COMPONENT_TYPES.MUUTOS
    }

    muutokset = muutokset.sort((a, b) => {
        if (a.meta.koulutusala < b.meta.koulutusala) { return -1 }
        else if (a.meta.koulutusala > b.meta.koulutusala) { return 1 }
        else if (a.meta.koulutustyyppi < b.meta.koulutustyyppi) { return -1 }
        else if (a.meta.koulutustyyppi > b.meta.koulutustyyppi) { return 1 }
        else if (a.meta.nimi < b.meta.nimi) { return -1 }
        else if (a.meta.nimi > b.meta.nimi) { return 1 }
        return 0
    })

    return (
      <MuutosListWrapper>
        {length > 0 &&
        <Heading>{`${headingNumber}. ${heading}`}</Heading>
        }
        {muutokset.map((field, index) => {
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

export default MuutosListTutkinnot
