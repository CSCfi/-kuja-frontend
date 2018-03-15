import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import styled from 'styled-components'

import MuutospyyntoWizardPaatoskierros from './MuutospyyntoWizardPaatoskierros'
import MuutospyyntoWizardPerustelut from './MuutospyyntoWizardPerustelut'
import MuutospyyntoWizardTutkinnot from './MuutospyyntoWizardTutkinnot'
import MuutospyyntoWizardYhteenveto from './MuutospyyntoWizardYhteenveto'

import Loading from '../../../../../../modules/Loading'

import { ContentContainer } from "../../../../../../modules/elements"
import { COLORS, MEDIA_QUERIES } from "../../../../../../modules/styles"
import close from 'static/images/close-x.svg'

const WizardBackground = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
`

const WizardTop = styled.div`
  background-color: ${COLORS.DARK_GRAY};
  position: relative;
  left: 0;
  height: 50px;
  width: 100vw;
  z-index: 2;
  display: flex;
`

const WizardHeader = styled.div`
  background-color: ${COLORS.BG_GRAY};
  position: relative;
  left: 0;
  height: 50px;
  width: 100vw;
  z-index: 2;
  display: flex;
  font-size: 14px;
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
  top: -45px;
`

const Container = styled.div`
  width: 100%;
  max-width: ${props => props.maxWidth ? props.maxWidth : '1280px'};
  margin: ${props => props.margin ? props.margin : 'auto'};  
  padding: ${props => props.padding ? props.padding : '0 15px'};
  box-sizing: border-box;
  display: flex;
  color: ${props => props.color ? props.color : COLORS.WHITE};
  justify-content: space-between;
  align-items: center;
  
  @media ${MEDIA_QUERIES.MOBILE} {
    margin: 0 auto;
  }
`

const CloseButton = styled.img`
  height: 20px;
  cursor: pointer;
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

const PhaseStyle = styled.div`
  display: flex;
  align-items: baseline;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`

const Circle = styled.div`
  background: ${props => props.active ? COLORS.OIVA_GREEN : COLORS.LIGHT_GRAY};
  color: ${COLORS.WHITE};
  height: 27px;
  width: 27px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`

const Text = styled.div`
  color: ${props => props.active ? COLORS.BLACK : 'rgb(96, 96, 96)'};
`

export const SelectWrapper = styled.div`
  margin-bottom: 20px;
`

const Phase = ({ number, text, activePage, disabled, handleClick }) => {
  const isActive = Number(number) === Number(activePage)

  return (
    <PhaseStyle disabled={disabled} onClick={disabled ? null : () => handleClick(Number(number))}>
      <Circle active={isActive}>{number}</Circle>
      <Text active={isActive}>{text}</Text>
    </PhaseStyle>
  )
}

class MuutospyyntoWizard extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.changePhase = this.changePhase.bind(this)
    this.state = {
      page: 1,
      visitedPages: [1]
    }
  }

  componentWillMount() {
    this.props.fetchMuutosperustelut()
    const { ytunnus } = this.props.match.params
    this.props.fetchLupa(ytunnus, '?with=all')
    this.props.fetchPaatoskierrokset()
  }

  nextPage() {
    const next = this.state.page + 1
    let visited = this.state.visitedPages

    if (visited.indexOf(next) === -1) {
      visited.push(next)
      this.setState({ page: next, visitedPages: visited })
    } else {
      this.setState({ page: next })
    }
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

  changePhase(number) {
    this.setState({ page: number })
  }

  render() {
    const { muutosperustelut, lupa, paatoskierrokset, createMuutospyynto } = this.props
    const { page, visitedPages } = this.state


    if (muutosperustelut.fetched && lupa.fetched && paatoskierrokset.fetched) {
      return (
        <div>
          <WizardBackground />

          <WizardWrapper>
            <WizardTop>
              <Container padding="0 20px">
                <div>Uusi muutoshakemus</div>
                <CloseButton src={close} onClick={this.onCancel} />
              </Container>
            </WizardTop>

            <WizardHeader>
              <Container maxWidth="1085px" color={COLORS.BLACK}>
                <Phase number="1" text="Valitse päätöskierros" activePage={page} handleClick={(number) => this.changePhase(number)} />
                <Phase number="2" text="Perustelut" activePage={page} disabled={visitedPages.indexOf(2) === -1} handleClick={(number) => this.changePhase(number)} />
                <Phase number="3" text="Muutokset" activePage={page} disabled={visitedPages.indexOf(3) === -1} handleClick={(number) => this.changePhase(number)} />
                <Phase number="4" text="Yhteenveto" activePage={page} disabled={visitedPages.indexOf(4) === -1} handleClick={(number) => this.changePhase(number)} />
              </Container>
            </WizardHeader>

            <ContentContainer maxWidth="1085px">
              <WizardContent>
                {page === 1 && (
                  <MuutospyyntoWizardPaatoskierros
                    onSubmit={this.nextPage}
                    onCancel={this.onCancel}
                    paatoskierrokset={paatoskierrokset.data}
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
    } else if (muutosperustelut.isFetching || lupa.isFetching || paatoskierrokset.isFetching) {
      return <Loading />
    } else if (muutosperustelut.hasErrored) {
      return <div>Muutospyyntöä ei voida tehdä. Muutosperusteluita ladattaessa tapahtui virhe.</div>
    } else if (paatoskierrokset.hasErrored) {
      return <div>Muutospyyntöä ei voida tehdä. Päätoskierroksia ladattaessa tapahtui virhe.</div>
    } else if (lupa.hasErrored) {
      return <div>Muutospyyntöä ei voida tehdä. Lupaa haettaessa tapahtui virhe.</div>
    } else {
      return null
    }
  }
}

export default withRouter(MuutospyyntoWizard)
