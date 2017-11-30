import React, { Component } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import HeaderBar from 'modules/Header/components/HeaderBar'
import LinkItem from 'modules/Header/components/LinkItem'
import { ROLE_ESITTELIJA } from 'modules/constants'
import { COLORS, FONT_STACK } from 'modules/styles'


const HeaderTitle = styled.div`
  font-family: ${FONT_STACK.GENERAL};
  font-size: 20px;
  color: white;
  padding: 14px 20px;
  text-decoration: none;
  color: white;
  margin-left: 0px;
  line-height: 20px;
`

const HeaderLinks = styled.div`
  display: flex;
`

const HeaderBarInner = styled.div`
  display: flex;
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
  margin: 0 auto;
  width: 100%;
  max-width: ${props => props.maxWidth ? props.maxWidth : '1280px'};
`

class Header extends Component {
  renderRoleLinks() {
    if (this.props.user && this.props.user.roles) {
      const { roles } = this.props.user
      if (_.indexOf(roles, ROLE_ESITTELIJA) > -1) {
        return <LinkItem to="/esittelija" className="pull-right">Esittelijän näkymä</LinkItem>
      }
      switch (this.props.user.role) {
        case 'esittelijä': {
          return <LinkItem to="/esittelija" className="pull-right">Esittelijän näkymä</LinkItem>
        }

        case 'kj': {
          return <LinkItem to="/koulutuksen-jarjestaja" className="pull-right">Koulutuksen järjestäjän näkymä</LinkItem>
        }

        default: 
          return null;
      }
    }
  }

  render() {
    return (
      <div>
        <HeaderBar bgColor={COLORS.OIVA_GREEN}>
          <HeaderBarInner maxWidth="1280px" justifyContent="space-between">
            <HeaderTitle>Oiva - Opetushallinnon ohjaus- ja sääntelypalvelu</HeaderTitle>
            <HeaderLinks>
              <LinkItem to="/sv" className="text-small has-separator">På svenska</LinkItem>
              <LinkItem to="/kirjaudu" className="text-small">Kirjaudu sisään</LinkItem>
            </HeaderLinks>
          </HeaderBarInner>
        </HeaderBar>
        <HeaderBar>
          <HeaderBarInner>
            <LinkItem to="/" exact fontFamily={FONT_STACK.NAVIGATION}>Etusivu</LinkItem>
            <LinkItem to="/luvat">Luvat</LinkItem>
            <LinkItem to="/tilastot-raportit">Tilastot ja raportit</LinkItem>
            {this.renderRoleLinks()}
          </HeaderBarInner>
        </HeaderBar>
      </div>
    )
  }
}

export default Header
