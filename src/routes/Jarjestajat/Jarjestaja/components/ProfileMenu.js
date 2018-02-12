import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { COLORS } from "../../../../modules/styles"


const MenuBar = styled.div`
  display: flex;
  background-color: ${COLORS.DARK_GRAY};
  width: 100%;
`

const MenuItem = styled(NavLink)`
  color: ${COLORS.WHITE};
  padding: 13px 26px;
  box-sizing: border-box;
  border: 1px solid ${COLORS.DARK_GRAY};
  border-right: 1px solid ${COLORS.BORDER_GRAY};
  position: relative;
  
  &:hover {
    background-color: ${COLORS.WHITE};
    color: ${COLORS.BLACK};
    border-left: 1px solid transparent;
  }
  
  &:first-child {
    &:hover {
      border-left: 1px solid ${COLORS.DARK_GRAY};
    }
  }
  
  &:last-child {
    border-right: none;
  }
`

const ProfileMenu = (props) => {

  const { routes } = props


  return (
    <MenuBar>
      {_.map(routes, (item) => <MenuItem to={item.path}>{item.text}</MenuItem>)}
    </MenuBar>
  )
}

export default ProfileMenu
