import * as R from "ramda";

export default function getChangesOfOpiskelijavuodet(opiskelijavuodetData) {
  const changes = R.map(changeObj => {
    let koodisto = "koulutussektori";
    const anchorParts = R.split(".", changeObj.anchor);
    const categoryKey = R.view(R.lensIndex(1))(anchorParts);
    const koodiarvo = R.prop(
      categoryKey,
      opiskelijavuodetData.state.koodiarvot
    );
    const muutCategory = R.find(R.propEq("key", categoryKey))(
      opiskelijavuodetData.state.muut.state.muutdata
    );
    if (muutCategory) {
      const meta = R.find(R.propEq("anchor", koodiarvo))(
        R.flatten(R.map(R.prop("categories"), muutCategory.categories))
      ).meta;
      koodisto = meta.koodisto.koodistoUri;
    }
    return {
      arvo: changeObj.properties.applyForValue,
      kategoria: R.head(anchorParts),
      koodiarvo,
      koodisto,
      kohde: opiskelijavuodetData.state.kohde,
      maaraystyyppi: opiskelijavuodetData.state.maaraystyyppi,
      meta: { changeObj },
      tila: "MUUTOS",
      type: "change"
    };
  }, opiskelijavuodetData.state.changes);
  console.info(changes);
  return changes;
}
