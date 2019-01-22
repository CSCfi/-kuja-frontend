import _ from 'lodash'
import React, { Component } from 'react'
import Media from 'react-media'
import styled from 'styled-components'
import { Table, Thead, Tbody, Thn, Tr } from "../../../../modules/Table"
import { MEDIA_QUERIES } from "../../../../modules/styles"

import JarjestamislupaAsiatListItem from './JarjestamislupaAsiatListItem'
import Loading from '../../../../modules/Loading'

const WrapTable = styled.div`
   padding-bottom: 200px;
`

class JarjestamislupaAsiatLuettelo extends Component {
  componentWillMount() {
    const { jarjestajaOid } = this.props

    if (jarjestajaOid) {
      this.props.fetchLupaHistory(jarjestajaOid)
    }
  }

  render() {
    const { fetched, isFetching, hasErrored, data } = this.props.lupaHistory

    if (fetched) {
      return (
        <WrapTable>
          <Media query={MEDIA_QUERIES.MOBILE} render={() =>
            <Table>
              <Tbody>
                {this.renderJarjestamislupaAsiatList(data)}
              </Tbody>
            </Table>
          }/>
          <Media query={MEDIA_QUERIES.TABLET_MIN} render={() =>
            <Table>
              <Thead>
              <Tr>
                <Thn flex="2">Diaarinumero</Thn>
                <Thn flex="2">Asia</Thn>
                <Thn flex="2">Asiat tila</Thn>
                <Thn flex="3">Määräaika</Thn>
                <Thn flex="3">Hakemus lähetetty</Thn>
                <Thn flex="2">Päätetty</Thn>
                <Thn></Thn>
              </Tr>
              </Thead>
              <Tbody>
                {this.renderJarjestamislupaAsiatList(data)}
              </Tbody>
            </Table>
          }/>
        </WrapTable>
      )
    } else if (isFetching) {
      return <Loading />
    } else if (hasErrored) {
      return <h2>Järjestämislupa-asioita ladattaessa tapahtui virhe</h2>
    } else {
      return null
    }
  }

  renderJarjestamislupaAsiatList = data => {
    data = _.orderBy(data, ['paatospvm'], ['desc']);
    return _.map(data, historyData => <JarjestamislupaAsiatListItem lupaHistoria={historyData} key={historyData.diaarinumero} />)

  }
}

export default JarjestamislupaAsiatLuettelo
