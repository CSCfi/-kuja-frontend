import _ from "lodash"
import { getMuutosperusteluObjectById, getTutkintoKoodiByMaaraysId } from "./koulutusUtil"
import { parseLocalizedField } from "../../../../../../modules/helpers"
import dateformat from "dateformat"
import store from "../../../../../../store"

export function formatMuutospyynto(muutospyynto) {

  const {
    diaarinumero,
    jarjestajaOid,
    jarjestajaYtunnus,
    luoja,
    luontipvm,
    lupaId,
    tila,
    tutkinnotjakoulutukset,
    opetusjatutkintokielet,
    toimintaalueet,
    opiskelijavuodet,
    muutmuutokset
  } = muutospyynto

  // let muutokset = formatMuutokset(lisattavat, poistettavat)
  let muutokset = []


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
    // muutosperustelu: formatMuutosperustelu(muutosperustelu, muuperustelu),
    muutokset: muutokset
  }
}

function genMuutokset(tutkinnotjakoulutukset, asd) {

}

function formatMuutokset(lisattavat, poistettavat) {
  let muutokset = []

  console.log("LISATTAVAT: " + JSON.stringify(lisattavat))

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

export function getMuutosBaseObject() {

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

  if (state.lupa && state.lupa.fetched && state.paatoskierrokset && state.paatoskierrokset.fetched) {
    const { data } = state.lupa
    const {
      uuid,
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
      muutokset: [],
      meta: {}
    }
  }
}

export function hasFormChanges(formValues) {
  if (formValues) {
    const { tutkinnotjakoulutukset, opetusjatutkintokielet, toimintaalueet, opiskelijavuodet, muutmuutokset } = formValues

    if (tutkinnotjakoulutukset && tutkinnotjakoulutukset.length > 0) {
      return true
    } else if (opetusjatutkintokielet && opetusjatutkintokielet.length > 0) {
      return true
    } else if (toimintaalueet && toimintaalueet.length > 0) {
      return true
    } else if (opiskelijavuodet && opiskelijavuodet.length > 0) {
      return true
    } else if (muutmuutokset && muutmuutokset.length > 0) {
      return true
    }
  }

  return false
}
