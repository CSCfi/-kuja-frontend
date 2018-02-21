import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import MuutospyyntoList from './MuutospyyntoList'

class HakemuksetJaPaatokset extends Component {
  componentWillMount() {
    const { ytunnus } = this.props.match.params
    this.props.fetchMuutospyynnot(ytunnus)
  }

  render() {
    const { isFetching, fetched, hasErrored, data } = this.props.muutospyynnot

    if (fetched) {
      return (
        <div>
          <h2>Avoimet hakemukset</h2>
          <MuutospyyntoList muutospyynnot={data} />
        </div>
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
