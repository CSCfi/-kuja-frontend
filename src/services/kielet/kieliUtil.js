import { parseLocalizedField } from "../../modules/helpers";
import _ from 'lodash'

export function findKieliByKoodi(kielet, koodiarvo) {
  return _.find(kielet, kieli => {
    return kieli.koodiArvo === koodiarvo
  })
}

export function getKieliList(kielet, locale) {
  let kieletExtended = []

  kielet.forEach(kieli => {
    const { koodiArvo, koodisto, metadata, kohde, maaraystyyppi } = kieli
    kieletExtended.push({ koodiArvo, koodisto, metadata, kohde, maaraystyyppi, label: parseLocalizedField(metadata, locale), value: koodiArvo })
  })

  return kieletExtended
}