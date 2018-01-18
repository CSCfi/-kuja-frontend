import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

import LupaHistoryContainer from '../containers/LupaHistoryContainer'
import CurrentLupa from './CurrentLupa'
import JarjestajaBasicInfo from './JarjestajaBasicInfo'
import Section from './Section'
import { LUPA_SECTIONS } from '../modules/constants'
import { LUPA_LISAKOULUTTAJAT } from "../../modules/constants"
import { LUPA_EXCEPTION_PATH } from "../../../../modules/constants"
import { COLORS } from "../../../../modules/styles"

const JarjestajaWrapper = styled.div`
  margin: 20px 0 40px;
`

const LargeParagraph = styled.p`
  font-size: 20px;
  line-height: 24px;
  margin: 0;
`

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

const LupaInfoWrapper = styled.div`
  margin: 44px 0 20px;
  
  h2 {
    font-weight: bold;
  }
`

class Jarjestaja extends Component {
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchLupa(id, '?with=all')
  }

  render() {
    const { match, lupa } = this.props

    if (match.params) {
      if (lupa.fetched) {
        const lupadata = this.props.lupa.lupa
        const { jarjestaja } = this.props.lupa.lupa
        const { diaarinumero, alkupvm, jarjestajaOid } = lupadata
        const breadcrumb = `/jarjestajat/${match.params.id}`
        const name = jarjestaja.nimi.fi || jarjestaja.nimi.sv || ''
        const lupaException = LUPA_LISAKOULUTTAJAT[jarjestaja.ytunnus]

        return (
          <JarjestajaWrapper>
            <BreadcrumbsItem to='/'>Etusivu</BreadcrumbsItem>
            <BreadcrumbsItem to='/jarjestajat'>Koulutuksen järjestäjät</BreadcrumbsItem>
            <BreadcrumbsItem to={breadcrumb}>{name}</BreadcrumbsItem>

            <JarjestajaBasicInfo jarjestaja={jarjestaja} />

            <Separator />

            <LupaInfoWrapper>
              <h2>Koulutuksen järjestämisluvat</h2>
              <LargeParagraph>Voimassa oleva lupa</LargeParagraph>
            </LupaInfoWrapper>

            <CurrentLupa
              diaarinumero={diaarinumero}
              jarjestaja={name}
              infotext="Ammatillisten tutkintojen ja koulutuksen järjestämislupa"
              voimassaolo={alkupvm}
              lupaExceptionUrl={lupaException ? `${LUPA_EXCEPTION_PATH}${lupaException.pdflink}` : null}
            />

            <LargeParagraph>Päättyneet luvat</LargeParagraph>

            <LupaHistoryContainer jarjestajaOid={jarjestajaOid} />


            {/* Luvan tiedot, piilotettu toistaiseksi*/}
            {/*<h4>Lupa id: {match.params.id}</h4>*/}

            {/*{Object.keys(LUPA_SECTIONS).map((key, i) =>*/}
              {/*<Section*/}
                {/*key={i}*/}
                {/*heading={LUPA_SECTIONS[key].heading}*/}
                {/*target={key}*/}
                {/*maaraykset={this.parseMaaraykset(parseInt(key, 10))}*/}
              {/*/>*/}
            {/*)}*/}
          </JarjestajaWrapper>
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

  parseMaaraykset(kohdeId) {
    const { maaraykset } = this.props.lupa.lupa

    if (!maaraykset) {
      return null
    }

    return _.filter(maaraykset, (maarays) => {
      return maarays.kohde.id === kohdeId
    })
  }
}

export default Jarjestaja
