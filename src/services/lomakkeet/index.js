import * as R from "ramda";
import getTyovoimakoulutuslomake from "./perustelut/tyovoimakoulutus";

const lomakkeet = {
  koulutukset: {
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
