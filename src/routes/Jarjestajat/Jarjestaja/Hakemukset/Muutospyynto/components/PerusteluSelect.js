import React, { Component } from 'react'
import 'styled-components'
import styled from "styled-components"
import Select from '../../../../../../modules/Select'

import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants"
import { handleMuutosperusteluSelectChange } from "../modules/muutosperusteluUtil"

const PerusteluSelectWrapper = styled.div`
  margin-bottom: 20px;
`

const SelectWrapper = styled.div`
  width: 320px;
`

class PerusteluSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: props.muutosperustelukoodiarvo
    }
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption })
    const { muutokset, fields, muutos } = this.props
    handleMuutosperusteluSelectChange(muutokset, fields, muutos, selectedOption)
  }

  render() {
    const { selectedOption } = this.state
    const { muutosperustelut, muutos } = this.props
    const { koodiarvo, koodisto } = muutos

    return (
      <PerusteluSelectWrapper>
        <h4>{MUUTOS_WIZARD_TEKSTIT.TAUSTA_SYYT_OTSIKKO.FI}</h4>
        <div>{MUUTOS_WIZARD_TEKSTIT.TAUSTA_SYYT_TARKENNE.FI}</div>
        <SelectWrapper>
          <Select
            name={`select-muutosperustelu-${koodisto}-${koodiarvo}`}
            value={selectedOption}
            options={muutosperustelut}
            onChange={this.handleChange.bind(this)}
            placeholder="Valitse perustelun tyyppi..."
          />
        </SelectWrapper>
      </PerusteluSelectWrapper>
    )
  }
}

export default PerusteluSelect
