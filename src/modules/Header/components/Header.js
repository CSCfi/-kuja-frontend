import React, { Component } from 'react'
import _ from 'lodash'
import styled from 'styled-components'

import HeaderBar from 'modules/Header/components/HeaderBar'
import LinkItem from 'modules/Header/components/LinkItem'
import { ROLE_ESITTELIJA, ESITTELIJA } from 'modules/constants'
import { COLORS, FONT_STACK } from 'modules/styles'

const HeaderTitle = styled.div`
  font-family: ${FONT_STACK.GOTHAM_NARROW};
  font-size: 20px;
  color: white;
  padding: 14px 20px;
  text-decoration: none;
  color: white;
  margin-left: 0px;
  line-height: 20px;
`

// const HeaderLinks = styled.div`
//   display: flex;
// `

const HeaderBarInner = styled.div`
  display: flex;
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
  margin: 0 auto;
  width: 100%;
  max-width: ${props => props.maxWidth ? props.maxWidth : '1280px'};
`

class Header extends Component {

  render() {

    // for testing
    //const { roles } = ESITTELIJA.user

    // for real
    const { roles } = (this.props.user && this.props.user.roles) ? this.props.user : {"roles":["no auth"]}

    return (
      <div>
        <HeaderBar bgColor={COLORS.OIVA_GREEN}>
          <HeaderBarInner maxWidth="1280px" justifyContent="space-between">
            <HeaderTitle>Oiva - Opetushallinnon ohjaus- ja säätelypalvelu</HeaderTitle>
            {/* Disabloidaan headerin linkit toistaiseksi */}
            {/*<HeaderLinks>*/}
              {/*<LinkItem to="/sv" className="text-small has-separator">På svenska</LinkItem>*/}
              {<LinkItem to="/cas-auth" className="text-small">Kirjaudu sisään</LinkItem>}
            {/*</HeaderLinks>*/}
          </HeaderBarInner>
        </HeaderBar>
        <HeaderBar>
          <HeaderBarInner>
            <LinkItem to="/" exact fontFamily={FONT_STACK.OPEN_SANS_REGULAR}>Etusivu</LinkItem>
            <LinkItem to="/jarjestajat">Koulutuksen järjestäjät</LinkItem>
            { (_.indexOf(roles, ROLE_ESITTELIJA) > -1) ? (<LinkItem to="/esittelijat">Käsittely</LinkItem>) : null}
            {/*<LinkItem to="/tilastot-raportit">Tilastot ja raportit</LinkItem>*/ }
          </HeaderBarInner>
        </HeaderBar>
      </div>
    )
  }
}

export default Header
