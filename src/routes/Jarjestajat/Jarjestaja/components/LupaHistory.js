import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'

import LupaHistoryItem from './LupaHistoryItem'

const LupaHistoryWrapper = styled.div`
  margin: 20px 0;
`

class LupaHistory extends Component {
  componentWillMount() {
    const { jarjestajaOid } = this.props

    if (jarjestajaOid) {
      this.props.fetchLupaHistory(jarjestajaOid)
    }
  }

  render() {
    const { lupaHistory } = this.props

    if (lupaHistory.fetched) {
      return <LupaHistoryWrapper>{this.renderLupaHistoryList(lupaHistory.data)}</LupaHistoryWrapper>
    } else if (lupaHistory.isFetching) {
      return <h2>Ladataan...</h2>
    } else if (lupaHistory.hasErrored) {
      return <h2>Lupahistoriaa ladattaessa tapahtui virhe</h2>
    } else {
      return null
    }
  }

  renderLupaHistoryList(data) {
    return _.map(data, historyData => <LupaHistoryItem lupaHistoria={historyData} key={historyData.diaarinumero} />)
  }
}

export default LupaHistory
