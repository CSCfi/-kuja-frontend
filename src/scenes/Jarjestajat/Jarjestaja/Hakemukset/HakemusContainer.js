import React, { useContext, useEffect, useState, useMemo } from "react";
import MuutospyyntoWizard from "./Muutospyynto/components/MuutospyyntoWizard";
import { MuutoshakemusProvider } from "context/muutoshakemusContext";
import { MUUT_KEYS } from "./Muutospyynto/modules/constants";
import { MessageWrapper } from "../../../../modules/elements";
import Loading from "../../../../modules/Loading";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";
import {
  getAnchorsStartingWith,
  getAnchorPart,
  replaceAnchorPartWith
} from "../../../../utils/common";
import { setAttachmentUuids } from "../../../../services/muutospyynnot/muutospyyntoUtil";
import { BackendContext } from "../../../../context/backendContext";
import {
  abort,
  fetchFromBackend,
  getFetchState,
  statusMap,
  isReady
} from "../../../../services/backendService";

const HakemusContainer = ({ lupa, lupaKohteet, match }) => {
  const { state: fromBackend, dispatch } = useContext(BackendContext);

  const fetchSetup = useMemo(() => {
    const arr1 = [
      { key: "kohteet", dispatchFn: dispatch },
      {
        key: "koulutus",
        dispatchFn: dispatch,
        urlEnding: "999901",
        path: ["koulutukset", "poikkeukset", "999901"]
      },
      {
        key: "koulutus",
        dispatchFn: dispatch,
        urlEnding: "999903",
        path: ["koulutukset", "poikkeukset", "999903"]
      },
      { key: "koulutusalat", dispatchFn: dispatch },
      { key: "koulutustyypit", dispatchFn: dispatch },
      {
        key: "koulutuksetMuut",
        dispatchFn: dispatch,
        urlEnding: MUUT_KEYS.AMMATILLISEEN_TEHTAVAAN_VALMISTAVA_KOULUTUS,
        path: [
          "koulutukset",
          "muut",
          MUUT_KEYS.AMMATILLISEEN_TEHTAVAAN_VALMISTAVA_KOULUTUS
        ]
      },
      {
        key: "koulutuksetMuut",
        dispatchFn: dispatch,
        urlEnding: MUUT_KEYS.OIVA_TYOVOIMAKOULUTUS,
        path: ["koulutukset", "muut", MUUT_KEYS.OIVA_TYOVOIMAKOULUTUS]
      },
      {
        key: "koulutuksetMuut",
        dispatchFn: dispatch,
        urlEnding: MUUT_KEYS.KULJETTAJAKOULUTUS,
        path: ["koulutukset", "muut", MUUT_KEYS.KULJETTAJAKOULUTUS]
      },
      { key: "kielet", dispatchFn: dispatch },
      { key: "opetuskielet", dispatchFn: dispatch },
      { key: "maaraystyypit", dispatchFn: dispatch },
      { key: "muut", dispatchFn: dispatch },
      { key: "kunnat", dispatchFn: dispatch },
      { key: "maakunnat", dispatchFn: dispatch },
      { key: "maakuntakunnat", dispatchFn: dispatch },
      { key: "vankilat", dispatchFn: dispatch },
      { key: "tutkinnot", dispatchFn: dispatch },
      {
        key: "oivamuutoikeudetvelvollisuudetehdotjatehtavat",
        dispatchFn: dispatch
      }
    ];
    // Existing muutospyynto will be fetched if we have the UUID to use.
    const arr2 = match.params.uuid
      ? [
          {
            key: "muutospyynto",
            dispatchFn: dispatch,
            urlEnding: match.params.uuid
          }
        ]
      : [];
    return R.concat(arr1, arr2);
  }, [dispatch, match.params.uuid]);

  /**
   * Abort controller instances are used for cancelling the related
   * XHR calls later.
   */
  const abortControllers = useMemo(() => {
    fetchFromBackend(fetchSetup);
  }, [fetchSetup]);

  /**
   * Ongoing XHR calls must be canceled. It's done here.
   */
  useEffect(() => {
    return () => {
      abort(abortControllers);
    };
  }, [abortControllers, dispatch]);

  const fetchState = useMemo(() => {
    return getFetchState(fetchSetup, fromBackend);
  }, [fetchSetup, fromBackend]);

  const [backendChanges, setBackendChanges] = useState({});

  /**
   * Let's walk through all the changes from the backend and update the muutoshakemus.
   */
  useEffect(() => {
    if (isReady(fromBackend.muutospyynto)) {
      const backendMuutokset = R.path(
        ["muutospyynto", "muutokset"],
        fromBackend.muutospyynto.raw
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
          fromBackend.muutospyynto
        ) || [];
      let taloudellisetChanges =
        R.path(
          ["meta", "taloudelliset", "changeObjects"],
          fromBackend.muutospyynto
        ) || [];
      let yhteenvetoChanges =
        R.path(
          ["meta", "yhteenveto", "changeObjects"],
          fromBackend.muutospyynto
        ) || [];
      // Gets uuid:s from liitteet-structure coming from backend and sets them to changeObject
      tutkinnotjakoulutuksetLiitteetChanges = setAttachmentUuids(
        tutkinnotjakoulutuksetLiitteetChanges,
        fromBackend.muutospyynto
      );
      taloudellisetChanges = setAttachmentUuids(
        taloudellisetChanges,
        fromBackend.muutospyynto
      );
      yhteenvetoChanges = setAttachmentUuids(
        yhteenvetoChanges,
        fromBackend.muutospyynto
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
  }, [fromBackend.muutospyynto]);

  const view = useMemo(() => {
    let jsx = <React.Fragment></React.Fragment>;
    if (fetchState.conclusion === statusMap.fetching) {
      jsx = (
        <MessageWrapper>
          <Loading
            notReadyList={fetchState.notReadyList}
            percentage={fetchState.percentage.ready}
          />
        </MessageWrapper>
      );
    } else if (fetchState.conclusion === statusMap.ready) {
      jsx = (
        <MuutoshakemusProvider>
          <MuutospyyntoWizard
            backendChanges={backendChanges}
            kohteet={fromBackend.kohteet.raw}
            koulutustyypit={fromBackend.koulutustyypit.raw}
            kunnat={fromBackend.kunnat.raw}
            lupa={lupa.raw}
            lupaKohteet={lupaKohteet}
            maakunnat={fromBackend.maakunnat.raw}
            maakuntakunnat={fromBackend.maakuntakunnat.raw}
            maaraystyypit={fromBackend.maaraystyypit.raw}
            match={match}
            muut={fromBackend.muut.raw}
            muutospyynto={fromBackend.muutospyynto}
            vankilat={fromBackend.vankilat.raw}
          />
        </MuutoshakemusProvider>
      );
    }
    return jsx;
  }, [
    fetchState,
    backendChanges,
    fromBackend.kohteet,
    fromBackend.koulutustyypit,
    fromBackend.kunnat,
    fromBackend.maakunnat,
    fromBackend.maakuntakunnat,
    fromBackend.maaraystyypit,
    fromBackend.muut,
    fromBackend.muutospyynto,
    fromBackend.vankilat,
    lupa,
    lupaKohteet,
    match
  ]);

  return view;
};

HakemusContainer.propTypes = {
  lupaKohteet: PropTypes.object,
  lupa: PropTypes.object,
  match: PropTypes.object
};

export default injectIntl(HakemusContainer);
