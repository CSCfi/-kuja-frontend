import React, { Component } from 'react'
import _ from 'lodash'

import NavbarWrapper from 'modules/Header/components/NavbarWrapper'
import LinkItem from 'modules/Header/components/LinkItem'
import { ROLE_ESITTELIJA } from 'modules/constants'

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

  renderLoginLinks() {
    if (!this.props.user) {
      return <LinkItem to="/kirjaudu" className="text-small pull-right">Kirjaudu sisään</LinkItem>
    } else {
      return <LinkItem to="/kirjaudu-ulos" className="text-small pull-right">Kirjaudu ulos</LinkItem>
    }
  }

  render() {
    const innerStyle = {
      display: 'flex',
      margin: '0 auto',
      width: '100%',
      maxWidth: `${this.props.maxWidth}px`
    }
    
    return (
      <NavbarWrapper>
        <div style={innerStyle}>
          <LinkItem to="/" exact>Etusivu</LinkItem>
          <LinkItem to="/luvat">Luvat</LinkItem>
          <LinkItem to="/tilastot-raportit">Tilastot ja raportit</LinkItem>
          {this.renderRoleLinks()}
          {this.renderLoginLinks()}
        </div>
      </NavbarWrapper>
    )
  }
}

export default Header
