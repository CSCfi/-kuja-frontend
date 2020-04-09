import {
  GENERIC_LUPA_SECTIONS, VST_LUPA_STRUCTURE
} from "../scenes/VapaaSivistystyo/modules/constants";
import {resolveKoodiLocalization, resolveLocalizedOrganizerName} from "../modules/helpers";
import common from "../i18n/definitions/common";

/**
 * Return an object with lupamääräys data categorized into sections matching VST template in
 * kuja-template/lupahistoria/liikunnankoulutuskeskukset/paatos
 *
 * Depends on VST_LUPA_STRUCTURE to guide the order and logic of parsing määräys data and
 * producting formatted section data, based on kohde or koodisto identifier. Uses react-intl
 * utilities for primary localization and that based on koodisto data.
 *
 * @param {Object} lupa lupa with määräys and järjestäjä as given by backend
 * @param {Object} intl react-intl utility object
 * @returns {{heading: String, values: String[]}[]} sectionDataList
 */
export const parseVSTLupa = (lupa, intl) => {
  if(lupa) {
    const organizerSectionData = generateOrganizerSectionData(lupa, intl.locale);
    organizerSectionData.heading = intl.formatMessage(common.VSTLupaSectionTitleOrganizer)
    const sectionDataList = [
      organizerSectionData
    ];
    for (const metaDataObject of VST_LUPA_STRUCTURE) {
      let maaraykset = [];
      let generateSectionData = () => ({});
      if(metaDataObject.kohdeTunniste) {
        maaraykset = lupa.maaraykset.filter(maarays => maarays.kohde.tunniste === metaDataObject.kohdeTunniste);
        generateSectionData = getSectionDataGeneratorForVST(metaDataObject.kohdeTunniste);
      }
      else if(metaDataObject.koodisto) {
        generateSectionData = getSectionDataGeneratorForVST(metaDataObject.koodisto);
        maaraykset = lupa.maaraykset.filter(maarays => maarays.koodisto === metaDataObject.koodisto);
      }

      let sectionData = {};
      if(maaraykset.length > 0)  {
        sectionData = generateSectionData(maaraykset, intl.locale);
      }
      sectionData.heading = intl.formatMessage(metaDataObject.titleMessageKey);
      sectionDataList.push(sectionData)

    }
    return sectionDataList;
  }
};

const generateOrganizerSectionData = (lupa, locale) => {
  const kunta = resolveKoodiLocalization(lupa.jarjestaja.kuntaKoodi.metadata, locale)
  // Exception sourced from kuja-template/lupahistoria/liikunnankoulutuskeskukset/paatos/content_paatos_fi.html:35
  // TODO: localization of this exception case content
  const value = lupa.jarjestaja.oid === '1.2.246.562.10.13451568789' ?
    `${resolveLocalizedOrganizerName(lupa, locale)}, ${kunta} sekä Humppilan ja Ypäjän kunnat` :
    `${resolveLocalizedOrganizerName(lupa, locale)}, ${kunta}`;

  const retval = {
    values: [
      value
    ]
  };
  return retval;
};

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
    retval.values.push(resolveKoodiLocalization(maarays.koodi.metadata, locale))
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
  ];

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

const generateSopimuskunnatDataForVST = (maaraykset, locale) => {
  const targetMaaraykset = maaraykset.filter(item => !!item.meta.oppilaitosmaarays);
  const data = generateIteratedKoodiData(targetMaaraykset, locale, true);

  if(data.values.length > 1) {
    data.values = [data.values.join(', ')]
  }

  return data;
};

const generateOppilaitoksetDataForVST = (maaraykset, locale) => {
  let values = [];

  for(const maarays of maaraykset) {
    const schoolName = maarays.organisaatio.nimi[locale];
    const municipalities = [schoolName];
    municipalities.push(resolveKoodiLocalization(maarays.organisaatio.kuntaKoodi.metadata, locale));
    if (!!maarays.organisaatio.muutKuntaKoodit) {
      for (const other of maarays.organisaatio.muutKuntaKoodit) {
        municipalities.push(resolveKoodiLocalization(other.metadata, locale));
      }
    }
    values.push(municipalities.join(', '));
  }

    /*
    TODO: implementation of following special case, after CSCKUJA-379 has been fixed. Corresponding määräys does
          not arrive from backend at the moment

        <!-- !!Special case!! Because Nordiska Konstskolan som filial can not be found from organisaatiopalvelu -->
        {% if lupa.diaarinumero == "27/532/2011" and maarays.organisaatio is empty %}
            {{ maarays.meta | fieldvalue("oppilaitosmääräys-0") }}, Kokkola
        {% endif %}

     */

  return {values}
};

const generateRegionalDataForVST = (maaraykset, locale) => {
  if(!maaraykset || maaraykset.length === 0) {
    return {};
  }
  const maarays = maaraykset[0];

  let values = [];
  values.push(resolveKoodiLocalization(maarays.koodi.metadata, locale));
  if(maarays.koodi.koodiArvo === '2') {
    const school = maarays.meta["urn:oppilaitosmääräys-1"];
    const other = maarays.meta["urn:muumääräys-2"]
    if(school) values.push(school);
    if(other) values.push(other);
  }
  return {values};
};

const generateOtherDataForVST = (maaraykset, locale) => {
  let values = [];
  for(const maarays of maaraykset) {
    if(maarays.meta["urn:muumääräys-0"].length > 0)values.push(maarays.meta["urn:muumääräys-0"])
  }
  return {values};
};

const getSectionDataGeneratorForVST = (key) => {
  switch(key) {
    case 'kunnat':
      return generateSopimuskunnatDataForVST;
    case 'oppilaitos':
      return generateOppilaitoksetDataForVST
    case 'kielet':
      return generateIteratedKoodiData;
    case 'vstoppilaitoksenalueellisuusjavaltakunnallisuus':
      return generateRegionalDataForVST;
    case 'tarkoitus':
      return generateTarkoitusData;
    case 'koulutustehtava':
      return generateKoulutustehtavaData;
    case 'erityinenkoulutustehtava':
      return generateErityinenKoulutustehtavaData;
    case 'kujamuutoikeudetmaarayksetjarajoitukset':
      return generateOtherDataForVST;
    default:
      return () => ({});
  }
};

