import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FieldArray, reduxForm, formValueSelector } from 'redux-form'
import validate from '../modules/validateWizard'
import { COLORS } from "../../../../../../modules/styles"
import { MUUTOS_WIZARD_TEKSTIT, MUUT_KEYS } from "../modules/constants"
import { TUTKINTO_TEKSTIT } from "../../../modules/constants"
import { WizButton } from "./MuutospyyntoWizard"
import TutkintoList from './TutkintoList'
import { parseLocalizedField } from "../../../../../../modules/helpers"
import { ContentContainer } from "../../../../../../modules/elements"
import { handleCheckboxChange } from "../modules/koulutusUtil"
import Loading from '../../../../../../modules/Loading'
import {
  Kohdenumero,
  Otsikko,
  BottomWrapper,
  Row,
  Kohde,
  Info,
  Checkbox,
  CheckboxRowContainer
} from './MuutospyyntoWizardComponents'

class MuutospyyntoWizardTutkinnot extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (!this.props.koulutusalat.fetched && !this.props.koulutusalat.hasErrored) {
      this.props.fetchKoulutusalat()
        .then(() => {
          if (this.props.koulutusalat.fetched && !this.props.koulutusalat.hasErrored) {
            this.props.fetchKoulutuksetAll()
            this.props.fetchKoulutuksetMuut(MUUT_KEYS.KULJETTAJAKOULUTUS)
            this.props.fetchKoulutuksetMuut(MUUT_KEYS.OIVA_TYOVOIMAKOULUTUS)
            this.props.fetchKoulutuksetMuut(MUUT_KEYS.AMMATILLISEEN_TEHTAVAAN_VALMISTAVA_KOULUTUS)
            this.props.fetchKoulutus("999901")
            this.props.fetchKoulutus("999903")
          }
        })
    }
  }

  render() {
    const { lupa, tutkintomuutoksetValue, koulutusmuutoksetValue } = this.props
    const { kohteet } = lupa
    const { headingNumber, heading } = kohteet[1]
    const koulutusdata = this.props.koulutukset.koulutusdata
    const hasTutkintoMuutoksia = tutkintomuutoksetValue !== undefined && tutkintomuutoksetValue.length !== 0
    const hasKoulutusMuutoksia = koulutusmuutoksetValue !== undefined && koulutusmuutoksetValue.length !== 0

    let isDisabled = true
    let hasTutkintoAdditions = false
    let hasTutkintoRemovals = false
    let hasKoulutusAdditions = false
    let hasKoulutusRemovals = false

    if (hasTutkintoMuutoksia) {
      isDisabled = false

      tutkintomuutoksetValue.forEach(muutos => {
        if (muutos.type === "addition") {
          hasTutkintoAdditions = true
        } else if (muutos.type === "removal") {
          hasTutkintoRemovals = true
        }
      })
    }

    if (hasKoulutusMuutoksia) {
      isDisabled = false
      koulutusmuutoksetValue.forEach(muutos => {
        if (muutos.type === "addition") {
          hasKoulutusAdditions = true
        } else if (muutos.type === "removal") {
          hasKoulutusRemovals = true
        }
      })
    }

    const koulutuksetFetched = this.props.koulutukset.fetched
    const koulutuksetIsFetching = this.props.koulutukset.isFetching
    const koulutuksetHasErrored = this.props.koulutukset.hasErrored

    let muutFetched = undefined
    let muutIsFetching = undefined
    let muutHasErrored = undefined
    let muuData = undefined
    let poikkeusData = undefined

    const { muut, poikkeukset } = this.props.koulutukset

    if (muut) {
      muutFetched = muut.fetched
      muutIsFetching = muut.isFetching
      muutHasErrored = muut.hasErrored
      muuData = muut.muudata
    }

    if (poikkeukset) {
      poikkeusData = poikkeukset.data
    }

    if (koulutuksetFetched && muutFetched && muuData !== undefined && poikkeusData !== undefined) {
      return (
        <Kohde>
          <ContentContainer>
            <Kohdenumero>{headingNumber}.</Kohdenumero>
            <Otsikko>{heading}</Otsikko>
            <Row>
              <FieldArray
                name="tutkintomuutokset"
                kohde={kohteet[1]}
                lupa={lupa}
                data={koulutusdata}
                muut={muuData}
                editValue={tutkintomuutoksetValue}
                component={this.renderTutkinnot}
              />
            </Row>

            <Row>
              <FieldArray
                name="koulutusmuutokset"
                kohde={kohteet[1]}
                lupa={lupa}
                muut={muuData}
                poikkeukset={poikkeusData}
                editValue={koulutusmuutoksetValue}
                component={this.renderKoulutukset}
              />
            </Row>

            <Row marginLeft="30px">
              <h3>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_LISATYT_TUTKINNOT.FI}</h3>
              {hasTutkintoAdditions
                ? tutkintomuutoksetValue.map(muutos => {
                  if (muutos.type === "addition") {
                    return <div key={muutos.koodiarvo}>{muutos.koodiarvo}&nbsp;{muutos.nimi}</div>
                  } else {
                    return null
                  }
                })
                : MUUTOS_WIZARD_TEKSTIT.MUUTOS_EI_LISATTYJA.FI
              }
            </Row>

            <Row marginLeft="30px">
              <h3>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_POISTETUT_TUTKINNOT.FI}</h3>
              <div>
                {hasTutkintoRemovals
                  ? tutkintomuutoksetValue.map(muutos => {
                    if (muutos.type === "removal") {
                      return <div key={muutos.koodiarvo}>{muutos.koodiarvo}&nbsp;{muutos.nimi}</div>
                    } else {
                      return null
                    }
                  })
                  : MUUTOS_WIZARD_TEKSTIT.MUUTOS_EI_POISTETTUJA.FI
                }
              </div>
            </Row>
          </ContentContainer>
        </Kohde>
      )
    } else if (koulutuksetIsFetching || muutIsFetching) {
      return <Loading/>
    } else if (koulutuksetHasErrored || muutHasErrored) {
      return <h2>Virhe ladattaessa tietoja</h2>
    } else {
      return null
    }
  }

  renderTutkinnot(props) {
    let { fields, data } = props
    const { kohde, lupa, editValue, muut } = props
    const { headingNumber, heading, maaraykset, muutMaaraykset } = kohde

    data = _.sortBy(data, d => {
      return d.koodiArvo
    })

    return (
      <Row>
        {_.map(data, (koulutusala, i) => {
          const koodiarvo = koulutusala.koodiarvo || koulutusala.koodiArvo
          const { metadata, koulutukset } = koulutusala
          const nimi = parseLocalizedField(metadata)
          return (
            <TutkintoList
              key={i}
              koodiarvo={koodiarvo}
              nimi={nimi}
              koulutukset={koulutukset}
              maaraykset={maaraykset}
              editValues={editValue}
              fields={fields}
            />
          )
        })}
      </Row>
    )
  }

  renderKoulutukset(props) {
    const { kohde, muut, poikkeukset, editValue, fields } = props
    const { muutMaaraykset } = kohde

    return (
      <Row>
        <Info>{TUTKINTO_TEKSTIT.otsikkoTaydentava.FI}</Info>

        {_.map(muut, (muu, koodisto) => {
          return (
            <div key={koodisto}>
              <h3>Otsikko</h3>

              {muu.map(m => {
                const { koodiArvo, metadata } = m
                const { koodistoUri } = m.koodisto
                const nimi = parseLocalizedField(metadata, 'FI', 'nimi')
                const kuvaus = parseLocalizedField(metadata, 'FI', 'kuvaus')
                const identifier = `input-${koodistoUri}-${koodiArvo}`

                let isInLupa = false
                let isAdded = false
                let isRemoved = false
                let isChecked = false
                let customClassName = ""

                muutMaaraykset.forEach(muuMaarays => {
                  if (muuMaarays.koodisto === koodistoUri && muuMaarays.koodiarvo === koodiArvo) {
                    isInLupa = true
                  }
                })

                if (editValue) {
                  editValue.forEach(val => {
                    if (val.koodiarvo === koodiArvo && val.koodisto === koodistoUri) {
                      val.type === "addition" ? isAdded = true : null
                      val.type === "removal" ? isRemoved = true : null
                    }
                  })
                }

                isInLupa ? customClassName = "is-in-lupa" : null
                isAdded ? customClassName = "is-added" : null
                isRemoved ? customClassName = "is-removed" : null

                if ((isInLupa && !isRemoved) || isAdded) {
                  isChecked = true
                }

                return (
                  <CheckboxRowContainer key={identifier} className={customClassName}>
                    <Checkbox>
                      <input
                        type="checkbox"
                        id={identifier}
                        checked={isChecked}
                        onChange={(e) => { handleCheckboxChange(e, editValue, fields, isInLupa, m) }}
                      />
                      <label htmlFor={identifier}></label>
                    </Checkbox>
                    <div>
                      <div>{nimi}</div>
                      <div>{kuvaus}</div>
                    </div>
                  </CheckboxRowContainer>
                )
              })}
            </div>
          )
        })}

        {poikkeukset.map((poikkeus, i) => {
          const { koodiArvo, metadata, koodisto } = poikkeus
          const { koodistoUri } = koodisto
          const nimi = parseLocalizedField(metadata)
          const identifier = `input-${koodiArvo}-${i}`

          let isInLupa = false
          let isAdded = false
          let isRemoved = false
          let isChecked = false
          let customClassName = ""

          muutMaaraykset.forEach(muuMaarays => {
            if (muuMaarays.koodi && muuMaarays.koodi === koodiArvo) {
              isInLupa = true
            }
          })

          if (editValue) {
            editValue.forEach(val => {
              if (val.koodiarvo === koodiArvo && val.koodisto === koodistoUri) {
                val.type === "addition" ? isAdded = true : null
                val.type === "removal" ? isRemoved = true : null
              }
            })
          }

          isInLupa ? customClassName = "is-in-lupa" : null
          isAdded ? customClassName = "is-added" : null
          isRemoved ? customClassName = "is-removed" : null

          if ((isInLupa && !isRemoved) || isAdded) {
            isChecked = true
          }

          return (
            <CheckboxRowContainer key={identifier} className={customClassName}>
              <Checkbox>
                <input
                  type="checkbox"
                  id={identifier}
                  checked={isChecked}
                  onChange={(e) => { handleCheckboxChange(e, editValue, fields, isInLupa, poikkeus) }}
                />
                <label htmlFor={identifier}></label>
              </Checkbox>
              <div>{koodiArvo}</div>
              <div>{nimi}</div>
            </CheckboxRowContainer>
          )
        })}
      </Row>
    )
  }
}

const selector = formValueSelector('uusiHakemus')

MuutospyyntoWizardTutkinnot = connect(state => {
  const tutkintomuutoksetValue = selector(state, 'tutkintomuutokset')
  const koulutusmuutoksetValue = selector(state, 'koulutusmuutokset')

  return {
    tutkintomuutoksetValue,
    koulutusmuutoksetValue,
    koulutusalat: state.koulutusalat,
    koulutukset: state.koulutukset
  }
})(MuutospyyntoWizardTutkinnot)

export default reduxForm({
  form: 'uusiHakemus',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(MuutospyyntoWizardTutkinnot)
