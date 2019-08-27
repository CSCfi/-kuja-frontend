import * as R from "ramda";
import { getMetadata } from "./tutkinnotUtils";

const getMuutos = (changeObj, stateItem) => {
  let koulutus = {};
  const anchorParts = changeObj.anchor.split(".");
  const code = R.last(anchorParts);
  const meta = getMetadata(R.slice(1, 3)(anchorParts), stateItem.categories);
  const finnishInfo = R.find(R.propEq("kieli", "FI"), meta.metadata);
  if (stateItem.article) {
    if (stateItem.article.koulutusalat[anchorParts[1]]) {
      koulutus =
        R.find(
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
      changeObj,
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
};

export default function getChangesOfTutkinnotJaKoulutukset(
  tutkinnot,
  ammatilliseentehtavaanvalmistavatkoulutukset,
  kuljettajakoulutukset,
  tyovoimakoulutukset,
  valmentavatKoulutukset
) {
  const tutkinnotMuutokset = R.flatten(
    R.map(stateItem => {
      return R.map(changeObj => {
        return getMuutos(changeObj, stateItem);
      }, stateItem.changes);
    }, tutkinnot.state.items)
  );

  const koulutusMuutokset = R.map(changeObj => {
    const anchorParts = changeObj.anchor.split(".");
    const code = R.last(anchorParts);
    let sourceObject = "";
    if (
      R.startsWith(
        "ammatilliseentehtavaanvalmistavatkoulutukset",
        changeObj.anchor
      )
    ) {
      sourceObject = ammatilliseentehtavaanvalmistavatkoulutukset;
    } else if (R.startsWith("kuljettajakoulutukset", changeObj.anchor)) {
      sourceObject = kuljettajakoulutukset;
    } else if (R.startsWith("tyovoimakoulutukset", changeObj.anchor)) {
      sourceObject = tyovoimakoulutukset;
    } else if (R.startsWith("valmentavatkoulutukset", changeObj.anchor)) {
      sourceObject = valmentavatKoulutukset;
    }
    const meta = getMetadata(
      R.slice(1, -1)(anchorParts),
      sourceObject.state.categories
    );
    const finnishInfo = R.find(R.propEq("kieli", "FI"), meta.metadata);
    return {
      isInLupa: meta.isInLupa,
      kohde: meta.kohde,
      koodiarvo: code,
      koodisto: meta.koodisto.koodistoUri,
      maaraystyyppi: meta.maaraystyyppi,
      meta: {
        changeObj,
        perusteluteksti: null,
        muutosperustelukoodiarvo: []
      },
      nimi: finnishInfo.nimi,
      tila: changeObj.properties.isChecked ? "LISAYS" : "POISTO",
      type: changeObj.properties.isChecked ? "addition" : "removal"
    };
  }, R.flatten([ammatilliseentehtavaanvalmistavatkoulutukset.state.changes, kuljettajakoulutukset.state.changes, tyovoimakoulutukset.state.changes, valmentavatKoulutukset.state.changes]));

  return R.flatten([tutkinnotMuutokset, koulutusMuutokset]);
}
