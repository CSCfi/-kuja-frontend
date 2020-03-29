import {
  GENERIC_LUPA_SECTIONS, VST_LUPA_STRUCTURE
} from "../scenes/VapaaSivistystyo/modules/constants";
import { parseLocalizedField } from "../modules/helpers";

/**
 * Return an object with lupamääräys data categorized into sections matching VST template in
 * kuja-template/lupahistoria/liikunnankoulutuskeskukset/paatos
 * @param lupa
 * @returns {{}}
 */
export const parseVSTLupa = (lupa, locale) => {
  if(lupa) {
    const sectionDataList = [
      generateOrganizerSectionData(lupa, locale)
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
        sectionData = generateSectionData(maaraykset, locale);
      }
      sectionData.heading = metaDataObject.titleMessageKey;
      sectionDataList.push(sectionData)

    }
    return sectionDataList;
  };
}

const generateOrganizerSectionData = (lupa, locale) => {
  const kunta = parseLocalizedField(lupa.jarjestaja.kuntaKoodi.metadata, locale.toUpperCase())
  // Exception sourced from kuja-template/lupahistoria/liikunnankoulutuskeskukset/paatos/content_paatos_fi.html:35
  // TODO: localization of this exception case content
  const value = lupa.jarjestaja.oid === '1.2.246.562.10.13451568789' ?
    `${lupa.jarjestaja.nimi[locale]}, ${kunta} sekä Humppilan ja Ypäjän kunnat` :
    `${lupa.jarjestaja.nimi[locale]}, ${kunta}`;

  const retval = {
    heading: 'LOCALIZE ME: common.VSTLupaSectionTitleOrganizer',
    values: [
      value
    ]
  }
  return retval;
}

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

const generateSopimuskunnatDataForVST = (maaraykset, locale) => {
  const targetMaaraykset = maaraykset.filter(item => !!item.meta.oppilaitosmaarays);
  const data = generateIteratedKoodiData(targetMaaraykset, locale, true);

  if(data.values.length > 1) {
    data.values = [data.values.join(', ')]
  }

  return data;
};

const generateOppilaitoksetDataForVST = (maaraykset, locale) => {
  console.log(maaraykset)
  /*
    <!-- Oppilaitoksen nimi ja sijainti -->
    <div class="if">
        {% set aOppilaitoksenNimetjaSijainnit = lupa.maaraykset | filterMaarays(["kohde:oppilaitos"]) %}
        {% if aOppilaitoksenNimetjaSijainnit is notBlank %}
            <div class="otsikko">Oppilaitoksen nimi ja sijainti</div>
            <div class="sisalto sisennys">
                {% for maarays in aOppilaitoksenNimetjaSijainnit %}
                <div class="data">
                    {% set oppilaitos = maarays.organisaatio %}
                    {% set kuntaList = oppilaitos.allKuntaKoodis %}
                    {{ oppilaitos.nimi | translated }}{% if kuntaList is not empty %}, {% endif %}
                    {% for kuntaKoodi in kuntaList %}
                        {{ kuntaKoodi.nimi | translated | comma }}
                    {% endfor %}
                    <!-- !!Special case!! Because Nordiska Konstskolan som filial can not be found from organisaatiopalvelu -->
                    {% if lupa.diaarinumero == "27/532/2011" and maarays.organisaatio is empty %}
                        {{ maarays.meta | fieldvalue("oppilaitosmääräys-0") }}, Kokkola
                    {% endif %}
                </div>
                {% endfor %}
            </div>
        {% endif %}
    </div>
   */
  return {};
};

const generateRegionalDataForVST = (maaraykset, locale) => {
  /*
      <!-- Oppilaitoksen valtakunnallisuus tai alueellisuus/toiminta-alue -->
    <div class="if">
        {% set aOppilaitoksenToimintaalueet = lupa.maaraykset | filterMaarays(["koodisto:vstoppilaitoksenalueellisuusjavaltakunnallisuus"]) %}
        {% if aOppilaitoksenToimintaalueet is notBlank %}
            <div class="otsikko">Oppilaitoksen toiminta-alue</div>
            <div class="sisalto">
                {% for maarays in aOppilaitoksenToimintaalueet %}
                    {% set alueellisuus = maarays.koodi.nimi | translated %}
                    {% if alueellisuus is notBlank  %}
                        <div class="sisennys">
                            {{ alueellisuus }}
                        </div>
                        {% if maarays.koodi.koodiArvo == "2" %}
                        <div class="sisennys">{{ maarays.meta | fieldvalue("urn:oppilaitosmääräys-1") }}</div>
                        <div class="sisennys">{{ maarays.meta | fieldvalue("urn:muumääräys-2") }}</div>
                        {% endif %}
                    {% endif %}
                {% endfor %}
            </div>
        {% endif %}
    </div>
   */
  return {};
};

const generateOtherDataForVST = (maaraykset, locale) => {
  /*
      <!-- Muut koulutuksen järjestämiseen liittyvät ehdot -->
    <div class="if">
        {% set maaraykset = lupa.maaraykset | filterMaarays(["koodisto:kujamuutoikeudetmaarayksetjarajoitukset"]) %}
        {% if maaraykset is notBlank %}
        <div class="otsikko">Muut koulutuksen järjestämiseen liittyvät ehdot</div>
        <div class="sisalto">
            {% include fromDefault("maaraykset_metatiedot") with
                {
                    "maaraykset": maaraykset,
                    "avain": "urn:muumääräys"
                }
            %}
        </div>
        {% endif %}
    </div>
   */
  return {};
}

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
}

