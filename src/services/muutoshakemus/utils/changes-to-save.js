import { getMetadata } from "./tutkinnotUtils";
import { getAnchorPart, findObjectWithKey } from "../../../utils/common";
import * as R from "ramda";

const getMuutos = (stateItem, changeObj, perustelut) => {
  let koulutus = {};
  const anchorParts = changeObj.anchor.split(".");
  const koulutusCode = R.nth(2, anchorParts);
  const subcodeCandidate = R.nth(3, anchorParts);
  const subcode =
    subcodeCandidate && !isNaN(subcodeCandidate) ? subcodeCandidate : undefined;

  const meta = subcode
    ? getMetadata(R.slice(1, 4)(anchorParts), stateItem.categories)
    : getMetadata(R.slice(1, 3)(anchorParts), stateItem.categories);

  const finnishInfo = R.find(R.propEq("kieli", "FI"), meta.metadata);
  if (koulutusCode) {
    koulutus =
      R.compose(
        R.find(R.propEq("koodi", "" + koulutusCode)),
        R.chain(R.prop("koulutukset")),
        R.values,
        R.path(["article", "koulutusalat"])
      )(stateItem) || {};
  }

  const maaraysUuid = R.prop("maaraysId", koulutus);

  const muutos = {
    generatedId: R.join(".", R.init(anchorParts)),
    isInLupa: meta.isInLupa,
    kohde: meta.kohde || koulutus.kohde,
    koodiarvo: subcode || koulutusCode,
    koodisto: meta.koodisto.koodistoUri,
    kuvaus: finnishInfo.kuvaus,
    maaraystyyppi: meta.maaraystyyppi || koulutus.maaraystyyppi,
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

  if (subcode && maaraysUuid) {
    // in case parent maarays exists
    muutos["maaraysUuid"] = maaraysUuid;
  } else if (subcode) {
    muutos["parent"] = R.compose(R.join("."), R.dropLast(2))(anchorParts);
  }

  return muutos;
};

function findBackendMuutos(anchor, backendMuutokset) {
  const backendMuutos = R.find(muutos => {
    return !!R.find(R.propEq("anchor", anchor), muutos.meta.changeObjects);
  }, backendMuutokset);
  if (!backendMuutos && R.includes(".", anchor)) {
    return findBackendMuutos(
      R.compose(R.join("."), R.init, R.split("."), R.always(anchor)),
      backendMuutokset
    );
  }
  return { anchor, backendMuutos };
}

/**
 * Function returns change objects related to reasoning (perustelut)
 * and to current anchor. There are different methods to find the
 * correct change objects.
 * @param {string} anchor - Dot separated string, id of a change object.
 * @param {array} changeObjects - Array of change objects.
 */
function findPerustelut(anchor, changeObjects) {
  function getPerustelut(anchor, perustelut, method = R.includes) {
    return R.filter(R.compose(method(anchor), R.prop("anchor")), perustelut);
  }
  // Method 1: Add perustelut_ string in front of the anchor.
  let perustelutAnchor = `perustelut_${anchor}`;
  let perustelut = getPerustelut(perustelutAnchor, changeObjects);
  if (R.isEmpty(perustelut)) {
    // Method 2: Remove the last part of the anchor and try method 1 again.
    let anchorInit = R.slice(0, R.lastIndexOf(".", anchor), anchor);
    perustelutAnchor = `perustelut_${anchorInit}`;
    perustelut = getPerustelut(perustelutAnchor, changeObjects);
    if (R.isEmpty(perustelut)) {
      // Method 3: Take the anchor of method to and replace the dots with
      // underscores.
      perustelutAnchor = `perustelut_${R.replace(".", "_", anchorInit)}`;
      perustelut = getPerustelut(perustelutAnchor, changeObjects, R.startsWith);
    }
  }
  return perustelut;
}

export const getChangesToSave = (
  key,
  stateObject = {},
  changeObjects = {},
  backendMuutokset = []
) => {
  const paivitetytBackendMuutokset = R.map(changeObj => {
    let { anchor, backendMuutos } = findBackendMuutos(
      changeObj.anchor,
      backendMuutokset
    );
    if (backendMuutos) {
      const perustelut = findPerustelut(anchor, changeObjects.perustelut);
      const backendMuutosWithChangeObjects = R.assocPath(
        ["meta", "changeObjects"],
        R.flatten([[changeObj], perustelut]),
        backendMuutos
      );
      // Let's add the attachments
      return R.assocPath(
        ["liitteet"],
        R.map(file => {
          return R.dissoc("tiedosto", file);
        }, findObjectWithKey(changeObjects, "attachments")),
        backendMuutosWithChangeObjects
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
            R.compose(R.contains(anchorInit), R.prop("anchor")),
            changeObjects.perustelut
          );
          return getMuutos(stateItem, changeObj, perustelut);
        }, unhandledChangeObjects).filter(Boolean)
      : [];
  } else if (key === "koulutukset") {
    uudetMuutokset = R.map(changeObj => {
      const stateData =
        stateObject[
          R.compose(R.last, R.split("_"))(getAnchorPart(changeObj.anchor, 0))
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
        R.compose(R.contains(anchorInit), R.prop("anchor")),
        changeObjects.perustelut
      );
      return {
        isInLupa: meta.isInLupa,
        liitteet: R.map(file => {
          return R.dissoc("tiedosto", file);
        }, findObjectWithKey(changeObjects, "attachments")),
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
        R.compose(R.contains(anchorInit), R.prop("anchor")),
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
  } else if (key === "muut") {
    uudetMuutokset = R.map(changeObj => {
      const anchorInit = R.compose(
        R.join("."),
        R.init,
        R.split(".")
      )(changeObj.anchor);
      const anchorArr = R.split(".", changeObj.anchor);
      const areaCode = R.compose(
        R.last,
        R.split("_"),
        R.view(R.lensIndex(0))
      )(anchorArr);
      const section = R.find(R.propEq("code", areaCode))(stateObject.muutdata);
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
      let type = changeObj.properties.isChecked ? "addition" : "removal";

      if (
        (changeObj.properties.isChecked === undefined ||
          changeObj.properties.isChecked === null) &&
        changeObj.properties.value
      ) {
        tila = "MUUTOS";
        type = "modification";
      }

      const perustelut = R.filter(
        R.compose(R.contains(anchorInit), R.prop("anchor")),
        changeObjects.perustelut
      );

      return {
        koodiarvo: maarays.koodiArvo,
        koodisto: maarays.koodisto.koodistoUri,
        isInLupa: category.meta.isInLupa,
        kohde: stateObject.kohde,
        maaraystyyppi: stateObject.maaraystyyppi,
        meta: { changeObjects: R.flatten([[changeObj], perustelut]) },
        tila: tila,
        type: type
      };
    }, unhandledChangeObjects).filter(Boolean);
  } else if (key === "toimintaalue") {
    uudetMuutokset = R.map(changeObj => {
      const perustelut = R.filter(
        R.compose(R.contains(changeObj.anchor), R.prop("anchor")),
        changeObjects.perustelut
      );
      if (R.equals(getAnchorPart(changeObj.anchor, 1), "valtakunnallinen")) {
        const tilaVal = changeObj.properties.isChecked ? "LISAYS" : "POISTO";
        const typeVal = changeObj.properties.isChecked ? "addition" : "removal";
        return {
          tila: tilaVal,
          type: typeVal,
          meta: {
            changeObjects: R.flatten([[changeObj], perustelut]),
            perusteluteksti: null
          },
          muutosperustelukoodiarvo: null,
          kohde: stateObject.kohde,
          maaraystyyppi: stateObject.maaraystyyppi,
          value: "02",
          tyyppi: " valtakunnallinen",
          koodisto: "nuts1",
          koodiarvo: "FI1"
        };
      } else if (
        R.equals(getAnchorPart(changeObj.anchor, 1), "valintakentat") ||
        R.includes("lupaan-lisattavat", getAnchorPart(changeObj.anchor, 1))
      ) {
        return {
          koodiarvo: changeObj.properties.metadata.koodiarvo,
          koodisto: changeObj.properties.metadata.koodisto.koodistoUri,
          tila: "LISAYS",
          type: "addition",
          meta: {
            perusteluteksti: null,
            changeObjects: R.flatten([[changeObj], perustelut])
          },
          muutosperustelukoodiarvo: null,
          kohde: stateObject.kohde,
          maaraystyyppi: stateObject.maaraystyyppi
        };
      } else {
        return {
          koodiarvo: changeObj.properties.metadata.koodiarvo,
          koodisto: changeObj.properties.metadata.koodisto.koodistoUri,
          tila: "POISTO",
          type: "removal",
          meta: {
            perusteluteksti: null,
            changeObjects: R.flatten([[changeObj], perustelut])
          },
          muutosperustelukoodiarvo: null,
          kohde: stateObject.kohde,
          maaraystyyppi: stateObject.maaraystyyppi
        };
      }
    }, unhandledChangeObjects).filter(Boolean);
  } else if (key === "opiskelijavuodet") {
    uudetMuutokset = R.map(changeObj => {
      let koodisto = "koulutussektori";
      const anchorParts = R.split(".", changeObj.anchor);
      const categoryKey = R.view(R.lensIndex(1))(anchorParts);
      const koodiarvo = R.prop(
        categoryKey,
        stateObject.opiskelijavuodet.koodiarvot
      );
      const muutCategory = R.find(R.propEq("key", categoryKey))(
        stateObject.muut.muutdata
      );
      if (muutCategory) {
        const meta = R.find(R.propEq("anchor", koodiarvo))(
          R.flatten(R.map(R.prop("categories"), muutCategory.categories))
        ).meta;
        koodisto = meta.koodisto.koodistoUri;
      }
      const anchorInit = R.compose(
        R.join("."),
        R.init,
        R.split(".")
      )(changeObj.anchor);

      const perustelut = R.filter(
        R.compose(R.includes(anchorInit), R.prop("anchor")),
        changeObjects.perustelut
      );

      return {
        arvo: changeObj.properties.applyForValue,
        kategoria: R.head(anchorParts),
        koodiarvo,
        koodisto,
        kohde: stateObject.opiskelijavuodet.kohde,
        maaraystyyppi: stateObject.opiskelijavuodet.maaraystyyppi,
        meta: { changeObjects: R.flatten([[changeObj], perustelut]) },
        tila: "MUUTOS",
        type: "change"
      };
    }, unhandledChangeObjects).filter(Boolean);
  }

  return R.flatten([paivitetytBackendMuutokset, uudetMuutokset]);
};
