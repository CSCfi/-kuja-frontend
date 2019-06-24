import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import JarjestajaBasicInfo from "./JarjestajaBasicInfo";
import ProfileMenu from "./ProfileMenu";
import JulkisetTiedot from "./JulkisetTiedot";
import OmatTiedot from "./OmatTiedot";
import JarjestamislupaAsiat from "./Jarjestamislupa-asiat";
import Jarjestamislupa from "./Jarjestamislupa";
import HakemuksetJaPaatokset from "../Hakemukset/components/HakemuksetJaPaatokset";
import Loading from "../../../../modules/Loading";
import { LUPA_TEKSTIT } from "../../../Jarjestajat/Jarjestaja/modules/constants";
import { COLORS } from "../../../../modules/styles";
import {
  FullWidthWrapper
} from "../../../../modules/elements";
import { ROLE_KAYTTAJA } from "../../../../modules/constants";
import { fetchLupaHistory } from "services/lupahistoria/actions";
import { LupahistoriaContext } from "context/lupahistoriaContext";
import { KunnatProvider } from "context/kunnatContext";
import { MaakunnatProvider } from "../../../../context/maakunnatContext";

const Separator = styled.div`
  &:after {
    display: block;
    content: "";
    width: 100%;
    height: 1px;
    background-color: ${COLORS.BORDER_GRAY};
    margin: 30px 0;
  }
`;

// ELYkeskukset={ELYkeskukset}
// lupa={lupa}
// muutospyynnot={muutospyynnot}
// muutosperustelut={muutosperustelut}
// paatoskierrokset={paatoskierrokset}
// vankilat={vankilat}

const Jarjestaja = ({ match, lupa, muutospyynnot }) => {
  const { state: lupahistory, dispatch } = useContext(LupahistoriaContext);

  useEffect(() => {
    if (lupa && lupa.data && lupa.data.jarjestajaOid) {
      fetchLupaHistory(lupa.data.jarjestajaOid)(dispatch);
    }
  }, [lupa, muutospyynnot, dispatch]);

  if (match.params) {
    if (lupa && lupa.fetched && muutospyynnot && muutospyynnot.fetched) {
      const lupadata = lupa.data;
      const { jarjestaja } = lupadata;
      const breadcrumb = `/jarjestajat/${match.params.id}`;
      const jarjestajaNimi = jarjestaja.nimi.fi || jarjestaja.nimi.sv || "";

      // check the rights
      // TODO: organisaation oid pitää tarkastaa jotain muuta kautta kuin voimassaolevasta luvasta
      let authenticated = false;
      if (
        sessionStorage.getItem("role") === ROLE_KAYTTAJA &&
        sessionStorage.getItem("oid") === jarjestaja.oid
      ) {
        authenticated = true;
      }

      // Alanavigaation tabivalikon routet
      var tabNavRoutes = [];

      if (authenticated) {
        tabNavRoutes = [
          {
            path: `${match.url}/omattiedot`,
            exact: true,
            text: LUPA_TEKSTIT.OMATTIEDOT.OTSIKKO.FI,
            authenticated: authenticated
          },
          {
            path: `${match.url}/jarjestamislupa`,
            exact: true,
            text: LUPA_TEKSTIT.LUPA.OTSIKKO_LYHYT.FI,
            authenticated: true
          },
          {
            path: `${match.url}`,
            exact: true,
            text: LUPA_TEKSTIT.PAATOKSET.OTSIKKO.FI,
            authenticated: true
          },
          {
            path: `${match.url}/jarjestamislupa-asia`,
            text: LUPA_TEKSTIT.ASIAT.OTSIKKO_LYHYT.FI,
            authenticated: authenticated
          },
          {
            path: `${match.url}/hakemukset-ja-paatokset/uusi/1`,
            text: LUPA_TEKSTIT.MUUT.UUSI_HAKEMUS_OTSIKKO.FI,
            authenticated: authenticated
          }
        ];
      } else {
        tabNavRoutes = [
          {
            path: `${match.url}/jarjestamislupa`,
            text: LUPA_TEKSTIT.LUPA.OTSIKKO_LYHYT.FI,
            authenticated: true
          },
          {
            path: `${match.url}`,
            exact: true,
            text: LUPA_TEKSTIT.PAATOKSET.OTSIKKO.FI,
            authenticated: true
          }
        ];
      }

      return (
        <React.Fragment>
          <div className="mx-auto px-4 sm:px-0 w-11/12 lg:w-3/4">
            <BreadcrumbsItem to="/">Etusivu</BreadcrumbsItem>
            <BreadcrumbsItem to="/jarjestajat">
              Ammatillinen koulutus
            </BreadcrumbsItem>
            <BreadcrumbsItem to={breadcrumb}>{jarjestajaNimi}</BreadcrumbsItem>

            <JarjestajaBasicInfo jarjestaja={jarjestaja} />

            <Separator />

            <ProfileMenu routes={tabNavRoutes} />
          </div>
          <FullWidthWrapper backgroundColor={COLORS.BG_GRAY} className="mt-4">
            {authenticated ? (
              <div className="mx-auto w-11/12 lg:w-3/4 pb-8 py-8">
                <Route
                  path={`${match.path}/omattiedot`}
                  exact
                  render={props => (
                    <MaakunnatProvider>
                      <KunnatProvider>
                        <OmatTiedot {...props} />
                      </KunnatProvider>
                    </MaakunnatProvider>
                  )}
                />
                <Route
                  path={`${match.url}/jarjestamislupa`}
                  exact
                  render={() => (
                    <Jarjestamislupa ytunnus={match.params.ytunnus} />
                  )}
                />
                <Route
                  path={`${match.url}`}
                  exact
                  render={() => <JulkisetTiedot lupadata={lupadata} />}
                />
                <Route
                  path={`${match.url}/jarjestamislupa-asia`}
                  exact
                  render={() => (
                    <JarjestamislupaAsiat
                      lupadata={lupadata}
                      lupahistory={lupahistory}
                    />
                  )}
                />
                <Route
                  path={`${match.path}/hakemukset-ja-paatokset`}
                  exact
                  render={props => (
                    <HakemuksetJaPaatokset
                      muutospyynnot={muutospyynnot}
                      {...props}
                    />
                  )}
                />
              </div>
            ) : (
              <div className="mx-auto w-full sm:w-3/4 pb-8 sm:py-16">
                <Route
                  path={`${match.url}/jarjestamislupa`}
                  render={() => <Jarjestamislupa />}
                />
                <Route
                  path={`${match.url}`}
                  exact
                  render={() => <JulkisetTiedot lupadata={lupadata} />}
                />
              </div>
            )}
          </FullWidthWrapper>
        </React.Fragment>
      );
    } else if (
      (lupa && lupa.isFetching) ||
      (muutospyynnot && muutospyynnot.isFetching)
    ) {
      return <Loading />;
    } else if (lupa && lupa.hasErrored) {
      return <h2>Luvan lataamisessa tapahtui virhe</h2>;
    } else {
      return <div>Määrittelemätön tila.</div>;
    }
  } else {
    return null;
  }
};

export default Jarjestaja;
// {jarjestajaNimi}

// import MuutospyyntoContainer from "../Hakemukset/Muutospyynto/containers/MuutospyyntoContainer"
// import MuutospyyntoWizard from '../Hakemukset/Muutospyynto/components/MuutospyyntoWizard'
