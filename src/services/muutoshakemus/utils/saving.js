import { getChangesToSave } from "./tutkinnot-ja-koulutukset";
import { getChangesOfOpetuskielet } from "./opetus-ja-tutkintokieli";
import getChangesOfOpiskelijavuodet from "./opiskelijavuodet";
import { getChangesOfTutkintokielet } from "./opetus-ja-tutkintokieli";
import getChangesOfToimintaalue from "./toiminta-alue";
import getChangesOfMuut from "./muut";
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
    voimassaloppupvm: "2019-12-31", // TODO: find the correct value somehow
    meta: {
      meta: {},
      taloudelliset: {
        taloudelliset: []
      }
    },
    muutokset: R.flatten([
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
          )(R.values(R.path(["perustelut", "tutkinnot"], changeObjects))),
          // TODO: add taloudelliset edellytykset here
        },
        R.filter(R.pathEq(["kohde", "tunniste"], "tutkinnotjakoulutukset"))(
          backendMuutokset
        )
      ),
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
      // getChangesOfToimintaalue(muutoshakemus.toimintaalue, muutospyynto),
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
      // getChangesOfMuut(muutoshakemus.muut)
    ]),
    liitteet: [],
    uuid
  };
}
