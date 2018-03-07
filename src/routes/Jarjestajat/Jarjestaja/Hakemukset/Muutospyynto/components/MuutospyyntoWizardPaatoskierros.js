import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from '../modules/validateWizard'
import { WizButton, SelectWrapper } from "./MuutospyyntoWizard"

const paatoskierrokset = [{ id: 19, nimi: '1.1.2018 voimaan tulevat päätökset' },
    { id: 20, nimi: 'Avoin hakukierros 2018' }]

const renderPaatoskierrosSelect = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">Valitse päätöskierros</option>
      {paatoskierrokset.map(paatoskierros => (
        <option value={paatoskierros.id} key={paatoskierros.id}>
          {paatoskierros.nimi}
        </option>
      ))}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
)

const MuutospyyntoWizardPaatoskierros = props => {
  const { handleSubmit, pristine, error } = props
  return (
    <div>
      <h3>Valitse päätöskierros</h3>
      <form onSubmit={handleSubmit}>
        <SelectWrapper>
          <label>Päätöskierros</label>
          <Field name="paatoskierros" component={renderPaatoskierrosSelect} />
        </SelectWrapper>
        <div>
          <WizButton type="submit" disabled={pristine || error} className="next">
            Seuraava
          </WizButton>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'uusi-hakemus', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(MuutospyyntoWizardPaatoskierros)
