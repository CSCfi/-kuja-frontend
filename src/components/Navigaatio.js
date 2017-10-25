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
    title: 'Kirjaudu sisään',
    classNames: 'text-small pull-right'
  }
]

class Navigaatio extends Component {
  renderLinks(links) {
    return (
      links.map((link, i) => <LinkItem key={i} to={link.to} exact={link.exact} className={link.classNames}>{link.title}</LinkItem>)
    )
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
          {this.renderLinks(linkItems)}
        </div>
      </NavbarWrapper>
    )
  }
}

export default Navigaatio
