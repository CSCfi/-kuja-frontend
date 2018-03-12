import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'

import MuutospyyntoList from './MuutospyyntoList'

import { COLORS } from "../../../../../modules/styles"
import { slugify } from "../../../../../modules/helpers"

const Wrapper = styled.div`
  position: relative;
`

const UusiMuutospyynto = styled(Link)`
  position: absolute;
  right: 0;
  top: 10px;
  padding: 6px 12px;
  color: ${COLORS.OIVA_GREEN};
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`

class HakemuksetJaPaatokset extends Component {
  getMuutospyyntoUrl() {
    const {  match } = this.props
    // const { diaarinumero } = this.props.lupa.data

    return `${match.url}/uusi`
  }

  componentWillMount() {
    const { fetched, isFetching, hasErrored } = this.props.muutospyynnot
    if (!fetched && !isFetching && ! hasErrored) {
      const { ytunnus } = this.props.match.params
      this.props.fetchMuutospyynnot(ytunnus)
    }
  }

  render() {
    const { isFetching, fetched, hasErrored, data } = this.props.muutospyynnot

    if (fetched) {
      return (
        <Wrapper>
          <h2>Avoimet hakemukset</h2>
          <UusiMuutospyynto to={this.getMuutospyyntoUrl()}>Luo uusi</UusiMuutospyynto>
          <MuutospyyntoList muutospyynnot={data} />
        </Wrapper>
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
      return null
    }

  }
}

export default withRouter(HakemuksetJaPaatokset)
