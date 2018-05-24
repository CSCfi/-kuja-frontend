import _ from 'lodash'
import { parseLocalizedField } from "../../../../../../modules/helpers"

export function getMuutosperusteluList(muutosperustelut, locale) {
  let array = []

  muutosperustelut.forEach(muutosperustelu => {
    const { koodiArvo, metadata } = muutosperustelu
    array.push({ ...muutosperustelu, label: parseLocalizedField(metadata, locale), value: koodiArvo })
  })

  return array
}

export function handleMuutosperusteluSelectChange(muutokset, fields, muutos, selectedValue) {
  console.log('handleMuutosperusteluSelectChange')
  console.log(muutokset)
  console.log(fields)
  console.log(muutos)
  console.log(selectedValue)
  let muutosperusteluValue = null

  if (selectedValue !== null) {
    muutosperusteluValue = selectedValue.koodiArvo
  }

  const { koodiarvo } = muutos

  const i = getMuutosperusteluEditIndex(muutokset, koodiarvo)

  if (i !== undefined) {
    let obj = fields.get(i)
    fields.remove(i)
    obj.muutosperustelu = muutosperusteluValue
    fields.insert(i, obj)
  }
}

function getMuutosperusteluEditIndex(muutokset, koodiarvo) {
  let i = undefined

  _.forEach(muutokset, (muutos, idx) => {
    if (muutos.koodiarvo === koodiarvo) {
      i = idx
    }
  })

  return i
}
