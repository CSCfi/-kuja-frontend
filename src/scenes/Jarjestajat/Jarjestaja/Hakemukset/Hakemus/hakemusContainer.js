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
import { KunnatContext } from "context/kunnatContext";
import { MaakunnatContext } from "context/maakunnatContext";
import { MaakuntakunnatContext } from "context/maakuntakunnatContext";
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
import { fetchKunnat } from "../../../../../services/kunnat/actions";
import { fetchMaakunnat } from "../../../../../services/maakunnat/actions";
import { fetchMaakuntakunnat } from "../../../../../services/maakuntakunnat/actions";
import { MessageWrapper } from "../../../../../modules/elements";
import { injectIntl } from "react-intl";
import * as R from "ramda";
import {
  getAnchorsStartingWith,
  getAnchorPart,
  replaceAnchorPartWith
} from "../../../../../utils/common";
import { setAttachmentUuids } from "../../../../../services/muutospyynnot/muutospyyntoUtil";
import { VankilatContext } from "../../../../../context/vankilatContext";
import { fetchVankilat } from "../../../../../services/vankilat/actions";

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
  const { state: vankilat, dispatch: vankilatDispatch } = useContext(
    VankilatContext
  );
  const { state: opiskelijavuodet } = useContext(OpiskelijavuodetContext);
  const { state: muut, dispatch: muutDispatch } = useContext(MuutContext);
  const {
    state: koulutustyypit,
    dispatch: koulutustyypitDispatch
  } = useContext(KoulutustyypitContext);
  const { state: kielet, dispatch: kieletDispatch } = useContext(KieletContext);
  const { state: kunnat, dispatch: kunnatDispatch } = useContext(KunnatContext);
  const { state: maakunnat, dispatch: maakunnatDispatch } = useContext(
    MaakunnatContext
  );
  const {
    state: maakuntakunnat,
    dispatch: maakuntakunnatDispatch
  } = useContext(MaakuntakunnatContext);

  useEffect(() => {
    // TODO: organisaation oid pitää tarkastaa jotain muuta kautta kuin voimassaolevasta luvasta
    if (sessionStorage.getItem("oid") === props.lupa.jarjestajaOid) {
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

    fetchKunnat()(kunnatDispatch);
    fetchMaakunnat()(maakunnatDispatch);
    fetchMaakuntakunnat()(maakuntakunnatDispatch);
    fetchVankilat()(vankilatDispatch);
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
    kunnatDispatch,
    maakunnatDispatch,
    maakuntakunnatDispatch,
    props.intl.locale,
    props.match.params.uuid,
    vankilatDispatch
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
        let changeObjects = R.flatten(
          R.map(R.path(["meta", "changeObjects"]))(result)
        ).filter(Boolean);
        if (key === "toimintaalue") {
          changeObjects = R.map(changeObj => {
            const type = R.path(["properties", "meta", "type"], changeObj);
            if (type === "addition") {
              changeObj.anchor = replaceAnchorPartWith(
                changeObj.anchor,
                0,
                `${getAnchorPart(changeObj.anchor, 0)}_additions`
              );
            } else if (type === "removal") {
              changeObj.anchor = replaceAnchorPartWith(
                changeObj.anchor,
                0,
                `${getAnchorPart(changeObj.anchor, 0)}_removals`
              );
            }
            return changeObj;
          }, changeObjects);
        }
        if (categoryKey) {
          changeObjects = getAnchorsStartingWith(categoryKey, changeObjects);
        }
        return changeObjects;
      };

      let tutkinnotjakoulutuksetLiitteetChanges =
        R.path(
          ["meta", "tutkinnotjakoulutuksetLiitteet", "changeObjects"],
          muutospyynnot.muutospyynto
        ) || [];
      let taloudellisetChanges =
        R.path(
          ["meta", "taloudelliset", "changeObjects"],
          muutospyynnot.muutospyynto
        ) || [];
      let yhteenvetoChanges =
        R.path(
          ["meta", "yhteenveto", "changeObjects"],
          muutospyynnot.muutospyynto
        ) || [];
      // Gets uuid:s from liitteet-structure coming from backend and sets them to changeObject
      tutkinnotjakoulutuksetLiitteetChanges = setAttachmentUuids(
        tutkinnotjakoulutuksetLiitteetChanges,
        muutospyynnot.muutospyynto
      );
      taloudellisetChanges = setAttachmentUuids(
        taloudellisetChanges,
        muutospyynnot.muutospyynto
      );
      yhteenvetoChanges = setAttachmentUuids(
        yhteenvetoChanges,
        muutospyynnot.muutospyynto
      );

      const c = R.flatten([
        getChangesOf("tutkinnotjakoulutukset", backendMuutokset, {
          categoryKey: "tutkinnot"
        }),
        getChangesOf("tutkinnotjakoulutukset", backendMuutokset, {
          categoryKey: "liitteet"
        }),
        getChangesOf("tutkinnotjakoulutukset", backendMuutokset, {
          categoryKey: "perustelut_tutkinnot"
        }),
        getChangesOf("tutkinnotjakoulutukset", backendMuutokset, {
          categoryKey: "koulutukset"
        }),
        getChangesOf("tutkinnotjakoulutukset", backendMuutokset, {
          categoryKey: "perustelut_koulutukset"
        }),
        getChangesOf("opetuskieli", backendMuutokset, {
          path: ["meta", "key"]
        }),
        getChangesOf("tutkintokieli", backendMuutokset, {
          path: ["meta", "tunniste"]
        }),
        getChangesOf("opiskelijavuodet", backendMuutokset),
        getChangesOf("toimintaalue", backendMuutokset),
        getChangesOf("muut", backendMuutokset),
        tutkinnotjakoulutuksetLiitteetChanges,
        taloudellisetChanges,
        yhteenvetoChanges
      ]).filter(Boolean);

      let changesBySection = {};

      R.forEach(changeObj => {
        const anchorInitialSplitted = R.split(
          "_",
          getAnchorPart(changeObj.anchor, 0)
        );
        const existingChangeObjects =
          R.path(anchorInitialSplitted, changesBySection) || [];
        const changeObjects = R.insert(-1, changeObj, existingChangeObjects);
        changesBySection = R.assocPath(
          anchorInitialSplitted,
          changeObjects,
          changesBySection
        );
      }, c);

      setBackendChanges({
        changeObjects: changesBySection,
        source: backendMuutokset,
        handled: true
      });
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
    kunnat.fetched &&
    maakunnat.fetched &&
    maakuntakunnat.fetched &&
    vankilat.fetched &&
    accessRight
  ) {
    return (
      // <div>a</div>
      <MuutospyyntoWizard
        backendChanges={backendChanges}
        kielet={kielet}
        kohteet={kohteet}
        koulutukset={koulutukset}
        koulutusalat={koulutusalat}
        koulutustyypit={koulutustyypit}
        kunnat={kunnat.data}
        maakuntakunnat={maakuntakunnat}
        maakunnat={maakunnat.data}
        maaraystyypit={maaraystyypit.data}
        muutospyynnot={muutospyynnot}
        opiskelijavuodet={opiskelijavuodet}
        muut={muut}
        lupa={props.lupa}
        vankilat={vankilat}
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
