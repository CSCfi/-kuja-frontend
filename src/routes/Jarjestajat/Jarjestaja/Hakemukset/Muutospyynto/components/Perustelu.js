import React, { Component } from 'react'
import styled from 'styled-components'
import { getIndex } from "../modules/muutosUtil"
import { COLORS } from "../../../../../../modules/styles"
import { MUUTOS_TYPES } from "../modules/uusiHakemusFormConstants"
import { KOODISTOT } from "../../../modules/constants"


import PerusteluSelect from './PerusteluSelect'
import PerusteluOppisopimus from './PerusteluOppisopimus'

const PerusteluWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 3px solid ${COLORS.BORDER_GRAY};
  padding: 0 110px 30px 60px;
  margin: 10px 40px 20px 40px;
  
  textarea {
    width: 100%;
    max-width: 100%;
    font-size: 14px;
    border: 1px solid ${COLORS.BORDER_GRAY};
    
    &:focus {
      outline: none;
    }
  }
`

const PerusteluTopArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`

class Perustelu extends Component {
  componentWillMount() {
    const { muutosperustelut } = this.props

    if (muutosperustelut && !muutosperustelut.fetched) {
      this.props.fetchMuutosperustelut()
    }
  }

  render() {

    const { helpText, muutos, muutokset, koodiarvo, fields, perusteluteksti, perusteluteksti_oppisopimus, muutosperustelukoodiarvo, muutosperustelut } = this.props
    const { koodisto, type } = muutos

    // lisälomakkeet
    // tulevat vain lisäyksille tai muutoksille.
    // koodisto on oiva muut

    // laajennettu oppisopimus
    if (koodisto == KOODISTOT.OIVA_MUUT  && koodiarvo == 1 && (type === MUUTOS_TYPES.ADDITION || type === MUUTOS_TYPES.CHANGE )) {
      return (
        <PerusteluWrapper>
          <PerusteluOppisopimus
            muutosperustelut={muutosperustelut}
            perusteluteksti={perusteluteksti}
            perusteluteksti_oppisopimus={perusteluteksti_oppisopimus}
            fields={fields}
            muutokset={muutokset}
            koodiarvo={koodiarvo}
          />
        </PerusteluWrapper>
      )
    }
    
    return (
      <PerusteluWrapper>
        <PerusteluSelect
          muutosperustelukoodiarvo={muutosperustelukoodiarvo}
          muutosperustelut={muutosperustelut.muutosperusteluList}
          muutos={muutos}
          muutokset={muutokset}
          fields={fields}
        />
        <PerusteluTopArea>
          <span>{helpText}</span>
          <span>Ohje</span>
        </PerusteluTopArea>
        <textarea
          rows="5"
          defaultValue={perusteluteksti !== null ? perusteluteksti : undefined}
          onBlur={(e) => {
            const i = getIndex(muutokset, koodiarvo)
            let obj = fields.get(i)
            obj.meta.perusteluteksti = e.target.value
            fields.remove(i)
            fields.insert(i, obj)
          }}
        />
      </PerusteluWrapper>
    )
  }
}

export default Perustelu
