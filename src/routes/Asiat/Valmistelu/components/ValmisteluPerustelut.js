import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import validate from '../modules/validateValmistelu'
import { WizButton, SelectWrapper } from "./Valmistelu"
import { Separator, H3, SelectStyle, Input } from './ValmisteluComponents'

import { parseLocalizedField } from "../../../../modules/helpers"
import { COLORS } from "../../../../modules/styles"

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <Input {...input} placeholder={label} type={type} />
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)

const renderPerusteluSelect = ({ input, muutosperustelut, meta: { touched, error } }) => {
    return (
        <div>
            <SelectStyle>
                <select {...input}>
                    <option value="">Valitse </option>
                    {muutosperustelut.map(perustelu => {
                        const { koodiArvo, metadata } = perustelu
                        const nimi = parseLocalizedField(metadata)
                        return (
                            <option value={koodiArvo} key={koodiArvo}>
                                {nimi}
                            </option>
                        )
                    })}
                </select>
            </SelectStyle>
            {touched && error && <span>{error}</span>}
        </div>
    )
}

let ValmisteluPerustelut = props => {
    const { handleSubmit, previousPage, muutosperustelut, muutosperusteluValue, muuperusteluValue, error, onCancel } = props

    return (
        <div>
            <h2>Perustele muutosehdotukset</h2>
            <p>&lt;Tähän tulee lyhyt perusteluohje eli suuntaviivat sille mitä pitää tehdä.&gt;</p>

            <Separator/>

            <H3>Muutospyynnön taustalla olevat syyt</H3>
            <form onSubmit={handleSubmit}>
                <SelectWrapper>
                    <div>
                        <label>Mikä on aiheuttanut muutostarpeen?</label>
                        <Field
                            name="muutosperustelu"
                            muutosperustelut={muutosperustelut}
                            component={renderPerusteluSelect}
                        />
                    </div>

                    {muutosperusteluValue === '01'
                        ?
                        <div>
                            <Field
                                name="muuperustelu"
                                type="text"
                                label="Kirjoita perustelu"
                                component={renderField}
                            />
                        </div>
                        : null
                    }
                </SelectWrapper>

                <Separator/>

                <div>
                    <WizButton type="button" onClick={previousPage}>
                        Edellinen
                    </WizButton>
                    <WizButton type="submit" disabled={muutosperusteluValue === undefined || (muutosperusteluValue === "01" && muuperusteluValue === undefined) || error}>
                        Seuraava
                    </WizButton>
                    <WizButton bgColor={COLORS.OIVA_RED} onClick={(e) => onCancel(e)}>Peruuta</WizButton>
                </div>
            </form>
        </div>
    )
}

const selector = formValueSelector('uusiHakemus')

ValmisteluPerustelut = connect(state => {
    const muutosperusteluValue = selector(state, 'muutosperustelu')
    const muuperusteluValue = selector(state, 'muuperustelu')
    const tutkintomuutoksetValue = selector(state, 'tutkintomuutokset')

    return {
        muutosperusteluValue,
        muuperusteluValue,
        tutkintomuutoksetValue
    }
})(ValmisteluPerustelut)

export default reduxForm({
    form: 'uusiHakemus',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(ValmisteluPerustelut)
