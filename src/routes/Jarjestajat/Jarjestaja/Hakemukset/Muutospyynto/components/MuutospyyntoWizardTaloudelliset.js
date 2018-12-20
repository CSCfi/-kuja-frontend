import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'

import { hasFormChanges } from "../modules/muutospyyntoUtil"
import { FORM_NAME_UUSI_HAKEMUS } from "../modules/uusiHakemusFormConstants"
import validate from '../modules/validateWizard'

import { Button, Container, SubtleButton, WizardBottom } from './MuutospyyntoWizardComponents'

let MuutospyyntoWizardTaloudelliset = props => {
  const { formValues, handleSubmit, previousPage, save } = props

  return (
      <form onSubmit={handleSubmit}>
      <div>Taloudellisten perustelujen lomake</div>
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

const selector = formValueSelector(FORM_NAME_UUSI_HAKEMUS)

MuutospyyntoWizardTaloudelliset = connect(state => {
  let formVals = undefined
  if (state.form && state.form.uusiHakemus && state.form.uusiHakemus.values) {
    formVals = state.form.uusiHakemus.values
  }

  return {
    formValues: formVals
  }
})(MuutospyyntoWizardTaloudelliset)

export default reduxForm({
  form: FORM_NAME_UUSI_HAKEMUS,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(MuutospyyntoWizardTaloudelliset)
