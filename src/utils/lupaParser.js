import {
  GENERIC_LUPA_KOHTEET,
  GENERIC_LUPA_SECTIONS
} from "../scenes/VapaaSivistystyo/modules/constants";
import { parseLocalizedField } from "../modules/helpers";

/**
 * Return an object with lupamääräys data categorized into sections matching generic Kuja template in
 * kuja-template/default/paatos
 * @param lupa
 * @returns {{}}
 */
export const parseGenericKujaLupa = (lupa, locale) => {
  if (lupa) {
    let lupaObj = {};
    console.log(lupa)

    for (const key in GENERIC_LUPA_SECTIONS) {
      if (GENERIC_LUPA_SECTIONS.hasOwnProperty(key)) {
        const { tunniste } = GENERIC_LUPA_SECTIONS[key];
        const maarayksetByTunniste = lupa.maaraykset.filter(maarays => maarays.kohde.tunniste === tunniste);
        const sectionData = findGenericLupaSectionDataFromMaaraykset(
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
    retval.values.sort();
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
  retval.values.sort();
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
const findGenericLupaSectionDataFromMaaraykset = (
  tunniste,
  maaraykset,
  locale
) => {
  if(maaraykset.length === 0) {
    return null;
  }

  if (tunniste === GENERIC_LUPA_KOHTEET.KUNNAT || tunniste === GENERIC_LUPA_KOHTEET.KIELET) {
    return generateIteratedKoodiData(maaraykset, locale);
  }
  else if (tunniste === GENERIC_LUPA_KOHTEET.TARKOITUS) {
    const maarays = maaraykset.find(item => item.kohde.tunniste === GENERIC_LUPA_KOHTEET.TARKOITUS);
    return generateTarkoitusData(maarays, locale);
  }
  else if (tunniste === GENERIC_LUPA_KOHTEET.KOULUTUSTEHTAVA) {
    const maarays = maaraykset.find(item => item.kohde.tunniste === GENERIC_LUPA_KOHTEET.KOULUTUSTEHTAVA);
    return generateKoulutustehtavaData(maarays, locale);
  }
  else if (tunniste === GENERIC_LUPA_KOHTEET.ERITYINENKOULUTUSTEHTAVA) {
    const maarays = maaraykset.find(item => item.kohde.tunniste === GENERIC_LUPA_KOHTEET.ERITYINENKOULUTUSTEHTAVA);
    return generateErityinenKoulutustehtavaData(maarays, locale);
  }
  else if (tunniste === GENERIC_LUPA_KOHTEET.OPPILAITOKSET) {
    const maarays = maaraykset.find(item => item.kohde.tunniste === GENERIC_LUPA_KOHTEET.OPPILAITOKSET);
    return generateOppilaitoksetData(maarays, locale);
  }
  else if (tunniste === GENERIC_LUPA_KOHTEET.OPISKELIJAMAARA) {
    //TODO: data source is ambiguous and doesn't appear needed for VST
  }
  else if (tunniste === GENERIC_LUPA_KOHTEET.MUUT) {
    const maarays = maaraykset.find(item => item.kohde.tunniste === GENERIC_LUPA_KOHTEET.MUUT);
    return generateMuutData(maarays, locale);
  }
  else {
    return {};
  }
};

