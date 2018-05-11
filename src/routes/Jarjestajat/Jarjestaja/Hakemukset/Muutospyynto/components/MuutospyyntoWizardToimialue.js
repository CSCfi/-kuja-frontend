import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FieldArray, reduxForm, formValueSelector } from 'redux-form'
import Select from 'react-select'

import Loading from '../../../../../../modules/Loading'

import { ContentContainer } from "../../../../../../modules/elements"
import { Kohdenumero, Otsikko, Row } from "./MuutospyyntoWizardComponents"
import { getToimialueByKoodiArvo, handleToimialueSelectChange } from "../modules/toimialueUtil"

class MuutospyyntoWizardToimialue extends Component {
  componentWillMount() {
    const { kunnat, maakunnat } = this.props

    if (kunnat && !kunnat.fetched) {
      this.props.fetchKunnat()
    }

    if (maakunnat && !maakunnat.fetched) {
      this.props.fetchMaakunnat()
    }
  }

  render() {
    const { lupa, toimialuemuutoksetValue, kunnat, maakunnat } = this.props
    const { kohteet } = lupa
    const { headingNumber, heading } = kohteet[3]
    const maakuntaMaaraykset = kohteet[3].maakunnat
    const kuntaMaaraykset = kohteet[3].kunnat

    if (kunnat.fetched && maakunnat.fetched) {
      return (
        <ContentContainer>
          <Kohdenumero>{headingNumber}.</Kohdenumero>
          <Otsikko>{heading}</Otsikko>
          <Row>
            <FieldArray
              name="toimialuemuutokset"
              maakunnat={maakuntaMaaraykset}
              kunnat={kuntaMaaraykset}
              editValues={toimialuemuutoksetValue}
              maakuntaList={maakunnat.maakuntaList}
              kuntaList={kunnat.kuntaList}
              component={this.renderToimialueMuutokset}
            />
          </Row>
        </ContentContainer>
      )
    } else if (kunnat.hasErrored || maakunnat.hasErrored) {
      return <h2>Toiminta-aluetta ladattaessa tapahtui virhe</h2>
    } else if (kunnat.isFetching || maakunnat.isFetching) {
      return <Loading/>
    } else {
      return null
    }
  }

  renderToimialueMuutokset(props) {
    const { maakunnat, kunnat, maakuntaList, kuntaList, editValues, fields } = props
    const options = _.concat(maakuntaList, kuntaList)
    let initialValue = []

    maakunnat.forEach(maakunta => { initialValue.push(maakunta.koodiarvo) })
    kunnat.forEach(kunta => { initialValue.push(kunta.koodiarvo) })

    if (editValues) {
      editValues.forEach(value => {
        if (value.type === "addition") {
          initialValue.push(value.value)
        } else if (value.type === "removal") {
          if (_.includes(initialValue, value.value)) {
            console.log('value ' + value.value + ' is in editvalues --> removing')
            _.pull(initialValue, value.value)
          }
        }
      })
    }

    let valitutMaakunnat = []
    let valitutKunnat = []

    if (initialValue) {
      initialValue.forEach(value => {
        const alue = getToimialueByKoodiArvo(value)
        if (alue) {
          if (alue.tyyppi === "maakunta") {
            valitutMaakunnat.push(alue)
          } else if (alue.tyyppi === "kunta") {
            valitutKunnat.push(alue)
          }
        }
      })
    }

    return (
      <div>
        <ToimialueSelect
          options={options}
          value={initialValue}
          initialValue={initialValue}
          editValues={editValues}
          fields={fields}
        />

        {valitutMaakunnat.length > 0 &&
          <div>
            <h4>Valitut maakunnat</h4>
            {valitutMaakunnat.map(alue => {
              const { label } = alue
              return (
                <div key={label}>{label}</div>
              )
            })}
          </div>
        }

        {valitutKunnat.length > 0 &&
          <div>
            <h4>Valitut kunnat</h4>
            {valitutKunnat.map(alue => {
              const { label } = alue
              return (
                <div key={label}>{label}</div>
              )
            })}
          </div>
        }
      </div>
    )
  }
}

class ToimialueSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value
    }
  }

  handleSelectChange(value) {
    this.setState({ value })
    const { editValues, fields, initialValue } = this.props
    handleToimialueSelectChange(editValues, fields, initialValue, value)
  }

  render() {
    const { value } = this.state
    const { options } = this.props

    return (
      <Select
        name="toimialue"
        multi
        options={options}
        value={value}
        onChange={this.handleSelectChange.bind(this)}
      />
    )
  }
}

const selector = formValueSelector('uusiHakemus')

MuutospyyntoWizardToimialue = connect(state => {
  const toimialuemuutoksetValue = selector(state, 'toimialuemuutokset')

  return {
    toimialuemuutoksetValue
  }
})(MuutospyyntoWizardToimialue)

export default reduxForm({
  form: 'uusiHakemus',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // validate,
})(MuutospyyntoWizardToimialue)
