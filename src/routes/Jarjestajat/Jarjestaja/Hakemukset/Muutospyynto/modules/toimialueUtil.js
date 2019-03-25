import _ from "lodash";

import store from "../../../../../../store";
import { parseLocalizedField } from "../../../../../../modules/helpers";
import {
  getKohdeByTunniste,
  getMaaraystyyppiByTunniste
} from "./muutospyyntoUtil";
import { KOHTEET, MAARAYSTYYPIT } from "../../../modules/constants";
import { MUUTOS_TYPES } from "./uusiHakemusFormConstants";

export function getToimialueByKoodiArvo(koodiarvo) {
  if (!koodiarvo) {
    return undefined;
  }

  const state = store.getState();

  if (koodiarvo.length === 2) {
    // Kyseessä maakunta
    if (state.maakuntakunnat && state.maakuntakunnat.fetched) {
      const { maakuntakunnatList } = state.maakuntakunnat;
      return _.find(maakuntakunnatList, maakunta => {
        return maakunta.koodiArvo === koodiarvo;
      });
    }
  } else if (koodiarvo.length === 3) {
    // Kyseessä kunta
    if (state.maakuntakunnat && state.maakuntakunnat.fetched) {
      const { maakuntakunnatList } = state.maakuntakunnat;   
      return _(maakuntakunnatList)
        .map('kunta')
        .flatten()
        .find(kunta => {return kunta.koodiArvo === koodiarvo})
    }
  } else {
    return undefined;
  }
}

export function getToimialueList(toimialueet, locale, tyyppi) {
  let array = [];

  toimialueet.forEach(toimialue => {
    const { koodiArvo, metadata } = toimialue;
    array.push({
      ...toimialue,
      label: parseLocalizedField(metadata, locale),
      value: koodiArvo,
      tyyppi
    });
  });

  return array;
}

function getKuntaList(kunnat, locale) {
  let list = [];

  _.forEach(kunnat, kunta => {
    const { koodiArvo, metadata, tila, voimassaLoppuPvm } = kunta;

    if (tila === "HYVAKSYTTY" && koodiArvo !== "999") {
      list.push({
        ...kunta,
        label: parseLocalizedField(metadata, locale),
        value: koodiArvo,
        tyyppi: "kunta",
        koodisto: "kunta",
        koodiarvo: koodiArvo
      });
    }
  });

  return list;
}

export function getMaakuntakunnatList(toimialueet, locale) {
  let list = [];

  _.forEach(toimialueet, toimialue => {
    const { koodiArvo, metadata, kunta, tila, voimassaLoppuPvm } = toimialue;

    if (tila === "HYVAKSYTTY" && koodiArvo !== "99") {
      let curMaakunta = {
        ...toimialue,
        label: parseLocalizedField(metadata, locale),
        value: koodiArvo,
        tyyppi: "maakunta",
        koodisto: "maakunta",
        koodiarvo: koodiArvo
      };
      curMaakunta.kunta = getKuntaList(kunta, locale);
      list.push(curMaakunta);
    }
  });

  list = _.sortBy(list, maakunta => {
    maakunta.kunta = _.sortBy(maakunta.kunta, kunta => {
      return kunta.label;
    });

    return maakunta.label;
  });

  return list;
}

export function handleToimialueSelectChange(
  editValues,
  fields,
  initialValues,
  values
) {
  if (!hasToimialueChanged(initialValues, values)) {
    return;
  }

  // käsitellään poistot
  const removals = getToimialueRemovals(initialValues, values);
  const kohde = getKohdeByTunniste(KOHTEET.TOIMIALUE);
  const maaraystyyppi = getMaaraystyyppiByTunniste(MAARAYSTYYPIT.VELVOITE);

  if (removals.length > 0) {
    removals.forEach(removal => {
      const toimialue = getToimialueByKoodiArvo(removal);
      fields.push({
        ...toimialue,
        type: MUUTOS_TYPES.REMOVAL,
        meta: { perusteluteksti: null },
        muutosperustelukoodiarvo: null,
        kohde,
        maaraystyyppi
      });
    });
  }

  // käsitellään lisäykset
  values.forEach(value => {
    // Tarkastetaan onko arvo initial valuesissa
    const { koodiArvo } = value;
    if (!_.includes(initialValues, koodiArvo)) {
      // Tarkastetaan onko value editvaluesissa
      if (editValues) {
        const obj = _.find(editValues, editValue => {
          return editValue.koodiArvo === koodiArvo;
        });

        if (!obj) {
          // Arvoa ei löytynyt editvaluesista --> lisatään se
          fields.push({
            ...value,
            type: MUUTOS_TYPES.ADDITION,
            meta: { perusteluteksti: null },
            muutosperustelukoodiarvo: null,
            kohde,
            maaraystyyppi
          });
        }
      } else {
        // Ei editvaluesia --> luodaan arvo
        fields.push({
          ...value,
          type: MUUTOS_TYPES.ADDITION,
          meta: { perusteluteksti: null },
          muutosperustelukoodiarvo: null,
          kohde,
          maaraystyyppi
        });
      }
    }
  });

  // Käydään läpi editvaluesit ja poistetaan sieltä alkiot, jotka eivät ole enää valuesissa
  if (editValues) {
    editValues.forEach(editValue => {
      const { koodiArvo } = editValue;
      const obj = _.find(values, value => {
        return value.koodiArvo === koodiArvo;
      });

      if (!obj) {
        // editvaluea ei löytynyt valuesista --> poistetaan se
        const i = getIndex(editValues, koodiArvo);
        if (i !== undefined) {
          fields.remove(i);
        }
      }
    });
  }
}

function hasToimialueChanged(initialValues, values) {
  if (initialValues.length !== values.length) {
    return true;
  }

  let hasChanged = false;

  values.forEach(val => {
    const isInInitialValues = _.includes(initialValues, val.koodiArvo);
    if (!isInInitialValues) {
      hasChanged = true;
    }
  });

  return hasChanged;
}

function getToimialueRemovals(initialValues, values) {
  let removals = [];
  initialValues.forEach(ival => {
    if (!onVoimassa(getToimialueByKoodiArvo(ival))) {
      return false;
    }
    else {
      const obj = _.find(values, val => {
        return val.koodiArvo === ival;
      });
      if (!obj) {
        removals.push(ival);
      }  
    }
  });
  return removals;
}

function getIndex(editValues, koodiarvo) {
  let i = undefined;

  _.forEach(editValues, (value, idx) => {
    if (value.koodiArvo === koodiarvo) {
      i = idx;
    }
  });

  return i;
}

export function onVoimassa(n) {
  const now = new Date();
  return !n.voimassaLoppuPvm || n.voimassaLoppuPvm >= now;
}
