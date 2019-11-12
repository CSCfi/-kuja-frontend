import * as R from "ramda";
import getTyovoimakoulutuslomake from "./perustelut/tyovoimakoulutus";
import getKuljettajienJatkokoulutuslomake from "./perustelut/kuljettajakoulutukset";

const lomakkeet = {
  koulutukset: {
    kuljettajakoulutukset: {
      jatkokoulutus: {
        addition: (data, isReadOnly, locale) =>
          getKuljettajienJatkokoulutuslomake(
            "addition",
            data,
            isReadOnly,
            locale
          ),
        removal: (data, isReadOnly, locale) =>
          getTyovoimakoulutuslomake("removal", data, isReadOnly, locale)
      },
      perustasonAmmattipatevyysJaJatkokoulutus: {
        addition: (data, isReadOnly, locale) =>
          getTyovoimakoulutuslomake("addition", data, isReadOnly, locale),
        removal: (data, isReadOnly, locale) =>
          getTyovoimakoulutuslomake("removal", data, isReadOnly, locale)
      }
    },
    tyovoimakoulutukset: {
      addition: (data, isReadOnly, locale) =>
        getTyovoimakoulutuslomake("addition", data, isReadOnly, locale),
      removal: (data, isReadOnly, locale) =>
        getTyovoimakoulutuslomake("removal", data, isReadOnly, locale)
    }
  }
};

export function getLomake(
  action = "addition",
  data = {},
  isReadOnly,
  locale,
  path = []
) {
  const fn = R.path(R.concat(path, [action]), lomakkeet);
  const lomake = fn ? fn(data, isReadOnly, locale) : [];
  console.info(lomake);
  return lomake;
}
