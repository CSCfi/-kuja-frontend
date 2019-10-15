import { getChangesToSave } from "./changes-to-save";
import { getChangesOfOpetuskielet } from "./opetuskieli-saving";
import moment from "moment";
import * as R from "ramda";

export function createObjectToSave(
  lupa,
  changeObjects,
  backendMuutokset = [],
  muutoshakemus,
  uuid,
  muutospyynto
) {
  // Adds data that has attachements
  const yhteenvetoYleiset = R.path(
    ["yhteenveto", "yleisettiedot"],
    changeObjects
  );
  const yhteenvetoLiitteet = R.path(
    ["yhteenveto", "hakemuksenliitteet"],
    changeObjects
  );
  const taloudellisetLiitteet = R.path(
    ["taloudelliset", "liitteet"],
    changeObjects
  );
  const perustelutLiitteet = R.path(["perustelut", "liitteet"], changeObjects);

  //get actual attachment props
  const perustelutLiitteetList =
    perustelutLiitteet && perustelutLiitteet[0].properties
      ? perustelutLiitteet[0].properties.attachments
      : [];

  const taloudellisetLiitteetList =
    taloudellisetLiitteet && taloudellisetLiitteet[0].properties
      ? taloudellisetLiitteet[0].properties.attachments
      : [];

  const yhteenvetoYleisetLiitteetList =
    yhteenvetoYleiset && yhteenvetoYleiset[0].properties
      ? yhteenvetoYleiset[0].properties.attachments
      : [];

  const yhteenvetoLiitteetList =
    yhteenvetoLiitteet && yhteenvetoLiitteet[0].properties
      ? yhteenvetoLiitteet[0].properties.attachments
      : [];

  const allAttachments = perustelutLiitteetList.concat(
    taloudellisetLiitteetList.concat(
      yhteenvetoYleisetLiitteetList.concat(yhteenvetoLiitteetList)
    )
  );

  console.log(muutoshakemus);
  console.log(changeObjects);
  console.log(R.path(["perustelut"], changeObjects));

  console.log(
    getChangesToSave(
      "koulutukset",
      R.path(["koulutukset"], muutoshakemus),
      {
        muutokset: R.compose(
          R.flatten,
          R.values
        )(R.values(R.path(["koulutukset"], changeObjects))),
        perustelut: R.compose(
          R.flatten,
          R.values
        )(R.values(R.path(["perustelut", "koulutukset"], changeObjects)))
      },
      R.filter(R.pathEq(["kohde", "tunniste"], "tutkinnotjakoulutukset"))(
        backendMuutokset
      )
    )
  );

  return {
    diaarinumero: lupa.data.diaarinumero,
    jarjestajaOid: lupa.data.jarjestajaOid,
    jarjestajaYtunnus: lupa.data.jarjestajaYtunnus,
    luoja: sessionStorage.getItem("username"),
    // luontipvm: moment().valueOf(),
    luontipvm: moment().format("YYYY-MM-DD"),
    lupaUuid: lupa.data.uuid,
    // uuid: lupa.data.asiatyyppi.uuid,
    tila: "LUONNOS",
    paivittaja: "string",
    paivityspvm: null,
    voimassaalkupvm: lupa.data.alkupvm,
    voimassaloppupvm: "2019-12-31", // TODO: find the correct value somehow,
    liitteet: allAttachments,
    meta: {
      tutkinnotjakoulutuksetLiitteet: {
        changeObjects: R.flatten([
          R.path(["perustelut", "liitteet"], changeObjects)
        ]).filter(Boolean)
      },
      taloudelliset: {
        changeObjects: R.flatten([
          R.path(["taloudelliset", "investoinnit"], changeObjects),
          R.path(["taloudelliset", "tilinpaatostiedot"], changeObjects),
          R.path(["taloudelliset", "yleisettiedot"], changeObjects),
          R.path(["taloudelliset", "liitteet"], changeObjects)
        ]).filter(Boolean)
      },
      yhteenveto: {
        changeObjects: R.flatten([
          R.path(["yhteenveto", "yleisettiedot"], changeObjects),
          R.path(["yhteenveto", "hakemuksenliitteet"], changeObjects)
        ]).filter(Boolean)
      }
    },
    muutokset: R.flatten([
      // TUTKINNOT
      getChangesToSave(
        "tutkinnot",
        R.path(["tutkinnot"], muutoshakemus), // stateObject
        {
          // Page 1 changes
          muutokset: R.compose(
            R.flatten,
            R.values
          )(R.values(R.path(["tutkinnot"], changeObjects))),
          // Page 2 changes
          perustelut: R.compose(
            R.flatten,
            R.values
          )(R.values(R.path(["perustelut", "tutkinnot"], changeObjects)))
        },
        R.filter(R.pathEq(["kohde", "tunniste"], "tutkinnotjakoulutukset"))(
          backendMuutokset
        )
      ),
      // KOULUTUKSET
      getChangesToSave(
        "koulutukset",
        R.path(["koulutukset"], muutoshakemus),
        {
          muutokset: R.compose(
            R.flatten,
            R.values
          )(R.values(R.path(["koulutukset"], changeObjects))),
          perustelut: R.compose(
            R.flatten,
            R.values
          )(R.values(R.path(["perustelut", "koulutukset"], changeObjects)))
        },
        R.filter(R.pathEq(["kohde", "tunniste"], "tutkinnotjakoulutukset"))(
          backendMuutokset
        )
      ),
      // OPETUSKIELET
      getChangesOfOpetuskielet(
        R.path(["kielet", "opetuskielet"], muutoshakemus),
        R.flatten([
          R.path(["kielet", "opetuskielet"], changeObjects) || [],
          R.path(["perustelut", "kielet", "opetuskielet"], changeObjects) || []
        ]),
        R.filter(R.propEq("koodisto", "oppilaitoksenopetuskieli"))(
          backendMuutokset
        )
      ),
      // TUTKINTOKIELET
      getChangesToSave(
        "tutkintokielet",
        R.path(["kielet", "tutkintokielet"], muutoshakemus),
        {
          muutokset: R.compose(
            R.flatten,
            R.values
          )(R.values(R.path(["kielet", "tutkintokielet"], changeObjects))),
          perustelut: R.compose(
            R.flatten,
            R.values
          )(
            R.values(
              R.path(["perustelut", "kielet", "tutkintokielet"], changeObjects)
            )
          )
        },
        R.filter(R.pathEq(["koodisto"], "kieli"))(backendMuutokset)
      ),
      // TOIMINTA-ALUE
      getChangesToSave(
        "toimintaalue",
        R.path(["toimintaalue"], muutoshakemus),
        {
          muutokset: R.path(["toimintaalue"], changeObjects) || [],
          perustelut: R.flatten([
            R.map(changeObj => {
              return {
                ...changeObj,
                anchor: R.replace(/_additions/, "", changeObj.anchor),
                properties: {
                  ...changeObj.properties,
                  meta: { type: "addition" }
                }
              };
            }, R.path(["perustelut", "toimintaalue", "additions"], changeObjects) || []),
            R.map(changeObj => {
              return {
                ...changeObj,
                anchor: R.replace(/_removals/, "", changeObj.anchor),
                properties: {
                  ...changeObj.properties,
                  meta: { type: "removal" }
                }
              };
            }, R.path(["perustelut", "toimintaalue", "removals"], changeObjects) || [])
          ])
        },
        R.filter(R.pathEq(["kohde", "tunniste"], "toimintaalue"))(
          backendMuutokset
        )
      ),
      // OPISKELIJAVUODET
      getChangesToSave(
        "opiskelijavuodet",
        {
          opiskelijavuodet: R.path(["opiskelijavuodet"], muutoshakemus),
          muut: R.path(["muut"], muutoshakemus)
        },
        {
          muutokset: R.compose(
            R.flatten,
            R.values
          )(R.values(R.path(["opiskelijavuodet"], changeObjects))),
          perustelut: R.compose(
            R.flatten,
            R.values
          )(R.values(R.path(["perustelut", "opiskelijavuodet"], changeObjects)))
        },
        R.filter(R.pathEq(["kohde", "tunniste"], "opiskelijavuodet"))(
          backendMuutokset
        )
      ),
      // MUUT
      getChangesToSave(
        "muut",
        R.path(["muut"], muutoshakemus),
        {
          muutokset: R.compose(
            R.flatten,
            R.values
          )(R.values(R.path(["muut"], changeObjects))),
          perustelut: R.compose(
            R.flatten,
            R.values
          )(R.values(R.path(["perustelut", "muut"], changeObjects)))
        },
        R.filter(R.pathEq(["kohde", "tunniste"], "muut"))(backendMuutokset)
      )
    ]),
    uuid
  };
}
