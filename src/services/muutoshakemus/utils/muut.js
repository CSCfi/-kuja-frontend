import * as R from "ramda";

export default function getChangesOfMuut(muutData) {
  const changes = R.map(changesBySection => {
    return R.map(changeObj => {
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

      let tila = changeObj.properties.isChecked ? "LISAYS" : "POISTO";
      let type = changeObj.properties.isChecked ? "addition" : "removal"

      if ((changeObj.properties.isChecked === undefined || changeObj.properties.isChecked === null)
        && changeObj.properties.value){
        tila = 'MUUTOS'
        type = 'modification'
      }

      return {
        koodiarvo: maarays.koodiArvo,
        koodisto: maarays.koodisto.koodistoUri,
        isInLupa: category.meta.isInLupa,
        kohde: muutData.state.kohde,
        maaraystyyppi: muutData.state.maaraystyyppi,
        meta: { changeObj },
        tila: tila,
        type: type
      };
    }, changesBySection);
  }, muutData.state.changes);
  return R.flatten(R.values(changes));
}
