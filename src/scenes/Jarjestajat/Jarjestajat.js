import React, { useContext, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LuvatList from "./components/LuvatList";
import Loading from "modules/Loading";
import { BackendContext } from "../../context/backendContext";
import {
  abort,
  fetchFromBackend,
  isErroneous,
  isFetching,
  isReady
} from "../../services/backendService";

const Jarjestajat = () => {
  const { state: fromBackend, dispatch } = useContext(BackendContext);

  /**
   * Abort controller instances are used for cancelling the related
   * XHR calls later.
   */
  const abortControllers = useMemo(() => {
    return fetchFromBackend([{ key: "luvat", dispatchFn: dispatch }]);
  }, [dispatch]);

  /**
   * Ongoing XHR calls must be canceled. It's done here.
   */
  useEffect(() => {
    return () => {
      abort(abortControllers);
    };
  }, [abortControllers, dispatch]);

  const isMainViewVisible = useMemo(() => {
    return isReady(fromBackend.luvat);
  }, [fromBackend.luvat]);

  const isLoading = useMemo(() => {
    return isFetching(fromBackend.luvat);
  }, [fromBackend.luvat]);

  const fetchingHasFailed = useMemo(() => {
    return isErroneous(fromBackend.luvat);
  }, [fromBackend.luvat]);

  if (isMainViewVisible) {
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
  } else if (isLoading) {
    return <Loading />;
  } else if (fetchingHasFailed) {
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
