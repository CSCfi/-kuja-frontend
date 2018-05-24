import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector, Field } from 'redux-form'
import Moment from 'react-moment'

import validate from '../modules/validateWizard'
import { WizButton } from "./MuutospyyntoWizard"
import { COLORS } from "../../../../../../modules/styles"
import { parseLocalizedField } from "../../../../../../modules/helpers"
import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants"

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
    muutosperustelu,
    muuperustelu,
    tutkintomuutokset,
    onCancel,
    paatoskierrokset,
    muutosperustelut,
    opetuskielimuutokset,
    preview
  } = props


  const paatoskierrosObj = _.find(paatoskierrokset.data, pkierros => {
    if (pkierros.meta && pkierros.meta.nimi && pkierros.meta.nimi.fi) {
      if (pkierros.meta.nimi.fi === "Avoin päätöskierros 2018") {
        return pkierros
      }
    }
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

      {opetuskielimuutokset && opetuskielimuutokset.length > 0 &&
        <div>
          <h3>Opetuskielimuutokset</h3>
          <div>
            {opetuskielimuutokset.map(muutos => {
              const { nimi, koodiarvo, koodisto, type, perustelu } = muutos
              const identifier = `${koodiarvo}-${nimi}-${type}`
              const tyyppi = type === "addition" ? "lisäys" : type === "removal" ? "poisto" : null
              return (
                <div key={identifier}>{`${koodiarvo} ${nimi} ${tyyppi} ${perustelu}`}</div>
              )
            })}
          </div>
        </div>
      }

      <form onSubmit={handleSubmit}>
        <WizButton type="submit" className="next">
          Tallenna
        </WizButton>
        <WizButton bgColor={COLORS.OIVA_RED} onClick={(e) => onCancel(e)}>Peruuta</WizButton>
        <WizButton bgColor={COLORS.OIVA_PURPLE} onClick={(e) => preview(e, props.formValues)}>Esikatsele</WizButton>
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
  const opetuskielimuutokset = selector(state, 'opetuskielimuutokset')
  const tutkintokielimuutokset = selector(state, 'tutkintokielimuutokset')

  return {
    formValues: state.form.uusiHakemus.values,
    muutosperustelu,
    muuperustelu,
    paatoskierros,
    tutkintomuutokset,
    opetuskielimuutokset,
    tutkintokielimuutokset,
    muutosperustelut: state.muutosperustelut,
    paatoskierrokset: state.paatoskierrokset
  }
})(MuutospyyntoWizardYhteenveto)
