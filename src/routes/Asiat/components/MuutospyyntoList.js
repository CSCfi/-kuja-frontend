import _ from 'lodash'
import React, { Component } from 'react'
import Media from 'react-media'

import MuutospyyntoItem from './MuutospyyntoItem'
import { Table, Thead, Tbody, Th, Tr } from "../../../modules/Table"
import { MEDIA_QUERIES } from "../../../modules/styles"

class MuutospyynnotList extends Component {
  renderMuutospyynnot() {
    const sorted = _.sortBy(this.props.muutospyynnot, (muutospyynto) => { return muutospyynto.hakupvm })
    return _.map(sorted, muutospyynto => <MuutospyyntoItem muutospyynto={muutospyynto} key={muutospyynto.uuid} />)
  }

  render() {
    const { muutospyynnot } = this.props

    if (muutospyynnot && muutospyynnot.length > 0) {
      return (
        <div>
          <Media query={MEDIA_QUERIES.MOBILE} render={() =>
            <Table>
              <Thead>
              <Tr>
                <Th>Hakemukset ja päätökset</Th>
              </Tr>
              </Thead>
              <Tbody>
              {this.renderMuutospyynnot()}
              </Tbody>
            </Table>
          }/>
          <Media query={MEDIA_QUERIES.TABLET_MIN} render={() =>
            <Table>
              <Thead>
              <Tr>
                <Th>Koulutuksen järjestäjä</Th>
                <Th>Saapunut</Th>
                <Th>Päätöskierros</Th>
                <Th>Maakunta</Th>
                <Th>Tila</Th>
              </Tr>
              </Thead>
              <Tbody>
              {this.renderMuutospyynnot()}
              </Tbody>
            </Table>
          }/>
        </div>
      )
    } else {
      return (
        <div>Ei muutospyyntöjä</div>
      )
    }
  }
}

export default MuutospyynnotList