import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import validate from '../modules/validateWizard'
import { Button, SelectWrapper } from './MuutospyyntoWizardComponents'
import { COLORS } from "../../../../../../modules/styles"
import { getJarjestajaData, getPaatoskierrosByUuid } from "../modules/koulutusUtil"

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
              <option value={paatoskierros.uuid} key={paatoskierros.uuid}>
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
    const obj = getPaatoskierrosByUuid(paatoskierros)

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
          <div>
            <label>Päätöskierros</label>
            <Field name="paatoskierros" paatoskierrokset={paatoskierrokset} component={this.renderPaatoskierrosSelect} />
            {paatoskierros ? <div>{this.getKuvaus(paatoskierros)}</div> : null}
          </div>
          <div>
            <Button type="submit" disabled={pristine || error} className="next">
              Seuraava
            </Button>
            <Button bgColor={COLORS.OIVA_RED} onClick={() => onCancel()}>Peruuta</Button>
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
