import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FieldArray, reduxForm, formValueSelector } from 'redux-form'

class MuutospyyntoWizardToimialue extends Component {
  componentWillMount() {
    const { kunnat, maakunnat } = this.props

    if (kunnat && !kunnat.fetched) {
      this.props.fetchKunnat()
    }

    if (maakunnat && !maakunnat.fetched) {
      this.props.fetchMaakunnat()
    }
  }

  render() {
    return (
      <div>toimialue</div>
    )
  }
}

const selector = formValueSelector('uusiHakemus')

MuutospyyntoWizardToimialue = connect(state => {
  const toimialuemuutoksetValue = selector(state, 'toimialuemuutokset')

  return {
    toimialuemuutoksetValue
  }
})(MuutospyyntoWizardToimialue)

export default reduxForm({
  form: 'uusiHakemus',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // validate,
})(MuutospyyntoWizardToimialue)
