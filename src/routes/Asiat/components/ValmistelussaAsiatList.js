import _ from 'lodash'
import React, { Component } from 'react'
import Media from 'react-media'

import MuutospyyntoItem from './MuutospyyntoItem'
import { Table, Thead, Tbody, Th, Tr } from "../../../modules/Table"
import { MEDIA_QUERIES, COLORS, FONT_STACK } from "../../../modules/styles"

import ReactTable from 'react-table'
import 'react-table/react-table.css'
import '../../../modules/Header/react-table-overrides.css'
import styled from 'styled-components'


const TableHeader = styled.div`
    font-weight: normal;
    padding: 8px 18px;
    color: ${COLORS.WHITE};
    background: ${COLORS.OIVA_GREEN};
    font-family: ${FONT_STACK.GOTHAM_NARROW};
    font-size: 13px;
    position: relative;
    text-align: left;
    margin:0px;
`

const TableCell = styled.div`
    font-weight: normal;
    padding: 10px 20px;
    white-space: normal;
`

class ValmistelussaAsiatList extends Component {
    renderMuutospyynnot() {
        const sorted = _.sortBy(this.props.muutospyynnot, (muutospyynto) => { return muutospyynto.hakupvm })
        return _.map(sorted, muutospyynto => <MuutospyyntoItem muutospyynto={muutospyynto} key={muutospyynto.uuid} />)
    }

    render() {
        const { muutospyynnot } = this.props

        const columns = [{
            Header: props => <TableHeader>Koulutuksen järjestäjä</TableHeader>,
            accessor: 'jarjestaja.nimi.fi',
            Cell: props => <TableCell>{props.value}</TableCell>
        }, {
            Header: props => <TableHeader>Saapunut</TableHeader>,
            accessor: 'hakupvm',
            Cell: props => <TableCell>{props.value}</TableCell> // Custom cell components!
        }, {
            Header: props => <TableHeader>Hakukierros</TableHeader>,
            accessor: 'paatoskierros.meta.fi' //d => d.friend.name // Custom value accessors!
            ,
            Cell: props => <TableCell>{props.value}</TableCell>
        }, {
            Header: props => <TableHeader>Esittelijä</TableHeader>,
            accessor: 'luoja',
            Cell: props => <TableCell>{props.value}</TableCell>
        }, {
            Header: props => <TableHeader>Maakunta</TableHeader>,
            accessor: 'jarjestaja.maakuntaKoodi.metadata[0].nimi',
            Cell: props => <TableCell>{props.value}</TableCell>
        }, {
            Header: props => <TableHeader>Tila</TableHeader>,
            accessor: 'tila',
            Cell: props => <TableCell>{props.value}</TableCell>
        }]


        if (muutospyynnot && muutospyynnot.length > 0) {
            return (
                <div>
                    <Media query={MEDIA_QUERIES.MOBILE} render={() =>
                        <Table>
                            <Thead>
                            <Tr>
                                <Th>Avoinna olevat asiat</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                            {this.renderMuutospyynnot()}
                            </Tbody>
                        </Table>
                    }/>
                    <Media query={MEDIA_QUERIES.TABLET_MIN} render={() =>
                        <ReactTable
                            defaultPageSize={5}
                            data={muutospyynnot}
                            columns={columns}/>
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

export default ValmistelussaAsiatList