import React, { Component } from 'react'
import styled from 'styled-components'
import { getIndex } from "../modules/muutosUtil"
import { COLORS } from "../../../../../../modules/styles"

const PerusteluWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 3px solid ${COLORS.BORDER_GRAY};
  padding: 20px 110px 30px 60px;
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
  render() {
    const { helpText, muutokset, koodiarvo, fields, perustelu } = this.props

    return (
      <PerusteluWrapper>
        <PerusteluTopArea>
          <span>{helpText}</span>
          <span>Katso esimerkkiperustelu</span>
        </PerusteluTopArea>
        <textarea
          rows="5"
          onBlur={(e) => {
            const i = getIndex(muutokset, koodiarvo)
            let obj = fields.get(i)
            obj.perustelu = e.target.value
            fields.remove(i)
            fields.insert(i, obj)
          }}
        >{perustelu !== null ? perustelu : null}</textarea>
      </PerusteluWrapper>
    )
  }
}

export default Perustelu
