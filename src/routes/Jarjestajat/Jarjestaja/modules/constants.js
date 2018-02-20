export const LUPA_SECTIONS = {
  1: {
    heading: "Tutkinnot ja koulutukset"
  },
  2: {
    heading: "Opetus- ja tutkintokielet"
  },
  3: {
    heading: "Toiminta-alueet"
  },
  4: {
    heading: "Opiskelijavuodet"
  },
  5: {
    heading: "Muut oikeudet, velvollisuudet, ehdot ja tehtävät"
  }
}

export const KOHTEET = {
  TUTKINNOT: 1,
  KIELI: 2,
  TOIMIALUE: 3,
  OPISKELIJAVUODET: 4,
  MUUT: 5
}

export const KOODISTOT = {
  KOULUTUS: 'koulutus',
  OIVA_TYOVOIMAKOULUTUS: 'oivatyovoimakoulutus',
  TEHTAVAAN_VALMISTAVA_KOULUTUS: 'tehtavaanvalmistavakoulutus',
  AMMATILLISEEN_TEHTAVAAN_VALMISTAVA_KOULUTUS: 'ammatilliseentehtavaanvalmistavakoulutus',
  KULJETTAJAKOULUTUS: 'kuljettajakoulutus',
  OSAAMISALA: 'osaamisala'
}

export const LUPA_TEKSTIT = {
  TOIMINTA_ALUE : {
    VELVOLLISUUS_YKSIKKO: {
      FI: 'Koulutuksen järjestäjällä on velvollisuus järjestää tutkintoja ja koulutusta ensisijaisesti seuraavan maakunnan osaamis- ja koulutustarpeeseen'
    },
    VELVOLLISUUS_MONIKKO: {
      FI: 'Koulutuksen järjestäjällä on velvollisuus järjestää tutkintoja ja koulutusta ensisijaisesti seuraavien maakuntien osaamis- ja koulutustarpeisiin'
    }
  },
  KIELI: {
    VELVOLLISUUS_YKSIKKO: {
      FI: 'Koulutuksen järjestäjän on annettava opetusta seuraavalla opetuskielellä',
      SV: 'Utbildningsanordnaren ska meddela undervisningen på följande språk'
    },
    VELVOLLISUUS_MONIKKO: {
      FI: 'Koulutuksen järjestäjän on annettava opetusta seuraavialla opetuskielillä'
    },
    LISA_RUOTSI: {
      FI: 'Tutkintokieli on em. opetuskielen lisäksi ruotsi seuraavissa tutkinnoissa'
    }
  }
}

export const TUTKINTO_TEKSTIT = {
  valma: {
    selite: 'Koulutuksen järjestäjällä on oikeus järjestää seuraavaa valmentavaa koulutusta'
  },
  telma: {
    selite: 'Koulutuksen järjestäjällä on oikeus järjestää seuraavaa valmentavaa koulutusta'
  },
  tehtavaanvalmistavakoulutus: {
    selite: 'Koulutuksen järjestäjällä on oikeus järjestää seuraavaa ammatilliseen tehtävään valmistavaa koulutusta',
    1: {
      FI: 'Ansio- ja liikennelentäjä',
      SV: 'Förvärvs- och trafikflygare'
    },
    2: {
      FI: 'Lennonjohtaja',
      SV: 'Flygledare'
    },
    3: {
      FI: 'Kaupunkiraideliikenteen kuljettaja',
      SV: 'Förare i spårbunden stadstrafik'
    }
  },
  ammatilliseentehtavaanvalmistavakoulutus: {
    selite: 'Koulutuksen järjestäjällä on oikeus järjestää seuraavaa ammatilliseen tehtävään valmistavaa koulutusta',
    1: {
      FI: 'Ansio- ja liikennelentäjä',
      SV: 'Förvärvs- och trafikflygare'
    },
    2: {
      FI: 'Lennonjohtaja',
      SV: 'Flygledare'
    },
    3: {
      FI: 'Kaupunkiraideliikenteen kuljettaja',
      SV: 'Förare i spårbunden stadstrafik'
    }
  },
  kuljettajakoulutus: {
    selite: 'KULJETTAJAKOULUTUKSEN SELITE',
    1: {
      FI: 'Perustason ammattipätevyys',
      SV: 'På svenska'
    },
    2: {
      FI: 'Jatkokoulutus',
      SV: 'På svenska'
    }
  },
  oivatyovoimakoulutus: {
    selite: 'OIVATYOVOIMAKOULUTUS SELITE',
    1: {
      FI: 'Työvoimakoulutus',
      SV: 'På svenska'
    },
    2: {
      FI: 'Ei työvoimakoulutusta',
      SV: 'På svenska'
    },
    3: {
      FI: 'Vain työvoimakoulutus',
      SV: 'På svenska'
    }
  },
}
