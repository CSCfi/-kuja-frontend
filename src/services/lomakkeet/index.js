import getTyovoimakoulutusperustelulomake from "./perustelut/tyovoimakoulutus/";
import {
  getKuljettajienJatkokoulutuslomake,
  getKuljettajienPeruskoulutuslomake
} from "./perustelut/kuljettajakoulutukset";
import { getTaloudellisetlomake } from "./taloudelliset";
import { concat, path } from "ramda";
import getATVKoulutuksetPerustelulomake from "./perustelut/atv-koulutukset";
import getValmentavatKoulutuksetPerustelulomake from "./perustelut/valmentavatKoulutukset";
import { setLocale } from "./i18n-config";
import { getCheckboxes } from "./perustelut/muutostarpeet";
import getToimintaaluePerustelulomake from "./perustelut/toiminta-alue";
import getOpetuskieletPerustelulomake from "./perustelut/opetuskielet";
import getKuljettajakoulutuslomake from "./koulutukset/kuljettajakoulutukset";
import getTyovoimakoulutuslomake from "./koulutukset/tyovoimakoulutukset";
import getATVKoulutuksetLomake from "./koulutukset/atvKoulutukset";
import getValmentavatKoulutuksetLomake from "./koulutukset/valmentavatKoulutukset";
import getTutkinnotPerustelulomake from "./perustelut/tutkinnot/";
import getTutkinnotLomake from "./tutkinnot";
import getOpetuskieletLomake from "./kielet/opetuskielet";
import getTutkintokieletLomake from "./kielet/tutkintokielet";
import getToimintaaluelomake from "./toimintaalue";
import getMuutLomake from "./muut";
import getOpiskelijavuodetLomake from "./opiskelijavuodet";

/**
 * LOMAKEPALVELU - Provider of forms.
 *
 * One big form / wizard is divided into multiple smaller forms. A form is an
 * array of objects. A form includes components (e.g. radio buttons, checkboxes,
 * inputs) and the structure of a form can be nested.
 *
 * E.g.
    [
      {
        anchor: "level0category0",
        categories: [{}, {}, { anchor: "level1category2", components: [] }]
      }
    ];
* 
*/

const lomakkeet = {
  // Wizard page 1 forms
  tutkinnot: {
    modification: (data, isReadOnly, locale) =>
      getTutkinnotLomake("modification", data, isReadOnly, locale)
  },
  koulutukset: {
    atvKoulutukset: {
      // atv = ammatilliseen tehtävään valmistavat
      modification: (data, isReadOnly) =>
        getATVKoulutuksetLomake("modification", data, isReadOnly)
    },
    kuljettajakoulutukset: {
      modification: (data, isReadOnly) =>
        getKuljettajakoulutuslomake("modification", data, isReadOnly)
    },
    tyovoimakoulutukset: {
      modification: (data, isReadOnly) =>
        getTyovoimakoulutuslomake("modification", data, isReadOnly)
    },
    valmentavatKoulutukset: {
      modification: (data, isReadOnly) =>
        getValmentavatKoulutuksetLomake("modification", data, isReadOnly)
    }
  },
  kielet: {
    opetuskielet: {
      modification: (data, isReadOnly) =>
        getOpetuskieletLomake("modification", data, isReadOnly)
    },
    tutkintokielet: {
      modification: (data, isReadOnly, locale) =>
        getTutkintokieletLomake("modification", data, isReadOnly, locale)
    }
  },
  toimintaalue: {
    modification: (data, isReadOnly, locale) =>
      getToimintaaluelomake("modification", data, isReadOnly, locale)
  },
  opiskelijavuodet: {
    modification: (data, isReadOnly, locale) =>
      getOpiskelijavuodetLomake("modification", data, isReadOnly, locale)
  },
  muut: {
    modification: (data, isReadOnly, locale) =>
      getMuutLomake("modification", data, isReadOnly, locale)
  },

  // Wizard page 2 forms
  perustelut: {
    kielet: {
      opetuskielet: {
        reasoning: (data, isReadOnly) =>
          getOpetuskieletPerustelulomake("reasoning", data, isReadOnly)
      }
    },
    koulutukset: {
      atvKoulutukset: {
        addition: (data, isReadOnly, locale, prefix) =>
          getATVKoulutuksetPerustelulomake(
            "addition",
            data,
            isReadOnly,
            locale,
            prefix
          ),
        removal: (data, isReadOnly, locale, prefix) =>
          getATVKoulutuksetPerustelulomake(
            "removal",
            data,
            isReadOnly,
            locale,
            prefix
          )
      },
      kuljettajakoulutukset: {
        jatkokoulutus: {
          addition: (data, isReadOnly) =>
            getKuljettajienJatkokoulutuslomake("addition", data, isReadOnly),
          removal: (data, isReadOnly, locale, prefix) =>
            getKuljettajienJatkokoulutuslomake(
              "removal",
              data,
              isReadOnly,
              prefix
            )
        },
        peruskoulutus: {
          addition: (data, isReadOnly) =>
            getKuljettajienPeruskoulutuslomake("addition", data, isReadOnly),
          removal: (data, isReadOnly, locale, prefix) =>
            getKuljettajienPeruskoulutuslomake(
              "removal",
              data,
              isReadOnly,
              prefix
            )
        }
      },
      tyovoimakoulutukset: {
        addition: (data, isReadOnly, locale) =>
          getTyovoimakoulutusperustelulomake(
            "addition",
            data,
            isReadOnly,
            locale
          ),
        removal: (data, isReadOnly, locale, prefix) =>
          getTyovoimakoulutusperustelulomake(
            "removal",
            data,
            isReadOnly,
            locale,
            prefix
          )
      },
      valmentavat: {
        addition: (data, isReadOnly, locale, prefix) =>
          getValmentavatKoulutuksetPerustelulomake(
            "addition",
            data,
            isReadOnly,
            prefix
          ),
        removal: (data, isReadOnly, locale, prefix) =>
          getValmentavatKoulutuksetPerustelulomake(
            "removal",
            data,
            isReadOnly,
            prefix
          )
      }
    },
    muutostarpeet: {
      checkboxes: (data, isReadOnly, locale) =>
        getCheckboxes(data.checkboxItems, locale, isReadOnly)
    },
    "toiminta-alue": {
      reasoning: (data, isReadOnly, locale, prefix) =>
        getToimintaaluePerustelulomake(
          "reasoning",
          data,
          isReadOnly,
          locale,
          prefix
        )
    },
    tutkinnot: {
      reasoning: (data, isReadOnly, locale, prefix) =>
        getTutkinnotPerustelulomake(
          "reasoning",
          data,
          isReadOnly,
          locale,
          prefix
        )
    }
  },
  taloudelliset: {
    yleisettiedot: (data, isReadOnly) =>
      getTaloudellisetlomake("yleisettiedot", data, isReadOnly),
    investoinnit: (data, isReadOnly) =>
      getTaloudellisetlomake("investoinnit", data, isReadOnly),
    tilinpaatostiedot: (data, isReadOnly) =>
      getTaloudellisetlomake("tilinpaatostiedot", data, isReadOnly)
  }
};

export function getLomake(
  action = "addition",
  data = {},
  isReadOnly,
  locale,
  _path = [],
  prefix
) {
  // This defines the language of the requested form.
  setLocale(locale);
  const fn = path(concat(_path, [action]), lomakkeet);
  const lomake = fn ? fn(data, isReadOnly, locale, prefix) : [];
  return lomake;
}
