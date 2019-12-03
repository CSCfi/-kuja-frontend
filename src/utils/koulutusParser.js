import _ from "lodash";

export const parseKoulutuksetAll = (
  koulutusdata = [],
  koulutusalat = [],
  koulutustyypit = []
) => {
  let koulutukset = {};
  let tyyppilista = {};
  koulutustyypit.forEach(tyyppi => {
    const { koodiArvo, metadata } = tyyppi;
    tyyppilista[koodiArvo] = { koodiArvo, metadata };
    tyyppilista[koodiArvo]["koulutukset"] = [];
  });

  koulutusalat.forEach(ala => {
    const { koodiArvo, metadata } = ala;
    const uusiTyyppi = _.cloneDeep(tyyppilista);

    if (koodiArvo !== "00" || koodiArvo !== "99") {
      koulutukset[koodiArvo] = { koodiArvo, metadata };
      koulutukset[koodiArvo]["koulutukset"] = uusiTyyppi;
    }
  });

  koulutusdata.forEach(koulutus => {
    const { koulutusalaKoodiArvo, koulutustyyppiKoodiArvo } = koulutus;

    if (
      koulutukset &&
      koulutusalaKoodiArvo in koulutukset &&
      koulutustyyppiKoodiArvo in koulutukset[koulutusalaKoodiArvo].koulutukset
    ) {
      koulutukset[koulutusalaKoodiArvo].koulutukset[
        koulutustyyppiKoodiArvo
      ].koulutukset.push(koulutus);
    }
  });

  _.forEach(koulutukset, koulutusala => {
    _.forEach(koulutusala.koulutukset, koulutustyyppi => {
      // poista tyhjät
      if (!koulutustyyppi.koulutukset.length) {
        delete koulutukset[koulutusala.koodiArvo].koulutukset[
          koulutustyyppi.koodiArvo
        ];
        return;
      }

      // poista duplikaatit
      koulutustyyppi.koulutukset = _.uniqBy(
        koulutustyyppi.koulutukset,
        "koodiArvo"
      );

      // aakkosta
      koulutustyyppi.koulutukset = _.sortBy(koulutustyyppi.koulutukset, [
        k => {
          let nimi = "";
          _.forEach(k.metadata, m => {
            if (m.kieli === "FI") {
              nimi = m.nimi;
            }
          });
          return nimi;
        }
      ]);
    });
  });
  return koulutukset;
};

export function parseMuut(muu) {
  if (!muu) {
    return null;
  }

  return _.sortBy(muu, ["koodiArvo"]);
}

export function parseKoulutusalat(koulutusalat) {
  if (!koulutusalat) {
    return null;
  }

  return _.filter(koulutusalat, ala => {
    return ala.koodiArvo !== "00" && ala.koodiArvo !== "99";
  });
}
