import * as R from "ramda";

export default function getChangesOfOpiskelijavuodet(opiskelijavuodetData) {
  const changes = R.map(changeObj => {
    const anchorArr = R.split(".", changeObj.anchor);
    const section = R.find(R.propEq("code", anchorArr[0]))(
      muutData.state.muutdata
    );
    let category = false;
    let maarays = false;
    if (section) {
      category = R.map(item => {
        return R.find(R.propEq("anchor", anchorArr[2]), item.categories);
      })(section.categories).filter(Boolean)[0];
      maarays = R.map(item => {
        return R.find(R.propEq("koodiArvo", anchorArr[2]), item.articles);
      })(section.data).filter(Boolean)[0];
    }
    return {
      kategoria: R.head(anchorArr),
      koodiarvo: maarays.koodiArvo,
      koodisto: maarays.koodisto.koodistoUri,
      kohde: opiskelijavuodetData.kohde,
      maaraystyyppi: opiskelijavuodetData.maaraystyyppi,
      meta: { changeObj },
      tila: changeObj.properties.isChecked ? "LISAYS" : "POISTO",
      type: "change"
    };
  }, opiskelijavuodetData.state.changes);
  return R.flatten(R.values(changes));
}
