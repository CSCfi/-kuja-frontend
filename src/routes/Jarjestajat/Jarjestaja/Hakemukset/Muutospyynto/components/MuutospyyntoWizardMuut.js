import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FieldArray, reduxForm, formValueSelector } from 'redux-form'

import { ContentContainer } from "../../../../../../modules/elements"
import { Kohdenumero, Otsikko, Row } from "./MuutospyyntoWizardComponents"
import Loading from "../../../../../../modules/Loading"

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
      return (
        <ContentContainer>
          <Kohdenumero>{headingNumber}</Kohdenumero>
          <Otsikko>{heading}</Otsikko>
          <Row>
            <FieldArray
              name="muutmuutokset"
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
    return (
      <div>
        Muut muutokset
      </div>
    )
  }
}

const selector = formValueSelector('uusiHakemus')

MuutospyyntoWizardMuut = connect(state => {
  const muutmuutoksetValue = selector(state, 'muutmuutokset')

  return {
    muutmuutoksetValue
  }
})(MuutospyyntoWizardMuut)

export default reduxForm({
  form: 'uusiHakemus',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // validate,
})(MuutospyyntoWizardMuut)
