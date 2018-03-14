import _ from 'lodash'
import store from '../../../../../../store'
import { parseLocalizedField } from "../../../../../../modules/helpers"

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
