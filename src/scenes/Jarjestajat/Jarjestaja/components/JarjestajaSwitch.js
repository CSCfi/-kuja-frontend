import React, { useContext, useEffect, useMemo } from "react";
import { Switch, Route } from "react-router-dom";
import Jarjestaja from "../components/Jarjestaja";
import PropTypes from "prop-types";
import { LupahistoriaProvider } from "../../../../context/lupahistoriaContext";
import { BackendContext } from "../../../../context/backendContext";
import { injectIntl } from "react-intl";
import {
  abort,
  fetchFromBackend,
  getFetchState,
  statusMap,
  isReady
} from "../../../../services/backendService";
import * as R from "ramda";
import Loading from "../../../../modules/Loading";
import { parseLupa } from "../../../../services/luvat/lupaParser";
import HakemusContainer from "../Hakemukset/HakemusContainer";
import { MessageWrapper } from "../../../../modules/elements";

const JarjestajaSwitch = ({
  history,
  intl,
  match,
  organisaatio,
  user
}) => {
  const { state: fromBackend, dispatch } = useContext(BackendContext);

  const ytunnus = useMemo(() => {
    return match.params.ytunnus;
  }, [match]);

  const fetchSetup = useMemo(() => {
    return ytunnus
      ? [
          {
            key: "lupa",
            dispatchFn: dispatch,
            urlEnding: `${ytunnus}?with=all`
          },
          { key: "muutospyynnot", dispatchFn: dispatch, urlEnding: ytunnus }
        ]
      : [];
  }, [dispatch, ytunnus]);

  /**
   * Abort controller instances are used for cancelling the related
   * XHR calls later.
   */
  const abortControllers = useMemo(() => {
    return R.isEmpty(fetchSetup) ? [] : fetchFromBackend(fetchSetup);
  }, [fetchSetup]);

  /**
   * Ongoing XHR calls must be canceled. It's done here.
   */
  useEffect(() => {
    return () => {
      abort(abortControllers);
    };
  }, [abortControllers, dispatch, history]);

  const lupaKohteet = useMemo(() => {
    return isReady(fromBackend.lupa)
      ? parseLupa(fromBackend.lupa.raw, intl.formatMessage)
      : [];
  }, [fromBackend.lupa, intl.formatMessage]);

  const fetchState = useMemo(() => {
    return getFetchState(fetchSetup, fromBackend);
  }, [fetchSetup, fromBackend]);

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
      return (
        <React.Fragment>
          <Switch>
            <Route
              exact
              path={`${match.path}/hakemukset-ja-paatokset/uusi/:page`}
              render={props => {
                return (
                  <HakemusContainer
                    history={history}
                    lupaKohteet={lupaKohteet}
                    lupa={fromBackend.lupa}
                    match={props.match}
                  />
                );
              }}
            />
            <Route
              exact
              path={`${match.path}/hakemukset-ja-paatokset/:uuid/:page`}
              render={props => {
                return (
                  <HakemusContainer
                    history={history}
                    lupaKohteet={lupaKohteet}
                    lupa={fromBackend.lupa}
                    match={props.match}
                  />
                );
              }}
            />
            <Route
              path={`${match.path}`}
              render={() => (
                <LupahistoriaProvider>
                  {ytunnus && (
                    <Jarjestaja
                      lupaKohteet={lupaKohteet}
                      lupa={R.path(["lupa", "raw"], fromBackend)}
                      match={match}
                      muutospyynnot={fromBackend.muutospyynnot.raw}
                      organisaatio={organisaatio}
                      user={user}
                    />
                  )}
                </LupahistoriaProvider>
              )}
            />
          </Switch>
        </React.Fragment>
      );
    }
    return jsx;
  }, [
    fetchState,
    fromBackend,
    history,
    lupaKohteet,
    match,
    organisaatio,
    user,
    ytunnus
  ]);

  return view;
};

JarjestajaSwitch.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  organisaatio: PropTypes.object,
  user: PropTypes.object
};

export default injectIntl(JarjestajaSwitch);
