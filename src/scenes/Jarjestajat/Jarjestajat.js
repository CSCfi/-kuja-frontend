import React, { useContext, useMemo } from "react";
import { Helmet } from "react-helmet";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LuvatList from "./components/LuvatList";
import { BackendContext } from "../../context/backendContext";
import FetchHandler from "../../FetchHandler";
import * as R from "ramda";

const Jarjestajat = () => {
  const { state: fromBackend, dispatch } = useContext(BackendContext);

  const fetchSetup = useMemo(() => {
    return [{ key: "luvat", dispatchFn: dispatch }];
  }, [dispatch]);

  const { luvat, fetchedAt } = useMemo(() => {
    return {
      luvat: R.prop("raw", fromBackend.luvat),
      fetchedAt: R.prop("fetchedAt", fromBackend.luvat)
    };
  }, [fromBackend.luvat]);

  return (
    <React.Fragment>
      <FetchHandler
        fetchSetup={fetchSetup}
        ready={
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
              <p className="my-4">
                Voimassa olevat järjestämisluvat ({R.length(luvat)} kpl) Lista
                päivitetty: {fetchedAt}
              </p>
              <LuvatList luvat={R.prop("raw", fromBackend.luvat)} />
            </div>
          </React.Fragment>
        }
      ></FetchHandler>
    </React.Fragment>
  );
};

export default Jarjestajat;
