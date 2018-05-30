import React, { Component } from 'react'

import styled from 'styled-components'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

import { InnerContentContainer, InnerContentWrapper  } from "../../../modules/elements"
import { COLORS, BackgroundImage } from "../../../modules/styles"
import { ContentContainer, FullWidthWrapper } from '../../../modules/elements'
import { ROLE_ESITTELIJA, ESITTELIJA } from '../../../modules/constants'
import ValmistelussaAsiatList from "./ValmistelussaAsiatList";
import AsiatMenu from './AsiatMenu'
import { Helmet } from 'react-helmet'


const Wrapper = styled.div`
  position: relative;
`

class ValmistelussaAsiat extends Component {

    componentWillMount() {
        this.props.fetchValmistelussaAsiat()
    }

    render() {
        const { match } = this.props
        const { isFetching, fetched, hasErrored, data } = this.props.muutospyynnot

        // check the rights
        let authenticated = false;
        if(sessionStorage.getItem('role')===ROLE_ESITTELIJA) {
            authenticated = true;
        }

        // Sallittu vain esittelijöille
        if(sessionStorage.getItem('role')!==ROLE_ESITTELIJA) {
            return (
                <h2>Käsittely vaatii kirjautumisen.</h2>
            )
        }

        // Alanavigaation tabivalikon routet
        const tabNavRoutes = [
            {
                path: `/asiat`,
                exact: true,
                text: {'fi':'Avoinna olevat asiat','sv':'Avoinna olevat asiat på svenska'},
                authenticated: true
            },
            {
                path: `${match.url}`,
                text: {'fi':'Valmistelussa olevat asiat','sv':'Valmistelussa olevat asiat på svenska'},
                authenticated: authenticated
            },
            {
                path: `paatetyt-asiat`,
                text: {'fi':'Päätetyt asiat','sv':'Päätetyt asiat på svenska'},
                authenticated: authenticated
            }
        ]

        if (fetched) {
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
                        <ContentContainer padding={'40px 15px 80px'} margin={'28px auto 0'}>
                            <InnerContentContainer>
                                <InnerContentWrapper>
                                    <Wrapper>
                                        <h2>Valmistelussa olevat asiat</h2>
                                        <ValmistelussaAsiatList muutospyynnot={data}/>
                                    </Wrapper>
                                </InnerContentWrapper>
                            </InnerContentContainer>
                        </ContentContainer>
                    </FullWidthWrapper>
                </div>
            )
        } else if (isFetching) {
            return (
                <h2>Ladataan...</h2>
            )
        } else if (hasErrored) {
            return (
                <h2>Käsittelytietoja ladattessa tapahtui virhe</h2>
            )
        } else {
            return (
                <h2>Käsittelytietoja ladattessa ei saatu tietoja</h2>
            )
        }


    }
}

export default ValmistelussaAsiat
