import {
  KOHTEET,
  LUPA_SECTIONS
} from "../scenes/VapaaSivistystyo/modules/constants";
import { parseLocalizedField } from "../modules/helpers";

/**
 * Return an object with lupamääräys data categorized into sections as required in Kuja
 * @param lupa
 * @returns {{}}
 */
export const parseLupa = (lupa, locale) => {
  if (lupa) {
    let lupaObj = {};
    console.log(lupa)

    for (const key in LUPA_SECTIONS) {
      if (LUPA_SECTIONS.hasOwnProperty(key)) {
        const { tunniste } = LUPA_SECTIONS[key];
        const maarayksetByTunniste = lupa.maaraykset.filter(maarays => maarays.kohde.tunniste === tunniste);
        const sectionData = findSectionDataFromMaaraykset(
          tunniste,
          maarayksetByTunniste,
          locale
        );

        if(sectionData) {
          lupaObj[key] = sectionData;
        }
      }
    }
    return lupaObj;
  }
};

const generateIteratedKoodiData = (maaraykset, locale) => {
  const retval = {}
  retval.values = [];
  for (const maarays of maaraykset) {
    retval.heading = maarays.kohde.meta.otsikko[locale];
    retval.values.push(parseLocalizedField(maarays.koodi.metadata, locale.toUpperCase()))
  }
  return retval;
};

const generateMetaAttributeBasedData = (maarays, attributes, locale) => {
  const retval = {};
  retval.heading = maarays.kohde.meta.otsikko[locale];
  retval.values = [];
  for(const attribute of attributes) {
    if(maarays.meta[attribute] && maarays.meta[attribute].length > 0) retval.values.push(maarays.meta[attribute])
  }
  return retval
};

const generateKoulutustehtavaData = (maarays, locale) => {

  const attributes = [
    "koulutustehtävämääräys-0",
    "koulutustehtävämääräys-1",
    "koulutustehtävämääräys-2"
  ];

  return generateMetaAttributeBasedData(maarays, attributes, locale);
};

const generateErityinenKoulutustehtavaData = (maarays, locale) => {

  const attributes = [
    "erityinenkoulutustehtävämääräys-0",
    "erityinenkoulutustehtävämääräys-1",
    "erityinenkoulutustehtävämääräys-2"
  ];

  return generateMetaAttributeBasedData(maarays, attributes, locale);
};

const generateOppilaitoksetData = (maarays, locale) => {

  const attributes = [
    "oppilaitosmääräys-0",
    "oppilaitosmääräys-1",
    "oppilaitosmääräys-2"
  ];

  return generateMetaAttributeBasedData(maarays, attributes, locale);
};

const generateMuutData = (maarays, locale) => {

  const attributes = [
    "urn:muumääräys-1",
    "urn:muumääräys-2",
    "urn:oppilaitosmääräys-1"
  ];

  return generateMetaAttributeBasedData(maarays, attributes, locale)
}

const generateTarkoitusData = (maarays, locale) => {

  const attributes = [
    "oppilaitoksentarkoitus-0"
  ]

  return generateMetaAttributeBasedData(maarays, attributes, locale);
}


/**
 * return an object with heading and values associated with the given tunniste in lupamääräykset
 * @param tunniste
 * @param maaraykset
 * @returns {{}}
 */
const findSectionDataFromMaaraykset = (
  tunniste,
  maaraykset,
  locale
) => {
  if(maaraykset.length === 0) {
    return null;
  }

  if (tunniste === KOHTEET.KUNNAT || tunniste === KOHTEET.KIELET) {
    return generateIteratedKoodiData(maaraykset, locale);
  }
  else if (tunniste === KOHTEET.TARKOITUS) {
    const maarays = maaraykset.find(item => item.kohde.tunniste === KOHTEET.TARKOITUS);
    console.log(maarays)
    return generateTarkoitusData(maarays, locale);
  }
  else if (tunniste === KOHTEET.KOULUTUSTEHTAVA) {
    const maarays = maaraykset.find(item => item.kohde.tunniste === KOHTEET.KOULUTUSTEHTAVA);
    return generateKoulutustehtavaData(maarays, locale);
  }
  else if (tunniste === KOHTEET.ERITYINENKOULUTUSTEHTAVA) {
    const maarays = maaraykset.find(item => item.kohde.tunniste === KOHTEET.ERITYINENKOULUTUSTEHTAVA);
    return generateErityinenKoulutustehtavaData(maarays, locale);
  }
  else if (tunniste === KOHTEET.OPPILAITOKSET) {
    const maarays = maaraykset.find(item => item.kohde.tunniste === KOHTEET.OPPILAITOKSET);
    return generateOppilaitoksetData(maarays, locale);
  }
  else if (tunniste === KOHTEET.OPISKELIJAMAARA) {
    //TODO: data source is ambiguous and doesn't appear needed for VST
  }
  else if (tunniste === KOHTEET.MUUT) {
    const maarays = maaraykset.find(item => item.kohde.tunniste === KOHTEET.MUUT);
    return generateMuutData(maarays, locale);
  }
  else {
    return {};
  }
};

