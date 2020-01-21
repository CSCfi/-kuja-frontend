import getTyovoimakoulutuslomake from "./perustelut/tyovoimakoulutus/";
import {
  getKuljettajienJatkokoulutuslomake,
  getKuljettajienPeruskoulutuslomake
} from "./perustelut/kuljettajakoulutukset";
import { concat, path } from "ramda";
import getATVKoulutuslomake from "./perustelut/atv-koulutukset";

const lomakkeet = {
  koulutukset: {
    "atv-koulutukset": {
      addition: (data, isReadOnly, locale, prefix) =>
        getATVKoulutuslomake("addition", data, isReadOnly, locale, prefix),
      removal: (data, isReadOnly, locale, prefix) =>
        getATVKoulutuslomake("removal", data, isReadOnly, locale, prefix)
    },
    kuljettajakoulutukset: {
      jatkokoulutus: {
        addition: (data, isReadOnly, locale) =>
          getKuljettajienJatkokoulutuslomake(
            "addition",
            data,
            isReadOnly,
            locale
          ),
        removal: (data, isReadOnly, locale, prefix) =>
          getKuljettajienJatkokoulutuslomake(
            "removal",
            data,
            isReadOnly,
            locale,
            prefix
          )
      },
      peruskoulutus: {
        addition: (data, isReadOnly, locale) =>
          getKuljettajienPeruskoulutuslomake(
            "addition",
            data,
            isReadOnly,
            locale
          ),
        removal: (data, isReadOnly, locale, prefix) =>
          getKuljettajienPeruskoulutuslomake(
            "removal",
            data,
            isReadOnly,
            locale,
            prefix
          )
      }
    },
    tyovoimakoulutukset: {
      addition: (data, isReadOnly, locale) =>
        getTyovoimakoulutuslomake("addition", data, isReadOnly, locale),
      removal: (data, isReadOnly, locale, prefix) =>
        getTyovoimakoulutuslomake("removal", data, isReadOnly, locale, prefix)
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
  const fn = path(concat(_path, [action]), lomakkeet);
  const lomake = fn ? fn(data, isReadOnly, locale, prefix) : [];
  return lomake;
}
