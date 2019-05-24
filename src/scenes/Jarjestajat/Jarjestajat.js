import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LuvatList from "./components/LuvatList";
import Loading from "modules/Loading";
import { JarjestajatContext } from "../../context/jarjestajatContext";
import { fetchLuvat } from "services/jarjestajat/actions";

const Jarjestajat = () => {
  const { state, dispatch } = useContext(JarjestajatContext);
  const { fetched, isFetching, hasErrored, data } = state;

  useEffect(() => {
    fetchLuvat()(dispatch);
  }, []);

  if (fetched) {
    return (
      <div>
        <Helmet>
          <title>Oiva | Ammatillinen koulutus</title>
        </Helmet>

        <BreadcrumbsItem to="/">Etusivu</BreadcrumbsItem>
        <BreadcrumbsItem to="/jarjestajat">
          Ammatillinen koulutus
        </BreadcrumbsItem>

        <h1>Ammatillisen koulutuksen järjestäjät</h1>
        <p className="py-4">
          Voimassa olevat järjestämisluvat ({Object.keys(data).length} kpl)
        </p>
        <LuvatList luvat={data} />
      </div>
    );
  } else if (isFetching) {
    return <Loading />;
  } else if (hasErrored) {
    return <div>&nbsp;&nbsp;Lupia ladattaessa tapahtui virhe</div>;
  } else {
    return null;
  }
};

export default Jarjestajat;
