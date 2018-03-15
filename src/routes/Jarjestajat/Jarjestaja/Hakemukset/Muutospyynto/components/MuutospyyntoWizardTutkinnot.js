import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FieldArray, reduxForm, formValueSelector } from 'redux-form'
import validate from '../modules/validateWizard'
import { COLORS } from "../../../../../../modules/styles"
import { WizButton } from "./MuutospyyntoWizard"
import KoulutusAlaList from './KoulutusAlaList'
import LisaaKoulutusAlaList from './LisaaKoulutusAlaList'
import { parseLocalizedField } from "../../../../../../modules/helpers"
import { ContentContainer } from "../../../../../../modules/elements"
import {
  getTutkintoKoodiByMaaraysId,
  getTutkintoNimiByKoodiarvo,
  getTutkintoNimiByMaaraysId
} from "../modules/koulutusUtil"
import {
  Kohdenumero,
  Otsikko,
  ControlsWrapper,
  BottomWrapper,
  AddWrapper,
  ScrollWrapper,
  AddContent,
  Row,
  Kohde
} from './MuutospyyntoWizardComponents'

class MuutospyyntoWizardTutkinnot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isRemoving: false,
      isAdding: false
    }

    this.renderRemoveTutkinnot = this.renderRemoveTutkinnot.bind(this)
    this.toggleIsRemoving = this.toggleIsRemoving.bind(this)
    this.toggleIsAdding = this.toggleIsAdding.bind(this)
    this.renderAddKoulutuksia = this.renderAddKoulutuksia.bind(this)
  }

  componentWillMount() {
    if (!this.props.koulutusalat.fetched && !this.props.koulutusalat.hasErrored) {
      this.props.fetchKoulutusalat()
        .then(() => {
          if (this.props.koulutusalat.fetched && !this.props.koulutusalat.hasErrored) {
            this.props.koulutusalat.data.forEach(ala => {
              if (ala.koodiArvo !== '00' && ala.koodiArvo !== '99') {
                this.props.fetchKoulutukset(ala.koodiArvo, ala.metadata)
              }
            })
          }
        })
    }
  }

  toggleIsRemoving(event) {
    if (event) {
      event.preventDefault()
    }
    this.setState({ isRemoving: !this.state.isRemoving })
  }

  toggleIsAdding(event) {
    if (event) {
      event.preventDefault()
    }
    this.setState({ isAdding: !this.state.isAdding })
  }

  render() {
    const { handleSubmit, lupa, poistettavatValue, lisattavatValue, onCancel, previousPage } = this.props
    const { isRemoving, isAdding } = this.state
    const { kohteet } = lupa
    const data = this.props.koulutukset.treedata

    const removeBool = poistettavatValue === undefined || poistettavatValue.length === 0
    const addBool = lisattavatValue === undefined || lisattavatValue.length === 0

    let isDisabled = true

    if ((removeBool === false) ||(addBool === false)) {
      isDisabled = false
    }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Row>
            <FieldArray
              name="poistettavat"
              kohde={kohteet[1]}
              isRemoving={isRemoving}
              poistettavatValue={poistettavatValue}
              lupa={lupa}
              component={this.renderRemoveTutkinnot}
            />

            {isAdding
              ?
              <FieldArray
                name="lisattavat"
                data={data}
                isAdding={isAdding}
                lisattavatValue={lisattavatValue}
                component={this.renderAddKoulutuksia}
              />
              : null
            }
          </Row>

          <Row marginLeft="30px">
            <h3>Lisätyt tutkinnot</h3>
            {lisattavatValue && lisattavatValue.length > 0
              ? lisattavatValue.map(tutkinto => <div key={tutkinto}>{tutkinto} {getTutkintoNimiByKoodiarvo(tutkinto)}</div>)
              : 'Ei lisättäviä tutkintoja'
            }
          </Row>

          <Row marginLeft="30px">
            <h3>Poistettavat tutkinnot</h3>
            <div>
              {poistettavatValue && poistettavatValue.length > 0
                ? poistettavatValue.map(maaraysId => <div key={maaraysId}>{getTutkintoKoodiByMaaraysId(maaraysId)} {getTutkintoNimiByMaaraysId(maaraysId)}</div>)
                : 'Ei poistettavia tutkintoja'
              }
            </div>
          </Row>

          <BottomWrapper>
            <WizButton type="button" onClick={previousPage}>
              Edellinen
            </WizButton>
            <WizButton type="submit" disabled={isDisabled || isRemoving}>Seuraava</WizButton>
            <WizButton bgColor={COLORS.OIVA_RED} onClick={(e) => onCancel(e)}>Peruuta</WizButton>
          </BottomWrapper>
        </form>
      </div>
    )
  }

  renderRemoveTutkinnot(props) {
    let { fields } = props
    const { isRemoving, poistettavatValue, kohde, lupa } = props
    const { kohdeid, heading, maaraykset, muutMaaraykset } = kohde

    return (
      <div>
        {isRemoving
          ?
            <AddWrapper>
              <ScrollWrapper>
                <ContentContainer>
                  <AddContent>
                    <Row>
                      <h2>Poista tutkintoja</h2>
                    </Row>

                    <Row>
                      <WizButton
                        disabled={poistettavatValue === undefined || poistettavatValue.length === 0}
                        bgColor={COLORS.OIVA_GREEN}
                        onClick={this.toggleIsRemoving}
                      >
                        Poista valitut
                      </WizButton>
                      <WizButton bgColor={COLORS.OIVA_RED} onClick={(e) => {
                        e.preventDefault()
                        fields.removeAll()
                        this.toggleIsRemoving()
                      }}
                      >
                        Peruuta
                      </WizButton>
                    </Row>

                    <Row>
                      {maaraykset.map(({ koodi, nimi, koulutusalat }) => {
                        return (
                          <KoulutusAlaList
                            key={koodi}
                            koodi={koodi}
                            nimi={nimi}
                            koulutusalat={koulutusalat}
                            fields={fields}
                            isEditing={isRemoving}
                            editValues={poistettavatValue}
                            lupa={lupa}
                          />
                        )
                      })}
                    </Row>
                  </AddContent>
                </ContentContainer>
              </ScrollWrapper>
            </AddWrapper>
          :
            <Kohde>
              <Kohdenumero>{kohdeid}.</Kohdenumero>
              <Otsikko>{heading}</Otsikko>
              <ControlsWrapper>
                <WizButton onClick={this.toggleIsAdding}>Lisää tutkintoja</WizButton>
                <WizButton bgColor={COLORS.OIVA_RED} onClick={this.toggleIsRemoving}>Poista tutkintoja</WizButton>
              </ControlsWrapper>
              {maaraykset.map(({ koodi, nimi, koulutusalat }) => {
                return (
                  <KoulutusAlaList
                    key={koodi}
                    koodi={koodi}
                    nimi={nimi}
                    koulutusalat={koulutusalat}
                    fields={fields}
                    isEditing={isRemoving}
                    editValues={poistettavatValue}
                    lupa={lupa}
                  />
                )
              })}
            </Kohde>
        }
      </div>
    )
  }

  renderAddKoulutuksia(props) {
    const { data, lisattavatValue } = props
    let { fields } = props

    return (
      <AddWrapper>
        <ScrollWrapper>


        <ContentContainer>
          <AddContent>
            <Row>
              <h2>Lisää koulutuksia</h2>
            </Row>
            <Row>
              <WizButton disabled={lisattavatValue === undefined || lisattavatValue.length === 0} onClick={this.toggleIsAdding}>Lisää valitut</WizButton>
              <WizButton
                bgColor={COLORS.OIVA_RED}
                onClick={(e) => {
                  e.preventDefault()
                  fields.removeAll()
                  this.toggleIsAdding()
                }}
              >
                Peruuta
              </WizButton>
            </Row>

            {_.map(data, (koulutusala, i) => {
              const { koodiarvo, metadata, koulutukset } = koulutusala
              const nimi = parseLocalizedField(metadata)
              return (
                  <LisaaKoulutusAlaList
                    key={i}
                    koodiarvo={koodiarvo}
                    nimi={nimi}
                    koulutukset={koulutukset}
                    editValues={lisattavatValue}
                    fields={fields}
                  />
                )
            })}
          </AddContent>
        </ContentContainer>
        </ScrollWrapper>
      </AddWrapper>
    )
  }
}

const selector = formValueSelector('uusi-hakemus')

MuutospyyntoWizardTutkinnot = connect(state => {
  const poistettavatValue = selector(state, 'poistettavat')
  const lisattavatValue = selector(state, 'lisattavat')

  return {
    poistettavatValue,
    lisattavatValue,
    koulutusalat: state.koulutusalat,
    koulutukset: state.koulutukset
  }
})(MuutospyyntoWizardTutkinnot)

export default reduxForm({
  form: 'uusi-hakemus',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(MuutospyyntoWizardTutkinnot)
