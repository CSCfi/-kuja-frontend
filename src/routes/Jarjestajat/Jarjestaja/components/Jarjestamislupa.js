import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'

import Section from './Section'

import { LUPA_SECTIONS } from "../modules/constants"
import { InnerContentContainer, InnerContentWrapper  } from "../../../../modules/elements"
import { COLORS } from "../../../../modules/styles"

const TopSectionWrapper = styled.div`
  margin: -30px -28px;
  padding: 10px 28px 10px;
  border-bottom: 1px solid ${COLORS.BORDER_GRAY};
`

const LupaDetailsWrapper = styled.div`
  margin: 45px auto;
`

class Jarjestamislupa extends Component {
  render() {
    return (
      <InnerContentContainer>
        <InnerContentWrapper>
          <TopSectionWrapper>
            <h2>Järjestämislupa</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Illo, natus, perspiciatis! Accusamus aliquid architecto atque culpa dicta dolores,
              doloribus, ducimus eligendi eveniet iste magnam nulla quae sed vero voluptas voluptatum.
            </p>
          </TopSectionWrapper>

          <LupaDetailsWrapper>
            {Object.keys(LUPA_SECTIONS).map((key, i) =>
              <Section
                key={i}
                heading={LUPA_SECTIONS[key].heading}
                target={key}
                maaraykset={this.parseMaaraykset(parseInt(key, 10))}
              />
            )}
          </LupaDetailsWrapper>

        </InnerContentWrapper>
      </InnerContentContainer>
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
