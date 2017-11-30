import styled from 'styled-components'

import { COLORS } from 'modules/styles'

const HeaderBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: ${props => props.bgColor ? props.bgColor : COLORS.DARK_GRAY};
  color: white;
`

export default HeaderBar
