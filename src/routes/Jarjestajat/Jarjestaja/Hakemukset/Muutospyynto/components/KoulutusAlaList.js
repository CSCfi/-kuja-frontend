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
  KoulutusTyyppiWrapper,
  TutkintoWrapper,
  Koodi,
  Nimi
} from './MuutospyyntoWizardComponents'

class KoulutusAlaList extends Component {
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

  getTutkintoCount(koulutusalat) {
    let count = 0

    _.forEach(koulutusalat, (ala) => {
      count += ala.tutkinnot.length
    })

    return count
  }

  render() {
    const { koodi, nimi, koulutusalat, isEditing, fields, editValues } = this.props
    let removedCount = 0

    if (editValues && koulutusalat) {
      _.forEach(editValues, mId => {
        _.forEach(koulutusalat, ala => {
          const isInEditValues = _.find(ala.tutkinnot, tutkinto => {
            return tutkinto.maaraysId === mId
          })

          if (isInEditValues) {
            removedCount++
          }
        })
      })
    }

    return (
      <Wrapper>
        <Heading onClick={this.toggleTutkintoList.bind(this)}>
          <Arrow src={arrow} alt="Koulutusala" rotated={!this.state.isHidden} />
          <Span>{koodi}</Span>
          <Span>{nimi}</Span>
          <Span>{`( ${this.getTutkintoCount(koulutusalat)} kpl )`}</Span>
          {removedCount > 0
            ? <Span color={COLORS.OIVA_RED}>-{removedCount}</Span>
            : null
          }
        </Heading>
        {!this.state.isHidden &&
        <KoulutusalaListWrapper>
          {_.map(koulutusalat, (ala, i) => <KoulutuksetList isEditing={isEditing} fields={fields} editValues={editValues} {...ala} key={i} /> )}
        </KoulutusalaListWrapper>
        }
      </Wrapper>
    )
  }
}

const KoulutuksetList = (props) => {
  const { tutkinnot, nimi, koodi, isEditing, editValues } = props
  let { fields } = props

  return (
    <KoulutusTyyppiWrapper key={koodi}>
      {nimi}
      {tutkinnot.map(({ koodi, nimi, maaraysId }) => {

        let isAdded = false

        if (editValues) {
          editValues.forEach(val => {
            if (val === maaraysId) {
              isAdded = true
            }
          })
        }

        return (
          <TutkintoWrapper key={koodi} className={isAdded ? "is-removed" : null}>
            {isEditing
              ?
              <input
                type="checkbox"
                checked={isAdded}
                onChange={(event) => {
                  const { checked } = event.target
                  if (checked) {
                    fields.push(maaraysId)
                  } else {
                    let i = undefined
                    _.forEach(editValues, (value, idx) => {
                      if (value === maaraysId) {
                        i = idx
                      }
                    })
                    fields.remove(i)
                  }
                }}/>
              : null
            }
            <Koodi>{koodi}</Koodi>
            <Nimi>{nimi}</Nimi>
          </TutkintoWrapper>
        )
      })}
    </KoulutusTyyppiWrapper>
  )
}

export default KoulutusAlaList
