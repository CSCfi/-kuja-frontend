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
export const parseLupa = (lupa) => {
  if (lupa) {
    let lupaObj = {};
    console.log(lupa)

    for (const key in LUPA_SECTIONS) {
      if (LUPA_SECTIONS.hasOwnProperty(key)) {
        const { tunniste } = LUPA_SECTIONS[key];
        const maarayksetByTunniste = lupa.maaraykset.filter(maarays => maarays.kohde.tunniste === tunniste);
        const sectionData = findSectionDataFromMaaraykset(
          tunniste,
          maarayksetByTunniste
        );

        if(sectionData) {
          lupaObj[key] = sectionData;
        }
      }
    }
    return lupaObj;
  }
};

const generateIteratedKoodiData = (maaraykset) => {
  const retval = {}
  retval.values = [];
  for (const maarays of maaraykset) {
    retval.heading = maarays.kohde.meta.otsikko.fi;
    retval.values.push(parseLocalizedField(maarays.koodi.metadata))
  }
  return retval;
};

const generateMetaAttributeBasedData = (maarays, attributes) => {
  const retval = {};
  retval.heading = maarays.kohde.meta.otsikko.fi;
  retval.values = [];
  for(const attribute of attributes) {
    if(maarays.meta[attribute] && maarays.meta[attribute].length > 0) retval.values.push(maarays.meta[attribute])
  }
  return retval
};

const generateKoulutustehtavaData = (maarays) => {

  const attributes = [
    "koulutustehtävämääräys-0",
    "koulutustehtävämääräys-1",
    "koulutustehtävämääräys-2"
  ];

  return generateMetaAttributeBasedData(maarays, attributes);
};

const generateErityinenKoulutustehtavaData = (maarays) => {

  const attributes = [
    "erityinenkoulutustehtävämääräys-0",
    "erityinenkoulutustehtävämääräys-1",
    "erityinenkoulutustehtävämääräys-2"
  ];

  return generateMetaAttributeBasedData(maarays, attributes);
};

const generateOppilaitoksetData = (maarays) => {

  const attributes = [
    "oppilaitosmääräys-0",
    "oppilaitosmääräys-1",
    "oppilaitosmääräys-2"
  ];

  return generateMetaAttributeBasedData(maarays, attributes);
};

const generateMuutData = (maarays) => {

  const attributes = [
    "urn:muumääräys-1",
    "urn:muumääräys-2",
    "urn:oppilaitosmääräys-1"
  ];

  return generateMetaAttributeBasedData(maarays, attributes)
}

const generateTarkoitusData = (maarays) => {

  const attributes = [
    "oppilaitoksentarkoitus-0"
  ]

  return generateMetaAttributeBasedData(maarays, attributes);
}


/**
 * return an object with heading and values associated with the given tunniste in lupamääräykset
 * @param tunniste
 * @param maaraykset
 * @returns {{}}
 */
const findSectionDataFromMaaraykset = (
  tunniste,
  maaraykset
) => {
  if(maaraykset.length === 0) {
    return null;
  }

  if (tunniste === KOHTEET.KUNNAT || tunniste === KOHTEET.KIELET) {
    return generateIteratedKoodiData(maaraykset);
  }
  else if (tunniste === KOHTEET.TARKOITUS) {
    const maarays = maaraykset.find(item => item.kohde.tunniste === KOHTEET.TARKOITUS);
    console.log(maarays)
    return generateTarkoitusData(maarays);
  }
  else if (tunniste === KOHTEET.KOULUTUSTEHTAVA) {
    const maarays = maaraykset.find(item => item.kohde.tunniste === KOHTEET.KOULUTUSTEHTAVA);
    return generateKoulutustehtavaData(maarays);
  }
  else if (tunniste === KOHTEET.ERITYINENKOULUTUSTEHTAVA) {
    const maarays = maaraykset.find(item => item.kohde.tunniste === KOHTEET.ERITYINENKOULUTUSTEHTAVA);
    return generateErityinenKoulutustehtavaData(maarays);
  }
  else if (tunniste === KOHTEET.OPPILAITOKSET) {
    const maarays = maaraykset.find(item => item.kohde.tunniste === KOHTEET.OPPILAITOKSET);
    return generateOppilaitoksetData(maarays);
  }
  else if (tunniste === KOHTEET.OPISKELIJAMAARA) {
    //TODO: data source is ambiguous and doesn't appear needed for VST
  }
  else if (tunniste === KOHTEET.MUUT) {
    const maarays = maaraykset.find(item => item.kohde.tunniste === KOHTEET.MUUT);
    return generateMuutData(maarays);
  }
  else {
    return {};
  }
};

