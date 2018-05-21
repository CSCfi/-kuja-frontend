import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import validate from '../modules/validateWizard'
import { SelectWrapper } from "./MuutospyyntoWizard"
import { Separator, H3, SelectStyle, Input, PageControlsWrapper, Button } from './MuutospyyntoWizardComponents'
import MuutosList from './MuutosList'

import { parseLocalizedField } from "../../../../../../modules/helpers"
import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants"
import { FIELD_ARRAY_NAMES, FORM_NAME_UUSI_HAKEMUS } from "../modules/uusiHakemusFormConstants"



const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <Input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderPerusteluSelect = ({ input, muutosperustelut, meta: { touched, error } }) => {
  return (
    <div>
      <SelectStyle>
        <select {...input}>
          <option value="">Valitse </option>
          {muutosperustelut.map(perustelu => {
            const { koodiArvo, metadata } = perustelu
            const nimi = parseLocalizedField(metadata)
            return (
              <option value={koodiArvo} key={koodiArvo}>
                {nimi}
              </option>
            )
          })}
        </select>
      </SelectStyle>
      {touched && error && <span>{error}</span>}
    </div>
  )
}

let MuutospyyntoWizardPerustelut = props => {
  const {
    handleSubmit,
    previousPage,
    muutosperustelut,
    muutosperusteluValue,
    muuperusteluValue,
    tutkinnotjakoulutuksetValue,
    opetusjatutkintokieletValue,
    toimialueValue,
    opiskelijavuosiValue,
    muutmuutoksetValue,
    onCancel
  } = props

  return (
    <div>
      <h2>{MUUTOS_WIZARD_TEKSTIT.PERUSTELUT_PAAOTSIKKO.FI}</h2>
      <p>{MUUTOS_WIZARD_TEKSTIT.PERUSTELUT_OHJE.FI}</p>

      <Separator/>

      <H3>{MUUTOS_WIZARD_TEKSTIT.TAUSTA_SYYT_OTSIKKO.FI}</H3>
      <form onSubmit={handleSubmit}>
        <SelectWrapper>
          <div>
            <label>{MUUTOS_WIZARD_TEKSTIT.TAUSTA_SYYT_TARKENNE.FI}</label>
            <Field
              name="muutosperustelu"
              muutosperustelut={muutosperustelut}
              component={renderPerusteluSelect}
            />
          </div>

          {muutosperusteluValue === '01'
            ?
            <div>
              <Field
                name="muuperustelu"
                type="text"
                label="Kirjoita perustelu"
                component={renderField}
              />
            </div>
            : null
          }
        </SelectWrapper>

        <FieldArray
          name={FIELD_ARRAY_NAMES.TUTKINNOT_JA_KOULUTUKSET}
          muutokset={tutkinnotjakoulutuksetValue}
          kategoria="tutkinto"
          component={MuutosList}
        />

        <FieldArray
          name={FIELD_ARRAY_NAMES.OPETUS_JA_TUTKINTOKIELET}
          muutokset={opetusjatutkintokieletValue}
          kategoria="opetuskieli"
          component={MuutosList}
        />

        <FieldArray
          name={FIELD_ARRAY_NAMES.TOIMINTA_ALUEET}
          muutokset={toimialueValue}
          kategoria="toimialue"
          component={MuutosList}
        />

        <FieldArray
          name={FIELD_ARRAY_NAMES.OPISKELIJAVUODET}
          muutokset={opiskelijavuosiValue}
          kategoria="opiskelijavuosi"
          component={MuutosList}
        />

        <FieldArray
          name={FIELD_ARRAY_NAMES.MUUT}
          muutokset={muutmuutoksetValue}
          kategoria="muumuutos"
          component={MuutosList}
        />

        <PageControlsWrapper>
          <Button onClick={previousPage}>&lt; Edellinen</Button>
          <Button type="submit" disabled={muutosperusteluValue === undefined || (muutosperusteluValue === "01" && muuperusteluValue === undefined)}>Seuraava &gt;</Button>
        </PageControlsWrapper>
      </form>
    </div>
  )
}

const selector = formValueSelector(FORM_NAME_UUSI_HAKEMUS)

MuutospyyntoWizardPerustelut = connect(state => {
  const muutosperusteluValue = selector(state, 'muutosperustelu')
  const muuperusteluValue = selector(state, 'muuperustelu')
  const tutkinnotjakoulutuksetValue = selector(state, FIELD_ARRAY_NAMES.TUTKINNOT_JA_KOULUTUKSET)
  const opetusjatutkintokieletValue = selector(state, FIELD_ARRAY_NAMES.OPETUS_JA_TUTKINTOKIELET)
  const toimialueValue = selector(state, FIELD_ARRAY_NAMES.TOIMINTA_ALUEET)
  const opiskelijavuosiValue = selector(state, FIELD_ARRAY_NAMES.OPISKELIJAVUODET)
  const muutmuutoksetValue = selector(state, FIELD_ARRAY_NAMES.MUUT)

  return {
    muutosperusteluValue,
    muuperusteluValue,
    tutkinnotjakoulutuksetValue,
    opetusjatutkintokieletValue,
    toimialueValue,
    opiskelijavuosiValue,
    muutmuutoksetValue
  }
})(MuutospyyntoWizardPerustelut)

export default reduxForm({
  form: FORM_NAME_UUSI_HAKEMUS,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(MuutospyyntoWizardPerustelut)
