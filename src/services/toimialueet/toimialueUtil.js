import _ from "lodash";

import { parseLocalizedField } from "modules/helpers";
// import {
//   getKohdeByTunniste,
//   getMaaraystyyppiByTunniste
// } from "services/muutospyynnot/muutospyyntoUtil";
// import {
//   KOHTEET,
//   MAARAYSTYYPIT
// } from "../../scenes/Jarjestajat/Jarjestaja/modules/constants";
// import { MUUTOS_TYPES } from "../../scenes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto/modules/uusiHakemusFormConstants";

export function getToimialueByKoodiArvo(koodiarvo, maakunnat, kunnat) {
  if (!koodiarvo) {
    return undefined;
  }

  if (koodiarvo.length === 2) {
    // Kyseessä maakunta
    if (maakunnat && maakunnat.fetched) {
      return _.find(maakunnat.maakuntaList, maakunta => {
        return maakunta.koodiArvo === koodiarvo;
      });
    }
  } else if (koodiarvo.length === 3) {
    // Kyseessä kunta
    if (kunnat && kunnat.fetched) {
      return _.find(kunnat.kuntaList, kunta => {
        return kunta.koodiArvo === koodiarvo;
      });
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
    const { koodiArvo, metadata, tila } = kunta;

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
  const now = new Date();

  let list = [];

  _.forEach(toimialueet, toimialue => {
    const { koodiArvo, metadata, kunta, tila, voimassaLoppuPvm } = toimialue;

    if (tila === "HYVAKSYTTY" && koodiArvo !== "99") {
      if (!voimassaLoppuPvm || now < Date.parse(voimassaLoppuPvm)) {
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
  // const kohde = getKohdeByTunniste(KOHTEET.TOIMIALUE);
  // const maaraystyyppi = getMaaraystyyppiByTunniste(MAARAYSTYYPIT.VELVOITE);

  if (removals.length > 0) {
    removals.forEach(removal => {
      // const toimialue = getToimialueByKoodiArvo(removal);
      // fields.push({
      //   ...toimialue,
      //   type: MUUTOS_TYPES.REMOVAL,
      //   meta: { perusteluteksti: null },
      //   muutosperustelukoodiarvo: null,
      //   kohde,
      //   maaraystyyppi
      // });
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
          // fields.push({
          //   ...value,
          //   type: MUUTOS_TYPES.ADDITION,
          //   meta: { perusteluteksti: null },
          //   muutosperustelukoodiarvo: null,
          //   kohde,
          //   maaraystyyppi
          // });
        }
      } else {
        // Ei editvaluesia --> luodaan arvo
        // fields.push({
        //   ...value,
        //   type: MUUTOS_TYPES.ADDITION,
        //   meta: { perusteluteksti: null },
        //   muutosperustelukoodiarvo: null,
        //   kohde,
        //   maaraystyyppi
        // });
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
    const obj = _.find(values, val => {
      return val.koodiArvo === ival;
    });
    if (!obj) {
      removals.push(ival);
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
