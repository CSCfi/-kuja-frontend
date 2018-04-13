import React, { Component } from 'react'
import _ from 'lodash'

import styled from 'styled-components'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

import AvoimetAsiatList from './AvoimetAsiatList'
import { InnerContentContainer, InnerContentWrapper  } from "../../../modules/elements"
import { COLORS } from "../../../modules/styles"
import { ContentContainer, FullWidthWrapper } from '../../../modules/elements'
import { ROLE_ESITTELIJA, ESITTELIJA } from '../../../modules/constants'

const Wrapper = styled.div`
  position: relative;
`

class AvoimetAsiat extends Component {

    componentWillMount() {
        this.props.fetchMuutospyynnotForEsittelija("oiva-sanni")
    }

    render() {

        const { isFetching, fetched, hasErrored, data } = this.props.muutospyynnot

        // Sallittu vain esittelijöille
        if(sessionStorage.getItem('role')!==ROLE_ESITTELIJA) {
            return (
                <h2>Käsittely vaatii kirjautumisen.</h2>
            )
        }

        if (fetched) {
            return (
                <FullWidthWrapper backgroundColor={COLORS.BG_GRAY}>
                    <ContentContainer padding={'40px 15px 80px'} margin={'28px auto 0'}>

                        <BreadcrumbsItem to='/'>Etusivu</BreadcrumbsItem>
                        <BreadcrumbsItem to='/asiat'>Asiat</BreadcrumbsItem>

                        <InnerContentContainer>
                            <InnerContentWrapper>
                                <Wrapper>
                                    <h2>Avoinna olevat asiat</h2>
                                    <AvoimetAsiatList muutospyynnot={data}/>
                                </Wrapper>
                            </InnerContentWrapper>
                        </InnerContentContainer>

                    </ContentContainer>
                </FullWidthWrapper>
            )
        } else if (isFetching) {
            return (
                <h2>Ladataan...</h2>
            )
        } else if (hasErrored) {
            return (
                <h2>Käsittelytietoja ladattaessa tapahtui virhe</h2>
            )
        } else {
            return (
                <h2>Käsittelytietoja ladattaessa ei saatu tietoja</h2>
            )
        }


    }
}

export default AvoimetAsiat
