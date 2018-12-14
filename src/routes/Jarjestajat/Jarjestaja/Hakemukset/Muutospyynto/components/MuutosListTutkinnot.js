import React, { Component } from 'react'
import styled from 'styled-components'

import Muutos from './Muutos'
import MuutosYhteenveto from './MuutosYhteenveto'
import { COMPONENT_TYPES } from "../modules/uusiHakemusFormConstants"
import { getKoulutusalaByKoodiarvo, getKoulutustyyppiByKoodiarvo, getTutkintoNimiByKoodiarvo } from "../modules/koulutusUtil"
import { parseLocalizedField } from "../../../../../../modules/helpers"

const MuutosListWrapper = styled.div`
`

const MuutosWrapper = styled.div`
  margin-left: 30px;
  flex-shrink: 0;
`

const MuutosAla = styled.div`
    margin: 10px 0 5px 0;
    width: 100%;
    font-weight: bold;
`

const MuutosTyyppi = styled.div`
    margin: 10px 0 5px 0;
    width: 100%;
    font-weight: bold;
    font-size: 90%;
    padding-left: 10px;
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
    
        // Osaamisalat aakkostetaan parent-tutkinnon kohdalle
        a.aakkostusNimi = a.nimi
        b.aakkostusNimi = b.nimi
        if ("parentId" in a) {
          a.aakkostusNimi = getTutkintoNimiByKoodiarvo(a.parentId)
        }
        if ("parentId" in b) {
          b.aakkostusNimi = getTutkintoNimiByKoodiarvo(b.parentId)
        }

        if (a.meta.koulutusala < b.meta.koulutusala) { return -1 }
        else if (a.meta.koulutusala > b.meta.koulutusala) { return 1 }
        else if (a.meta.koulutustyyppi < b.meta.koulutustyyppi) { return -1 }
        else if (a.meta.koulutustyyppi > b.meta.koulutustyyppi) { return 1 }
        else if ("parentId" in a && a.parentId === b.koodiarvo) { return 1 }
        else if ("parentId" in b && b.parentId === a.koodiarvo) { return -1 }
        else if (a.aakkostusNimi < b.aakkostusNimi) { return -1 }
        else if (a.aakkostusNimi > b.aakkostusNimi) { return 1 }
        return 0
    })

    // apumuuttujia alan ja tyypin vaihtumisen havaitsemiseen
    var koulutusalaA = undefined
    var koulutusalaB = undefined
    var koulutustyyppiA = undefined
    var koulutustyyppiB = undefined

    return (
      <MuutosListWrapper>
        {length > 0 &&
        <Heading>{`${headingNumber}. ${heading}`}</Heading>
        }
        {muutokset.map((field, index) => {
          koulutusalaA = koulutusalaB
          koulutustyyppiA = koulutustyyppiB
        
          const muutos = fields.get(index)
          const { koodiarvo, koodisto, meta } = muutos
          const { koulutusala, koulutustyyppi } = meta
          koulutusalaB = koulutusala
          koulutustyyppiB = koulutustyyppi

          const identifier = `muutoscomponent-${koodisto}-${koodiarvo}-${index}`
          var koulutusalanNimiSuomeksi = undefined
          var koulutustyypinNimiSuomeksi = undefined

          if (koulutusala) {
              koulutusalanNimiSuomeksi = parseLocalizedField(getKoulutusalaByKoodiarvo(koulutusala).metadata)
              koulutustyypinNimiSuomeksi = parseLocalizedField(getKoulutustyyppiByKoodiarvo(koulutustyyppi).metadata)
          }

          return (
            <MuutosWrapper key={identifier}>
              { koulutusala && koulutusala !== koulutusalaA && <MuutosAla>{ koulutusalanNimiSuomeksi }</MuutosAla> }
              { koulutusala && koulutustyyppi && (koulutusala !== koulutusalaA || koulutustyyppi !== koulutustyyppiA) && <MuutosTyyppi>{ koulutustyypinNimiSuomeksi }</MuutosTyyppi> }
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
