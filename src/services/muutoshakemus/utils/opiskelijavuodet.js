import * as R from "ramda";

export default function getChangesOfOpiskelijavuodet(opiskelijavuodetData) {
  const changes = R.map(changeObj => {
    const anchorArr = R.split(".", changeObj.anchor);
    return {
      kategoria: R.head(anchorArr),
      // koodiarvo: maarays.koodiArvo,
      // koodisto: maarays.koodisto.koodistoUri,
      kohde: opiskelijavuodetData.kohde,
      maaraystyyppi: opiskelijavuodetData.maaraystyyppi,
      meta: { changeObj },
      tila: changeObj.properties.isChecked ? "LISAYS" : "POISTO",
      type: "change"
    };
  }, opiskelijavuodetData.payload.changes);
  console.info(changes);
  return changes;
}
