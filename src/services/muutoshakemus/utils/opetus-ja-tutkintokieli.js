import * as R from "ramda";
import { getMetadata } from "./tutkinnotUtils";

export const getChangesOfOpetuskielet = opetuskieliData => {
  return R.flatten(
    R.map(changeObj => {
      const anchorParts = changeObj.anchor.split(".");
      const code = R.last(anchorParts);
      const opetuskieli = R.find(R.propEq("koodiArvo", code))(
        opetuskieliData.payload.opetuskielet
      );
      const meta = getMetadata(
        R.tail(anchorParts),
        opetuskieliData.payload.categories
      );
      return {
        koodiarvo: code,
        koodisto: opetuskieli.koodisto.koodistoUri,
        isInLupa: meta.isInLupa,
        kohde: meta.kohde.kohdeArvot[0].kohde,
        maaraystyyppi: meta.maaraystyyppi,
        type: changeObj.properties.isChecked ? "addition" : "removal",
        meta: {
          tunniste: "opetuskieli",
          changeObj
        },
        tila: changeObj.properties.isChecked ? "LISAYS" : "POISTO"
      };
    }, opetuskieliData.payload.changes)
  );
};

export const getChangesOfTutkintokielet = tutkintokieliData => {
  const changes = R.mapObjIndexed((changeObjects, areaCode) => {
    const item = R.map(changeObj => {
      const anchorParts = changeObj.anchor.split(".");
      const code = R.last(anchorParts);
      const item = R.find(R.propEq("areaCode", areaCode))(
        tutkintokieliData.payload.items
      );
      const meta =
        item && item.categories
          ? getMetadata(R.tail(anchorParts), item.categories)
          : {};
      return {
        koodiarvo: code,
        koodisto: tutkintokieliData.payload.koodistoUri,
        nimi: meta.nimi, // TODO: Tähän oikea arvo, jos tarvitaan, muuten poistetaan
        kuvaus: meta.kuvaus, // TODO: Tähän oikea arvo, jos tarvitaan, muuten poistetaan
        isInLupa: meta.isInLupa,
        kohde: meta.kohde,
        maaraystyyppi: meta.maaraystyyppi,
        meta: {
          tunniste: "tutkintokieli",
          changeObj
        },
        tila: "LISAYS",
        type: "addition"
      };
    }, changeObjects);
    return item;
  }, tutkintokieliData.payload.changes);
  return R.flatten(R.values(changes));
};
