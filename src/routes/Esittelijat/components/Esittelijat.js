import React, { Component } from 'react'

import styled from 'styled-components'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

import MuutospyyntoList from './MuutospyyntoList'
import { InnerContentContainer, InnerContentWrapper  } from "../../../modules/elements"
import { COLORS } from "../../../modules/styles"
import { ContentContainer, FullWidthWrapper } from '../../../modules/elements'


const Wrapper = styled.div`
  position: relative;
`

class Esittelijat extends Component {

  componentWillMount() {
    // const { esittelijaNimi } = ? // TODO

      this.props.fetchMuutospyynnotForEsittelija("oiva")
  }

  render() {

      //console.log("asldjaskldkalsdjklasd")
      const { isFetching, fetched, hasErrored, data } = this.props.muutospyynnot

      if (fetched) {
          return (
              <FullWidthWrapper backgroundColor={COLORS.BG_GRAY}>
                  <ContentContainer padding={'40px 15px 80px'} margin={'28px auto 0'}>

                      <BreadcrumbsItem to='/'>Etusivu</BreadcrumbsItem>
                      <BreadcrumbsItem to='/esittelijat'>Käsittely</BreadcrumbsItem>

                      <InnerContentContainer>
                          <InnerContentWrapper>
                              <Wrapper>
                                  <h2>Hakemukset</h2>
                                  <MuutospyyntoList muutospyynnot={data} />
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
              <h2>Muutoshakemuksia ladattessa tapahtui virhe</h2>
          )
      } else {
          <h2>Muutoshakemuksia ladattessa tapahtui virhe nullia</h2>
          return null
      }

  }
}

export default Esittelijat
