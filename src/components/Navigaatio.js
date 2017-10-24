import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

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
`

const linkItems = [
  {
    to: '/',
    title: 'Etusivu',
    exact: true
  },
  {
    to: '/luvat',
    title: 'Luvat'
  },
  {
    to: '/kirjaudu',
    title: 'Kirjaudu sisään'
  }
]

class Navigaatio extends Component {
  renderLinks(links) {
    return (
      links.map((link, i) => <LinkItem key={i} to={link.to} exact={link.exact}>{link.title}</LinkItem>)
    )
  }

  render() {
    const innerStyle = {
      margin: '0 auto',
      padding: '10px 20px',
      width: '100%',
      maxWidth: `${this.props.maxWidth}px`
    }

    return (
      <NavbarWrapper>
        <div style={innerStyle}>
          {this.renderLinks(linkItems)}
        </div>
      </NavbarWrapper>
    )
  }
}

export default Navigaatio
