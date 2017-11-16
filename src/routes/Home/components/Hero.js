import styled from 'styled-components'

const Hero = styled.div`
  background-image: url(${props => props.background});
  height: ${props => props.height};
`

export default Hero