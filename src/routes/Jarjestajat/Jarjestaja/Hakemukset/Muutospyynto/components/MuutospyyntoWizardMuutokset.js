import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import _ from 'lodash'

import MuutospyyntoWizardTutkinnot from './MuutospyyntoWizardTutkinnot'
import MuutospyyntoWizardOpetuskieletContainer from '../containers/MuutospyyntoWizardOpetuskieletContainer'
import MuutospyyntoWizardTutkintokieletContainer from '../containers/MuutospyyntoWizardTutkintokieletContainer'
import MuutospyyntoWizardToimialueContainer from '../containers/MuutospyyntoWizardToimialueContainer'
import MuutospyyntoWizardOpiskelijavuodet from './MuutospyyntoWizardOpiskelijavuodet'
import MuutospyyntoWizardMuutContainer from '../containers/MuutospyyntoWizardMuutContainer'
import { Kohde } from "./MuutospyyntoWizardComponents"
import styled from 'styled-components'
import { FORM_NAME_UUSI_HAKEMUS } from "../modules/uusiHakemusFormConstants"
import { MUUT_KEYS } from "../modules/constants"

const Otsikko = styled.div`
  display: flex;
  align-items: baseline;
`

class MuutospyyntoWizardMuutokset extends Component { 
  constructor() {
    super()

    this.state = {
      modalIsOpen: false
    }
  }

  componentDidUpdate(prevProps) {
    const isFormModified = !_.isEqual(prevProps.formValues, this.props.formValues);
    if (isFormModified) {
      this.props.onChildComponentUpdate(this.props.formValues)
    }
  }

  componentWillMount() {
    // MuutospyyntoWIzardTutkinnot ja MuutospyyntoWizardTutkintokielet tarvitsevat listan tutkinnoista
    if ((!this.props.koulutusalat.fetched && !this.props.koulutusalat.hasErrored) 
      || (!this.props.koulutustyypit.fetched && !this.props.koulutustyypit.hasErrored)) {
      this.props.fetchKoulutusalat()
        .then(() => {
          this.props.fetchKoulutustyypit()
            .then(() => {
              if (this.props.koulutusalat.fetched && !this.props.koulutusalat.hasErrored && 
                this.props.koulutustyypit.fetched && !this.props.koulutustyypit.hasErrored) {
                this.props.fetchKoulutuksetAll()
                this.props.fetchKoulutuksetMuut(MUUT_KEYS.KULJETTAJAKOULUTUS)
                this.props.fetchKoulutuksetMuut(MUUT_KEYS.OIVA_TYOVOIMAKOULUTUS)
                this.props.fetchKoulutuksetMuut(MUUT_KEYS.AMMATILLISEEN_TEHTAVAAN_VALMISTAVA_KOULUTUS)
                this.props.fetchKoulutus("999901")
                this.props.fetchKoulutus("999903")
                }
            })
        })
    }
  }

  render() {
    const {
      lupa
    } = this.props

    return (
      <div>

        <Otsikko>Seuraavat kohdat on jaoteltu ammatillisten tutkintojen ja koulutuksen järjestämisluvan rakenteen
          mukaisesti. Hakijan tulee täyttää alla olevat kohdat vain siltä osin, mihin tutkintojen ja koulutuksen
          järjestämislupaan haetaan muutosta. Tarkemmat ohjeistukset sekä pykäläviittaukset ammatillisen koulutuksen
          lakiin (531/2017) on esitetty kohdittain.</Otsikko>

        <form onSubmit={this.props.handleSubmit}>
          <MuutospyyntoWizardTutkinnot
            lupa={lupa}
          />

          <Kohde>
            <MuutospyyntoWizardOpetuskieletContainer
              lupa={lupa}
            />

            <MuutospyyntoWizardTutkintokieletContainer
              lupa={lupa}
            />
          </Kohde>

          <Kohde>
            <MuutospyyntoWizardToimialueContainer
              lupa={lupa}
            />
          </Kohde>

          <Kohde>
            <MuutospyyntoWizardOpiskelijavuodet
              lupa={lupa}
            />
          </Kohde>

          <Kohde>
            <MuutospyyntoWizardMuutContainer
              lupa={lupa}
            />
          </Kohde>
        </form>
      </div>
    )

  }
}

MuutospyyntoWizardMuutokset = reduxForm({
  form: FORM_NAME_UUSI_HAKEMUS,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize : true
})(MuutospyyntoWizardMuutokset)

export default connect(state => {
  let formVals = undefined
  if (state.form && state.form.uusiHakemus && state.form.uusiHakemus.values) {
    formVals = state.form.uusiHakemus.values
  }

  return {
    formValues: formVals,
    koulutusalat: state.koulutusalat,
    koulutustyypit: state.koulutustyypit
  }
})(MuutospyyntoWizardMuutokset)
