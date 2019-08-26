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
  console.log(tutkintokieliData);
  const changes = R.map(stateItem => {
    const item = R.map(changeObj => {
      const anchorParts = changeObj.anchor.split(".");
      const code = R.last(anchorParts);
      // const meta = getMetadata(R.tail(anchorParts), tutkintokieliData.payload.state[0].categories[0]);
      return {
        koodiarvo: code,
        koodisto: "kieli",
        // nimi: meta.kuvaus,
        // kuvaus: meta.kuvaus,
        // isInLupa: meta.isInLupa,
        // kohde: meta.kohde.kohdeArvot[0].kohde,
        // maaraystyyppi: meta.maaraystyyppi,
        type: changeObj.properties.isChecked ? "addition" : "removal",
        meta: {
          koulutusala: anchorParts[0],
          koulutustyyppi: anchorParts[1],
          perusteluteksti: [],
          muutosperustelukoodiarvo: []
        },
        tila: changeObj.properties.isChecked ? "LISAYS" : "POISTO"
      };
    }, stateItem.changes);
    console.log(item);
    return item;
  }, tutkintokieliData.payload.changes);
  // );
  console.log(changes);

  return R.flatten(R.values(changes));
};

// 01:
//   changes: Array(1)
//   0:
//     anchor: "01.12.417101"
//     path: (5) [0, "categories", 0, "components", 0]
//     properties: {isChecked: false}
