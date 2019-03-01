import React, { Component } from 'react'
import styled from 'styled-components'

const LiiteTopArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`

class Liite extends Component {

  render() {
    return (
      <div>
        <LiiteTopArea>Lisää muutokselle liite:</LiiteTopArea>
        <div>
          <input
            type="file"
            defaultValue={this.props.file !== null ? this.props.file : undefined}
            onChange={this.props.setAttachment}
          />
        </div>
        <div>
          <input 
            type="text"
            disabled={!this.props.file}
            placeholder="Anna liitteelle nimi (valinnainen)..."
            defaultValue={this.props.filename !== null ? this.props.filename : undefined}
            onBlur={this.props.setAttachmentName}
          />
        </div>
      </div>
    )
  }
}

export default Liite
