import React, { Component } from 'react'
import styled from 'styled-components'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import { Route } from 'react-router-dom'

import JarjestajaBasicInfo from './JarjestajaBasicInfo'
import ProfileMenu from './ProfileMenu'
import JulkisetTiedot from './JulkisetTiedot'
import OmatTiedot from './OmatTiedot'
import JarjestamislupaContainer from '../containers/JarjestamislupaContainer'

import { COLORS } from "../../../../modules/styles"
import { ContentContainer, FullWidthWrapper } from '../../../../modules/elements'
import HakemuksetJaPaatoksetContainer from "../Hakemukset/containers/HakemuksetJaPaatoksetContainer"
import HakemusContainer from "../Hakemukset/containers/HakemusContainer"

const Separator = styled.div`
  &:after {
    display: block;
    content: '';
    width: 100%;
    height: 1px;
    background-color: ${COLORS.BORDER_GRAY};
    margin: 30px 0;
  }
`

class Jarjestaja extends Component {
  componentWillMount() {
    const { ytunnus } = this.props.match.params
    this.props.fetchLupa(ytunnus, '?with=all')
  }

  render() {
    const { match, lupa } = this.props

    // Alanavigaation tabivalikon routet
    const tabNavRoutes = [
      {
        path: `${match.url}`,
        exact: true,
        text: 'Julkiset tiedot'
      },
      {
        path: `${match.url}/omat-tiedot`,
        text: 'Omat tiedot'
      },
      {
        path: `${match.url}/jarjestamislupa`,
        text: 'Järjestämislupa'
      },
      {
        path: `${match.url}/hakemukset-ja-paatokset`,
        text: 'Hakemukset ja päätökset'
      }
    ]

    if (match.params) {
      if (lupa.fetched) {
        const lupadata = this.props.lupa.data
        const { jarjestaja } = lupadata
        const breadcrumb = `/jarjestajat/${match.params.id}`
        const jarjestajaNimi = jarjestaja.nimi.fi || jarjestaja.nimi.sv || ''

        return (
          <div>
            <ContentContainer>
              <BreadcrumbsItem to='/'>Etusivu</BreadcrumbsItem>
              <BreadcrumbsItem to='/jarjestajat'>Koulutuksen järjestäjät</BreadcrumbsItem>
              <BreadcrumbsItem to={breadcrumb}>{jarjestajaNimi}</BreadcrumbsItem>

              <JarjestajaBasicInfo jarjestaja={jarjestaja} />

              <Separator />

              <ProfileMenu routes={tabNavRoutes} />
            </ContentContainer>
            <FullWidthWrapper backgroundColor={COLORS.BG_GRAY}>
              <ContentContainer padding={'40px 15px 80px'} margin={'28px auto 0'}>
                <Route path={`${match.url}`} exact render={() => <JulkisetTiedot lupadata={lupadata} />} />
                <Route path={`${match.url}/omat-tiedot`} render={() => <OmatTiedot />} />
                <Route path={`${match.url}/jarjestamislupa`} render={() => <JarjestamislupaContainer />} />
                {/*Hakemusroutes: tee routtaus niinku juuressa -> käydään läpi toisessa filussa ja importataan*/}
                <Route path={`${match.path}/hakemukset-ja-paatokset`} exact render={(props) =>  <HakemuksetJaPaatoksetContainer {...props} />} />
                <Route path={`${match.url}/hakemukset-ja-paatokset/:diaarinumero`} component={HakemusContainer}/>
              </ContentContainer>
            </FullWidthWrapper>
          </div>
        )
      } else if (lupa.isFetching) {
        return <h2>Ladataan...</h2>
      } else if (lupa.hasErrored) {
        return <h2>Luvan lataamisessa tapahtui virhe</h2>
      } else {
        return null
      }
    } else {
      return <h2>Ladataan...</h2>
    }
  }
}

export default Jarjestaja
