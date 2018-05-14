import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FieldArray, reduxForm, formValueSelector } from 'redux-form'
import 'react-select/dist/react-select.css'

import TutkintoKieliList from './TutkintoKieliList'
import { ContentContainer} from "../../../../../../modules/elements"
import { Row } from "./MuutospyyntoWizardComponents"
import Loading from "../../../../../../modules/Loading"
import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants"
import { parseLocalizedField } from "../../../../../../modules/helpers"

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
    const { kielet, tutkintokielimuutoksetValue } = this.props

    if (kielet.fetched) {
      return (
        <ContentContainer>
          <h4>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_TUTKINTOKIELET.HEADING.FI}</h4>
          <Row>
            <FieldArray
              name="tutkintokielimuutokset"
              kohde={kohde}
              kielet={kielet.data}
              kieliList={kielet.kieliList}
              tutkintomaaraykset={kohteet[1].maaraykset}
              editValues={tutkintokielimuutoksetValue}
              component={this.renderTutkintokieliList}
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

  renderTutkintokieliList(props) {
    const { kielet, kieliList, fields, editValues, kohde, tutkintomaaraykset } = props
    const { kohdeArvot, tutkinnotjakielet } = kohde

    // TODO: Tarvitaanko valittujen tutkintokielten listausta tässä?
    // const valitutKielet = getSelectedTutkintoKielet(tutkinnotjakielet, editValues)

    return (
      <div>
        <Row>
          {_.map(tutkintomaaraykset, (koulutusala, i) => {
            const koodiarvo = koulutusala.koodi || koulutusala.koodiarvo || koulutusala.koodiArvo
            const { nimi, metadata, koulutusalat } = koulutusala
            let nimiText = nimi
            let arrays = _.flatten(_.concat(_.map(koulutusalat, ala => { return ala.koulutukset })))

            if (!nimi && metadata) {
              nimiText = parseLocalizedField(metadata)
            } else {
              nimiText = nimi
            }

            return (
              <TutkintoKieliList
                key={i}
                koodiarvo={koodiarvo}
                nimi={nimiText}
                koulutukset={arrays}
                maaraykset={arrays}
                editValues={editValues}
                fields={fields}
                kielet={kielet}
                kieliList={kieliList}
                tutkinnotjakielet={tutkinnotjakielet}
              />
            )
          })}
        </Row>

        {/* TODO: Tarvitaanko erillistä listausta tässä? */}
        {/*{valitutKielet && valitutKielet.length > 0 &&*/}
          {/*<Row>*/}
            {/*<h4>Seuraavissa tutkinoissa on erikseen tutkintokieli</h4>*/}
            {/*{valitutKielet.map((kieli, i) => {*/}
              {/*const { koodiarvo, nimi, label } = kieli*/}
              {/*const identifier = koodiarvo*/}
              {/*return (*/}
                {/*<div key={identifier}>{`${koodiarvo} ${nimi} ${_.capitalize(label)}`}</div>*/}
              {/*)*/}
            {/*})}*/}
          {/*</Row>*/}
        {/*}*/}
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
