import React, { Component } from 'react'

import Muutos from './Muutos'

class MuutosList extends Component {
  render() {
    const { muutokset, kategoria, kohde, fields } = this.props

    return (
      <div>
        {fields.map((field, index) => {
          const muutos = fields.get(index)
          return (
            <Muutos
              key={index}
              muutos={muutos}
              muutokset={muutokset}
              fields={fields}
              kategoria={kategoria}
            />
          )
        })}
      </div>
    )
  }
}

export default MuutosList
