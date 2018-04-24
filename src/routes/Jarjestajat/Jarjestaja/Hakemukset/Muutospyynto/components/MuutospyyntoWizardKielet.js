import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FieldArray, reduxForm, formValueSelector } from 'redux-form'
import styled from 'styled-components'

import { ContentContainer} from "../../../../../../modules/elements"
import { Kohde, Kohdenumero, Otsikko, Row, Div } from "./MuutospyyntoWizardComponents"
import { LUPA_TEKSTIT } from "../../../modules/constants"


class MuutospyyntoWizardKielet extends Component {
  render() {
    const { lupa } = this.props
    const { kohteet} = lupa
    const kohde = kohteet[2]
    const { headingNumber, heading } = kohde

    const { opetusjatutkintokielimuutoksetValue } = this.props

    console.log(kohde)

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
            component={this.renderKieliMuutokset}
          />
        </Row>
      </Kohde>
    )
  }

  renderKieliMuutokset(props) {
    const { kohdeKuvaus, kohdeArvot, tutkinnotjakieletEn, tutkinnotjakieletFi, tutkinnotjakieletRu, tutkinnotjakieletSv } = props.kohde

    console.log(tutkinnotjakieletEn)
    console.log(tutkinnotjakieletFi)

    return (
      <div>
        <div>{kohdeKuvaus}</div>
        <Div margin="0 0 20px 30px">
          {kohdeArvot.map(arvo => <div key={arvo}>{_.capitalize(arvo)}</div>)}
        </Div>

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
          console.log(lisays)
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

