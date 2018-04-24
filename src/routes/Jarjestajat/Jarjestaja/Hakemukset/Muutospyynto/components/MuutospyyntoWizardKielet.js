import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FieldArray, reduxForm, formValueSelector } from 'redux-form'
import styled from 'styled-components'

import { ContentContainer} from "../../../../../../modules/elements"
import { Kohde, Kohdenumero, Otsikko, Row, Div, Checkbox, CheckboxRowContainer } from "./MuutospyyntoWizardComponents"
import { LUPA_TEKSTIT } from "../../../modules/constants"
import Loading from "../../../../../../modules/Loading"
import { parseLocalizedField } from "../../../../../../modules/helpers"
import { handleCheckboxChange } from "../modules/koulutusUtil"


class MuutospyyntoWizardKielet extends Component {
  componentWillMount() {
    const { oppilaitoksenopetuskielet } = this.props

    if (oppilaitoksenopetuskielet && !oppilaitoksenopetuskielet.fetched) {
      this.props.fetchOppilaitoksenopetuskielet()
    }
  }

  render() {
    const { lupa } = this.props
    const { kohteet} = lupa
    const kohde = kohteet[2]
    const { headingNumber, heading } = kohde
    const { oppilaitoksenopetuskielet, opetusjatutkintokielimuutoksetValue } = this.props

    if (oppilaitoksenopetuskielet.fetched) {
      return (
        <Kohde>
          <ContentContainer>
            <Kohdenumero>{headingNumber}.</Kohdenumero>
            <Otsikko>{heading}</Otsikko>
          </ContentContainer>
          <Row>
            <FieldArray
              name="opetusjatutkintokielimuutokset"
              kohde={kohde}
              opetuskielet={oppilaitoksenopetuskielet.data}
              editValues={opetusjatutkintokielimuutoksetValue}
              component={this.renderKieliMuutokset}
            />
          </Row>
        </Kohde>
      )
    } else if (oppilaitoksenopetuskielet.isFetching) {
      return <Loading/>
    } else if (oppilaitoksenopetuskielet.hasErrored) {
      return <h2>Opetuskieliä ei voitu ladata.</h2>
    } else {
      return null
    }
  }

  renderKieliMuutokset(props) {
    const { kohdeKuvaus, kohdeArvot, tutkinnotjakieletEn, tutkinnotjakieletFi, tutkinnotjakieletRu, tutkinnotjakieletSv } = props.kohde
    const { opetuskielet, fields, editValues } = props

    console.log(fields)
    console.log(editValues)

    return (
      <div>
        <h4>{kohdeKuvaus}</h4>

        {opetuskielet.map((opetuskieli, i) => {
          const { koodiArvo, koodisto, metadata} = opetuskieli
          const { koodistoUri } = koodisto
          const nimi = parseLocalizedField(metadata)
          const identifier = `input-${koodiArvo}-${i}`

          let isInLupa = false
          let isAdded = false
          let isRemoved = false
          let isChecked = false
          let customClassName = ""

          kohdeArvot.forEach(arvo => {
            if (arvo === nimi) {
              isInLupa = true
            }
          })

          if (editValues) {
            editValues.forEach(val => {
              if (val.koodiarvo === koodiArvo && val.nimi === nimi) {
                val.type === "addition" ? isAdded = true : null
                val.type === "removal" ? isRemoved = true : null
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
                  onChange={(e) => { handleCheckboxChange(e, editValues, fields, isInLupa, opetuskieli) }}
                />
                <label htmlFor={identifier}></label>
              </Checkbox>
              <div>{_.capitalize(nimi)}</div>
            </CheckboxRowContainer>
          )
        })}

        {renderKieliLisaykset(tutkinnotjakieletEn, 'EN')}
        {renderKieliLisaykset(tutkinnotjakieletFi, 'FI')}
        {renderKieliLisaykset(tutkinnotjakieletSv, 'SV')}
        {renderKieliLisaykset(tutkinnotjakieletRu, 'RU')}
      </div>
    )
  }
}

const renderKieliLisaykset = (array, locale) => {
  if (!array || array.length === 0) {
    return null
  }

  const lang = locale === 'FI' ? 'SUOMI' : locale === 'EN' ? 'ENGLANTI' : locale === 'SV' ? 'RUOTSI' : locale === 'RU' ? 'VENAJA' : null
  const suffix = array.length === 1 ? 'YKSIKKO' : 'MONIKKO'
  const identifier = `LISA_${lang}_${suffix}`
  const label = LUPA_TEKSTIT.KIELI[identifier].FI

  return (
    <div>
      <h4>{label}</h4>
      <Div margin="0 0 20px 30px">
        {array.map((lisays, i) => {
          const { tutkintokoodi, nimi } = lisays
          return <span key={i}>{`${tutkintokoodi} ${nimi}`}</span>
        })}
      </Div>
    </div>
  )
}

const selector = formValueSelector('uusiHakemus')

MuutospyyntoWizardKielet = connect(state => {
  const opetusjatutkintokielimuutoksetValue = selector(state, 'opetusjatutkintokielimuutokset')

  return {
    opetusjatutkintokielimuutoksetValue
  }
})(MuutospyyntoWizardKielet)

export default reduxForm({
  form: 'uusiHakemus',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // validate,
})(MuutospyyntoWizardKielet)
