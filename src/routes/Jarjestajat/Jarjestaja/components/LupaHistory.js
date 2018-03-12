import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'

import LupaHistoryItem from './LupaHistoryItem'
import Loading from '../../../../modules/Loading'

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
    const { fetched, isFetching, hasErrored, data } = this.props.lupaHistory

    if (fetched) {
      return <LupaHistoryWrapper>{this.renderLupaHistoryList(data)}</LupaHistoryWrapper>
    } else if (isFetching) {
      return <Loading />
    } else if (hasErrored) {
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
