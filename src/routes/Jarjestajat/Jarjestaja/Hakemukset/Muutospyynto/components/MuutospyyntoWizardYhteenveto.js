import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import validate from '../modules/validateWizard'

let MuutospyyntoWizardYhteenveto = props => {
  const { handleSubmit, muutosperustelu, paatoskierros, poistettavat, lisattavat } = props
  return (
    <div>
      <h2>Yhteenveto</h2>

      <div>
        <h3>Muutoksen perustelu</h3>
        <div>{muutosperustelu}</div>
      </div>

      <div>
        <h3>Päätöskierros</h3>
        <div>{paatoskierros}</div>
      </div>

      <div>
        <h3>Lisättävät tutkinnot</h3>
        <div>
          {lisattavat
            ? lisattavat.map(tutkinto => <div key={tutkinto}>{tutkinto}</div>)
            : 'Ei lisättäviä tutkintoja'
          }
        </div>
      </div>

      <div>
        <h3>Poistettavat tutkinnot</h3>
        <div>
          {poistettavat
            ? poistettavat.map(tutkinto => <div key={tutkinto}>{tutkinto}</div>)
            : 'Ei poistettavia tutkintoja'
          }
        </div>
      </div>

      <form onSubmit={handleSubmit}>

        <button type="submit" className="next">
          Tallenna
        </button>
      </form>
    </div>
  )
}

const selector = formValueSelector('uusi-hakemus')

MuutospyyntoWizardYhteenveto = connect(state => {
  const muutosperustelu = selector(state, 'muutosperustelu')
  const paatoskierros = selector(state, 'paatoskierros')
  const poistettavat = selector(state, 'poistettavat')
  const lisattavat = selector(state, 'lisattavat')

  return {
    muutosperustelu,
    paatoskierros,
    poistettavat,
    lisattavat
  }
})(MuutospyyntoWizardYhteenveto)

export default reduxForm({
  form: 'uusi-hakemus',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(MuutospyyntoWizardYhteenveto)
