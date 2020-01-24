import getTyovoimakoulutuslomake from "./perustelut/tyovoimakoulutus/";
import {
  getKuljettajienJatkokoulutuslomake,
  getKuljettajienPeruskoulutuslomake
} from "./perustelut/kuljettajakoulutukset";
import getTutkinnotLomake from "./perustelut/tutkinnot/";
import { getTaloudellisetlomake } from "./taloudelliset";
import { concat, path } from "ramda";
import getATVKoulutuslomake from "./perustelut/atv-koulutukset";
import getValmentavatKoulutuksetLomake from "./perustelut/valmentavatKoulutukset";
import { setLocale } from "./i18n-config";
import { getCheckboxes } from "./perustelut/muutostarpeet";

const lomakkeet = {
  koulutukset: {
    "atv-koulutukset": {
      addition: (data, isReadOnly, locale, prefix) =>
        getATVKoulutuslomake("addition", data, isReadOnly, prefix),
      removal: (data, isReadOnly, locale, prefix) =>
        getATVKoulutuslomake("removal", data, isReadOnly, prefix)
    },
    kuljettajakoulutukset: {
      jatkokoulutus: {
        addition: (data, isReadOnly) =>
          getKuljettajienJatkokoulutuslomake("addition", data, isReadOnly),
        removal: (data, isReadOnly, prefix) =>
          getKuljettajienJatkokoulutuslomake(
            "removal",
            data,
            isReadOnly,
            prefix
          )
      },
      peruskoulutus: {
        addition: (data, isReadOnly) =>
          getKuljettajienPeruskoulutuslomake("addition", data, isReadOnly),
        removal: (data, isReadOnly, prefix) =>
          getKuljettajienPeruskoulutuslomake(
            "removal",
            data,
            isReadOnly,
            prefix
          )
      }
    },
    tyovoimakoulutukset: {
      addition: (data, isReadOnly, locale) =>
        getTyovoimakoulutuslomake("addition", data, isReadOnly, locale),
      removal: (data, isReadOnly, locale, prefix) =>
        getTyovoimakoulutuslomake("removal", data, isReadOnly, locale, prefix)
    },
    valmentavat: {
      addition: (data, isReadOnly, prefix) =>
        getValmentavatKoulutuksetLomake("addition", data, isReadOnly, prefix),
      removal: (data, isReadOnly, prefix) =>
        getValmentavatKoulutuksetLomake("removal", data, isReadOnly, prefix)
    }
  },
  muutostarpeet: {
    checkboxes: (data, isReadOnly, locale) =>
      getCheckboxes(data.checkboxItems, locale, isReadOnly)
  },
  tutkinnot: {
    reasoning: (data, isReadOnly, locale, prefix) =>
      getTutkinnotLomake("reasoning", data, isReadOnly, locale, prefix)
  },
  taloudelliset: {
    yleisettiedot: (data, isReadOnly) =>
      getTaloudellisetlomake("yleisettiedot", data, isReadOnly)
  }
};

export function getLomake(
  action = "addition",
  data = {},
  isReadOnly,
  locale,
  _path = [],
  prefix
) {
  // This defines the language of the requested form.
  setLocale(locale);
  console.info(_path, action)
  const fn = path(concat(_path, [action]), lomakkeet);
  const lomake = fn ? fn(data, isReadOnly, locale, prefix) : [];

  return lomake;
}
