import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'

const TutkintoWrapper = styled.div`
  margin: 6px 0 6px 30px;
  font-size: 15px;
  display: flex;
  position: relative;
`

const Koodi = styled.span`
  flex: 1;
`

const Nimi = styled.span`
  flex: 6;
`

const RajoiteStyle = styled.div`
  margin-left: 125px;
`

const Rajoite = (props) => {
  const { koodi, nimi } = props
  return (
    <RajoiteStyle>lukuun&nbsp;ottamatta:&nbsp;{koodi}&nbsp;{nimi}</RajoiteStyle>
  )
}

class Tutkinto extends Component {
  // constructor(props) {
  //   super(props)
  //   // this.handleOnChange = this.handleOnChange.bind(this)
  // }

  render() {
    const { koodi, nimi, rajoitteet, renderCheckbox } = this.props


    return (
      <div>
        <TutkintoWrapper>
          {renderCheckbox
            ? <input type="checkbox" ref="tutkintoInput" defaultValue="off" onChange={this.handleInputOnChange.bind(this)} />
            : null
          }
          <Koodi>{koodi}</Koodi>
          <Nimi>{nimi}</Nimi>
        </TutkintoWrapper>
        {rajoitteet ? _.map(rajoitteet, (rajoite, i) => <Rajoite {...rajoite} key={i}/>) : null}
      </div>
    )
  }

  getInputValue() {
    console.log(this.refs.tutkintoInput.checked)
    return this.refs.tutkintoInput.checked
  }

  handleInputOnChange() {
    const { koodi, nimi, maaraysId } = this.props
    console.log('Poistetaan tutkinto: ' + koodi + ' ' + nimi + '. maaraysid: ' + maaraysId)
    console.log(this.props)
    const val = this.getInputValue()

    if (val === true) {
      this.props.removeTutkinto({ koodi, nimi, maaraysId })
    } else {
      this.props.undoRemoveTutkinto({ koodi, nimi, maaraysId })
    }

  }

}

export default Tutkinto
