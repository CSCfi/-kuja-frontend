import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FieldArray, reduxForm, formValueSelector } from 'redux-form'

import { ContentContainer } from "../../../../../../modules/elements"
import { Kohdenumero, Otsikko, Row, Checkbox, CheckboxRowContainer, Div } from "./MuutospyyntoWizardComponents"
import Loading from "../../../../../../modules/Loading"
import { parseLocalizedField } from "../../../../../../modules/helpers"
import { handleCheckboxChange } from "../modules/koulutusUtil"
import { FIELD_ARRAY_NAMES, FORM_NAME_UUSI_HAKEMUS, MUUTOS_TYPES } from "../modules/uusiHakemusFormConstants"

class MuutospyyntoWizardMuut extends Component {
  componentWillMount() {
    const { muut } = this.props

    if (muut && !muut.fetched) {
      this.props.fetchMuut()
    }
  }

  render() {
    const { lupa, muut, muutmuutoksetValue } = this.props
    const { kohteet } = lupa
    const kohde = kohteet[5]
    const { headingNumber, heading } = kohde

    if (muut.fetched) {
      // Muut, vaativat, vankilat, kokeilut
      const { muutCombined } = kohde

      return (
        <ContentContainer>
          <Kohdenumero>{headingNumber}</Kohdenumero>
          <Otsikko>{heading}</Otsikko>
          <Row>
            <FieldArray
              name={FIELD_ARRAY_NAMES.MUUT}
              muut={muutCombined}
              editValues={muutmuutoksetValue}
              muutList={muut.data}
              component={this.renderMuutMuutokset}
            />
          </Row>
        </ContentContainer>
      )
    } else if (muut.hasErrored) {
      return <h2>Muita määräyksiä ladattaessa tapahtui virhe</h2>
    } else if (muut.isFetching) {
      return <Loading/>
    } else {
      return null
    }
  }

  renderMuutMuutokset(props) {
    const { muut, muutList, editValues, fields } = props

    return (
      <div>
        <Row>
          <h4>Muut määräykset</h4>

          {muutList.map((muu, i) => {
            const { koodiArvo, koodisto, metadata } = muu
            const { koodistoUri } = koodisto
            const nimi = parseLocalizedField(metadata)
            const kuvaus = parseLocalizedField(metadata, 'FI', 'kuvaus') || 'Kuvausta ei saatavilla'
            const identifier = `input-${koodistoUri}-${koodiArvo}`

            let isInLupa = false
            let isAdded = false
            let isRemoved = false
            let isChecked = false
            let customClassName = ""

            muut.forEach(m => {
              if (m.koodiarvo === koodiArvo) {
                isInLupa = true
              }
            })

            if (editValues) {
              editValues.forEach(val => {
                if (val.koodiarvo === koodiArvo && val.nimi === nimi) {
                  val.type === MUUTOS_TYPES.ADDITION ? isAdded = true : null
                  val.type === MUUTOS_TYPES.REMOVAL ? isRemoved = true : null
                }
              })
            }

            isInLupa ? customClassName = "is-in-lupa" : null
            isAdded ? customClassName = "is-added" : null
            isRemoved ? customClassName = "is-removed" : null

            if ((isInLupa && !isRemoved) || isAdded) {
              isChecked = true
            }

            return (
              <CheckboxRowContainer key={identifier} className={customClassName}>
                <Checkbox>
                  <input
                    type="checkbox"
                    id={identifier}
                    checked={isChecked}
                    onChange={(e) => { handleCheckboxChange(e, editValues, fields, isInLupa, muu) }}
                  />
                  <label htmlFor={identifier}></label>
                </Checkbox>
                <Div margin="0 10px" flex="2">{nimi}</Div>
                <Div margin="0 10px" flex="5">{kuvaus}</Div>
              </CheckboxRowContainer>
            )
          })}

        </Row>
      </div>
    )
  }
}

const selector = formValueSelector(FORM_NAME_UUSI_HAKEMUS)

MuutospyyntoWizardMuut = connect(state => {
  const muutmuutoksetValue = selector(state, FIELD_ARRAY_NAMES.MUUT)

  return {
    muutmuutoksetValue
  }
})(MuutospyyntoWizardMuut)

export default reduxForm({
  form: FORM_NAME_UUSI_HAKEMUS,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // validate,
})(MuutospyyntoWizardMuut)
