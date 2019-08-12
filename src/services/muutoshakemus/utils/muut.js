import * as R from "ramda";

export default function getChangesOfMuut(muutData) {
  const changes = R.map(changesBySection => {
    return R.map(changeItem => {
      const anchorArr = R.split(".", changeItem.anchor);
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
        koodiarvo: maarays.koodiArvo,
        koodisto: maarays.koodisto.koodistoUri,
        isInLupa: category.meta.isInLupa,
        kohde: {
          tunniste: muutData.state.kohde.tunniste
        },
        tila: changeItem.properties.isChecked ? "LISAYS" : "POISTO"
      };
    }, changesBySection);
  }, muutData.state.changes);
  return R.flatten(changes);
}
