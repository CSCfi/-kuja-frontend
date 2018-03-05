import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import styled from 'styled-components'

import validate from '../modules/validateWizard'
import { COLORS } from "../../../../../../modules/styles"
import { WizButton } from "./MuutospyyntoWizard"

const Kohde = styled.div`
  margin-left: 30px;
  position: relative;
  //border-bottom: 1px solid ${COLORS.BORDER_GRAY};
  padding: 0 0 26px;
  
  &:last-child {
    border-bottom: none;
  }
`

const Kohdenumero = styled.span`
  font-size: 20px;
  position: absolute;
  left: -30px;
`

const Otsikko = styled.h3`
  text-transform: uppercase;
  font-size: 20px;
`

const ControlsWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

const BottomWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

class MuutospyyntoWizardTutkinnot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isRemoving: false
    }

    this.renderTutkinnot = this.renderTutkinnot.bind(this)
    this.toggleIsRemoving = this.toggleIsRemoving.bind(this)
  }

  toggleIsRemoving() {
    this.setState({ isRemoving: !this.state.isRemoving })
  }

  render() {
    const { handleSubmit, lupa, poistettavatValue } = this.props

    const { isRemoving } = this.state

    const { kohteet } = lupa

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <FieldArray
            name="poistettavat"
            kohde={kohteet[1]}
            isRemoving={isRemoving}
            poistettavatValue={poistettavatValue}
            component={this.renderTutkinnot}
          />
          <BottomWrapper>
              {isRemoving
                ?
                <div>
                  <WizButton disabled={poistettavatValue === undefined || poistettavatValue.length === 0} bgColor={COLORS.OIVA_GREEN}>Poista valitut</WizButton>
                  <WizButton bgColor={COLORS.OIVA_RED} onClick={this.toggleIsRemoving}>Peruuta</WizButton>
                </div>
                :
                <div>
                  <WizButton bgColor={COLORS.OIVA_RED} onClick={this.toggleIsRemoving}>Poista tutkintoja</WizButton>
                </div>
              }
              <WizButton type="submit" disabled={poistettavatValue === undefined || poistettavatValue.length === 0}>Seuraava</WizButton>
          </BottomWrapper>
        </form>
      </div>
    )
  }

  renderTutkinnot(props) {
    let { fields } = props
    const { isRemoving, poistettavatValue, kohde } = props
    const { kohdeid, heading, maaraykset, muutMaaraykset } = kohde

    return (
      <Kohde>
        <Kohdenumero>{kohdeid}.</Kohdenumero>
        <Otsikko>{heading}</Otsikko>

        {isRemoving
          ?
            <ControlsWrapper>
              <WizButton disabled={poistettavatValue === undefined || poistettavatValue.length === 0} bgColor={COLORS.OIVA_GREEN}>Poista valitut</WizButton>
              <WizButton bgColor={COLORS.OIVA_RED} onClick={this.toggleIsRemoving}>Peruuta</WizButton>
            </ControlsWrapper>
          :
          <ControlsWrapper>
            <WizButton bgColor={COLORS.OIVA_RED} onClick={this.toggleIsRemoving}>Poista tutkintoja</WizButton>
          </ControlsWrapper>
        }

        <div>
          {maaraykset.map(({ koodi, nimi, koulutusalat }) => {
            return (
              <div key={koodi}>
                <div>{koodi} {nimi}</div>
                <div>
                  {_.map(koulutusalat, ({ koodi, nimi, tutkinnot }) => {
                    return (
                      <div key={koodi}>
                        {nimi}
                        {tutkinnot.map(({ koodi, nimi, maaraysId }) => {
                          return (
                            <div key={koodi}>
                              {isRemoving
                                ?
                                <input type="checkbox" onChange={(event) => {
                                  const { checked } = event.target
                                  if (checked) {
                                    fields.push(maaraysId)
                                  } else {
                                    let i = undefined
                                    _.forEach(poistettavatValue, (value, idx) => {
                                      if (value === maaraysId) {
                                        i = idx
                                      }
                                    })
                                    fields.remove(i)
                                  }
                                }}/>
                                : null
                              }
                              <label>{koodi}&nbsp;{nimi}</label>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </Kohde>
    )
  }
}

const selector = formValueSelector('uusi-hakemus')

MuutospyyntoWizardTutkinnot = connect(state => {
  const poistettavatValue = selector(state, 'poistettavat')

  return {
    poistettavatValue
  }
})(MuutospyyntoWizardTutkinnot)

export default reduxForm({
  form: 'uusi-hakemus',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(MuutospyyntoWizardTutkinnot)
