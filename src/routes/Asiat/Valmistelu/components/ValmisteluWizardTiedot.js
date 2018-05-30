import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import Moment from 'react-moment'
import Modal from 'react-modal'

import validate from '../modules/validateValmistelu'
import { WizardBottom, Container, SubtleButton, Button } from "./ValmisteluComponents"
import { VALMISTELU_WIZARD_TEKSTIT, FIELD_ARRAY_NAMES, FORM_NAME_UUSI_HAKEMUS } from "../modules/constants"
import { modalStyles, ModalButton, ModalText, Content } from "./ModalComponents"

Modal.setAppElement('#root')

const Paatoskierros = ({ paatoskierros }) => (
    <div>
        {paatoskierros.meta.nimi.fi}&nbsp;
        (
        <Moment format="DD.MM.YYYY">{paatoskierros.alkupvm}</Moment>
        &nbsp;-&nbsp;
        <Moment format="DD.MM.YYYY">{paatoskierros.loppupvm}</Moment>
        )
    </div>
)

class ValmisteluWizardTiedot extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isSendModalOpen: false
        }

        this.openSendModal = this.openSendModal.bind(this)
        this.afterOpenSendModal = this.afterOpenSendModal.bind(this)
        this.closeSendModal = this.closeSendModal.bind(this)
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
            onCancel,
            onSubmit,
            previousPage,
            paatoskierrokset,
            preview,
            formValues,
            tutkinnotjakoulutuksetValue,
            opetusjatutkintokieletValue
        } = this.props

        setTimeout(() => console.log('yhteenveto ', formValues), 400)

        const paatoskierrosObj = _.find(paatoskierrokset.data, pkierros => {
            if (pkierros.meta && pkierros.meta.nimi && pkierros.meta.nimi.fi) {
                if (pkierros.meta.nimi.fi === "Avoin päätöskierros 2018") {
                    return pkierros
                }
            }
        })

        return (
            <div>
                <h2>{MUUTOS_WIZARD_TEKSTIT.YHTEENVETO.HEADING.FI}</h2>

                <div>
                    <h3>{MUUTOS_WIZARD_TEKSTIT.YHTEENVETO.PAATOSKIERROS.HEADING.FI}</h3>
                    {paatoskierrosObj
                        ? <Paatoskierros paatoskierros={paatoskierrosObj} />
                        : <div>{MUUTOS_WIZARD_TEKSTIT.YHTEENVETO.PAATOSKIERROS.TIETOJEN_LATAUS_VIRHE.FI}</div>
                    }
                </div>

                <form onSubmit={handleSubmit}>
                    <WizardBottom>
                        <Container maxWidth="1085px" padding="15px">
                            <Button onClick={previousPage} className="previous button-left">Edellinen</Button>
                            <div>
                                <SubtleButton disabled>Tallenna luonnos</SubtleButton>
                                <SubtleButton onClick={(e) => preview(e, this.props.formValues)}>Esikatsele</SubtleButton>
                            </div>
                            <Button  onClick={this.openSendModal} type="submit" className="next button-right">Lähetä hakemus</Button>
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

    return {
        formValues: state.form.uusiHakemus.values,
        paatoskierros,
        tutkinnotjakoulutuksetValue,
        opetusjatutkintokieletValue,
        muutosperustelut: state.muutosperustelut,
        paatoskierrokset: state.paatoskierrokset
    }
})(MuutospyyntoWizardYhteenveto)
