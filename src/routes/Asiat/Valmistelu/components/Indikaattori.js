import React from 'react'
import styled from 'styled-components'
import ok from 'static/images/status-ok.png'

const IndikaattoriWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  
  img {
    margin-right: 10px;
  }
`



const Indikaattori = (props) => {
  const { status, text } = props

  const source = status === 'ok' ? ok : null

  return (
    <IndikaattoriWrapper>
      <img src={source} alt=""/>
      <div>{text}</div>
    </IndikaattoriWrapper>
  )
}

export default Indikaattori
