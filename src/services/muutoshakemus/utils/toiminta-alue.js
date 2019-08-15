import * as R from "ramda";

const getItemsToAdd = (
  initialValueOfSelect,
  valueOfSelect,
  kohde,
  maaraystyyppi,
  joTallennetutMuutokset = []
) => {
  const toBeAdded = R.filter(item => {
    return (
      !!!R.find(R.propEq("koodiarvo", item.koodiarvo))(initialValueOfSelect) &&
      !!!R.find(R.propEq("koodiarvo", item.koodiarvo))(joTallennetutMuutokset)
    );
  }, valueOfSelect);

  return R.map(item => {
    return Object.assign({}, item, {
      tila: "LISAYS",
      type: "addition",
      meta: {
        perusteluteksti: null
      },
      muutosperustelukoodiarvo: null,
      kohde,
      maaraystyyppi
    });
  }, toBeAdded);
}; 

const getItemsToRemove = (
  initialValueOfSelect,
  valueOfSelect,
  kohde,
  maaraystyyppi,
  joTallennetutMuutokset = []
) => {
  const toBeRemoved = R.filter(item => {
    return (
      !!!R.find(R.propEq("koodiarvo", item.koodiarvo))(valueOfSelect) &&
      !!!R.find(R.propEq("koodiarvo", item.koodiarvo))(joTallennetutMuutokset)
    );
  }, initialValueOfSelect);

  return R.map(item => {
    return Object.assign({}, item, {
      tila: "POISTO",
      type: "removal",
      meta: {
        perusteluteksti: null
      },
      muutosperustelukoodiarvo: null,
      kohde,
      maaraystyyppi
    });
  }, toBeRemoved);
};

export default function getChangesOfToimintaalue(
  toimialuedata,
  muutospyynto = {}
) {
  const {
    initialValueOfSelect,
    kohde,
    maaraystyyppi,
    valueOfSelect
  } = toimialuedata.state;
  if (toimialuedata.state.changesOfValtakunnallinen.isChecked) {
    return {
      tila: "LISAYS",
      type: "addition",
      meta: {
        perusteluteksti: null
      },
      muutosperustelukoodiarvo: null,
      kohde,
      maaraystyyppi,
      value: "02",
      tyyppi:" valtakunnallinen",
      koodisto: "nuts1",
      koodiarvo: "FI1",
    };
  }
  else {
    const itemsToAdd = getItemsToAdd(
      initialValueOfSelect,
      valueOfSelect,
      kohde,
      maaraystyyppi,
      muutospyynto.muutokset
    );
    const itemsToRemove = getItemsToRemove(
      initialValueOfSelect,
      valueOfSelect,
      kohde,
      maaraystyyppi
    );
    return R.concat(itemsToAdd, itemsToRemove);
  }
}
