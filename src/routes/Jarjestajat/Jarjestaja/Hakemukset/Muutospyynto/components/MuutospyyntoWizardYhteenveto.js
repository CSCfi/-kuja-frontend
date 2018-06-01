import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector, FieldArray, Field } from 'redux-form'
import Modal from 'react-modal'

import OrganisaationTiedot from './OrganisaationTiedot'
import DatePicker from "../../../../../../modules/DatePicker"
import MuutosList from './MuutosList'

import validate from '../modules/validateWizard'
import { WizardBottom, Container, SubtleButton, Button, FormGroup, Label, FormField, Separator } from "./MuutospyyntoWizardComponents"
import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants"
import { COMPONENT_TYPES, FIELD_ARRAY_NAMES, FORM_NAME_UUSI_HAKEMUS } from "../modules/uusiHakemusFormConstants"
import { modalStyles, ModalButton, ModalText, Content } from "./ModalComponents"
import { hasFormChanges } from "../modules/muutospyyntoUtil"


Modal.setAppElement('#root')

class MuutospyyntoWizardYhteenveto extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSendModalOpen: false
    }

    this.openSendModal = this.openSendModal.bind(this)
    this.afterOpenSendModal = this.afterOpenSendModal.bind(this)
    this.closeSendModal = this.closeSendModal.bind(this)
    this.renderHakijanTiedot = this.renderHakijanTiedot.bind(this)
    this.renderField = this.renderField.bind(this)
    this.renderDatePicker = this.renderDatePicker.bind(this)
  }

  openSendModal(e) {
    e.preventDefault()
    this.setState({ isSendModalOpen: true })
  }

  afterOpenSendModal() {
  }

  closeSendModal() {
    this.setState({ isSendModalOpen: false })
  }

  render() {
    const {
      handleSubmit,
      onSubmit,
      previousPage,
      preview,
      save,
      formValues,
      lupa,
      tutkinnotjakoulutuksetValue,
      opetusjatutkintokieletValue,
      toimialueValue,
      opiskelijavuosiValue,
      muutmuutoksetValue
    } = this.props

    let jarjestaja = undefined
    if (lupa && lupa.fetched) {
      jarjestaja = lupa.data.jarjestaja
    }

    setTimeout(() => console.log('yhteenveto ', formValues), 400)

    return (
      <div>
        <h2>{MUUTOS_WIZARD_TEKSTIT.YHTEENVETO.HEADING.FI}</h2>

        {jarjestaja &&
          <div>
            <h3>Organisaation tiedot</h3>
            <OrganisaationTiedot jarjestaja={jarjestaja} />
          </div>
        }

        <Separator />

        <form onSubmit={handleSubmit}>
          <h3>Hakemuksen yleiset tiedot</h3>

          <FieldArray
            name={FIELD_ARRAY_NAMES.HAKIJAN_TIEDOT}
            component={this.renderHakijanTiedot}
          />

          <Separator />

          <h3>Muutokset perusteluineen</h3>

          <FieldArray
            name={FIELD_ARRAY_NAMES.TUTKINNOT_JA_KOULUTUKSET}
            muutokset={tutkinnotjakoulutuksetValue}
            kategoria="tutkinto"
            headingNumber="1"
            heading="Tutkinnot ja koulutukset"
            component={MuutosList}
            componentType={COMPONENT_TYPES.MUUTOS_YHTEENVETO}
          />

          <FieldArray
            name={FIELD_ARRAY_NAMES.OPETUS_JA_TUTKINTOKIELET}
            muutokset={opetusjatutkintokieletValue}
            kategoria="opetuskieli"
            headingNumber="2"
            heading="Opetus- ja tutkintokielet"
            component={MuutosList}
            componentType={COMPONENT_TYPES.MUUTOS_YHTEENVETO}
          />

          <FieldArray
            name={FIELD_ARRAY_NAMES.TOIMINTA_ALUEET}
            muutokset={toimialueValue}
            kategoria="toimialue"
            headingNumber="3"
            heading="Toiminta-alueet"
            component={MuutosList}
            componentType={COMPONENT_TYPES.MUUTOS_YHTEENVETO}
          />

          <FieldArray
            name={FIELD_ARRAY_NAMES.OPISKELIJAVUODET}
            muutokset={opiskelijavuosiValue}
            kategoria="opiskelijavuosi"
            headingNumber="4"
            heading="Opiskelijavuodet"
            component={MuutosList}
            componentType={COMPONENT_TYPES.MUUTOS_YHTEENVETO}
          />

          <FieldArray
            name={FIELD_ARRAY_NAMES.MUUT}
            muutokset={muutmuutoksetValue}
            kategoria="muumuutos"
            headingNumber="5"
            heading="Muut oikeudet, velvollisuudet, ehdot ja tehtävät"
            component={MuutosList}
            componentType={COMPONENT_TYPES.MUUTOS_YHTEENVETO}
          />

          <WizardBottom>
            <Container maxWidth="1085px" padding="15px">
              <Button onClick={previousPage} className="previous button-left">Edellinen</Button>
              <div>
                <SubtleButton disabled={!hasFormChanges(formValues)} onClick={(e) => save(e, formValues)}>Tallenna luonnos</SubtleButton>
                <SubtleButton onClick={(e) => preview(e, this.props.formValues)}>Esikatsele</SubtleButton>
              </div>
              <Button onClick={this.openSendModal} type="submit" className="next button-right">Lähetä hakemus</Button>
            </Container>
          </WizardBottom>

          <Modal
            isOpen={this.state.isSendModalOpen}
            onAfterOpen={this.afterOpenSendModal}
            onRequestClose={this.closeSendModal}
            contentLabel="Lähetä hakemus"
            style={modalStyles}
          >
            <Content>
              <ModalText>Oletko varma, että haluat lähettää hakemuksen käsiteltäväksi?</ModalText>
            </Content>
            <div>
              <ModalButton primary onClick={onSubmit}>Kyllä</ModalButton>
              <ModalButton onClick={this.closeSendModal}>Ei</ModalButton>
            </div>
          </Modal>
        </form>
      </div>
    )
  }

  renderHakijanTiedot() {
    return (
      <div>
        <Field
          name="hakija.nimi"
          type="text"
          label="Yhteyshenkilön nimi"
          component={this.renderField}
        />
        <Field
          name="hakija.puhelin"
          type="text"
          label="Yhteyshenkilön puhelinnumero"
          component={this.renderField}
        />
        <Field
          name="hakija.email"
          type="text"
          label="Yhteyshenkilön sähköposti"
          component={this.renderField}
        />
        <Field
          name="hakija.hyvaksyjat"
          type="text"
          label="Hakemuksen hyväksyjät/allekirjoittajat"
          component={this.renderField}
        />
        <Field
          name="hakija.haettupvm"
          type="text"
          label="Muutoksien voimaantulo"
          component={this.renderDatePicker}
        />
      </div>
    )
  }

  renderField({ input, label, type, meta: { touched, error } }) {
    return (
      <FormGroup>
        <Label>{label}</Label>
        <FormField>
          <input {...input} type={type} />
          {touched && error && <span>{error}</span>}
        </FormField>
      </FormGroup>
    )
  }

  renderDatePicker(props) {
    const { input, label, type, meta: { touched, error } } = props
    return (
      <FormGroup>
        <Label>{label}</Label>
        <FormField>
          <DatePicker customInput={input} handleChange={input.onChange} />
          {/*<input {...input} type={type} />*/}
          {/*{touched && error && <span>{error}</span>}*/}
        </FormField>
      </FormGroup>
    )
  }
}

const selector = formValueSelector(FORM_NAME_UUSI_HAKEMUS)

MuutospyyntoWizardYhteenveto = reduxForm({
  form: FORM_NAME_UUSI_HAKEMUS,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(MuutospyyntoWizardYhteenveto)

export default connect(state => {
  const paatoskierros = selector(state, 'paatoskierros')
  const tutkinnotjakoulutuksetValue = selector(state, FIELD_ARRAY_NAMES.TUTKINNOT_JA_KOULUTUKSET)
  const opetusjatutkintokieletValue = selector(state, FIELD_ARRAY_NAMES.OPETUS_JA_TUTKINTOKIELET)
  const toimialueValue = selector(state, FIELD_ARRAY_NAMES.TOIMINTA_ALUEET)
  const opiskelijavuosiValue = selector(state, FIELD_ARRAY_NAMES.OPISKELIJAVUODET)
  const muutmuutoksetValue = selector(state, FIELD_ARRAY_NAMES.MUUT)

  let formVals = undefined
  if (state.form && state.form.uusiHakemus && state.form.uusiHakemus.values) {
    formVals = state.form.uusiHakemus.values
  }

  return {
    formValues: formVals,
    paatoskierros,
    tutkinnotjakoulutuksetValue,
    opetusjatutkintokieletValue,
    toimialueValue,
    opiskelijavuosiValue,
    muutmuutoksetValue,
    lupa: state.lupa,
    muutosperustelut: state.muutosperustelut,
    paatoskierrokset: state.paatoskierrokset
  }
})(MuutospyyntoWizardYhteenveto)
