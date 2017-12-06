import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'

import Section from './Section'
import { LUPA_SECTIONS } from '../modules/constants'

const LupaWrapper = styled.div`
  margin: 20px 0 40px;
`

class Lupa extends Component {
  componentWillMount() {
    this.props.fetchLupa(this.props.match.params.id, '?with=all')
  }

  render() {
    const { match } = this.props

    if (match.params) {
      return (
        <LupaWrapper>
          <h4>Lupa id: {match.params.id}</h4>

          {Object.keys(LUPA_SECTIONS).map((key, i) =>
            <Section
              key={i}
              heading={LUPA_SECTIONS[key].heading}
              target={key}
              maaraykset={this.parseMaaraykset(parseInt(key, 10))}
            />
          )}
        </LupaWrapper>
      )
    } else {
      return <h2>Ladataan...</h2>
    }
  }

  parseMaaraykset(kohdeId) {
    const { maaraykset } = this.props.lupa.lupa

    if (!maaraykset) {
      return null
    }

    return _.filter(maaraykset, (maarays) => {
      return maarays.kohde.id === kohdeId
    })
  }
}

export default Lupa
