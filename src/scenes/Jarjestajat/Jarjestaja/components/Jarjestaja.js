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
  ContentContainer,
  FullWidthWrapper,
  ContentWrapper
} from "../../../../modules/elements";
import { ROLE_KAYTTAJA } from "../../../../modules/constants";
import { fetchLupaHistory } from "services/lupahistoria/actions";
import { LupahistoriaContext } from "context/lupahistoriaContext";
import _ from "lodash";

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

const Jarjestaja = ({ match, lupa, muutospyynnot }) => {
  const { state: lupahistory, dispatch } = useContext(LupahistoriaContext);

  useEffect(() => {
    if (lupa && lupa.data && lupa.data.jarjestajaOid) {
      fetchLupaHistory(lupa.data.jarjestajaOid)(dispatch);
    }
  }, [lupa, muutospyynnot]);

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
            path: `${match.url}/hakemukset-ja-paatokset/uusi`,
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
        <ContentWrapper>
          <ContentContainer>
            <BreadcrumbsItem to="/">Etusivu</BreadcrumbsItem>
            <BreadcrumbsItem to="/jarjestajat">
              Ammatillinen koulutus
            </BreadcrumbsItem>
            <BreadcrumbsItem to={breadcrumb}>{jarjestajaNimi}</BreadcrumbsItem>

            <JarjestajaBasicInfo jarjestaja={jarjestaja} />

            <Separator />

            <ProfileMenu routes={tabNavRoutes} />
          </ContentContainer>

          <FullWidthWrapper backgroundColor={COLORS.BG_GRAY}>
            {authenticated ? (
              <ContentContainer
                padding={"40px 15px 80px"}
                margin={"28px auto 0"}
              >
                <Route
                  path={`${match.path}/omattiedot`}
                  exact
                  render={props => <OmatTiedot {...props} />}
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
              </ContentContainer>
            ) : (
              <ContentContainer
                padding={"40px 15px 80px"}
                margin={"28px auto 0"}
              >
                <Route
                  path={`${match.url}/jarjestamislupa`}
                  render={() => <Jarjestamislupa />}
                />
                <Route
                  path={`${match.url}`}
                  exact
                  render={() => <JulkisetTiedot lupadata={lupadata} />}
                />
              </ContentContainer>
            )}
          </FullWidthWrapper>
        </ContentWrapper>
      );
    } else if (
      (lupa && lupa.isFetching) ||
      (muutospyynnot && muutospyynnot.isFetching)
    ) {
      return <Loading />;
    } else if (lupa && lupa.hasErrored) {
      return <h2>Luvan lataamisessa tapahtui virhe</h2>;
    } else {
      return <div>Jotain muuta</div>;
    }
  } else {
    return null;
  }
};

export default Jarjestaja;
// {jarjestajaNimi}

// import MuutospyyntoContainer from "../Hakemukset/Muutospyynto/containers/MuutospyyntoContainer"
// import MuutospyyntoWizard from '../Hakemukset/Muutospyynto/components/MuutospyyntoWizard'
