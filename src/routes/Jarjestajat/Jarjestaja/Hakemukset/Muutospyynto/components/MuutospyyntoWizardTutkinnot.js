import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import validate from '../modules/validateWizard'
import { COLORS } from "../../../../../../modules/styles"
import { MUUTOS_WIZARD_TEKSTIT, MUUT_KEYS } from "../modules/constants"
import { TUTKINTO_TEKSTIT } from "../../../modules/constants"
import { WizButton } from "./MuutospyyntoWizard"
import TutkintoList from './TutkintoList'
import KoulutusList from './KoulutusList'
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
  CheckboxRowContainer,
  Div
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
    const { lupa, tutkintomuutoksetValue, koulutusmuutoksetValue, paatoskierrokset } = this.props
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

        <KoulutusList
          key="valmentavat"
          koodisto="koulutus"
          nimi="Valmentavat koulutukset"
          koulutukset={poikkeukset}
          muutMaaraykset={muutMaaraykset}
          editValues={editValue}
          fields={fields}
        />

        {muut.ammatilliseentehtavaanvalmistavakoulutus &&
          <KoulutusList
            key="ammatilliseentehtavaanvalmistavakoulutus"
            koodisto="ammatilliseentehtavaanvalmistavakoulutus"
            nimi="Ammatilliseen tehtavaan valmistavat koulutukset"
            koulutukset={muut.ammatilliseentehtavaanvalmistavakoulutus}
            muutMaaraykset={muutMaaraykset}
            editValues={editValue}
            fields={fields}
          />
        }

        {muut.oivatyovoimakoulutus &&
          <KoulutusList
            key="oivatyovoimakoulutus"
            koodisto="oivatyovoimakoulutus"
            nimi="Työvoimakoulutukset"
            koulutukset={muut.oivatyovoimakoulutus}
            muutMaaraykset={muutMaaraykset}
            editValues={editValue}
            fields={fields}
          />
        }

        {muut.kuljettajakoulutus &&
          <KoulutusList
            key="kuljettajakoulutus"
            koodisto="kuljettajakoulutus"
            nimi="Kuljettajakoulutukset"
            koulutukset={muut.kuljettajakoulutus}
            muutMaaraykset={muutMaaraykset}
            editValues={editValue}
            fields={fields}
          />
        }

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
    koulutukset: state.koulutukset,
    paatoskierrokset: state.paatoskierrokset
  }
})(MuutospyyntoWizardTutkinnot)

export default reduxForm({
  form: 'uusiHakemus',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(MuutospyyntoWizardTutkinnot)
