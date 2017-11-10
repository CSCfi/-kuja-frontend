import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import _ from 'lodash'

import { ROLE_ESITTELIJA } from 'helpers/Constants'

const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background: #3B7A9A;
  color: white;
`
const LinkItem = styled(NavLink)`
  padding: 10px 20px;
  text-decoration: none;
  color: white;
  background: #3B7A9A;
  text-transform: uppercase;
  margin-left: 0px;

  a:visited {
    color: white;
  }

  &:hover {
    text-decoration: underline;
  }

  &.active {
    color: #3B7A9A;
    background: white;
  }

  &.text-small {
    font-size: 14px;
    text-transform: none;
  }

  &.pull-right {
    margin-left: auto;
  }
`

class Navigaatio extends Component {
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

const mapStateToProps = (state) => {
  return { user: state.user.user }
}

export default connect(mapStateToProps, null, null, { pure: false })(Navigaatio)
