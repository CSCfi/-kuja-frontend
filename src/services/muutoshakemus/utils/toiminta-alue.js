import * as R from "ramda";

const getItemsToAdd = (initialValueOfSelect, valueOfSelect, kohde, maaraystyyppi) => {
  const toBeAdded = R.filter(item => {
    return !!!R.find(R.propEq("koodiarvo", item.koodiarvo))(
      initialValueOfSelect
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

const getItemsToRemove = (initialValueOfSelect, valueOfSelect, kohde, maaraystyyppi) => {
  const toBeRemoved = R.filter(item => {
    return !!!R.find(R.propEq("koodiarvo", item.koodiarvo))(valueOfSelect);
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

export default function getChangesOfToimintaalue(toimialuedata) {
  const { initialValueOfSelect, kohde, maaraystyyppi, valueOfSelect } = toimialuedata.state;
  const itemsToAdd = getItemsToAdd(initialValueOfSelect, valueOfSelect, kohde, maaraystyyppi);
  const itemsToRemove = getItemsToRemove(
    initialValueOfSelect,
    valueOfSelect,
    kohde,
    maaraystyyppi
  );

  console.info(itemsToAdd, itemsToRemove);
  return R.concat(itemsToAdd, itemsToRemove);
}
