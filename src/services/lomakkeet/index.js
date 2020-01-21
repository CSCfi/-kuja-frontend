import getTyovoimakoulutuslomake from "./perustelut/tyovoimakoulutus/";
import {
  getKuljettajienJatkokoulutuslomake,
  getKuljettajienPeruskoulutuslomake
} from "./perustelut/kuljettajakoulutukset";
import { concat, path } from "ramda";
import getATVKoulutuslomake from "./perustelut/atv-koulutukset";
import getValmentavatKoulutuksetLomake from "./perustelut/valmentavatKoulutukset";
import { setLocale } from "./i18n-config";

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

  const fn = path(concat(_path, [action]), lomakkeet);
  const lomake = fn ? fn(data, isReadOnly, locale, prefix) : [];
  return lomake;
}
