import getTyovoimakoulutuslomake from "./perustelut/tyovoimakoulutus";
import {
  getKuljettajienJatkokoulutuslomake,
  getKuljettajienPeruskoulutuslomake
} from "./perustelut/kuljettajakoulutukset";
import { concat, path } from "ramda";
import { perustelut } from "./perustelut/kuljettajakoulutukset/peruskoulutus/backend-mapping";
import { getAnchorPart } from "../../utils/common";

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

export function fillForBackend(changeObjects) {
  if (changeObjects.length) {
    const head = getAnchorPart(changeObjects[0].anchor, 0);
    const koodiarvo = getAnchorPart(changeObjects[0].anchor, 1);
    const filled = perustelut[head] ? perustelut[head](changeObjects, koodiarvo) : null;
    console.info(head, koodiarvo, filled);
    return filled;
  }

  return null;
}
