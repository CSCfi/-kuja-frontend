import moment from "moment";
import * as R from "ramda";

const getMetadata = (anchorParts, categories, i = 0) => {
  const category = R.find(R.propEq("anchor", anchorParts[i]), categories);
  if (anchorParts[i + 1]) {
    return getMetadata(anchorParts, category.categories, i + 1);
  }
  return category.meta;
};

export function createObjectToSave(lupa, muutoshakemus) {

  const koulutusChanges = R.flatten(
    R.map(stateItem => {
      return R.map(changeObj => {
        let koulutus = {};
        const anchorParts = changeObj.anchor.split(".");
        const code = R.last(anchorParts);
        const meta = getMetadata(R.tail(anchorParts), stateItem.categories);
        const finnishInfo = R.find(R.propEq("kieli", "FI"), meta.metadata);
        if (stateItem.article) {
          if (stateItem.article.koulutusalat[anchorParts[1]]) {
            koulutus = R.find(
              R.propEq("koodi", code),
              stateItem.article.koulutusalat[anchorParts[1]].koulutukset
            ) || {};
          }
        }
        return {
          isInLupa: meta.isInLupa,
          kohde: koulutus.kohde || meta.kohde,
          koodiarvo: code,
          koodisto: meta.koodisto.koodistoUri,
          kuvaus: finnishInfo.kuvaus,
          maaraystyyppi: koulutus.maaraystyyppi || meta.maaraystyyppi,
          meta: {
            nimi: koulutus.nimi,
            koulutusala: anchorParts[0],
            koulutustyyppi: anchorParts[1],
            perusteluteksti: null,
            muutosperustelukoodiarvo: []
          },
          nimi: finnishInfo.nimi,
          tila: changeObj.properties.isChecked ? "LISAYS" : "POISTO",
          type: changeObj.properties.isChecked ? "addition" : "removal"
        };
      }, stateItem.changes);
    }, muutoshakemus.tutkinnot.state)
  )

  let opetuskieliChanges = {}
  if (muutoshakemus.opetuskielet.state.changes)
    opetuskieliChanges = R.map(stateItem => {
      console.log(stateItem)
      console.log(muutoshakemus.opetuskielet.state)
      const anchorParts = stateItem.anchor.split(".");
      const code = R.last(anchorParts);
      const meta = getMetadata(R.tail(anchorParts), muutoshakemus.opetuskielet.state[0].categories);
      console.log(meta)

      // getMetadata(R.tail(anchorParts), muutoshakemus.opetuskielet.categories);
      // const finnishInfo = R.find(R.propEq("kieli", "FI"), meta.metadata);
      // console.log(stateItem.article.opetuskielet[anchorParts[1]]);
      // if (stateItem.article) {
      //   if (stateItem.article.koulutusalat[anchorParts[1]]) {
      //     kieli = R.find(
      //       R.propEq("koodi", code),
      //       stateItem.article.opetuskielet[anchorParts[1]].kieli
      //     ) || {};
      //   }
      // }
      console.log(meta.kohde);
      return {
        koodiarvo: code,
        koodisto: "oppilaitoksenopetuskieli",
        nimi: meta.kuvaus,
        // nimi: finnishInfo.nimi,
        kuvaus: meta.kuvaus,
        isInLupa: meta.isInLupa,
        kohde: meta.kohde.kohdeArvot[0].kohde,
        // kohde:{ 
        //   tunniste:"opetusjatutkintokieli",
        //   meta:{ 
        //      otsikko:{ 
        //         fi:"Opetus- ja tutkintokieli",
        //         sv:"på svenska"
        //      }
        //   },
        //     uuid:"d6501496-17e0-11e9-98d4-02420a141704"
        //  },
        // koodisto: meta.koodisto.koodistoUri,
        // maaraystyyppi: meta.maaraystyyppi,
        maaraystyyppi: {
          tunniste: "VELVOITE",
          selite: {
            fi: "Velvoite"
          },
          uuid: "d64967d6-17e0-11e9-98d4-02420a141704"
        },
        type: stateItem.properties.isChecked ? "addition" : "removal",
        meta: {
          nimi: meta.kuvaus,
          koulutusala: anchorParts[0],
          koulutustyyppi: anchorParts[1],
          perusteluteksti: null,
          muutosperustelukoodiarvo: []
        },
        tila: stateItem.properties.isChecked ? "LISAYS" : "POISTO"
      };
    }, muutoshakemus.opetuskielet.state.changes)

  console.log(opetuskieliChanges);

  const allChanges = [
    koulutusChanges,
    opetuskieliChanges
  ]

  return {
    diaarinumero: lupa.data.diaarinumero,
    jarjestajaOid: lupa.data.jarjestajaOid,
    jarjestajaYtunnus: lupa.data.jarjestajaYtunnus,
    luoja: sessionStorage.getItem("username"),
    // luontipvm: moment().valueOf(),
    luontipvm: moment().format("YYYY-MM-DD"),
    lupaUuid: lupa.data.uuid,
    // uuid: lupa.data.asiatyyppi.uuid,
    tila: "LUONNOS",
    paivittaja: "string",
    paivityspvm: null,
    voimassaalkupvm: lupa.data.alkupvm,
    voimassaloppupvm: "2019-12-31", // TODO: find the correct value somehow
    meta: {
      meta: {},
      taloudelliset: {
        taloudelliset: []
      }
    },
    muutokset: R.flatten(allChanges),
    liitteet: []
  };
}

// "muutokset":[ 
//   { 
//      "koodiarvo":"5",
//      "koodisto":"oppilaitoksenopetuskieli",
//      "nimi":"saame",
//      "kuvaus":"saame",
//      "isInLupa":false,
//      "kohde":{ 
//         "tunniste":"opetusjatutkintokieli",
//         "meta":{ 
//            "otsikko":{ 
//               "fi":"Opetus- ja tutkintokieli",
//               "sv":"på svenska"
//            }
//         },
//         "uuid":"cc35fd12-43b6-11e8-b2ef-005056aa0e66"
//      },
//      "maaraystyyppi":{ 
//         "tunniste":"VELVOITE",
//         "selite":{ 
//            "fi":"Velvoite"
//         },
//         "uuid":"cc652722-43b6-11e8-b2ef-005056aa0e66"
//      },
//      "type":"addition",
//      "meta":{ 
//         "nimi":"saame",
//         "perusteluteksti":null,
//         "muutosperustelukoodiarvo":[ 

//         ]
//      },
//      "tila":"LISAYS"
//   }
// ]