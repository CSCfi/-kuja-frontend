import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

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

export default LinkItem
