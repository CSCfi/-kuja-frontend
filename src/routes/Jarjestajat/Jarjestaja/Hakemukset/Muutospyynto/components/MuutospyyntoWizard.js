import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import styled from 'styled-components'

import MuutospyyntoWizardPaatoskierros from './MuutospyyntoWizardPaatoskierros'
import MuutospyyntoWizardPerustelut from './MuutospyyntoWizardPerustelut'
import MuutospyyntoWizardTutkinnot from './MuutospyyntoWizardTutkinnot'
import MuutospyyntoWizardYhteenveto from './MuutospyyntoWizardYhteenveto'

import Loading from '../../../../../../modules/Loading'

import { ContentContainer } from "../../../../../../modules/elements"
import { COLORS } from "../../../../../../modules/styles"

const WizardBackground = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
`

const WizardHeader = styled.div`
  background-color: ${COLORS.BG_GRAY};
  position: relative;
  top: 0;
  left: 0;
  height: 50px;
  width: 100vw;
  z-index: 1;
`

const WizardContent = styled.div`
  background-color: ${COLORS.WHITE};
  padding: 30px;
  border: 1px solid ${COLORS.BORDER_GRAY};
  position: relative;
  z-index: 1;
`

const WizardWrapper = styled.div`
  position: relative;
`

export const WizButton = styled.button`
  color: ${props => props.textColor ? props.textColor : COLORS.WHITE};
  background-color: ${props => props.disabled ? COLORS.LIGHT_GRAY : props.bgColor ? props.bgColor : COLORS.OIVA_GREEN};
  border: 1px solid ${props => props.disabled ? COLORS.LIGHT_GRAY : props.bgColor ? props.bgColor : COLORS.OIVA_GREEN};
  cursor: pointer;
  display: inline-block;
  position: relative;
  margin-right: 15px;
  height: 36px;
  width: 140px;
  line-height: 36px;
  vertical-align: middle;
  text-align: center;
  border-radius: 2px;
  
  &:hover {
    color: ${props => props.disabled ? COLORS.WHITE : props.bgColor ? props.bgColor : COLORS.OIVA_GREEN};
    background-color: ${props => props.disabled ? COLORS.LIGHT_GRAY : props.textColor ? props.textColor : COLORS.WHITE};
    ${props => props.disabled ? 'cursor: not-allowed;' : null}
  }
`

export const SelectWrapper = styled.div`
  margin-bottom: 20px;
`

class MuutospyyntoWizard extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      page: 1
    }
  }

  componentWillMount() {
    this.props.fetchMuutosperustelut()
    const { ytunnus } = this.props.match.params
    this.props.fetchLupa(ytunnus, '?with=all')
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  onCancel(event) {
    if (event) {
      event.preventDefault()
    }
    const url = `/jarjestajat/${this.props.match.params.ytunnus}`
    this.props.history.push(url)
  }

  onSubmit(data) {
    this.props.createMuutospyynto(data)
    this.onCancel() // TODO: tehdään onDone-funktio
  }

  render() {
    const { muutosperustelut, lupa, createMuutospyynto } = this.props
    const { page } = this.state

    if (muutosperustelut.fetched && lupa.fetched) {
      return (
        <div>
          <WizardBackground />

          <WizardWrapper>
            <WizardHeader>
              <ContentContainer>

              </ContentContainer>
            </WizardHeader>

            <ContentContainer>

              <WizardContent>
                {page === 1 && (
                  <MuutospyyntoWizardPaatoskierros
                    onSubmit={this.nextPage}
                    onCancel={this.onCancel}
                    lupa={lupa}
                  />
                )}
                {page === 2 && (
                  <MuutospyyntoWizardPerustelut
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    onCancel={this.onCancel}
                    muutosperustelut={this.props.muutosperustelut.data}
                  />
                )}
                {page === 3 && (
                  <MuutospyyntoWizardTutkinnot
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    onCancel={this.onCancel}
                    lupa={lupa}
                    fetchKoulutusalat={this.props.fetchKoulutusalat}
                    fetchKoulutukset={this.props.fetchKoulutukset}
                  />
                )}
                {page === 4 && (
                  <MuutospyyntoWizardYhteenveto
                    previousPage={this.previousPage}
                    onCancel={this.onCancel}
                    onSubmit={this.onSubmit}
                  />
                )}
              </WizardContent>
            </ContentContainer>
          </WizardWrapper>
        </div>
      )
    } else if (muutosperustelut.isFetching || lupa.isFetching) {
      return <Loading />
    } else if (muutosperustelut.hasErrored) {
      return <div>Muutospyyntöä ei voida tehdä. Muutosperusteluita ladattaessa tapahtui virhe.</div>
    } else if (lupa.hasErrored) {
      return <div>Muutospyyntöä ei voida tehdä. Lupaa haettaessa tapahtui virhe.</div>
    } else {
      return null
    }
  }
}

export default withRouter(MuutospyyntoWizard)
