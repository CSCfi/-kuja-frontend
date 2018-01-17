import styled from 'styled-components'

import { MEDIA_QUERIES } from "../../../modules/styles"

const Hero = styled.div`
  background-image: url(${props => props.background});
  height: ${props => props.height};
  
  a {
    display: inline-block;
  } 
  
  @media ${MEDIA_QUERIES.MOBILE} {
    height: auto;
  }
`

export default Hero