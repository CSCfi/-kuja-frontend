import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import validate from '../modules/validateWizard'
import { WizButton, SelectWrapper } from "./MuutospyyntoWizard"
import { COLORS } from "../../../../../../modules/styles"
import { getJarjestajaData, getPaatoskierrosById } from "../modules/koulutusUtil"

class MuutospyyntoWizardPaatoskierros extends Component {
  constructor(props) {
    super(props)
    this.renderPaatoskierrosSelect = this.renderPaatoskierrosSelect.bind(this)
    this.getKuvaus = this.getKuvaus.bind(this)
    this.state = { kuvaus: undefined }
  }

  renderPaatoskierrosSelect({ input, paatoskierrokset, meta: { touched, error } }) {
    return (
      <div>
        <select {...input}>
          <option value="">Valitse päätöskierros</option>
          {paatoskierrokset.map(paatoskierros => {
            return (
              <option value={paatoskierros.id} key={paatoskierros.id}>
                {paatoskierros.meta.fi || paatoskierros.meta.nimi.fi}
              </option>
            )
          })}
        </select>
        {touched && error && <div>{error}</div>}
      </div>
    )
  }

  getKuvaus(paatoskierros) {
    const obj = getPaatoskierrosById(paatoskierros)

    if (obj.meta && obj.meta.kuvaus) {
      return obj.meta.kuvaus.fi
    } else {
      return 'Kuvausta ei saatavilla'
    }
  }

  render() {
    const { handleSubmit, pristine, error, onCancel, paatoskierrokset, paatoskierros } = this.props

    return (
      <div>
        <h3>Valitse päätöskierros</h3>
        <form onSubmit={handleSubmit}>
          <SelectWrapper>
            <label>Päätöskierros</label>
            <Field name="paatoskierros" paatoskierrokset={paatoskierrokset} component={this.renderPaatoskierrosSelect} />
            {paatoskierros ? <div>{this.getKuvaus(paatoskierros)}</div> : null}
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

}

const selector = formValueSelector('uusiHakemus')

MuutospyyntoWizardPaatoskierros = reduxForm({
  form: 'uusiHakemus',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(MuutospyyntoWizardPaatoskierros)

export default connect(state => {
  const paatoskierros = selector(state, 'paatoskierros')

  return {
    initialValues: getJarjestajaData(state),
    paatoskierros
  }
})(MuutospyyntoWizardPaatoskierros)
