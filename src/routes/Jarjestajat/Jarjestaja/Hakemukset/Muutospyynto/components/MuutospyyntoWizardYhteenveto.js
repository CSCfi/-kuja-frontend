import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import Moment from 'react-moment'
import styled from 'styled-components'

import validate from '../modules/validateWizard'
import { Row } from "./MuutospyyntoWizardComponents"
import { WizButton } from "./MuutospyyntoWizard"
import { COLORS } from "../../../../../../modules/styles"
import { parseLocalizedField } from "../../../../../../modules/helpers"
import {
  getJarjestajaData,
  getTutkintoKoodiByMaaraysId, getTutkintoNimiByKoodiarvo,
  getTutkintoNimiByMaaraysId
} from "../modules/koulutusUtil"
import { createMuutospyynto } from "../modules/muutospyynto"
import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants"

const Paatoskierros = ({ paatoskierros }) => (
  <div>
    {paatoskierros.meta.fi}&nbsp;
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
  const { handleSubmit, muutosperustelu, muuperustelu, paatoskierros, tutkintomuutokset, onCancel, paatoskierrokset, muutosperustelut } = props

  const paatoskierrosObj = _.find(paatoskierrokset.data, pkierros => {
    return String(pkierros.uuid) === String(paatoskierros)
  })

  const muutosperusteluObj = _.find(muutosperustelut.data, mperustelu => {
    return String(mperustelu.koodiArvo) === String(muutosperustelu)
  })

  let hasAdditions = false
  let hasRemovals = false

  if (tutkintomuutokset) {
    tutkintomuutokset.forEach(muutos => {
      if (muutos.type === "addition") {
        hasAdditions = true
      } else if (muutos.type === "removal") {
        hasRemovals = true
      }
    })
  }

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

      <div>
        <h3>{MUUTOS_WIZARD_TEKSTIT.YHTEENVETO.MUUTOSPERUSTELU.HEADING.FI}</h3>
        {muutosperusteluObj
          ? <Muutosperustelu muutosperustelu={muutosperusteluObj} muuperustelu={muuperustelu} />
          : <div>{MUUTOS_WIZARD_TEKSTIT.YHTEENVETO.MUUTOSPERUSTELU.TIETOJEN_LATAUS_VIRHE.FI}</div>
        }
      </div>

      <div>
        <h3>{MUUTOS_WIZARD_TEKSTIT.YHTEENVETO.TUTKINNOT.LISATTAVAT.HEADING.FI}</h3>
        <div>
          {hasAdditions
            ? tutkintomuutokset.map(muutos => {
                if (muutos.type === "addition") {
                  return <div key={muutos.koodiarvo}>{`${muutos.koodiarvo} ${muutos.nimi} ${MUUTOS_WIZARD_TEKSTIT.YHTEENVETO.TUTKINNOT.PERUSTELU.FI} ${muutos.perustelu}`}</div>
                } else {
                  return null
                }
              })
            : MUUTOS_WIZARD_TEKSTIT.YHTEENVETO.TUTKINNOT.LISATTAVAT.EI_TUTKINTOJA.FI
          }
        </div>
      </div>

      <div>
        <h3>{MUUTOS_WIZARD_TEKSTIT.YHTEENVETO.TUTKINNOT.POISTETTAVAT.HEADING.FI}</h3>
        <div>
          {hasRemovals
            ? tutkintomuutokset.map(muutos => {
                if (muutos.type === "removal") {
                  return <div key={muutos.koodiarvo}>{`${muutos.koodiarvo} ${muutos.nimi} ${MUUTOS_WIZARD_TEKSTIT.YHTEENVETO.TUTKINNOT.PERUSTELU.FI} ${muutos.perustelu}`}</div>
                } else {
                  return null
                }
              })
            : MUUTOS_WIZARD_TEKSTIT.YHTEENVETO.TUTKINNOT.POISTETTAVAT.EI_TUTKINTOJA.FI
          }
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <WizButton type="submit" className="next">
          Tallenna
        </WizButton>
        <WizButton bgColor={COLORS.OIVA_RED} onClick={(e) => onCancel(e)}>Peruuta</WizButton>
      </form>
    </div>
  )
}

const selector = formValueSelector('uusiHakemus')

MuutospyyntoWizardYhteenveto = reduxForm({
  form: 'uusiHakemus',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(MuutospyyntoWizardYhteenveto)

export default connect(state => {
  const muutosperustelu = selector(state, 'muutosperustelu')
  const muuperustelu = selector(state, 'muuperustelu')
  const paatoskierros = selector(state, 'paatoskierros')
  const tutkintomuutokset = selector(state, 'tutkintomuutokset')

  return {
    formValues: state.form.uusiHakemus.values,
    muutosperustelu,
    muuperustelu,
    paatoskierros,
    tutkintomuutokset,
    muutosperustelut: state.muutosperustelut,
    paatoskierrokset: state.paatoskierrokset
  }
})(MuutospyyntoWizardYhteenveto)


