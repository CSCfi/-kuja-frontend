import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from '../modules/validateWizard'
import { WizButton, SelectWrapper } from "./MuutospyyntoWizard"
import { COLORS } from "../../../../../../modules/styles"

const renderPaatoskierrosSelect = ({ input, paatoskierrokset, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">Valitse päätöskierros</option>
      {paatoskierrokset.map(paatoskierros => (
        <option value={paatoskierros.id} key={paatoskierros.id}>
          {paatoskierros.meta.fi}
        </option>
      ))}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
)

const MuutospyyntoWizardPaatoskierros = props => {
  const { handleSubmit, pristine, error, onCancel, paatoskierrokset } = props
  console.log(paatoskierrokset)
  return (
    <div>
      <h3>Valitse päätöskierros</h3>
      <form onSubmit={handleSubmit}>
        <SelectWrapper>
          <label>Päätöskierros</label>
          <Field name="paatoskierros" paatoskierrokset={paatoskierrokset} component={renderPaatoskierrosSelect} />
        </SelectWrapper>
        <div>
          <WizButton type="submit" disabled={pristine || error} className="next">
            Seuraava
          </WizButton>
          <WizButton bgColor={COLORS.OIVA_RED} onClick={() => onCancel()}>Peruuta</WizButton>
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
