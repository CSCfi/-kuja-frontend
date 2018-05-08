import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import validate from '../modules/validateWizard'
import { WizButton, SelectWrapper } from "./MuutospyyntoWizard"
import { Separator, H3, SelectStyle, Input } from './MuutospyyntoWizardComponents'

import { parseLocalizedField } from "../../../../../../modules/helpers"
import { COLORS } from "../../../../../../modules/styles"
import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants"

const TutkintoMuutoksetWrapper = styled.div`
  margin: 20px 0 40px;
  background-color: ${COLORS.BG_GRAY};
  padding-bottom: 20px;
`

const MuutosWrapper = styled.div`
  width: 100%;
  background-color: ${COLORS.BG_GRAY};
  display: flex;
  flex-direction: column;
`

const MuutosHeader = styled.div`
  font-size: 18px;
  width: 100%;
  padding: 20px 20px 10px 20px;
  border-bottom: 1px solid ${COLORS.BORDER_GRAY};
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`

const MuutosBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 80px 20px 20px;
  
  textarea {
    width: 100%;
    max-width: 100%;
    font-size: 14px;
    border: 1px solid ${COLORS.BORDER_GRAY};
    
    &:focus {
      outline: none;
    }
  }
`

const BodyTopArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`

const getIndex = (values, koodiarvo) => {
  let i = undefined

  _.forEach(values, (value, idx) => {
    if (value.koodiarvo === koodiarvo) {
      i = idx
    }
  })

  return i
}

const renderTutkintoMuutoksetByType = (props) => {
  const { muutokset, tyyppi, kategoria, fields, meta } = props

  return (
    fields.map((mutos, index) => {
      let muutos = fields.get(index)
      const { koodiarvo, nimi, type, perustelu, koodisto, kuvaus } = muutos
      const helpText = type === "addition"
        ? MUUTOS_WIZARD_TEKSTIT.MUUTOS_LISAYS_OHJE.FI
        : type === "removal"
          ? MUUTOS_WIZARD_TEKSTIT.MUUTOS_POISTO_OHJE.FI
          : type === "change"
            ? MUUTOS_WIZARD_TEKSTIT.MUUTOS_PERUSTELU_YLEINEN.FI
            : null

      if (type === tyyppi) {
        return (
          <MuutosWrapper key={koodiarvo}>
            <MuutosHeader>{koodiarvo}&nbsp;{nimi}</MuutosHeader>
            <MuutosBody>
              <BodyTopArea>
                <span>{helpText}</span>
                <span>Katso esimerkkiperustelu</span>
              </BodyTopArea>
              <textarea
                rows="5"
                onBlur={(e) => {
                  const i = getIndex(muutokset, koodiarvo)
                  let obj = fields.get(i)
                  obj.perustelu = e.target.value
                  fields.remove(i)
                  fields.insert(i, obj)
                }}
              >{perustelu !== null ? perustelu : null}</textarea>
            </MuutosBody>
          </MuutosWrapper>
        )
      }
    })
  )
}

const renderKieliMuutoksetByType = (props) => {
  const { muutokset, tyyppi, kategoria, fields, meta } = props

  return (
    fields.map((mutos, index) => {
      let muutos = fields.get(index)
      const { koodiarvo, nimi, type, perustelu, koodisto, kuvaus, value, label } = muutos
      const helpText = type === "addition"
        ? MUUTOS_WIZARD_TEKSTIT.MUUTOS_KIELET_OHJE.LISAYS.FI
        : type === "removal"
          ? MUUTOS_WIZARD_TEKSTIT.MUUTOS_KIELET_OHJE.POISTO.FI
          : type === "change"
            ? MUUTOS_WIZARD_TEKSTIT.MUUTOS_KIELET_OHJE.MUUTOS.FI
            : null

      let kieli = undefined

      if (value && value !== "") {
        kieli = _.find()
      }

      let heading = `${koodiarvo} ${nimi}`

      if (kategoria === "tutkintokielimuutos") {
        heading = `${koodiarvo} ${nimi} - ${_.capitalize(label)}`
      }

      if (type === tyyppi) {
        return (
          <MuutosWrapper key={koodiarvo}>
            <MuutosHeader>{heading}</MuutosHeader>
            <MuutosBody>
              <BodyTopArea>
                <span>{helpText}</span>
                <span>Katso esimerkkiperustelu</span>
              </BodyTopArea>
              <textarea
                rows="5"
                onBlur={(e) => {
                  const i = getIndex(muutokset, koodiarvo)
                  let obj = fields.get(i)
                  obj.perustelu = e.target.value
                  fields.remove(i)
                  fields.insert(i, obj)
                }}
              >{perustelu !== null ? perustelu : null}</textarea>
            </MuutosBody>
          </MuutosWrapper>
        )
      }
    })
  )
}

const renderToimialueMuutokset = (props) => {
  const { muutokset, tyyppi, fields, meta } = props

  return (
    fields.map((mutos, index) => {
      let muutos = fields.get(index)
      const { koodiarvo, nimi, type, perustelu, koodisto, kuvaus, value, label } = muutos
      const helpText = type === "addition"
        ? MUUTOS_WIZARD_TEKSTIT.MUUTOS_TOIMIALUE_OHJE.LISAYS.FI
        : type === "removal"
          ? MUUTOS_WIZARD_TEKSTIT.MUUTOS_TOIMIALUE_OHJE.POISTO.FI
          : null

      let kieli = undefined

      if (value && value !== "") {
        kieli = _.find()
      }

      let heading = `${koodiarvo} ${nimi}`

      if (type === tyyppi) {
        return (
          <MuutosWrapper key={koodiarvo}>
            <MuutosHeader>{label}</MuutosHeader>
            <MuutosBody>
              <BodyTopArea>
                <span>{helpText}</span>
                <span>Katso esimerkkiperustelu</span>
              </BodyTopArea>
              <textarea
                rows="5"
                onBlur={(e) => {
                  const i = getIndex(muutokset, koodiarvo)
                  let obj = fields.get(i)
                  obj.perustelu = e.target.value
                  fields.remove(i)
                  fields.insert(i, obj)
                }}
              >{perustelu !== null ? perustelu : null}</textarea>
            </MuutosBody>
          </MuutosWrapper>
        )
      }
    })
  )
}

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

const renderOpiskelijavuosiMuutokset = (props) => {
  const { muutokset, fields } = props

  return (
    fields.map((mutos, index) => {
      let muutos = fields.get(index)
      const { koodiarvo, nimi, type, perustelu, koodisto, kategoria, arvo } = muutos
      const helpText = "Perustele lyhyesti miksi tälle muutokselle on tarvetta"

      const heading = koodiarvo === "3"
        ? "Vähimmäisopiskelijavuosimäärä: " + arvo
        : koodiarvo === "2"
          ? "Vaativa koulutus: " + arvo
          : koodiarvo === "4"
            ? "Sisäoppilaitosmuotoinen opetus: " + arvo
            : null



      return (
        <MuutosWrapper key={koodiarvo}>
          <MuutosHeader>{heading}</MuutosHeader>
          <MuutosBody>
            <BodyTopArea>
              <span>{helpText}</span>
              <span>Katso esimerkkiperustelu</span>
            </BodyTopArea>
            <textarea
              rows="5"
              onBlur={(e) => {
                const i = getIndex(muutokset, koodiarvo)
                let obj = fields.get(i)
                obj.perustelu = e.target.value
                fields.remove(i)
                fields.insert(i, obj)
              }}
            >{perustelu !== null ? perustelu : null}</textarea>
          </MuutosBody>
        </MuutosWrapper>
      )
    })
  )
}

const renderMuutMuutoksetByType = (props) => {
  const { muutokset, tyyppi, fields, meta } = props

  return (
    fields.map((mutos, index) => {
      let muutos = fields.get(index)
      const { koodiarvo, nimi, type, perustelu, koodisto, kuvaus, value, label } = muutos
      const helpText = MUUTOS_WIZARD_TEKSTIT.MUUTOS_MUUT.PERUSTELU.FI

      let heading = `${koodiarvo} ${nimi}`



      if (type === tyyppi) {
        return (
          <MuutosWrapper key={koodiarvo}>
            <MuutosHeader>{heading}</MuutosHeader>
            <MuutosBody>
              <BodyTopArea>
                <span>{helpText}</span>
                <span>Katso esimerkkiperustelu</span>
              </BodyTopArea>
              <textarea
                rows="5"
                onBlur={(e) => {
                  const i = getIndex(muutokset, koodiarvo)
                  let obj = fields.get(i)
                  obj.perustelu = e.target.value
                  fields.remove(i)
                  fields.insert(i, obj)
                }}
              >{perustelu !== null ? perustelu : null}</textarea>
            </MuutosBody>
          </MuutosWrapper>
        )
      }
    })
  )
}

let MuutospyyntoWizardPerustelut = props => {
  const {
    handleSubmit,
    previousPage,
    muutosperustelut,
    muutosperusteluValue,
    muuperusteluValue,
    tutkintomuutoksetValue,
    koulutusmuutoksetValue,
    opetuskielimuutoksetValue,
    tutkintokielimuutoksetValue,
    toimialuemuutoksetValue,
    opiskelijavuosimuutoksetValue,
    muutmuutoksetValue,
    onCancel
  } = props

  let hasTutkintoAdditions = false
  let hasTutkintoRemovals = false
  let hasKoulutusAdditions = false
  let hasKoulutusRemovals = false
  let hasOpetuskieliAdditions = false
  let hasOpetuskieliRemovals = false
  let hasTutkintokieliAdditions = false
  let hasTutkintokieliRemovals = false
  let hasTutkintokieliChanges = false
  let hasToimialueAdditions = false
  let hasToimialueRemovals = false
  let hasOpiskelijavuosiChanges = false
  let hasMuutMuutoksetAdditions = false
  let hasMuutMuutoksetRemovals = false

  if (tutkintomuutoksetValue && tutkintomuutoksetValue.length > 0) {
    tutkintomuutoksetValue.forEach(muutos => {
      if (muutos.type === "addition") {
        hasTutkintoAdditions = true
      } else if (muutos.type === "removal") {
        hasTutkintoRemovals = true
      }
    })
  }

  if (koulutusmuutoksetValue && koulutusmuutoksetValue.length > 0) {
    koulutusmuutoksetValue.forEach(muutos => {
      if (muutos.type === "addition") {
        hasKoulutusAdditions = true
      } else if (muutos.type === "removal") {
        hasKoulutusRemovals = true
      }
    })
  }

  if (opetuskielimuutoksetValue && opetuskielimuutoksetValue.length > 0) {
    opetuskielimuutoksetValue.forEach(muutos => {
      if (muutos.type === "addition") {
        hasOpetuskieliAdditions = true
      } else if (muutos.type === "removal") {
        hasOpetuskieliRemovals = true
      }
    })
  }

  if (tutkintokielimuutoksetValue && tutkintokielimuutoksetValue.length > 0) {
    tutkintokielimuutoksetValue.forEach(muutos => {
      if (muutos.type === "addition") {
        hasTutkintokieliAdditions = true
      } else if (muutos.type === "removal") {
        hasTutkintokieliRemovals = true
      } else if (muutos.type === "change") {
        hasTutkintokieliChanges = true
      }
    })
  }

  if (toimialuemuutoksetValue && toimialuemuutoksetValue.length > 0) {
    toimialuemuutoksetValue.forEach(muutos => {
      if (muutos.type === "addition") {
        hasToimialueAdditions = true
      } else if (muutos.type === "removal") {
        hasToimialueRemovals = true
      }
    })
  }

  if (opiskelijavuosimuutoksetValue && opiskelijavuosimuutoksetValue.length > 0) {
    hasOpiskelijavuosiChanges = true
  }

  if (muutmuutoksetValue && muutmuutoksetValue.length > 0) {
    muutmuutoksetValue.forEach(muutos => {
      if (muutos.type === "addition") {
        hasMuutMuutoksetAdditions = true
      } else if (muutos.type === "removal") {
        hasMuutMuutoksetRemovals = true
      }
    })
  }

  return (
    <div>
      <h2>{MUUTOS_WIZARD_TEKSTIT.PERUSTELUT_PAAOTSIKKO.FI}</h2>
      <p>{MUUTOS_WIZARD_TEKSTIT.PERUSTELUT_OHJE.FI}</p>

      <Separator/>

      <H3>{MUUTOS_WIZARD_TEKSTIT.TAUSTA_SYYT_OTSIKKO.FI}</H3>
      <form onSubmit={handleSubmit}>
        <SelectWrapper>
          <div>
            <label>{MUUTOS_WIZARD_TEKSTIT.TAUSTA_SYYT_TARKENNE.FI}</label>
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

        {hasTutkintoAdditions &&
          <div>
            <h3>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_EHDOTETUT_LISAYKSET.FI}</h3>
            <TutkintoMuutoksetWrapper>
              <FieldArray
                name="tutkintomuutokset"
                muutokset={tutkintomuutoksetValue}
                tyyppi="addition"
                component={renderTutkintoMuutoksetByType}
              />
            </TutkintoMuutoksetWrapper>
          </div>
        }

        {hasTutkintoAdditions && hasTutkintoRemovals &&
          <Separator/>
        }

        {hasTutkintoRemovals &&
          <div>
            <h3>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_EHDOTETUT_POISTOT.FI}</h3>
            <TutkintoMuutoksetWrapper>
              <FieldArray
                name="tutkintomuutokset"
                muutokset={tutkintomuutoksetValue}
                tyyppi="removal"
                component={renderTutkintoMuutoksetByType}
              />
            </TutkintoMuutoksetWrapper>
          </div>
        }

        {hasKoulutusAdditions &&
          <div>
            <h3>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_EHDOTETUT_LISAYKSET.FI}</h3>
            <TutkintoMuutoksetWrapper>
              <FieldArray
                name="koulutusmuutokset"
                muutokset={koulutusmuutoksetValue}
                tyyppi="addition"
                kategoria="koulutus"
                component={renderTutkintoMuutoksetByType}
              />
            </TutkintoMuutoksetWrapper>
          </div>
        }

        {hasKoulutusAdditions && hasKoulutusRemovals &&
          <Separator/>
        }

        {hasKoulutusRemovals &&
          <div>
            <h3>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_EHDOTETUT_POISTOT.FI}</h3>
            <TutkintoMuutoksetWrapper>
              <FieldArray
                name="koulutusmuutokset"
                muutokset={koulutusmuutoksetValue}
                tyyppi="removal"
                component={renderTutkintoMuutoksetByType}
              />
            </TutkintoMuutoksetWrapper>
          </div>
        }

        {hasOpetuskieliAdditions &&
          <div>
            <h3>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_OPETUSKIELET.PERUSTELU.HEADING_LISAYS.FI}</h3>
            <TutkintoMuutoksetWrapper>
              <FieldArray
                name="opetuskielimuutokset"
                muutokset={opetuskielimuutoksetValue}
                tyyppi="addition"
                component={renderKieliMuutoksetByType}
              />
            </TutkintoMuutoksetWrapper>
          </div>
        }

        {hasOpetuskieliAdditions && hasOpetuskieliRemovals &&
          <Separator/>
        }

        {hasOpetuskieliRemovals &&
          <div>
            <h3>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_OPETUSKIELET.PERUSTELU.HEADING_POISTO.FI}</h3>
            <TutkintoMuutoksetWrapper>
              <FieldArray
                name="opetuskielimuutokset"
                muutokset={opetuskielimuutoksetValue}
                tyyppi="removal"
                component={renderKieliMuutoksetByType}
              />
            </TutkintoMuutoksetWrapper>
          </div>
        }

        {hasTutkintokieliAdditions &&
          <div>
            <h3>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_TUTKINTOKIELET.PERUSTELU.HEADING_LISAYS.FI}</h3>
            <TutkintoMuutoksetWrapper>
              <FieldArray
                name="tutkintokielimuutokset"
                muutokset={tutkintokielimuutoksetValue}
                tyyppi="addition"
                kategoria="tutkintokielimuutos"
                component={renderKieliMuutoksetByType}
              />
            </TutkintoMuutoksetWrapper>
          </div>
        }

        {hasTutkintokieliRemovals &&
          <div>
            <h3>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_TUTKINTOKIELET.PERUSTELU.HEADING_POISTO.FI}</h3>
            <TutkintoMuutoksetWrapper>
              <FieldArray
                name="tutkintokielimuutokset"
                muutokset={tutkintokielimuutoksetValue}
                tyyppi="removal"
                kategoria="tutkintokielimuutos"
                component={renderKieliMuutoksetByType}
              />
            </TutkintoMuutoksetWrapper>
          </div>
        }

        {hasTutkintokieliChanges &&
          <div>
            <h3>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_TUTKINTOKIELET.PERUSTELU.HEADING_MUUTOS.FI}</h3>
            <TutkintoMuutoksetWrapper>
              <FieldArray
                name="tutkintokielimuutokset"
                muutokset={tutkintokielimuutoksetValue}
                tyyppi="change"
                kategoria="tutkintokielimuutos"
                component={renderKieliMuutoksetByType}
              />
            </TutkintoMuutoksetWrapper>
          </div>
        }

        {hasToimialueAdditions &&
          <div>
            <h3>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_TOIMIALUEET.PERUSTELU.HEADING_LISAYS.FI}</h3>
            <TutkintoMuutoksetWrapper>
              <FieldArray
                name="toimialuemuutokset"
                muutokset={toimialuemuutoksetValue}
                tyyppi="addition"
                component={renderToimialueMuutokset}
              />
            </TutkintoMuutoksetWrapper>
          </div>
        }

        {hasToimialueRemovals &&
          <div>
            <h3>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_TOIMIALUEET.PERUSTELU.HEADING_POISTO.FI}</h3>
            <TutkintoMuutoksetWrapper>
              <FieldArray
                name="toimialuemuutokset"
                muutokset={toimialuemuutoksetValue}
                tyyppi="removal"
                component={renderToimialueMuutokset}
              />
            </TutkintoMuutoksetWrapper>
          </div>
        }

        {hasOpiskelijavuosiChanges &&
          <div>
            <h3>Muutokset opiskelijavuosiin</h3>
            <TutkintoMuutoksetWrapper>
              <FieldArray
                name="opiskelijavuosimuutokset"
                muutokset={opiskelijavuosimuutoksetValue}
                component={renderOpiskelijavuosiMuutokset}
              />
            </TutkintoMuutoksetWrapper>
          </div>
        }

        {hasMuutMuutoksetAdditions &&
          <div>
            <h3>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_MUUT.PERUSTELU.HEADING_LISAYS.FI}</h3>
            <TutkintoMuutoksetWrapper>
              <FieldArray
                name="muutmuutokset"
                muutokset={muutmuutoksetValue}
                tyyppi="addition"
                component={renderMuutMuutoksetByType}
              />
            </TutkintoMuutoksetWrapper>
          </div>
        }

        {hasMuutMuutoksetAdditions && hasMuutMuutoksetRemovals &&
          <Separator/>
        }

        {hasMuutMuutoksetRemovals &&
          <div>
            <h3>{MUUTOS_WIZARD_TEKSTIT.MUUTOS_MUUT.PERUSTELU.HEADING_POISTO.FI}</h3>
            <TutkintoMuutoksetWrapper>
              <FieldArray
                name="muutmuutokset"
                muutokset={muutmuutoksetValue}
                tyyppi="removal"
                component={renderMuutMuutoksetByType}
              />
            </TutkintoMuutoksetWrapper>
          </div>
        }

        <div>
          <WizButton type="button" onClick={previousPage}>
            Edellinen
          </WizButton>
          <WizButton type="submit" disabled={muutosperusteluValue === undefined || (muutosperusteluValue === "01" && muuperusteluValue === undefined)}>
            Seuraava
          </WizButton>
          <WizButton bgColor={COLORS.OIVA_RED} onClick={(e) => onCancel(e)}>Peruuta</WizButton>
        </div>
      </form>
    </div>
  )
}

const selector = formValueSelector('uusiHakemus')

MuutospyyntoWizardPerustelut = connect(state => {
  const muutosperusteluValue = selector(state, 'muutosperustelu')
  const muuperusteluValue = selector(state, 'muuperustelu')
  const tutkintomuutoksetValue = selector(state, 'tutkintomuutokset')
  const koulutusmuutoksetValue = selector(state, 'koulutusmuutokset')
  const opetuskielimuutoksetValue = selector(state, 'opetuskielimuutokset')
  const tutkintokielimuutoksetValue = selector(state, 'tutkintokielimuutokset')
  const toimialuemuutoksetValue = selector(state, 'toimialuemuutokset')
  const opiskelijavuosimuutoksetValue = selector(state, 'opiskelijavuosimuutokset')
  const muutmuutoksetValue = selector(state, 'muutmuutokset')

  return {
    muutosperusteluValue,
    muuperusteluValue,
    tutkintomuutoksetValue,
    koulutusmuutoksetValue,
    opetuskielimuutoksetValue,
    tutkintokielimuutoksetValue,
    toimialuemuutoksetValue,
    opiskelijavuosimuutoksetValue,
    muutmuutoksetValue
  }
})(MuutospyyntoWizardPerustelut)

export default reduxForm({
  form: 'uusiHakemus',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(MuutospyyntoWizardPerustelut)
