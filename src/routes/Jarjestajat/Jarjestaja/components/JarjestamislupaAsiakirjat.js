import _ from 'lodash'
import React, { Component } from 'react'
import Media from 'react-media'
import styled from 'styled-components'
import { Table, Thead, Tbody, Thn, Tr, ThButton } from "../../../../modules/Table"
import { COLORS, MEDIA_QUERIES } from "../../../../modules/styles"

import JarjestamislupaAsiakirjatItem from './JarjestamislupaAsiakirjatItem'
import Loading from '../../../../modules/Loading'

const WrapTable = styled.div`
   padding-bottom: 200px;
`
class JarjestamislupaAsiakirjat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: 0
    };
  }

  componentWillMount() {
    const { jarjestajaOid } = this.props

    if (jarjestajaOid) {
      this.props.fetchLupaHistory(jarjestajaOid)
    }
  }

  setOpened = dnro => {
    this.setState({opened: dnro});
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
                <Thn flex="2">Asiakirja</Thn>
                <Thn flex="2">Tila</Thn>
                <Thn flex="3">Laatija</Thn>
                <Thn flex="2">Valmis</Thn>
                <ThButton></ThButton>
                <ThButton></ThButton>
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
    return _.map(data, historyData => <JarjestamislupaAsiakirjatItem lupaHistoria={historyData} key={historyData.diaarinumero} setOpened={this.setOpened}/>)

  }
}

export default JarjestamislupaAsiakirjat
