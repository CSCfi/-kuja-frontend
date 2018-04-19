import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import Moment from 'react-moment'
import styled from 'styled-components'

import validate from '../modules/validateValmistelu'
import { Row } from "./ValmisteluComponents"
import { WizButton } from "./Valmistelu"
import { COLORS } from "../../../../modules/styles"
import { parseLocalizedField } from "../../../../modules/helpers"
import {
    getJarjestajaData,
    getTutkintoKoodiByMaaraysId, getTutkintoNimiByKoodiarvo,
    getTutkintoNimiByMaaraysId
} from "../modules/valmisteluUtils"
import { createMuutospyynto } from "../modules/valmistelu"

const Paatoskierros = ({ paatoskierros }) => (
    <div>
        {paatoskierros.meta.fi}&nbsp;
        (
        <Moment format="DD.MM.YYYY">{paatoskierros.alkupvm}</Moment>
        &nbsp;-&nbsp;
        <Moment format="DD.MM.YYYY">{paatoskierros.loppupvm}</Moment>
        )
    </div>
)

const Muutosperustelu = ({ muutosperustelu, muuperustelu }) => {
    const nimi = parseLocalizedField(muutosperustelu.metadata)

    return (
        <div>
            {nimi}
            {muuperustelu
                ? <span>:&nbsp;{muuperustelu}</span>
                : null
            }
        </div>
    )
}

let MuutospyyntoWizardYhteenveto = props => {
    const { handleSubmit, muutosperustelu, muuperustelu, paatoskierros, tutkintomuutokset, onCancel, paatoskierrokset, muutosperustelut } = props

    const paatoskierrosObj = _.find(paatoskierrokset.data, pkierros => {
        return String(pkierros.uuid) === String(paatoskierros)
    })

    const muutosperusteluObj = _.find(muutosperustelut.data, mperustelu => {
        return String(mperustelu.koodiArvo) === String(muutosperustelu)
    })

    let hasAdditions = false
    let hasRemovals = false

    if (tutkintomuutokset) {
        tutkintomuutokset.forEach(muutos => {
            if (muutos.type === "addition") {
                hasAdditions = true
            } else if (muutos.type === "removal") {
                hasRemovals = true
            }
        })
    }

    return (
        <div>
            <h2>Yhteenveto</h2>

            <div>
                <h3>Päätöskierros</h3>
                {paatoskierrosObj
                    ? <Paatoskierros paatoskierros={paatoskierrosObj} />
                    : <div>Paatoskierroksen tietoja ei voitu ladata</div>
                }
            </div>

            <div>
                <h3>Muutoksen perustelu</h3>
                {muutosperusteluObj
                    ? <Muutosperustelu muutosperustelu={muutosperusteluObj} muuperustelu={muuperustelu} />
                    : <div>Muutosperustelun tietoja ei voitu ladata</div>
                }
            </div>

            <div>
                <h3>Lisättävät tutkinnot</h3>
                <div>
                    {hasAdditions
                        ? tutkintomuutokset.map(muutos => {
                            if (muutos.type === "addition") {
                                return <div key={muutos.koodiarvo}>{JSON.stringify(muutos)} {getTutkintoNimiByKoodiarvo(muutos.koodiarvo)}</div>
                            } else {
                                return null
                            }
                        })
                        : 'Ei lisättäviä tutkintoja'
                    }
                </div>
            </div>

            <div>
                <h3>Poistettavat tutkinnot</h3>
                <div>
                    {hasRemovals
                        ? tutkintomuutokset.map(muutos => {
                            if (muutos.type === "removal") {
                                return <div key={muutos.koodiarvo}>{JSON.stringify(muutos)} {getTutkintoNimiByKoodiarvo(muutos.koodiarvo)}</div>
                            } else {
                                return null
                            }
                        })
                        : 'Ei poistettavia tutkintoja'
                    }
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <WizButton type="submit" className="next">
                    Tallenna
                </WizButton>
                <WizButton bgColor={COLORS.OIVA_RED} onClick={(e) => onCancel(e)}>Peruuta</WizButton>
            </form>
        </div>
    )
}

const selector = formValueSelector('uusiHakemus')

MuutospyyntoWizardYhteenveto = reduxForm({
    form: 'uusiHakemus',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(MuutospyyntoWizardYhteenveto)

export default connect(state => {
    const muutosperustelu = selector(state, 'muutosperustelu')
    const muuperustelu = selector(state, 'muuperustelu')
    const paatoskierros = selector(state, 'paatoskierros')
    const tutkintomuutokset = selector(state, 'tutkintomuutokset')

    return {
        formValues: state.form.uusiHakemus.values,
        muutosperustelu,
        muuperustelu,
        paatoskierros,
        tutkintomuutokset,
        muutosperustelut: state.muutosperustelut,
        paatoskierrokset: state.paatoskierrokset
    }
})(MuutospyyntoWizardYhteenveto)


