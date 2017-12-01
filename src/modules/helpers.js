/**
 * Helper functions
 */

import _ from 'lodash'

export const parseLocalizedField = (obj, locale = 'FI', key = 'nimi', localeKey = 'kieli') => {
  if (!obj || !locale || !key || !localeKey) { return null }

  return _.find(obj, (o) => {
    if (o[localeKey] === locale) { return o[key] }
  })[key]
}