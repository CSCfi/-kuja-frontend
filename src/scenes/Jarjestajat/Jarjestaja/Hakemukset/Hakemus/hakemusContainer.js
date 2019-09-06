import React, { useContext, useEffect, useState } from "react";
import MuutospyyntoWizard from "../../Hakemukset/Muutospyynto/components/MuutospyyntoWizard";
import PropTypes from "prop-types";
import { KohteetContext } from "../../../../../context/kohteetContext";
import { KoulutusalatContext } from "../../../../../context/koulutusalatContext";
import { KoulutuksetContext } from "../../../../../context/koulutuksetContext";
import { KoulutustyypitContext } from "../../../../../context/koulutustyypitContext";
import { KieletContext } from "../../../../../context/kieletContext";
import { OpiskelijavuodetContext } from "../../../../../context/opiskelijavuodetContext";
import { MuutContext } from "../../../../../context/muutContext";
import { MaaraystyypitContext } from "../../../../../context/maaraystyypitContext";
import { MuutospyynnotContext } from "../../../../../context/muutospyynnotContext";
import Loading from "../../../../../modules/Loading";
import { MUUT_KEYS } from "../Muutospyynto/modules/constants";
import { fetchKoulutusalat } from "services/koulutusalat/actions";
import { fetchMuut } from "../../../../../services/muut/actions";
import {
  fetchKielet,
  fetchOppilaitoksenOpetuskielet
} from "../../../../../services/kielet/actions";
import {
  fetchKoulutuksetAll,
  fetchKoulutuksetMuut,
  fetchKoulutus
} from "../../../../../services/koulutukset/actions";
import { fetchKohteet } from "../../../../../services/kohteet/actions";
import { fetchKoulutustyypit } from "../../../../../services/koulutustyypit/actions";
import { fetchMuutospyynto } from "../../../../../services/muutospyynnot/actions";
import { fetchMaaraystyypit } from "../../../../../services/maaraystyypit/actions";
import { MessageWrapper } from "../../../../../modules/elements";
import { injectIntl } from "react-intl";
import * as R from "ramda";
import { getAnchorsStartingWith } from "../../../../../utils/common";

const HakemusContainer = props => {
  const [accessRight, setAccessRight] = useState(false);
  const [backendChanges, setBackendChanges] = useState({});

  const { state: muutospyynnot, dispatch: muutospyynnotDispatch } = useContext(
    MuutospyynnotContext
  );
  const { state: kohteet, dispatch: kohteetDispatch } = useContext(
    KohteetContext
  );
  const { state: koulutukset, dispatch: koulutuksetDispatch } = useContext(
    KoulutuksetContext
  );
  const { state: koulutusalat, dispatch: koulutusalatDispatch } = useContext(
    KoulutusalatContext
  );
  const { state: maaraystyypit, dispatch: maaraystyypitDispatch } = useContext(
    MaaraystyypitContext
  );
  const { state: opiskelijavuodet } = useContext(OpiskelijavuodetContext);
  const { state: muut, dispatch: muutDispatch } = useContext(MuutContext);
  const {
    state: koulutustyypit,
    dispatch: koulutustyypitDispatch
  } = useContext(KoulutustyypitContext);
  const { state: kielet, dispatch: kieletDispatch } = useContext(KieletContext);

  useEffect(() => {
    // TODO: organisaation oid pitää tarkastaa jotain muuta kautta kuin voimassaolevasta luvasta
    if (sessionStorage.getItem("oid") === props.lupa.data.jarjestajaOid) {
      setAccessRight(true);
    }
  }, [props.lupa]);

  useEffect(() => {
    fetchKohteet()(kohteetDispatch);
    fetchKoulutus("999901")(koulutuksetDispatch);
    fetchKoulutus("999903")(koulutuksetDispatch);
    fetchKoulutusalat()(koulutusalatDispatch);
    fetchKoulutustyypit()(koulutustyypitDispatch);
    fetchKoulutuksetMuut(MUUT_KEYS.AMMATILLISEEN_TEHTAVAAN_VALMISTAVA_KOULUTUS)(
      koulutuksetDispatch
    );
    fetchKoulutuksetMuut(MUUT_KEYS.OIVA_TYOVOIMAKOULUTUS)(koulutuksetDispatch);
    fetchKoulutuksetMuut(MUUT_KEYS.KULJETTAJAKOULUTUS)(koulutuksetDispatch);
    fetchKielet(props.intl.locale)(kieletDispatch);
    fetchOppilaitoksenOpetuskielet()(kieletDispatch);
    fetchMaaraystyypit()(maaraystyypitDispatch);
    fetchMuut()(muutDispatch);
    const uuid = props.match.params.uuid;
    if (uuid) {
      fetchMuutospyynto(uuid)(muutospyynnotDispatch);
    }
  }, [
    kohteetDispatch,
    koulutuksetDispatch,
    koulutusalatDispatch,
    koulutustyypitDispatch,
    kieletDispatch,
    maaraystyypitDispatch,
    muutDispatch,
    muutospyynnotDispatch,
    props.intl.locale,
    props.match.params.uuid
  ]);

  useEffect(() => {
    if (koulutusalat.fetched && koulutustyypit.fetched) {
      fetchKoulutuksetAll(koulutusalat.data, koulutustyypit.data)(
        koulutuksetDispatch
      );
    }
  }, [koulutusalat, koulutustyypit, koulutuksetDispatch]);

  /**
   * Let's walk through all the changes from the backend and update the muutoshakemus.
   */
  useEffect(() => {
    if (muutospyynnot.fetched) {
      const backendMuutokset = R.path(
        ["muutospyynto", "muutokset"],
        muutospyynnot
      );
      const categorize = changes => {
        const categorizedChanges = {};
        R.forEach(changeObj => {
          const areaCode = R.compose(
            R.view(R.lensIndex(0)),
            R.split(".")
          )(changeObj.anchor);
          if (!categorizedChanges[areaCode]) {
            categorizedChanges[areaCode] = [];
          }
          categorizedChanges[areaCode].push(changeObj);
        }, changes);
        return categorizedChanges;
      };
      const getChangesOf = (
        key,
        changes,
        { path = ["kohde", "tunniste"], categoryKey } = {}
      ) => {
        let result = R.filter(R.pathEq(path, key))(changes);
        if (key === "tutkinnotjakoulutukset") {
          result = R.filter(
            R.compose(
              R.not,
              R.equals("tutkintokieli"),
              R.path(["meta", "tunniste"])
            ),
            result
          );
        }
        let changeObjects = R.map(R.path(["meta", "changeObj"]))(result).filter(
          Boolean
        );
        if (categoryKey) {
          changeObjects = getAnchorsStartingWith(categoryKey, changeObjects);
        }
        return changeObjects.length ? changeObjects : result;
      };
      const changes = {
        tutkinnot: getChangesOf("tutkinnotjakoulutukset", backendMuutokset, {
          categoryKey: "tutkinnot"
        }),
        koulutukset: getChangesOf("tutkinnotjakoulutukset", backendMuutokset, {
          categoryKey: "koulutukset"
        }),
        kielet: {
          opetuskielet: getChangesOf("opetuskieli", backendMuutokset, {
            path: ["meta", "koulutusala"]
          }),
          tutkintokielet: categorize(
            getChangesOf("tutkintokieli", backendMuutokset, {
              path: ["meta", "tunniste"]
            })
          )
        },
        opiskelijavuodet: getChangesOf("opiskelijavuodet", backendMuutokset),
        toimintaalue: getChangesOf("toimintaalue", backendMuutokset),
        muut: categorize(getChangesOf("muut", backendMuutokset)),
        perustelut: {},
        handled: true
      };
      setBackendChanges(changes);
    }
  }, [muutospyynnot, muutospyynnot.muutospyynto.muutokset]);

  if (
    (!props.match.params.uuid ||
      (muutospyynnot.fetched && backendChanges.handled)) &&
    kohteet.fetched &&
    kielet.fetched &&
    koulutukset.fetched &&
    koulutukset.muut.fetched.length === 3 &&
    koulutukset.poikkeukset.fetched.length === 2 &&
    koulutusalat.fetched &&
    koulutustyypit.fetched &&
    props.lupa.fetched &&
    maaraystyypit.fetched &&
    accessRight
  ) {
    return (
      <MuutospyyntoWizard
        backendChanges={backendChanges}
        kielet={kielet}
        kohteet={kohteet}
        koulutukset={koulutukset}
        koulutusalat={koulutusalat}
        koulutustyypit={koulutustyypit}
        maaraystyypit={maaraystyypit.data}
        muutospyynnot={muutospyynnot}
        opiskelijavuodet={opiskelijavuodet}
        muut={muut}
        lupa={props.lupa}
        {...props}
      />
    );
  } else {
    return (
      <MessageWrapper>
        <Loading />
      </MessageWrapper>
    );
  }
};

HakemusContainer.propTypes = {
  lupa: PropTypes.object
};

export default injectIntl(HakemusContainer);
