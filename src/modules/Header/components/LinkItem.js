import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { COLORS, FONT_STACK } from 'modules/styles'

const LinkItem = styled(NavLink)`
  padding: 15px 20px;
  text-decoration: none;
  color: white;
  text-transform: uppercase;
  margin-left: 0px;
  font-size: 18px;
  font-family: ${FONT_STACK.OPEN_SANS_REGULAR};
  line-height: 18px;

  a:visited {
    color: white;
  }

  &:hover {
    text-decoration: underline;
  }

  &.active {
    color: ${COLORS.DARK_GRAY};
    background: white;
  }

  &.text-small {
    font-size: 14px;
    text-transform: none;
  }

  &.pull-right {
    margin-left: auto;
  }
  
  &.has-separator {
  border-right: 1px solid rgba(255, 255, 255, 0.25);
  }
`

export default LinkItem
