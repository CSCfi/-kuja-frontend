import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FieldArray, formValueSelector, reduxForm } from 'redux-form'
import styled from 'styled-components'

import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants"
import { hasFormChanges } from "../modules/muutospyyntoUtil"
import { FIELD_ARRAY_NAMES, FORM_NAME_UUSI_HAKEMUS, MUUTOS_TYPES } from "../modules/uusiHakemusFormConstants"
import validate from '../modules/validateWizard'

import { Button, Container, FormField, FormGroup, Separator, SubtleButton, WizardBottom } from './MuutospyyntoWizardComponents'

const H4 = styled.h4 `
  margin: 20px 0;
`

export const Label = styled.label`
  align-self: center;
  flex: 1;
`

const Textarea = styled.textarea `
  display: block;
  margin-bottom: 10px;
  width: 100%;
`

class MuutospyyntoWizardTaloudelliset extends Component {
  render() {
    const { formValues, handleSubmit, previousPage, save, taloudellisetValue, tutkinnotjakoulutuksetValue } = this.props

    const tutkintojaLisatty = _.find(tutkinnotjakoulutuksetValue, function(t) {
      return t.type == MUUTOS_TYPES.ADDITION })

    return (
        <form onSubmit={handleSubmit}>

          <h2>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.PAAOTSIKKO.FI}</h2>

          {!tutkintojaLisatty && <div>{ MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.EI_LISATTYJA_TUTKINTOJA.FI }</div>}

          {tutkintojaLisatty &&
            <div>
              <FieldArray name="taloudelliset" component={renderTaloudelliset} />
            </div>
          }

          <WizardBottom>
          <Container maxWidth="1085px" padding="15px">
              <Button onClick={previousPage} className="previous button-left">Edellinen</Button>
              <div>
              <SubtleButton disabled={!hasFormChanges(formValues)} onClick={(e) => save(e, formValues)}>Tallenna luonnos</SubtleButton>
              </div>
              <Button type="submit" className="next button-right">Seuraava</Button>
          </Container>
          </WizardBottom>
        </form>
    )
  }
}

const renderTaloudelliset = ({ fields, meta: { error, submitFailed} }) => (
  <div>
    <H4>{ MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.YLEISET.FI }</H4>
    <label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.EDELLYTYKSET.FI}</label>
    <Textarea rows="5"></Textarea>

    <label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.VAIKUTUKSET.FI}</label>
    <Textarea rows="5"></Textarea>

    <label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.SOPEUTTAMINEN.FI}</label>
    <Textarea rows="5"></Textarea>

    <Separator />

    <H4>{ MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.INVESTOINNIT_LEGEND.FI }</H4>

    <label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.INVESTOINNIT.FI}</label>
    <Textarea rows="5"></Textarea>

    <FormGroup>
      <Label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.KUSTANNUKSET.FI}</Label>
      <FormField><input type="number" /></FormField>
    </FormGroup>

    <label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.RAHOITUS.FI}</label>
    <Textarea rows="5"></Textarea>

    <Separator />

    <H4>{ MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.TILINPAATOSTIEDOT.FI }</H4>

    <FormGroup>
      <Label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.OMAVARAISUUSASTE.FI}</Label>
      <FormField><input type="number" /></FormField>
    </FormGroup>

    <FormGroup>
      <Label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.MAKSUVALMIUS.FI}</Label>
      <FormField><input type="number" /></FormField>
    </FormGroup>

    <FormGroup>
      <Label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.VELKAANTUNEISUUS.FI}</Label>
      <FormField><input type="number" /></FormField>
    </FormGroup>

    <FormGroup>
      <Label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.KANNATTAVUUS.FI}</Label>
      <FormField><input type="number" /></FormField>
    </FormGroup>

    <FormGroup>
      <Label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.KUMULATIIVINEN.FI}</Label>
      <FormField><input type="number" /></FormField>
    </FormGroup>

    <FormGroup>
      <Label>{MUUTOS_WIZARD_TEKSTIT.TALOUDELLISET.TILINPAATOSASIAKIRJAT.FI}</Label>
      <FormField><input type="file" /></FormField>
      <FormField><input type="text"
        placeholder="Anna liitteelle nimi (valinnainen)..." /></FormField>
    </FormGroup>

  </div>
)

const selector = formValueSelector(FORM_NAME_UUSI_HAKEMUS)

MuutospyyntoWizardTaloudelliset = connect(state => {
  const taloudellisetValue = selector(state, FIELD_ARRAY_NAMES.TALOUDELLISET)
  const tutkinnotjakoulutuksetValue = selector(state, FIELD_ARRAY_NAMES.TUTKINNOT_JA_KOULUTUKSET)
  let formVals = undefined
  if (state.form && state.form.uusiHakemus && state.form.uusiHakemus.values) {
    formVals = state.form.uusiHakemus.values
  }

  return {
    taloudellisetValue,
    tutkinnotjakoulutuksetValue,
    formValues: formVals
  }
})(MuutospyyntoWizardTaloudelliset)

export default reduxForm({
  form: FORM_NAME_UUSI_HAKEMUS,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(MuutospyyntoWizardTaloudelliset)
