import _ from 'lodash'
import React, { Component } from 'react'

import Section from './Section'

import { LUPA_SECTIONS } from "../modules/constants"

class Jarjestamislupa extends Component {
  render() {
    return (
      <div>
        <h2>Järjestämislupa</h2>

        {Object.keys(LUPA_SECTIONS).map((key, i) =>
          <Section
            key={i}
            heading={LUPA_SECTIONS[key].heading}
            target={key}
            maaraykset={this.parseMaaraykset(parseInt(key, 10))}
          />
        )}
      </div>
    )
  }

  parseMaaraykset(kohdeId) {
    const { maaraykset } = this.props.lupa.data

    if (!maaraykset) {
      return null
    }

    return _.filter(maaraykset, (maarays) => {
      return maarays.kohde.id === kohdeId
    })
  }
}

export default Jarjestamislupa
