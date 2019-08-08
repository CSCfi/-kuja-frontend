import moment from "moment";
import * as R from "ramda";
import getChangesOfTutkinnotJaKoulutukset from "./tutkinnot-ja-koulutukset";
import { getChangesOfOpetuskielet } from "./opetus-ja-tutkintokieli";
import { getChangesOfTutkintokielet } from "./opetus-ja-tutkintokieli";
import getChangesOfToimintaalue from "./toiminta-alue";
import getChangesOfMuut from "./muut";

export function createObjectToSave(lupa, muutoshakemus) {
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
      getChangesOfTutkinnotJaKoulutukset(muutoshakemus.tutkinnot),
      getChangesOfOpetuskielet(muutoshakemus.opetuskielet),
      getChangesOfTutkintokielet(muutoshakemus.tutkintokielet),
      getChangesOfToimintaalue(muutoshakemus.toimintaalue),
      getChangesOfMuut(muutoshakemus.muut)
    ]),
    liitteet: []
  };
}