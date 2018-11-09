import React, { Component } from 'react'
import styled from 'styled-components'
import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants"

const PerusteluTyovoimaWrapper = styled.div`
  margin-bottom: 20px;
`

const Area = styled.div`
  margin: 15px 0;
`
const Label = styled.label`
  flex: 1;
  font-size: 14px;
  align-self: center;
  margin-right: 10px;
`

class PerusteluTyovoima extends Component {
    constructor(props) {
      super(props)
    }
  
    render() {
      const vuosi = this.props.muutosperustelut.data[0].voimassaAlkuPvm.split("-")[0]

      return (
        <PerusteluTyovoimaWrapper>
          <h4>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_PERUSTELULOMAKKEET.TYOVOIMA.KUVAUS.FI}</h4>
          <Area>
            <h4>1. {MUUTOS_WIZARD_TEKSTIT.MUUTOS_PERUSTELULOMAKKEET.YLEINEN.TARPEELLISUUS.FI}</h4>
            <textarea
              rows="5"
            />
            <h4>2. {MUUTOS_WIZARD_TEKSTIT.MUUTOS_PERUSTELULOMAKKEET.TYOVOIMA.JARJESTAMISEDELLYTYKSET.FI}</h4>
            <Label>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_PERUSTELULOMAKKEET.YLEINEN.HENKILOSTO.FI}</Label>
            <textarea
              rows="5"
            />
            <Label>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_PERUSTELULOMAKKEET.YLEINEN.OSAAMINEN.FI}</Label>
            <textarea
              rows="5"
            />
            <Label>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_PERUSTELULOMAKKEET.YLEINEN.PEDAGOGISET.FI}</Label>
            <textarea
              rows="5"
            />
            <Label>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_PERUSTELULOMAKKEET.YLEINEN.SIDOSRYHMA.FI}</Label>
            <textarea
              rows="5"
            />
            <h4>3. {MUUTOS_WIZARD_TEKSTIT.MUUTOS_PERUSTELULOMAKKEET.TYOVOIMA.SUUNNITELMA.FI}</h4>
            <textarea
              rows="5"
            />
            <h4>4. {MUUTOS_WIZARD_TEKSTIT.MUUTOS_PERUSTELULOMAKKEET.YLEINEN.OPISKELIJAVUOSIARVIO.FI}</h4>
            <Label>{vuosi}</Label>
            <input 
              type="number"
            />
            <Label>{parseFloat(vuosi) + 1}</Label>
            <input 
              type="number"
            />
            <Label>{parseFloat(vuosi) + 2}</Label>
            <input 
              type="number"
            />
          </Area>
        </PerusteluTyovoimaWrapper>
      )
    }
  }
  
  export default PerusteluTyovoima