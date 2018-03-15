import _ from 'lodash'
import React, { Component } from "react"
import { COLORS } from "../../../../../../modules/styles"
import arrow from 'static/images/koulutusala-arrow.svg'
import {
  Wrapper,
  Heading,
  Arrow,
  Span,
  KoulutusalaListWrapper,
  TutkintoWrapper,
  Koodi,
  Nimi
} from './MuutospyyntoWizardComponents'

class LisaaKoulutusAlaList extends Component {
  constructor(props) {
    super(props)
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
    const { koodiarvo, nimi, koulutukset } = this.props
    const { editValues } = this.props
    let { fields } = this.props
    let addedCount = 0

    if (editValues) {
      _.forEach(editValues, koodi => {
        const isInEditValues = _.find(koulutukset, koulutus => {
          return koulutus.koodiarvo === koodi
        })

        if (isInEditValues) {
          addedCount++
        }
      })
    }

    return (
      <Wrapper>
        <Heading onClick={this.toggleTutkintoList.bind(this)}>
          <Arrow src={arrow} alt="Koulutusala" rotated={!this.state.isHidden} />
          <Span>{koodiarvo}</Span>
          <Span>{nimi}</Span>
          <Span>{`( ${koulutukset.length} kpl )`}</Span>
          {addedCount > 0
            ? <Span color={COLORS.OIVA_GREEN}>+{addedCount}</Span>
            : null
          }
        </Heading>
        {!this.state.isHidden &&
        <KoulutusalaListWrapper>
          {_.map(koulutukset, (koulutus, i) => {
            const { koodiarvo, nimi } = koulutus

            let isAdded = false

            if (editValues) {
              editValues.forEach(val => {
                if (val === koodiarvo) {
                  isAdded = true
                }
              })
            }

            return (
              <TutkintoWrapper key={i} className={isAdded ? "is-added" : null}>
                <input
                  type="checkbox"
                  checked={isAdded}
                  onChange={(event) => {
                    const { checked } = event.target
                    if (checked) {
                      fields.push(koodiarvo)
                    } else {
                      let i = undefined
                      _.forEach(editValues, (value, idx) => {
                        if (value === koodiarvo) {
                          i = idx
                        }
                      })
                      fields.remove(i)
                    }
                  }}/>
                <Koodi>{koodiarvo}</Koodi>
                <Nimi>{nimi}</Nimi>
              </TutkintoWrapper>
            )
          } )}
        </KoulutusalaListWrapper>
        }
      </Wrapper>
    )
  }
}

export default LisaaKoulutusAlaList
