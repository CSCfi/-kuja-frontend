import _ from 'lodash'
import dateformat from 'dateformat'
import store from '../../../../../../store'
import { parseLocalizedField } from "../../../../../../modules/helpers"

export function getKieliByKoodi(koodi) {
  const state = store.getState()

  const { kielet } = state

  if (kielet && kielet.data) {
    return _.find(kielet.data, (kieli) => { return kieli.koodiArvo === koodi })
  } else {
    return undefined
  }
}

export function getKoulutusAlat() {
  const state = store.getState()

  if (state.koulutusalat && state.koulutusalat.fetched) {
    return state.koulutusalat.data
  }
}

export function getTutkintoNimiByKoodiarvo(koodi) {
  const state = store.getState()

  if (state.koulutukset && state.koulutukset.treedata) {
    const { treedata } = state.koulutukset

    let nimi = undefined

    _.forEach(treedata, ala => {
      _.forEach(ala.koulutukset, koulutus => {
        if (koulutus.koodiarvo === koodi) {
          nimi = koulutus.nimi
        }
      })
    })

    return nimi
  }
}

export function getTutkintoKoodiByMaaraysId(maaraysId) {
  const state = store.getState()

  if (state.lupa && state.lupa.data && state.lupa.data.maaraykset) {
    const { maaraykset } = state.lupa.data
    const obj = _.find(maaraykset, {id: maaraysId})

    if (obj && obj.koodiarvo) {
      return obj.koodiarvo
    }
  }
}

export function getTutkintoNimiByMaaraysId(maaraysId) {
  const state = store.getState()

  if (state.lupa && state.lupa.data && state.lupa.data.maaraykset) {
    const { maaraykset } = state.lupa.data
    const obj = _.find(maaraykset, {id: maaraysId})

    if (obj && obj.koodi && obj.koodi.metadata) {
      return parseLocalizedField(obj.koodi.metadata)
    }
  }
}

export function getMuutosperusteluObjectById(muutosperusteluId) {
  const state = store.getState()

  if (state.muutosperustelut && state.muutosperustelut.data) {
    return _.find(state.muutosperustelut.data, mperustelu => {
      return String(mperustelu.koodiArvo) === String(muutosperusteluId)
    })
  }
}

export function getPaatoskierrosByUuid(paatoskierrosUuid) {
  const state = store.getState()

  if (state.paatoskierrokset && state.paatoskierrokset.data) {
    return _.find(state.paatoskierrokset.data, paatoskierros => {
      return paatoskierros.uuid === paatoskierrosUuid
    })
  }
}

function getDefaultPaatoskierrosUuid() {
  const state = store.getState()

  const { paatoskierrokset } = state

  if (paatoskierrokset && paatoskierrokset.data) {
    const pkierrosObj = _.find(paatoskierrokset.data, pkierros => {
      if (pkierros.meta && pkierros.meta.nimi && pkierros.meta.nimi.fi) {
        if (pkierros.meta.nimi.fi === "Avoin hakukierros 2018") {
          return pkierros
        }
      }
    })

    if (pkierrosObj) {
      return pkierrosObj.uuid
    }
  }

  return undefined
}

export function getJarjestajaData(state) {
  const fakeUser = "oiva-web" // TODO: oikea käyttäjä statesta

  if (state.lupa && state.lupa.data) {
    const { data } = state.lupa
    const {
      id: uuid,
      diaarinumero,
      jarjestajaYtunnus,
      jarjestajaOid
    } = data
    const now = dateformat(new Date(), "yyyy-mm-dd")

    return {
      diaarinumero,
      // hakupvm: now, // kun siirretään käsittelyyn
      jarjestajaOid,
      jarjestajaYtunnus,
      luoja: fakeUser,
      luontipvm: now,
      lupaId: uuid,
      paatoskierrosId: null,
      paivityspvm: now,
      tila: "LUONNOS",
      voimassaalkupvm: null,
      voimassaloppupvm: null,
      muutosperustelu: {
        arvo: "",
        koodiarvo: null,
        koodisto: "oivaperustelut",
        luoja: fakeUser,
        luontipvm: now,
        meta: {
          perusteluteksti: null
        }
      }
    }
  }
}

export function formatMuutospyynto(muutospyynto) {

  const {
    diaarinumero,
    jarjestajaOid,
    jarjestajaYtunnus,
    luoja,
    luontipvm,
    lupaId,
    tila,
    lisattavat,
    poistettavat,
    paatoskierros,
    muutosperustelu,
    muuperustelu,
    tutkintomuutokset,
    opetuskielimuutokset,
    tutkintokielimuutokset
  } = muutospyynto

  let muutokset = formatMuutokset(lisattavat, poistettavat)

  return {
    diaarinumero,
    jarjestajaOid,
    jarjestajaYtunnus,
    luoja,
    luontipvm,
    lupaId,
    paatoskierrosId: getDefaultPaatoskierrosUuid(),
    tila,
    paivittaja: "string",
    paivityspvm: null,
    voimassaalkupvm: "2018-01-01",
    voimassaloppupvm: "2018-12-31",
    muutosperustelu: formatMuutosperustelu(muutosperustelu, muuperustelu),
    muutokset: muutokset
  }
}

export function getEditIndex(values, koodiarvo, koodisto) {
  let i = undefined

  _.forEach(values, (value, idx) => {
    if (value.koodiarvo === koodiarvo && value.koodisto === koodisto) {
      i = idx
    }
  })

  return i
}

export function getChangeIndices(values, koodiarvo) {
  let indices = []

  _.forEach(values, (value, i) => {
    if (value.type === "change" && value.koodiarvo === koodiarvo) {
      indices.push(i)
    }
  })

  return indices
}

export function getOpiskelijavuosiIndex(values, koodiarvo) {
  let i = undefined

  _.forEach(values, (value, idx) => {
    if (value.koodiarvo === koodiarvo) {
      i = idx
    }
  })

  return i
}

export function handleSimpleCheckboxChange(event, editValues, fields, isInLupa, obj) {
  const { checked } = event.target
  const { koodiarvo, koodisto } = obj

  if (checked) {
    if (isInLupa) {
      // Valtakunnallinen luvassa --> poistetaan se formista
      const i = getEditIndex(editValues, koodiarvo, koodisto)
      if (i !== undefined) {
        fields.remove(i)
      }
    } else {
      // Valtakunnallinen ei luvassa --> lisätään muutos formiin
      fields.push({
        type: 'addition',
        perustelu: null,
        isValtakunnallinen: true,
        koodiarvo: 'FI1',
        koodisto: 'nuts1',
        metadata: {
          kuvaus: {
            FI: 'Tutkintoja ja koulutusta saa lisäksi järjestää Ahvenanmaan maakuntaa lukuun ottamatta myös muualla Suomessa.',
            SV: 'Examina och utbildning får därtill ordnas även på annat håll i Finland, med undantag för landskapet Åland.'
          }
        }
      })
    }
  } else {
    if (isInLupa) {
      // Valtakunnallinen luvassa --> lisätään muutos formiin
      fields.push({
        type: 'addition',
        perustelu: null,
        isValtakunnallinen: false,
        koodiarvo: 'FI1',
        koodisto: 'nuts1',
        metadata: {
          kuvaus: {
            FI: 'Tutkintoja ja koulutusta saa lisäksi järjestää Ahvenanmaan maakuntaa lukuun ottamatta myös muualla Suomessa.',
            SV: 'Examina och utbildning får därtill ordnas även på annat håll i Finland, med undantag för landskapet Åland.'
          }
        }
      })
    } else {
      // Valtakunnallinen ei luvassa --> poistetaan se formista
      const i = getEditIndex(editValues, koodiarvo, koodisto)
      if (i !== undefined) {
        fields.remove(i)
      }
    }
  }
}

export function handleCheckboxChange(event, editValue, fields, isInLupa, currentObj) {
  const { koodiArvo, metadata, koodisto } = currentObj
  const { koodistoUri } = koodisto
  const nimi = parseLocalizedField(metadata, 'FI', 'nimi')
  const kuvaus = parseLocalizedField(metadata, 'FI', 'kuvaus')

  const { checked } = event.target

  if (checked) {
    if (isInLupa) {
      // Tutkinto oli luvassa --> poistetaan se formista
      const i = getEditIndex(editValue, koodiArvo, koodistoUri)
      if (i !== undefined) {
        fields.remove(i)
      }
    } else {
      // Tutkinto ei ollut luvassa --> lisätään se formiin
      fields.push({ koodiarvo: koodiArvo, koodisto: koodistoUri, nimi, kuvaus, isInLupa, type: "addition", perustelu: null })
    }
  } else {
    if (isInLupa) {
      // Tutkinto oli luvassa --> lisätään muutos formiin
      fields.push({ koodiarvo: koodiArvo, koodisto: koodistoUri, nimi, kuvaus, isInLupa, type: "removal", perustelu: null })
    } else {
      // Tutkinto ei ollut luvassa --> poistetaan muutos formista
      const i = getEditIndex(editValue, koodiArvo, koodistoUri)
      if (i !== undefined) {
        fields.remove(i)
      }
    }
  }
}

export function handleTutkintoKieliCheckboxChange(event, editValue, fields, isInLupa, value, currentObj) {
  const { koodi, nimi, maaraysId } = currentObj
  const koodistoUri = "kieli"

  const { checked } = event.target

  if (checked) {
    if (isInLupa) {
      // Tutkinto oli luvassa --> poistetaan se formista
      const i = getEditIndex(editValue, koodi, koodistoUri)
      if (i !== undefined) {
        fields.remove(i)
      }
    } else {
      // Tutkinto ei ollut luvassa --> lisätään se formiin
      fields.push({ koodiarvo: koodi, koodisto: koodistoUri, nimi, maaraysId, value, kuvaus: null, isInLupa, type: "addition", perustelu: null })
    }
  } else {
    if (isInLupa) {
      // Tutkinto oli luvassa --> lisätään muutos formiin
      fields.push({ koodiarvo: koodi, koodisto: koodistoUri, nimi, maaraysId, value, kuvaus: null, isInLupa, type: "removal", perustelu: null })
    } else {
      // Tutkinto ei ollut luvassa --> poistetaan muutos formista
      const i = getEditIndex(editValue, koodi, koodistoUri)
      if (i !== undefined) {
        fields.remove(i)
      }
    }
    // Tarkastetaan, että editvaluesiin ei jää muutos-tyyppisiä arvoja
    if (editValue) {
      const indices = getChangeIndices(editValue, koodi)
      if (indices.length > 0) {
        indices.forEach(i => {
          fields.remove(i)
        })
      }
    }
  }
}

export function handleTutkintokieliSelectChange(editValues, fields, isInLupa, tutkinto, selectedValue) {
  if (selectedValue === null) {
    return
  }

  const { koodi, maaraysId, nimi } = tutkinto
  const { value, koodisto, label } = selectedValue
  const { koodistoUri } = koodisto

  if (isInLupa) {
    // Tarkastetaan löytyykö muutosta editValuesista
    if (editValues) {
      const i = getEditIndex(editValues, koodi, koodistoUri)
      if (i !== undefined) {
        let obj = fields.get(i)
        fields.remove(i)
        obj.value = selectedValue.value
        fields.insert(i, obj)
      } else {
        fields.push({
          koodiarvo: koodi,
          koodisto: koodistoUri,
          nimi,
          maaraysId,
          value,
          label,
          kuvaus: null,
          isInLupa,
          type: "change",
          perustelu: null
        })
      }
    } else {
      fields.push({
        koodiarvo: koodi,
        koodisto: koodistoUri,
        nimi,
        maaraysId,
        value,
        label,
        kuvaus: null,
        isInLupa,
        type: "change",
        perustelu: null
      })
    }
  } else {
    if (editValues) {
      const i = getEditIndex(editValues, koodi, koodistoUri)
      if (i !== undefined) {
        let obj = fields.get(i)
        fields.remove(i)
        obj.value = value
        obj.label = label
        obj.isAdded = true
        fields.insert(i, obj)
      }
    }
  }
}

export function getSelectedTutkintoKielet(tutkinnotjakielet, editValues) {
  console.log('getSelectedTutkintoKielet')
  console.log(tutkinnotjakielet)
  console.log(editValues)

  let kielet = []

  if (tutkinnotjakielet) {
    tutkinnotjakielet.forEach(tutkintokieli => {
      const { tutkintokoodi, nimi, koodi, maaraysId } = tutkintokieli

      const kieli = getKieliByKoodi(koodi)
      let label = "Ei saatavilla"

      if (kieli) {
        label = parseLocalizedField(kieli.metadata)
      }

      let obj = {}
      obj.maaraysId = maaraysId
      obj.koodiarvo = tutkintokoodi
      obj.nimi = nimi
      obj.koodisto = "kieli"
      obj.value = koodi
      obj.label = label
      obj.isInLupa = true

      kielet.push(obj)
    })
  }

  if (editValues) {
    editValues.forEach(value => {
      let obj = value

      if (obj.type === "addition") {
        // Lisäykset
      } else if (obj.type === "removal") {
        // poistot
      }
    })
  }

  return kielet
}

export function getKieliList(kielet, locale) {
  let kieletExtended = []

  kielet.forEach(kieli => {
    const { koodiArvo, koodisto, metadata } = kieli
    kieletExtended.push({ koodiArvo, koodisto, metadata, label: parseLocalizedField(metadata, locale), value: koodiArvo })
  })

  return kieletExtended
}

function formatMuutosperustelu(muutosperusteluId, muuperustelu) {
  const perustelu = getMuutosperusteluObjectById(muutosperusteluId)
  const { koodiArvo, koodisto, metadata } = perustelu
  const nimi = parseLocalizedField(metadata, 'FI', nimi)
  const kuvaus = parseLocalizedField(metadata, 'FI', kuvaus)

  return {
    arvo: "",
    koodiarvo: koodiArvo,
    koodisto: koodisto.koodistoUri,
    luoja: "asd",
    luontipvm: dateformat(new Date(), "yyyy-mm-dd"),
    meta: {
      perusteluteksti: nimi,
      kuvaus: kuvaus
    }
  }
}

function formatMuutokset(lisattavat, poistettavat) {
  let muutokset = []

  if (lisattavat) {
    _.forEach(lisattavat, koodiarvo => {
      let obj = getBaseObject()
      obj.koodiarvo = koodiarvo
      obj.tila = "LISAYS"
      muutokset.push(obj)
    })
  }

  if (poistettavat) {
    _.forEach(poistettavat, maaraysId => {
      let obj = getBaseObject()
      obj.koodiarvo = getTutkintoKoodiByMaaraysId(maaraysId)
      obj.maaraysId = maaraysId
      obj.tila = "POISTO"
      muutokset.push(obj)
    })
  }

  return muutokset
}

function getBaseObject() {
  return {
    kohdeId: 1, // koulutukset
    koodisto: "koulutus",
    luoja: "string",
    luontipvm: 0,
    maaraystyyppiId: 1, // oikeus
    meta: {
      perusteluteksti: [
        {
          fi: "Suomeksi"
        },
        {
          sv: "På Svenska"
        }
      ]
    }
  }
}
