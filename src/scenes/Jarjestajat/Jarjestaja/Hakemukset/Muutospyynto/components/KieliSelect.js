import React, { Component } from "react"
import Select from 'react-select'
import styled from 'styled-components'
import { handleTutkintokieliSelectChange } from "../../../../../../services/koulutukset/koulutusUtil"

const SelectWrapper = styled.div`
  flex: 3;
`

class KieliSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: props.value
    }
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption })
    const { editValues, fields, isInLupa, tutkinto} = this.props
    handleTutkintokieliSelectChange(editValues, fields, isInLupa, tutkinto, selectedOption)
  }

  render() {
    const { selectedOption } = this.state
    const { identifier, kielet, disabled } = this.props

    return (
      <SelectWrapper>
        <Select
          name={`select-${identifier}`}
          value={selectedOption}
          onChange={this.handleChange.bind(this)}
          options={kielet}
          disabled={disabled}
          placeholder="Valitse kieli..."
        />
      </SelectWrapper>
    )
  }
}

export default KieliSelect
