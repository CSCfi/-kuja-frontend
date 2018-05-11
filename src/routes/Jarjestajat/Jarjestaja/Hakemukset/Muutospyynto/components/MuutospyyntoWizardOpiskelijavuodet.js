import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FieldArray, reduxForm, formValueSelector } from 'redux-form'

import { ContentContainer } from "../../../../../../modules/elements"
import { Kohdenumero, Otsikko, Row } from "./MuutospyyntoWizardComponents"
import { getOpiskelijavuosiIndex } from "../modules/koulutusUtil"
import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants"


class MuutospyyntoWizardOpiskelijavuodet extends Component {
  render() {
    const { lupa, opiskelijavuosimuutoksetValue, muutmuutoksetValue } = this.props
    const { kohteet } = lupa
    const { headingNumber, heading, opiskelijavuodet } = kohteet[4]
    const { muutCombined } = kohteet[5]


      // Vahimmaisopiskelijavuosimäärä
    const obj = _.find(opiskelijavuodet, obj => { return obj.tyyppi === "Ammatillinen koulutus" })
    let vahimmaisArvoInitial = 0
    if (obj) {
      vahimmaisArvoInitial = obj.arvo
    }

    // Vaativa erityisopetus (2)
    // tarkistetaan onko kohteessa 5 tälle määräystä:
    const vaativaTukiObj = _.find(muutCombined, obj => { return obj.koodiarvo === "2" })
    let vaativaArvoInitial = undefined


    // Sisäoppilaitos (4)
      // tarkistetaan onko kohteessa 5 tälle määräystä:
    const sisaoppilaitosObj = _.find(muutCombined, obj => { return obj.koodiarvo === "4" })
    let sisaoppilaitosArvoInitial = undefined

    return (
      <ContentContainer>
        <Kohdenumero>{headingNumber}.</Kohdenumero>
        <Otsikko>{heading}</Otsikko>
        <Row>
          <h4>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_OPISKELIJAVUODET.VAHIMMAISMAARA.FI}</h4>
          <div>{vahimmaisArvoInitial}</div>
          <FieldArray
            name="opiskelijavuosimuutokset"
            initialValue={vahimmaisArvoInitial}
            editValues={opiskelijavuosimuutoksetValue}
            kategoria="vahimmaisopiskelijavuodet"
            koodisto="koulutussektori"
            koodiarvo="3"
            tyyppi="change"
            component={this.renderOpiskelijavuodet}
          />
        </Row>

        {vaativaTukiObj ?
        <Row>
          <h4>Vaativa erityisopetus</h4>
          <FieldArray
            name="opiskelijavuosimuutokset"
            initialValue={vaativaArvoInitial}
            editValues={opiskelijavuosimuutoksetValue}
            kategoria="vaativa"
            koodisto="oivamuutoikeudetvelvollisuudetehdotjatehtavat"
            koodiarvo="2"
            tyyppi={vaativaArvoInitial !== undefined ? 'change' : 'addition'}
            component={this.renderOpiskelijavuodet}
          />
        </Row>
        : null }

        {sisaoppilaitosObj ?
        <Row>
          <h4>Sisoppilaitosmuotoinen opetus</h4>
          <FieldArray
            name="opiskelijavuosimuutokset"
            initialValue={sisaoppilaitosArvoInitial}
            editValues={opiskelijavuosimuutoksetValue}
            kategoria="sisaoppilaitos"
            koodisto="oivamuutoikeudetvelvollisuudetehdotjatehtavat"
            koodiarvo="4"
            tyyppi={sisaoppilaitosArvoInitial !== undefined ? 'change' : 'addition'}
            component={this.renderOpiskelijavuodet}
          />
        </Row>
        : null }

      </ContentContainer>
    )
  }

  renderOpiskelijavuodet(props) {
    const { initialValue, editValues, fields, kategoria, koodiarvo, koodisto, tyyppi } = props

    let arvo = initialValue

    if (editValues) {
      // aseta uusi arvo
      let obj = _.find(editValues, value => { return value.kategoria === kategoria })
      if (obj) {
        arvo = obj.arvo
      }
    }

    return (
      <input
        type="text"
        value={arvo}
        onChange={(e) => {
          const { value } = e.target
          if (editValues) {
            const i = getOpiskelijavuosiIndex(editValues, koodiarvo)
            if (i !== undefined) {
              if ((value === '' && initialValue === undefined) || value === initialValue) {
                fields.remove(i)
              } else {
                const obj = {
                  type: tyyppi,
                  kategoria,
                  koodiarvo,
                  koodisto,
                  arvo: value,
                  perustelu: null
                }
                fields.remove(i)
                fields.insert(i, obj)
              }
            } else {
              fields.push({
                type: tyyppi,
                kategoria,
                koodiarvo,
                koodisto,
                arvo: value,
                perustelu: null
              })
            }
          } else {
            fields.push({
              type: tyyppi,
              kategoria,
              koodiarvo,
              koodisto,
              arvo: value,
              perustelu: null
            })
          }
        }}
      />
    )
  }
}

const selector = formValueSelector('uusiHakemus')

MuutospyyntoWizardOpiskelijavuodet = connect(state => {
  const opiskelijavuosimuutoksetValue = selector(state, 'opiskelijavuosimuutokset')
  const muutmuutoksetValue = selector(state, 'muutmuutokset')

  return {
    opiskelijavuosimuutoksetValue,
    muutmuutoksetValue
  }
})(MuutospyyntoWizardOpiskelijavuodet)

export default reduxForm({
  form: 'uusiHakemus',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // validate,
})(MuutospyyntoWizardOpiskelijavuodet)
