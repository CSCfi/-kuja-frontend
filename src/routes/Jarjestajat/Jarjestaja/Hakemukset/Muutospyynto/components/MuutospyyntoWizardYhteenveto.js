import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector, Field } from 'redux-form'
import Moment from 'react-moment'

import validate from '../modules/validateWizard'
import { WizardBottom, Container, SubtleButton, Button } from "./MuutospyyntoWizardComponents"
import { COLORS } from "../../../../../../modules/styles"
import { parseLocalizedField } from "../../../../../../modules/helpers"
import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants"
import { FIELD_ARRAY_NAMES, FORM_NAME_UUSI_HAKEMUS } from "../modules/uusiHakemusFormConstants"

const Paatoskierros = ({ paatoskierros }) => (
  <div>
    {paatoskierros.meta.nimi.fi}&nbsp;
    (
      <Moment format="DD.MM.YYYY">{paatoskierros.alkupvm}</Moment>
      &nbsp;-&nbsp;
      <Moment format="DD.MM.YYYY">{paatoskierros.loppupvm}</Moment>
    )
  </div>
)

const Muutosperustelu = ({ muutosperustelu, muuperustelu }) => {
  const nimi = parseLocalizedField(muutosperustelu.metadata)

  return (
    <div>
      {nimi}
      {muuperustelu
        ? <span>:&nbsp;{muuperustelu}</span>
        : null
      }
    </div>
  )
}

let MuutospyyntoWizardYhteenveto = props => {
  const {
    handleSubmit,
    onCancel,
    previousPage,
    paatoskierrokset,
    preview,
    formValues,
    tutkinnotjakoulutuksetValue,
    opetusjatutkintokieletValue
  } = props

  const paatoskierrosObj = _.find(paatoskierrokset.data, pkierros => {
    if (pkierros.meta && pkierros.meta.nimi && pkierros.meta.nimi.fi) {
      if (pkierros.meta.nimi.fi === "Avoin päätöskierros 2018") {
        return pkierros
      }
    }
  })

  setTimeout(() => console.log('yhteenveto ', formValues), 400)


  return (
    <div>
      <h2>{MUUTOS_WIZARD_TEKSTIT.YHTEENVETO.HEADING.FI}</h2>

      <div>
        <h3>{MUUTOS_WIZARD_TEKSTIT.YHTEENVETO.PAATOSKIERROS.HEADING.FI}</h3>
        {paatoskierrosObj
          ? <Paatoskierros paatoskierros={paatoskierrosObj} />
          : <div>{MUUTOS_WIZARD_TEKSTIT.YHTEENVETO.PAATOSKIERROS.TIETOJEN_LATAUS_VIRHE.FI}</div>
        }
      </div>

      <form onSubmit={handleSubmit}>
        <WizardBottom>
          <Container maxWidth="1085px" padding="15px">
            <Button onClick={previousPage} className="previous button-left">Edellinen</Button>
            <div>
              <SubtleButton disabled>Tallenna luonnos</SubtleButton>
              <SubtleButton onClick={(e) => preview(e, props.formValues)}>Esikatsele</SubtleButton>
            </div>
            <Button type="submit" className="next button-right">Lähetä hakemus</Button>
          </Container>
        </WizardBottom>
      </form>
    </div>
  )
}

const selector = formValueSelector(FORM_NAME_UUSI_HAKEMUS)

MuutospyyntoWizardYhteenveto = reduxForm({
  form: FORM_NAME_UUSI_HAKEMUS,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(MuutospyyntoWizardYhteenveto)

export default connect(state => {
  const paatoskierros = selector(state, 'paatoskierros')
  const tutkinnotjakoulutuksetValue = selector(state, FIELD_ARRAY_NAMES.TUTKINNOT_JA_KOULUTUKSET)
  const opetusjatutkintokieletValue = selector(state, FIELD_ARRAY_NAMES.OPETUS_JA_TUTKINTOKIELET)

  return {
    formValues: state.form.uusiHakemus.values,
    paatoskierros,
    tutkinnotjakoulutuksetValue,
    opetusjatutkintokieletValue,
    muutosperustelut: state.muutosperustelut,
    paatoskierrokset: state.paatoskierrokset
  }
})(MuutospyyntoWizardYhteenveto)
