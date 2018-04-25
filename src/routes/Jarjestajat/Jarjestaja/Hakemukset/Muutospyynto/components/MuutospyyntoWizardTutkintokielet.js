import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FieldArray, reduxForm, formValueSelector } from 'redux-form'

import { ContentContainer} from "../../../../../../modules/elements"
import { Kohde, Kohdenumero, Otsikko, Row, Div, Checkbox, CheckboxRowContainer } from "./MuutospyyntoWizardComponents"
import { LUPA_TEKSTIT } from "../../../modules/constants"
import Loading from "../../../../../../modules/Loading"
import { parseLocalizedField } from "../../../../../../modules/helpers"
import { handleCheckboxChange } from "../modules/koulutusUtil"
import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants"

class MuutospyyntoWizardTutkintokielet extends Component {
  componentWillMount() {
    const { kielet } = this.props

    if (kielet && !kielet.fetched) {
      this.props.fetchKielet()
    }
  }

  render() {
    const { lupa } = this.props
    const { kohteet} = lupa
    const kohde = kohteet[2]
    const { headingNumber, heading } = kohde
    const { oppilaitoksenopetuskielet, kielet, opetusjatutkintokielimuutoksetValue, tutkintokielimuutoksetValue } = this.props

    if (kielet.fetched) {
      return (
        <ContentContainer>
          <Row>
            <FieldArray
              name="tutkintokielimuutokset"
              kohde={kohde}
              kielet={kielet.data}
              editValues={tutkintokielimuutoksetValue}
              component={this.renderTutkintokieliMuutokset}
            />
          </Row>
        </ContentContainer>
      )
    } else if (kielet.isFetching) {
      return <Loading/>
    } else if (kielet.hasErrored) {
      return <h2>Tutkintokieliä ladatessa tapahtui virhe</h2>
    } else {
      return null
    }
  }

  renderTutkintokieliMuutokset(props) {
    const { kielet, fields, editValues, kohde } = props
    const { kohdeArvot, tutkinnotjakieletEn, tutkinnotjakieletFi, tutkinnotjakieletRu, tutkinnotjakieletSv } = kohde

    console.log(kielet)


    return (
      <div>
        <Row>
          <h4>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_TUTKINTOKIELET.HEADING.FI}</h4>
        </Row>
        <Row>

        </Row>
      </div>
    )
  }
}

const selector = formValueSelector('uusiHakemus')

MuutospyyntoWizardTutkintokielet = connect(state => {
  const tutkintokielimuutoksetValue = selector(state, 'tutkintokielimuutokset')

  return {
    tutkintokielimuutoksetValue
  }
})(MuutospyyntoWizardTutkintokielet)

export default reduxForm({
  form: 'uusiHakemus',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // validate,
})(MuutospyyntoWizardTutkintokielet)
