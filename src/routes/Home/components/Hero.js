import styled from 'styled-components'

import { BREAKPOINTS } from "../../../modules/styles"

const Hero = styled.div`
  background-image: url(${props => props.background});
  height: ${props => props.height};
  
  a {
    display: inline-block;
  } 
  
  @media ${BREAKPOINTS.MOBILE} {
    height: auto;
  }
`

export default Hero