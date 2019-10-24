import React, { useContext, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LuvatList from "./components/LuvatList";
import Loading from "modules/Loading";
import { BackendContext } from "../../context/backendContext";
import {
  abort,
  fetchFromBackend,
  statusMap,
  getFetchState
} from "../../services/backendService";
import { MessageWrapper } from "../../modules/elements";

const Jarjestajat = () => {
  const { state: fromBackend, dispatch } = useContext(BackendContext);

  const fetchSetup = useMemo(() => {
    return [{ key: "luvat", dispatchFn: dispatch }];
  }, [dispatch]);

  /**
   * Abort controller instances are used for cancelling the related
   * XHR calls later.
   */
  const abortControllers = useMemo(() => {
    return fetchFromBackend(fetchSetup);
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

  if (fetchState.conclusion === statusMap.ready) {
    return (
      <React.Fragment>
        <Helmet>
          <title>Oiva | Ammatillinen koulutus</title>
        </Helmet>

        <BreadcrumbsItem to="/">Etusivu</BreadcrumbsItem>
        <BreadcrumbsItem to="/jarjestajat">
          Ammatillinen koulutus
        </BreadcrumbsItem>

        <div className="mx-auto w-full sm:w-3/4 mb-16">
          <h1>Ammatillisen koulutuksen järjestäjät</h1>
          <p className="py-4">
            Voimassa olevat järjestämisluvat ({fromBackend.luvat.raw.length}{" "}
            kpl)
          </p>
          <LuvatList luvat={fromBackend.luvat.raw} />
        </div>
      </React.Fragment>
    );
  } else if (fetchState.conclusion === statusMap.fetching) {
    return (
      <MessageWrapper>
        <Loading
          notReadyList={fetchState.notReadyList}
          percentage={fetchState.percentage.ready}
        />
      </MessageWrapper>
    );
  } else if (fetchState.conclusion === statusMap.erroneous) {
    return (
      <div className="text-center">
        <p>Lupia ladattaessa tapahtui virhe.</p>
      </div>
    );
  } else {
    return null;
  }
};

export default Jarjestajat;
