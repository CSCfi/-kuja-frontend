import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import validate from '../modules/validateWizard'
import { WizButton, SelectWrapper } from "./MuutospyyntoWizard"
import { Separator, H3, SelectStyle, Input } from './MuutospyyntoWizardComponents'

import { parseLocalizedField } from "../../../../../../modules/helpers"
import { COLORS } from "../../../../../../modules/styles"
import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants"

const TutkintoMuutoksetWrapper = styled.div`
  margin: 20px 0 40px;
  background-color: ${COLORS.BG_GRAY};
  padding-bottom: 20px;
`

const MuutosWrapper = styled.div`
  width: 100%;
  background-color: ${COLORS.BG_GRAY};
  display: flex;
  flex-direction: column;
`

const MuutosHeader = styled.div`
  font-size: 18px;
  width: 100%;
  padding: 20px 20px 10px 20px;
  border-bottom: 1px solid ${COLORS.BORDER_GRAY};
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`

const MuutosBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 80px 20px 20px;
  
  textarea {
    width: 100%;
    max-width: 100%;
    font-size: 14px;
    border: 1px solid ${COLORS.BORDER_GRAY};
    
    &:focus {
      outline: none;
    }
  }
`

const BodyTopArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`

const getIndex = (values, koodiarvo) => {
  let i = undefined

  _.forEach(values, (value, idx) => {
    if (value.koodiarvo === koodiarvo) {
      i = idx
    }
  })

  return i
}

const renderMuutoksetByType = ({ muutokset, tyyppi, fields, meta: { touched, error } }) => {
  if (!muutokset || !tyyppi) {
    return null
  }

  console.log(fields)
  console.log(tyyppi)

  return (
    fields.map((mutos, index) => {
      let muutos = fields.get(index)
      console.log(muutos)
      const { koodiarvo, nimi, type, perustelu } = muutos
      const helpText = type === "addition" ? MUUTOS_WIZARD_TEKSTIT.MUUTOS_LISAYS_OHJE.FI : MUUTOS_WIZARD_TEKSTIT.MUUTOS_POISTO_OHJE.FI
      console.log(perustelu)
      if (type === tyyppi) {
        return (
          <MuutosWrapper key={koodiarvo}>
            <MuutosHeader>{koodiarvo}&nbsp;{nimi}</MuutosHeader>
            <MuutosBody>
              <BodyTopArea>
                <span>{helpText}</span>
                <span>Katso esimerkkiperustelu</span>
              </BodyTopArea>
              <textarea
                rows="5"
                onBlur={(e) => {
                  const i = getIndex(muutokset, koodiarvo)
                  let obj = fields.get(i)
                  obj.perustelu = e.target.value
                  fields.remove(i)
                  fields.push(obj)
                }}
              >{perustelu !== null ? perustelu : null}</textarea>
              {touched && error && <span>{error}</span>}
            </MuutosBody>
          </MuutosWrapper>
        )
      }
    })
  )
}

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
  const { handleSubmit, previousPage, muutosperustelut, muutosperusteluValue, muuperusteluValue, tutkintomuutoksetValue, error, onCancel } = props

  console.log('tutkintomuutokset')
  console.log(tutkintomuutoksetValue)

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

        <Separator/>

        <h3>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_EHDOTETUT_LISAYKSET.FI}</h3>
        <TutkintoMuutoksetWrapper>
          <FieldArray
            name="tutkintomuutokset"
            muutokset={tutkintomuutoksetValue}
            tyyppi="addition"
            component={renderMuutoksetByType}
          />



        </TutkintoMuutoksetWrapper>

        <Separator/>

        <h3>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_EHDOTETUT_POISTOT.FI}</h3>
        <TutkintoMuutoksetWrapper>
          <FieldArray
            name="tutkintomuutokset"
            muutokset={tutkintomuutoksetValue}
            tyyppi="removal"
            component={renderMuutoksetByType}
          />
        </TutkintoMuutoksetWrapper>

        {JSON.stringify(tutkintomuutoksetValue)}

        <div>
          <WizButton type="button" onClick={previousPage}>
            Edellinen
          </WizButton>
          <WizButton type="submit" disabled={muutosperusteluValue === undefined || (muutosperusteluValue === "01" && muuperusteluValue === undefined) || error}>
            Seuraava
          </WizButton>
          <WizButton bgColor={COLORS.OIVA_RED} onClick={(e) => onCancel(e)}>Peruuta</WizButton>
        </div>
      </form>
    </div>
  )
}

const selector = formValueSelector('uusiHakemus')

MuutospyyntoWizardPerustelut = connect(state => {
  const muutosperusteluValue = selector(state, 'muutosperustelu')
  const muuperusteluValue = selector(state, 'muuperustelu')
  const tutkintomuutoksetValue = _.sortBy(selector(state, 'tutkintomuutokset'), muutos => { return muutos.koodiarvo })
  // const tutkintomuutoksetValue = selector(state, 'tutkintomuutokset')

  return {
    muutosperusteluValue,
    muuperusteluValue,
    tutkintomuutoksetValue
  }
})(MuutospyyntoWizardPerustelut)

export default reduxForm({
  form: 'uusiHakemus',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(MuutospyyntoWizardPerustelut)
