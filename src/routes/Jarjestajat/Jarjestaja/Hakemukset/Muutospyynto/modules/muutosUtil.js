import _ from 'lodash'

export function getIndex(values, koodiarvo) {
  let i = undefined

  _.forEach(values, (value, index) => {
    if (value.koodiarvo === koodiarvo)
      i = index
  })

  return i
}
