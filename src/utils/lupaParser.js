import {
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
    let sectionDataList = [];

    for (const sectionKey of GENERIC_LUPA_SECTIONS) {
      const maarayksetByTunniste = lupa.maaraykset
        .filter(maarays => maarays.kohde.tunniste === sectionKey);
      let sectionData = {};

      if(maarayksetByTunniste.length > 0) {
        const generateSectionData = getSectionDataGeneratorForGeneric(sectionKey);
        sectionData = generateSectionData(
          maarayksetByTunniste,
          locale
        );
      }

      sectionDataList.push(sectionData);
    }
    return sectionDataList;
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

const generateMetaAttributeBasedData = (maaraykset, attributes, locale) => {
  const retval = {};
  const maarays = maaraykset.length > 0 ? maaraykset[0] : null;
  if(!maarays) {
    return retval;
  }

  retval.heading = maarays.kohde.meta.otsikko[locale];
  retval.values = [];
  for(const attribute of attributes) {
    if(maarays.meta[attribute] && maarays.meta[attribute].length > 0) retval.values.push(maarays.meta[attribute])
  }
  retval.values.sort();
  return retval;
};

const generateKoulutustehtavaData = (maaraykset, locale) => {

  const attributes = [
    "koulutustehtävämääräys-0",
    "koulutustehtävämääräys-1",
    "koulutustehtävämääräys-2"
  ];

  return generateMetaAttributeBasedData(maaraykset, attributes, locale);
};

const generateErityinenKoulutustehtavaData = (maaraykset, locale) => {

  const attributes = [
    "erityinenkoulutustehtävämääräys-0",
    "erityinenkoulutustehtävämääräys-1",
    "erityinenkoulutustehtävämääräys-2"
  ];

  return generateMetaAttributeBasedData(maaraykset, attributes, locale);
};

const generateOppilaitoksetData = (maaraykset, locale) => {

  const attributes = [
    "oppilaitosmääräys-0",
    "oppilaitosmääräys-1",
    "oppilaitosmääräys-2"
  ];

  return generateMetaAttributeBasedData(maaraykset, attributes, locale);
};

const generateMuutData = (maaraykset, locale) => {

  const attributes = [
    "urn:muumääräys-1",
    "urn:muumääräys-2",
    "urn:oppilaitosmääräys-1"
  ];

  return generateMetaAttributeBasedData(maaraykset, attributes, locale)
};

const generateTarkoitusData = (maaraykset, locale) => {

  const attributes = [
    "oppilaitoksentarkoitus-0"
  ]

  return generateMetaAttributeBasedData(maaraykset, attributes, locale);
};

const getSectionDataGeneratorForGeneric = (tunniste) => {
  switch(tunniste) {
    case 'kunnat':
      return generateIteratedKoodiData;
    case 'kielet':
      return generateIteratedKoodiData;
    case 'tarkoitus':
      return generateTarkoitusData;
    case 'koulutustehtava':
      return generateKoulutustehtavaData;
    case 'erityinenkoulutustehtava':
      return generateErityinenKoulutustehtavaData;
    case 'oppilaitos':
      return generateOppilaitoksetData;
    case 'opiskelijamaara':
      //TODO: data source is ambiguous and doesn't appear needed for VST
      return () => ({});
    case 'muut':
      return generateMuutData;
    default:
      return () => ({});
  }
};

