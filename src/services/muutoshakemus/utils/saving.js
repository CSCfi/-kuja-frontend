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
  console.info(lupa);
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
    muutokset: R.flatten(
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
              );
            }
          }
          console.info(stateItem, koulutus);
          return {
            isInLupa: meta.isInLupa,
            kohde: koulutus.kohde,
            koodiarvo: code,
            koodisto: meta.koodisto.koodistoUri,
            kuvaus: finnishInfo.kuvaus,
            maaraystyyppi: koulutus.maaraystyyppi,
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
    ),
    liitteet: []
  };
}
