import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import styled from 'styled-components'

import ValmisteluPerustelut from './ValmisteluPerustelut'
import ValmisteluTutkinnot from './ValmisteluTutkinnot'
import ValmisteluYhteenveto from './ValmisteluYhteenveto'

import Loading from '../../../../modules/Loading'

import { ContentContainer } from "../../../../modules/elements"
import { COLORS, MEDIA_QUERIES } from "../../../../modules/styles"
import close from 'static/images/close-x.svg'
import {ROLE_ESITTELIJA, ROLE_KAYTTAJA} from "../../../../modules/constants";
import _ from 'lodash'

import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import { Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import AvoimetAsiatContainer from '../../containers/AvoimetAsiatContainer'
import ValmistelussaAsiatContainer from '../../containers/ValmistelussaAsiatContainer'
import PaatetytAsiatContainer from '../../containers/PaatetytAsiatContainer'
import AsiatMenu from '../../components/AsiatMenu'
import { BackgroundImage } from "../../../../modules/styles"
import { FullWidthWrapper } from '../../../../modules/elements'



const WizardBackground = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  position: absolute;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
`

const WizardTop = styled.div`
  background-color: ${COLORS.DARK_GRAY};
  position: fixed;
  left: 0;
  top: 0;
  height: 50px;
  width: 100%;
  z-index: 2;
  display: flex;
`

const WizardHeader = styled.div`
  background-color: ${COLORS.BG_GRAY};
  position: fixed;
  left: 0;
  top: 50px;
  height: 50px;
  width: 100%;
  z-index: 2;
  display: flex;
  font-size: 14px;
`

const WizardContent = styled.div`
  background-color: ${COLORS.WHITE};
  padding: 30px;
  //border: 1px solid ${COLORS.BORDER_GRAY};
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

class Valmistelu extends Component {
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
        const { uuid } = this.props.match.params
        this.props.fetchMuutospyynto(uuid)

        const { muutospyynto } = this.props
        console.log('TEST: ' + JSON.stringify(muutospyynto))


        this.props.fetchMuutosperustelut()
        const { jarjestajaYtunnus } = muutospyynto

        console.log('TEST2: ' + JSON.stringify(jarjestajaYtunnus))

        // TODO: haettavat uuid:n perusteella heti kun backend tukee
        this.props.fetchLupa('0208201-1', '?with=all')
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
        // this.onCancel() // TODO: tehdään onDone-funktio
    }

    changePhase(number) {
        this.setState({ page: number })
    }

    render() {
        const { muutosperustelut, lupa, paatoskierrokset, muutospyynto, match } = this.props
        const { page, visitedPages } = this.state

        console.log('TEST: ' + JSON.stringify(muutospyynto))


        if(sessionStorage.getItem('role')!==ROLE_ESITTELIJA) {
            return (
                <h2>Valmistelu tekeminen vaatii kirjautumisen palveluun.</h2>
            )
        }

        // check the rights
        let authenticated = false;
        if(sessionStorage.getItem('role')===ROLE_ESITTELIJA) {
            authenticated = true;
        }

        // Alanavigaation tabivalikon routet
        const tabNavRoutes = [
            {
                path: `${match.url}`,
                exact: true,
                text: {'fi':'Avoinna olevat asiat','sv':'Avoinna olevat asiat på svenska'},
                authenticated: true
            },
            {
                path: `${match.url}/valmistelussa-olevat-asiat`,
                text: {'fi':'Valmistelussa olevat asiat','sv':'Valmistelussa olevat asiat på svenska'},
                authenticated: authenticated
            },
            {
                path: `${match.url}/paatetyt-asiat`,
                text: {'fi':'Päätetyt asiat','sv':'Päätetyt asiat på svenska'},
                authenticated: authenticated
            }
        ]

        if (muutosperustelut.fetched && lupa.fetched && paatoskierrokset.fetched) {
            return (
                <div>
                    <ContentContainer padding={'20px auto 0px auto'} margin={'38px auto 0px auto'}>
                        <Helmet>
                            <title>Oiva | Asiat</title>
                        </Helmet>
                        <BackgroundImage />
                        <BreadcrumbsItem to='/'>Etusivu</BreadcrumbsItem>
                        <BreadcrumbsItem to='/asiat'>Asiat</BreadcrumbsItem>
                        <AsiatMenu routes={tabNavRoutes} />
                    </ContentContainer>

                    <FullWidthWrapper backgroundColor={COLORS.BG_GRAY}>
                        <ContentContainer padding={'10px 0px 40px'} margin={'0px auto 0'}>

                            {(authenticated) ? (<Route path={`${match.url}`} render={() => <AvoimetAsiatContainer />} />) : null }
                            {(authenticated) ? (<Route path={`${match.url}/valmistelussa-olevat-asiat`} render={() => <ValmistelussaAsiatContainer />} />) : null }
                            {(authenticated) ? (<Route path={`${match.url}/paatetyt-asiat`} render={() => <PaatetytAsiatContainer />} />) : null }

                        </ContentContainer>
                    </FullWidthWrapper>
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

export default withRouter(Valmistelu)
