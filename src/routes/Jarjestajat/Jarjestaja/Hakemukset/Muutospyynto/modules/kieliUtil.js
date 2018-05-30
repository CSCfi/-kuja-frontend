import _ from 'lodash'

export function sortOpetuskielet(kielet) {
  let array = []

  array.push(findKieliByKoodi(kielet, "1")) // Suomi
  array.push(findKieliByKoodi(kielet, "2")) // Ruotsi
  array.push(findKieliByKoodi(kielet, "5")) // Saame


  return array
}

function findKieliByKoodi(kielet, koodiarvo) {
  return _.find(kielet, kieli => {
    return kieli.koodiArvo === koodiarvo
  })
}
