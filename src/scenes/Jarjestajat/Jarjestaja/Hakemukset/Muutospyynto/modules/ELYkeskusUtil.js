import _ from "lodash";

function getELYkeskusEditIndex(muutokset, koodiarvo) {
  let i = undefined;

  _.forEach(muutokset, (muutos, idx) => {
    if (muutos.koodiarvo === koodiarvo) {
      i = idx;
    }
  });

  return i;
}

export function getELYkeskusByKoodiArvo(koodiarvo, ELYkeskukset) {
  if (ELYkeskukset && ELYkeskukset.fetched) {
    return _.find(ELYkeskukset.ELYkeskusList, ELYkeskus => {
      return ELYkeskus.koodiArvo === koodiarvo;
    });
  } else {
    return undefined;
  }
}
