import * as R from "ramda";
import { getMetadata } from "./tutkinnotUtils";

export const getChangesOfOpetuskielet = opetuskieliData => {
  if (
    opetuskieliData &&
    opetuskieliData.state &&
    opetuskieliData.state.changes
  ) {
    return R.flatten(
      R.map(changeObj => {
        const anchorParts = changeObj.anchor.split(".");
        const code = R.last(anchorParts);
        const meta = getMetadata(
          R.view(R.lensIndex(1))(anchorParts),
          opetuskieliData.state.items[0].categories
        );
        return {
          koodiarvo: code,
          koodisto: "oppilaitoksenopetuskieli",
          nimi: meta.kuvaus,
          kuvaus: meta.kuvaus,
          isInLupa: meta.isInLupa,
          kohde: meta.kohde.kohdeArvot[0].kohde,
          maaraystyyppi: meta.maaraystyyppi,
          type: changeObj.properties.isChecked ? "addition" : "removal",
          meta: {
            changeObj,
            nimi: meta.kuvaus,
            koulutusala: anchorParts[0],
            koulutustyyppi: anchorParts[1],
            perusteluteksti: [],
            muutosperustelukoodiarvo: []
          },
          tila: changeObj.properties.isChecked ? "LISAYS" : "POISTO"
        };
      }, opetuskieliData.state.changes)
    );
  } else return [];
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
