import React, { Component } from 'react'
import styled from 'styled-components'

import arrow from 'static/images/koulutusala-arrow.svg'
import { COLORS } from "../../../../modules/styles"
import Tutkinto from "./Tutkinto"

const Wrapper = styled.div`
  margin: 4px 0;
  background-color: ${COLORS.BG_GRAY};
  max-width: 625px;
`

const Heading = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding:  10px 20px;
  
  &:hover {
    background-color: ${COLORS.BG_DARKER_GRAY};
  }
`

const Arrow = styled.img`
  margin-right: 20px;
`

const Span = styled.span`
  margin-right: 15px;
`

const TutkintoList = styled.div`
  padding:  5px 20px 10px;
`

class Koulutusala extends Component {
  constructor() {
    super()
    this.state = {
      isHidden: true
    }
  }

  toggleTutkintoList() {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  render() {
    const { koodi, nimi, tutkinnot } = this.props
    return (
      <Wrapper>
        <Heading onClick={this.toggleTutkintoList.bind(this)}>
          <Arrow src={arrow} alt="Koulutusala"/>
          <Span>{koodi}</Span>
          <Span>{nimi}</Span>
          <Span>{`( ${tutkinnot.length} kpl )`}</Span>
        </Heading>
        {!this.state.isHidden &&
          <TutkintoList>
            {tutkinnot.map((tutkinto, i) => <Tutkinto {...tutkinto} key={i} />)}
          </TutkintoList>
        }

      </Wrapper>
    )
  }
}

export default Koulutusala
