import _ from "lodash"
import { getMuutosperusteluObjectById, getTutkintoKoodiByMaaraysId } from "./koulutusUtil"
import { parseLocalizedField } from "../../../../../../modules/helpers"
import dateformat from "dateformat"
import store from "../../../../../../store"
import { MUUTOS_TILAT, MUUTOS_TYPES } from "./uusiHakemusFormConstants"

export function formatMuutospyynto(muutospyynto) {

  const {
    diaarinumero,
    jarjestajaOid,
    jarjestajaYtunnus,
    luoja,
    luontipvm,
    lupa_uuid,
    tila,
    tutkinnotjakoulutukset = [],
    opetusjatutkintokielet = [],
    toimintaalueet = [],
    opiskelijavuodet = [],
    muutmuutokset = []
  } = muutospyynto

  let muutokset = [
    ...formatMuutosArray(tutkinnotjakoulutukset),
    ...formatMuutosArray(opetusjatutkintokielet),
    ...formatMuutosArray(toimintaalueet),
    ...formatMuutosArray(opiskelijavuodet),
    ...formatMuutosArray(muutmuutokset)
  ]


  return {
    diaarinumero,
    jarjestajaOid,
    jarjestajaYtunnus,
    luoja,
    luontipvm,
    lupa_uuid,
    paatoskierros: getDefaultPaatoskierros(),
    tila,
    paivittaja: "string",
    paivityspvm: null,
    voimassaalkupvm: "2018-01-01",
    voimassaloppupvm: "2018-12-31",
    muutokset: muutokset
  }
}

function formatMuutosArray(muutokset) {
  if (!muutokset) {
    return []
  }

  return _.map(muutokset, muutos => _.assignIn({}, muutos, {
    tila:
      muutos.type === MUUTOS_TYPES.ADDITION ? MUUTOS_TILAT.LISAYS :
      muutos.type === MUUTOS_TYPES.REMOVAL ? MUUTOS_TILAT.POISTO :
      muutos.type === MUUTOS_TYPES.CHANGE ? MUUTOS_TILAT.MUUTOS :
      null
  }))
}

function getDefaultPaatoskierros() {
  const state = store.getState()

  const { paatoskierrokset } = state

  if (paatoskierrokset && paatoskierrokset.data) {
    const pkierrosObj = _.find(paatoskierrokset.data, pkierros => {
      if (pkierros.meta && pkierros.meta.nimi && pkierros.meta.nimi.fi) {
        if (pkierros.meta.nimi.fi === "Avoin päätöskierros 2018") {
          return pkierros
        }
      }
    })

    if (pkierrosObj) {
      return { uuid: pkierrosObj.uuid }
    }
  }

  return undefined
}

export function getJarjestajaData(state) {
  let username = "oiva-default"
  if (state.user && state.user.fetched) {
    username = state.user.user.username
  } else {
    username = sessionStorage.getItem('username')
  }

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
      luoja: username,
      luontipvm: now,
      lupa_uuid: uuid,
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

export function getMaaraystyyppiByTunniste(tunniste) {
  const state = store.getState()

  if (state.maaraystyypit && state.maaraystyypit.fetched) {
    const maaraystyypit = state.maaraystyypit.data
    return _.find(maaraystyypit, maaraystyyppi => {
      return maaraystyyppi.tunniste.toLowerCase() === tunniste.toLowerCase()
    })
  }
}

export function getKohdeByTunniste(tunniste) {
  const state = store.getState()

  if (state.kohteet && state.kohteet.fetched) {
    const kohteet = state.kohteet.data
    return _.find(kohteet, kohde => {
      return kohde.tunniste.toLowerCase() === tunniste.toLowerCase()
    })
  }
}
