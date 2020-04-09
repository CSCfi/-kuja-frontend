/**
 * Helper functions
 */

import * as R from "ramda";

/**
 * Resolve name of the organizer from lupa based on given locale. If it doesn't exist,
 * resolve into other locale. We assume that only 'fi' and 'sv' locales exist.
 * @param lupa
 * @param primaryLocale
 * @return {any}
 */
export const resolveLocalizedOrganizerName = (lupa, primaryLocale) => {
  const altLocale = primaryLocale === 'fi' ? 'sv' : 'fi';
  let retval = R.path(["jarjestaja", "nimi", primaryLocale])(lupa);
  if(!retval) {
    retval = R.path(["jarjestaja", "nimi", altLocale])(lupa);
  }
  return retval;
};

/**
 * Given a koodisto koodi metadata array, return the localized message contained in given primaryLocale, or
 * alternative locale when locales are assumed to be either 'fi' or 'sv'.
 * @param messageObjects
 * @param primaryLocale
 * @return {*}
 */
export const parseLocalizedField = (
  messageObjects,
  locale = "FI",

) => {
  const primaryLocale = locale.toUpperCase();
  const altLocale = primaryLocale === "FI" ? "SV" : "FI";
  const primaryObject = R.find(item => item.kieli === primaryLocale, messageObjects);
  const altObject = R.find(item => item.kieli === altLocale, messageObjects);
  return primaryObject ? primaryObject.nimi : altObject ? altObject.nimi : undefined;
};

export const slugify = str => {
  if (str) {
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    const to = "aaaaeeeeiiiioooouuuunc------";
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes
  }

  return str;
};

export const parsePostalCode = str => {
  if (str) {
    return str.slice(-5);
  } else {
    return "";
  }
};
