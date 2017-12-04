import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { COLORS} from "../../../modules/styles"

const LinkBoxStyle = styled.div`
  margin: 50px 0 0 20px;
  background-color: ${COLORS.LIGHT_GRAY};
  color: ${COLORS.BLACK};
  display: inline-block;
  padding: 20px 40px;
  text-transform: uppercase;
  font-weight: bold;
`

const LinkBox = ({ to, text }) => {
  return (
    <Link to={to}>
      <LinkBoxStyle>{text}</LinkBoxStyle>
    </Link>
  )
}

LinkBox.PropTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default LinkBox
