import { getMetadata } from "./tutkinnotUtils";
import { getAnchorPart } from "../../../utils/common";
import * as R from "ramda";

const getMuutos = (stateItem, changeObj, perustelut) => {
  let koulutus = {};
  const anchorParts = changeObj.anchor.split(".");
  const code = R.last(anchorParts);
  const meta = getMetadata(R.slice(1, 3)(anchorParts), stateItem.categories);
  const finnishInfo = R.find(R.propEq("kieli", "FI"), meta.metadata);
  if (stateItem.article) {
    if (stateItem.article.koulutusalat[anchorParts[1]]) {
      koulutus =
        R.find(
          R.propEq("koodi", code),
          stateItem.article.koulutusalat[anchorParts[1]].koulutukset
        ) || {};
    }
  }
  return {
    isInLupa: meta.isInLupa,
    kohde: koulutus.kohde || meta.kohde,
    koodiarvo: code,
    koodisto: meta.koodisto.koodistoUri,
    kuvaus: finnishInfo.kuvaus,
    maaraystyyppi: koulutus.maaraystyyppi || meta.maaraystyyppi,
    meta: {
      changeObjects: R.flatten([[changeObj], perustelut]),
      nimi: koulutus.nimi,
      koulutusala: anchorParts[0],
      koulutustyyppi: anchorParts[1],
      perusteluteksti: null,
      muutosperustelukoodiarvo: []
    },
    nimi: finnishInfo.nimi,
    tila: changeObj.properties.isChecked ? "LISAYS" : "POISTO",
    type: changeObj.properties.isChecked ? "addition" : "removal"
  };
};

export const getChangesToSave = (
  key,
  stateObject = {},
  changeObjects = {},
  backendMuutokset = []
) => {
  const paivitetytBackendMuutokset = R.map(changeObj => {
    const anchorInit = R.compose(
      R.join("."),
      R.init,
      R.split("."),
      R.prop("anchor")
    )(changeObj);
    const backendMuutos = R.find(muutos => {
      return !!R.find(
        R.startsWith(anchorInit),
        R.map(
          R.compose(
            R.join("."),
            R.init,
            R.split("."),
            R.prop("anchor")
          ),
          R.path(["meta", "changeObjects"], muutos)
        )
      );
    }, backendMuutokset);
    if (backendMuutos) {
      const perustelutAnchorInitial = `perustelut_${anchorInit}`;
      const perustelut = R.filter(
        R.compose(
          R.contains(perustelutAnchorInitial),
          R.prop("anchor")
        ),
        changeObjects.perustelut
      );
      return R.assocPath(
        ["meta", "changeObjects"],
        R.flatten([[changeObj], perustelut]),
        backendMuutos
      );
    }
    return backendMuutos;
  }, changeObjects.muutokset).filter(Boolean);

  const alreadyHandledChangeObjects = R.flatten(
    R.map(R.path(["meta", "changeObjects"]))(paivitetytBackendMuutokset)
  );

  const unhandledChangeObjects = R.difference(
    changeObjects.muutokset,
    alreadyHandledChangeObjects
  );

  let uudetMuutokset = [];

  if (key === "tutkinnot") {
    uudetMuutokset = stateObject.items
      ? R.map(changeObj => {
          const areaCode = R.compose(
            R.view(R.lensIndex(1)),
            R.split("_")
          )(getAnchorPart(changeObj.anchor, 0));
          const stateItem = R.find(R.propEq("areaCode", areaCode))(
            stateObject.items
          );
          const anchorInit = R.compose(
            R.join("."),
            R.init,
            R.split(".")
          )(changeObj.anchor);
          const perustelut = R.filter(
            R.compose(
              R.contains(anchorInit),
              R.prop("anchor")
            ),
            changeObjects.perustelut
          );
          return getMuutos(stateItem, changeObj, perustelut);
        }, unhandledChangeObjects).filter(Boolean)
      : [];
  } else if (key === "koulutukset") {
    uudetMuutokset = R.map(changeObj => {
      const stateData =
        stateObject[
          R.compose(
            R.last,
            R.split("_")
          )(getAnchorPart(changeObj.anchor, 0))
        ];
      const anchorInit = R.compose(
        R.join("."),
        R.init,
        R.split(".")
      )(changeObj.anchor);
      const code = getAnchorPart(changeObj.anchor, 1);
      const meta = getMetadata([code], stateData.categories);
      const finnishInfo = R.find(R.propEq("kieli", "FI"), meta.metadata);
      const perustelut = R.filter(
        R.compose(
          R.contains(anchorInit),
          R.prop("anchor")
        ),
        changeObjects.perustelut
      );
      return {
        isInLupa: meta.isInLupa,
        kohde: meta.kohde,
        koodiarvo: code,
        koodisto: meta.koodisto.koodistoUri,
        maaraystyyppi: meta.maaraystyyppi,
        meta: {
          changeObjects: R.flatten([[changeObj], perustelut]),
          perusteluteksti: null,
          muutosperustelukoodiarvo: []
        },
        nimi: finnishInfo.nimi,
        tila: changeObj.properties.isChecked ? "LISAYS" : "POISTO",
        type: changeObj.properties.isChecked ? "addition" : "removal"
      };
    }, unhandledChangeObjects).filter(Boolean);
  } else if (key === "tutkintokielet") {
    uudetMuutokset = R.map(changeObj => {
      const anchorParts = changeObj.anchor.split(".");
      const areaCode = R.compose(
        R.view(R.lensIndex(2)),
        R.split("_")
      )(anchorParts[0]);
      const item = R.find(R.propEq("areaCode", areaCode))(stateObject.items);
      const anchorInit = R.compose(
        R.join("."),
        R.init,
        R.split(".")
      )(changeObj.anchor);
      const perustelut = R.filter(
        R.compose(
          R.contains(anchorInit),
          R.prop("anchor")
        ),
        changeObjects.perustelut
      );
      const code = getAnchorPart(changeObj.anchor, 1);
      const meta =
        item && item.categories
          ? getMetadata(R.slice(1, 3)(anchorParts), item.categories)
          : {};
      return {
        koodiarvo: code,
        koodisto: stateObject.koodistoUri,
        nimi: meta.nimi, // TODO: Tähän oikea arvo, jos tarvitaan, muuten poistetaan
        kuvaus: meta.kuvaus, // TODO: Tähän oikea arvo, jos tarvitaan, muuten poistetaan
        isInLupa: meta.isInLupa,
        kohde: meta.kohde,
        maaraystyyppi: meta.maaraystyyppi,
        meta: {
          tunniste: "tutkintokieli",
          changeObjects: R.flatten([[changeObj], perustelut])
        },
        tila: "LISAYS",
        type: "addition"
      };
    }, unhandledChangeObjects).filter(Boolean);
  }

  return R.flatten([paivitetytBackendMuutokset, uudetMuutokset]);
};

// export const getChangesOfKoulutukset = () => {
//   const koulutuksetMuutokset = !R.isEmpty(koulutukset)
//     ? R.flatten(
//         R.values(
//           R.mapObjIndexed((changes, name) => {
//             return R.values(
//               R.map(changeObj => {
//                 const anchorParts = changeObj.anchor.split(".");
//                 const code = R.view(R.lensIndex(1))(anchorParts);
//                 const meta = getMetadata(
//                   R.slice(1, -1)(anchorParts),
//                   koulutukset[name].categories
//                 );
//                 const finnishInfo = R.find(
//                   R.propEq("kieli", "FI"),
//                   meta.metadata
//                 );
//                 return {
//                   isInLupa: meta.isInLupa,
//                   kohde: meta.kohde,
//                   koodiarvo: code,
//                   koodisto: meta.koodisto.koodistoUri,
//                   maaraystyyppi: meta.maaraystyyppi,
//                   meta: {
//                     changeObj,
//                     perusteluteksti: null,
//                     muutosperustelukoodiarvo: []
//                   },
//                   nimi: finnishInfo.nimi,
//                   tila: changeObj.properties.isChecked ? "LISAYS" : "POISTO",
//                   type: changeObj.properties.isChecked ? "addition" : "removal"
//                 };
//               }, changes)
//             );
//           }, changeObjects.koulutukset)
//         )
//       )
//     : [];
//   return R.flatten([tutkinnotMuutokset, koulutuksetMuutokset]);
// };
