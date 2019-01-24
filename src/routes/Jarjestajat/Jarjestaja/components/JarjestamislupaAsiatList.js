import _ from 'lodash'
import React, { Component } from 'react'
import Media from 'react-media'
import styled from 'styled-components'
import { Table, Thead, Tbody, Thn, Tr, ThButton } from "../../../../modules/Table"
import { COLORS, MEDIA_QUERIES } from "../../../../modules/styles"

import JarjestamislupaAsiatListItem from './JarjestamislupaAsiatListItem'
import Loading from '../../../../modules/Loading'
import JarjestamislupaAsiakirjat from './JarjestamislupaAsiakirjat';

const WrapTable = styled.div`
   padding-bottom: 200px;
`
const Button = styled.div`
  color: ${props => props.textColor ? props.textColor : COLORS.WHITE};
  background-color: ${props => props.disabled ? COLORS.LIGHT_GRAY : props.bgColor ? props.bgColor : COLORS.OIVA_GREEN};
  border: 1px solid ${props => props.disabled ? COLORS.LIGHT_GRAY : props.bgColor ? props.bgColor : COLORS.OIVA_GREEN};
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: auto;
  padding: 0 16px;
  line-height: 36px;
  vertical-align: middle;
  text-align: center;
  border-radius: 2px;
  min-width: 24px;
  margin: 0 10px 10px 0;
  &:hover {
    color: ${props => props.disabled ? COLORS.WHITE : props.bgColor ? props.bgColor : COLORS.OIVA_GREEN};
    background-color: ${props => props.disabled ? COLORS.LIGHT_GRAY : props.textColor ? props.textColor : COLORS.WHITE};
    ${props => props.disabled ? 'cursor: not-allowed;' : null}
  }
`

const BackButton = styled(Button)`
  margin: 0 10px 10px 0;
`

const Header = styled.div`
   width: 100%;
   display: flex;
   flex-flow: row;
   align-items: center;
   h2 {
     margin: 0 0 10px 0;
   }
`

class JarjestamislupaAsiatList extends Component {

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
    if (this.state.opened !== 0) {
      return (
        <WrapTable>
          <Header>
            <BackButton onClick={(e) => this.setOpened(0)}>&#8592;</BackButton>
            <h2>Järjestämislupa-asian asiakirjat (OKM/{this.state.opened})</h2>
          </Header>
          <JarjestamislupaAsiakirjat lupaHistory={this.props.lupaHistory} />
        </WrapTable>
      )
    } else if (fetched) {
      return (
        <WrapTable>
          <Button>&#43; Uusi hakemus</Button>
          <Button>&#215; Järjestämisluvan peruutus</Button>
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
                <Thn flex="3">OKM:n Dnro</Thn>
                <Thn flex="2">Asia</Thn>
                <Thn flex="2">Asian tila</Thn>
                <Thn flex="2">Määräaika</Thn>
                <Thn flex="2">Lähetetty</Thn>
                <Thn flex="2">Päätetty</Thn>
                <ThButton flex="1"></ThButton>
                <ThButton flex="1"></ThButton>
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
    return _.map(data, historyData => <JarjestamislupaAsiatListItem lupaHistoria={historyData} key={historyData.diaarinumero} setOpened={this.setOpened}/>)

  }
}

export default JarjestamislupaAsiatList
