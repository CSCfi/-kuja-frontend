import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FieldArray, reduxForm, formValueSelector } from 'redux-form'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import { ContentContainer} from "../../../../../../modules/elements"
import { Kohde, Kohdenumero, Otsikko, Row, Div, CheckboxSmall, CheckboxRowContainerSmall, TableDiv } from "./MuutospyyntoWizardComponents"
import { LUPA_TEKSTIT } from "../../../modules/constants"
import Loading from "../../../../../../modules/Loading"
import { parseLocalizedField } from "../../../../../../modules/helpers"
import {
  handleCheckboxChange, getKieliList, handleTutkintoKieliCheckboxChange,
  handleTutkintokieliSelectChange
} from "../modules/koulutusUtil"
import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants"

class MuutospyyntoWizardTutkintokielet extends Component {
  componentWillMount() {
    const { kielet } = this.props

    if (kielet && !kielet.fetched) {
      this.props.fetchKielet()
    }
  }

  render() {
    const { lupa } = this.props
    const { kohteet} = lupa
    const kohde = kohteet[2]
    const { kielet, tutkintokielimuutoksetValue } = this.props

    if (kielet.fetched) {
      return (
        <ContentContainer>
          <Row>
            <FieldArray
              name="tutkintokielimuutokset"
              kohde={kohde}
              kielet={kielet.data}
              kieliList={kielet.kieliList}
              tutkintomaaraykset={kohteet[1].maaraykset}
              editValues={tutkintokielimuutoksetValue}
              component={this.renderTutkintokieliMuutokset}
            />
          </Row>
        </ContentContainer>
      )
    } else if (kielet.isFetching) {
      return <Loading/>
    } else if (kielet.hasErrored) {
      return <h2>Tutkintokieliä ladatessa tapahtui virhe</h2>
    } else {
      return null
    }
  }

  renderTutkintokieliMuutokset(props) {
    const { kielet, kieliList, fields, editValues, kohde, tutkintomaaraykset } = props
    const { kohdeArvot, tutkinnotjakielet } = kohde


    return (
      <div>
        <Row>
          <h4>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_TUTKINTOKIELET.HEADING.FI}</h4>
        </Row>
        <Row>
          {tutkintomaaraykset.map(koulutusala => {
            return (
              _.map(koulutusala.koulutusalat, koulutustyyppi => {
                return koulutustyyppi.koulutukset.map((tutkinto, i) => {
                  const { koodi, nimi, maaraysId } = tutkinto
                  const identifier = `input-tutkintokieli-${koodi}`

                  let isInLupa = false
                  let isAdded = false
                  let isRemoved = false
                  let isChanged = false
                  let isChecked = false
                  let customClassName = ""
                  let value = ""
                  let valueKoodi = ""

                  tutkinnotjakielet.forEach(tutkintokieli => {
                    if (tutkintokieli.tutkintokoodi === koodi) {
                      isInLupa = true
                      valueKoodi = tutkintokieli.koodi
                    }
                  })

                  if (editValues) {
                    editValues.forEach(val => {
                      if (val.koodiarvo === koodi) {
                        val.type === "addition" ? isAdded = true : val.type === "removal" ? isRemoved = true : val.type === "change" ? isChanged = true : null
                      }
                    })
                  }

                  isInLupa ? customClassName = "is-in-lupa" : null
                  isAdded ? customClassName = "is-added" : null
                  isRemoved ? customClassName = "is-removed" : null
                  isChanged ? customClassName = "is-changed" : null

                  if ((isInLupa && !isRemoved) || isAdded) {
                    isChecked = true
                    value = valueKoodi
                  }

                  if (isInLupa && isRemoved) {
                    value = ''
                  }

                  return (
                    <CheckboxRowContainerSmall key={identifier} className={customClassName}>
                      <CheckboxSmall>
                        <input
                          type="checkbox"
                          id={identifier}
                          checked={isChecked}
                          onChange={(e) => { handleTutkintoKieliCheckboxChange(e, editValues, fields, isInLupa, value, tutkinto) }}
                        />
                        <label htmlFor={identifier}></label>
                      </CheckboxSmall>
                      <TableDiv className={customClassName}>{koodi}</TableDiv>
                      <TableDiv className={customClassName} flex="3">{nimi}</TableDiv>
                      <TableDiv>
                        <KieliSelect
                          identifier={identifier}
                          value={value}
                          kielet={kieliList}
                          disabled={!isChecked}
                          editValues={editValues}
                          fields={fields}
                          isInLupa={isInLupa}
                          tutkinto={tutkinto}
                          customClass={customClassName}
                        />
                      </TableDiv>
                    </CheckboxRowContainerSmall>
                  )
                })
              })
            )
          })}
        </Row>
      </div>
    )
  }
}

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
      <Select
        name={`select-${identifier}`}
        value={selectedOption}
        onChange={this.handleChange.bind(this)}
        options={kielet}
        disabled={disabled}
        placeholder="Valitse kieli..."
      />
    )
  }
}

const selector = formValueSelector('uusiHakemus')

MuutospyyntoWizardTutkintokielet = connect(state => {
  const tutkintokielimuutoksetValue = selector(state, 'tutkintokielimuutokset')

  return {
    tutkintokielimuutoksetValue
  }
})(MuutospyyntoWizardTutkintokielet)

export default reduxForm({
  form: 'uusiHakemus',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // validate,
})(MuutospyyntoWizardTutkintokielet)
