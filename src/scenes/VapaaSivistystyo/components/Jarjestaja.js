import React, {useEffect, useMemo} from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import JarjestajaBasicInfo from "./JarjestajaBasicInfo";
import ProfileMenu from "./ProfileMenu";
import { COLORS } from "../../../modules/styles";
import { FullWidthWrapper } from "../../../modules/elements";
import * as R from "ramda";
import Paatokset from "./Paatokset";
import {useLupa} from "../../../stores/lupa";
import common from "../../../i18n/definitions/common";
import Loading from "../../../modules/Loading";
import {parseGenericKujaLupa} from "../../../utils/lupaParser";
import GenericJarjestamislupa from "./GenericJarjestamislupa";
import moment from "moment";

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

const getTyyppiMessage = (lupa) => {
  const koulutustyyppi = lupa.koulutustyyppi;
  const vstTyyppi = lupa.oppilaitostyyppi;

  if(!koulutustyyppi) {
    return common.lupaPageTitleAmmatillinen;
  }

  switch(koulutustyyppi) {
    case "1":
      return common.lupaPageTitleEsiJaPerusopeutus;
    case "2":
      return common.lupaPageTitleLukio;
    case "3":
      switch(vstTyyppi) {
        case "1":
          return common.lupaPageTitleVSTKansanopisto;
        case "2":
          return common.lupaPageTitleVSTKansalaisopisto;
        case "3":
          return common.lupaPageTitleVSTOpintokeskus;
        case "4":
          return common.lupaPageTitleVSTKesayliopisto;
        case "5":
          return common.lupaPageTitleVSTLiikunnanKoulutuskeskus;
        case "6":
          return common.lupaPageTitleVSTMuut;
      }
  }
};

const Jarjestaja = React.memo(
  ({ ytunnus, koulutustyyppi, oppilaitostyyppi,  match }) => {

    const intl = useIntl();
    const [lupa, lupaActions] = useLupa();

    // Let's fetch LUPA
    useEffect(() => {
      let abortController;
      if (ytunnus) {
        abortController = lupaActions.load({ytunnus, koulutustyyppi, oppilaitostyyppi});
      }
      return function cancel() {
        if (abortController) {
          abortController.abort();
        }
      };
    }, [lupaActions, ytunnus]);

    const jarjestaja = useMemo(() => {
      return lupa.data && lupa.data.jarjestaja
        ? {
          ...lupa.data.jarjestaja,
          nimi: R.prop(intl.locale, lupa.data.jarjestaja.nimi)
        }
        : {};
    }, [intl.locale, lupa.data]);

    const breadcrumb = useMemo(() => {
      return jarjestaja ? `/vapaa-sivistystyo/luvat/${ytunnus}` : "";
    }, [jarjestaja]);

    const basicRoutes = [
      {
        path: `${match.url}`,
        exact: true,
        text: intl.formatMessage(common.lupaTitle),
      },
      {
        path: `${match.url}/paatokset`,
        exact: true,
        text: intl.formatMessage(common.lupaPaatokset)
      }
    ];

    const sections = useMemo(() => {
      return !lupa.data ? {} : parseGenericKujaLupa(lupa.data, intl.locale);
    }, [lupa.data]);

    const dateString = new moment().format('D.M.YYYY');
    const lupaTitle = intl.formatMessage(getTyyppiMessage(lupa), {date: dateString});

    return (
      <React.Fragment>
        <div className="mx-auto px-4 sm:px-0 w-11/12 lg:w-3/4">
          <BreadcrumbsItem to="/">Etusivu</BreadcrumbsItem>
          <BreadcrumbsItem to="/vapaa-sivistystyo">{intl.formatMessage(common.vst.titleName)}</BreadcrumbsItem>
          <BreadcrumbsItem to={breadcrumb}>{jarjestaja.nimi}</BreadcrumbsItem>

          <JarjestajaBasicInfo jarjestaja={jarjestaja} />

          <Separator />

          <ProfileMenu routes={basicRoutes} />
        </div>
        <FullWidthWrapper backgroundColor={COLORS.BG_GRAY} className="mt-4">
          <div className="mx-auto w-full sm:w-3/4 pb-8 sm:py-16">
            <Route
              path={`${match.path}/paatokset`}
              exact
              render={() => {

                if(lupa.isLoading === false && lupa.fetchedAt) {
                  return (<Paatokset lupa={lupa.data} jarjestaja={jarjestaja} />)
                }
                else {
                  return <Loading />
                }
              }}
            />
            <Route
              path={`${match.path}`}
              exact
              render={(props) => {
                if(lupa.isLoading === false && lupa.fetchedAt) {
                  return (
                    <GenericJarjestamislupa
                      sections={sections}
                      lupaTitle={lupaTitle}
                    />
                  )
                }
                else {
                  return <Loading />
                }
              }}
            />
          </div>
        </FullWidthWrapper>
      </React.Fragment>
    );
  }
);

Jarjestaja.propTypes = {
  match: PropTypes.object,
  ytunnus: PropTypes.string,
  koulutustyyppi: PropTypes.string,
  oppilaitostyyppi: PropTypes.string
};

export default Jarjestaja;
