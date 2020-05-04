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
import Paatokset from "./Paatokset";
import {useLupa} from "../../../stores/lupa";
import common from "../../../i18n/definitions/common";
import Loading from "../../../modules/Loading";
import {parseGenericKujaLupa, parseVSTLupa} from "../../../utils/lupaParser";
import Jarjestamislupa from "./Jarjestamislupa";
import moment from "moment";
import {resolveLocalizedOrganizerName} from "../../../modules/helpers";

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

const getTyyppiMessage = (lupaData) => {

  if(!lupaData) {
    return common.loading;
  }

  const koulutustyyppi = lupaData.koulutustyyppi;
  const vstTyyppi = lupaData.oppilaitostyyppi;

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
        default:
          return 'undefined';
      }
    default:
      return 'undefined'
  }
};

const Jarjestaja = React.memo(
  ({ uuid, match }) => {

    const intl = useIntl();
    const [lupa, lupaActions] = useLupa();

    // Let's fetch LUPA
    useEffect(() => {
      let abortController;
      if (uuid) {
        abortController = lupaActions.load({uuid});
      }
      return function cancel() {
        if (abortController) {
          abortController.abort();
        }
      };
    }, [lupaActions, uuid]);

    const jarjestaja = useMemo(() => {
      return lupa.data && lupa.data.jarjestaja
        ? {
          ...lupa.data.jarjestaja,
          nimi: resolveLocalizedOrganizerName(lupa.data, intl.locale)
        }
        : {};
    }, [intl.locale, lupa.data]);

    const breadcrumb = useMemo(() => {
      return jarjestaja ? `/lupa/${uuid}` : "";
    }, [jarjestaja, uuid]);

    const basicRoutes = [
      {
        path: `${match.url}`,
        exact: true,
        text: intl.formatMessage(common.yllapitamisLupaTitle),
      },
      {
        path: `${match.url}/paatokset`,
        exact: true,
        text: intl.formatMessage(common.lupaPaatokset)
      }
    ];

    const sections = useMemo(() => {
      if(!lupa.data) {
        return {};
      }
      else {
        switch(lupa.data.koulutustyyppi) {
          case '3':
            return parseVSTLupa(lupa.data, intl);
          default:
            return parseGenericKujaLupa(lupa.data, intl.locale);
        }
      }
    }, [lupa.data, intl]);

    const dateString = new moment().format('D.M.YYYY');
    const lupaTitle = intl.formatMessage(getTyyppiMessage(lupa.data), {date: dateString});

    return (
      <React.Fragment>
        <div className="mx-auto px-4 sm:px-0 w-11/12 lg:w-3/4">
          <BreadcrumbsItem to="/">Etusivu</BreadcrumbsItem>
          <BreadcrumbsItem to="/vapaa-sivistystyo">{intl.formatMessage(common.vstTitleName)}</BreadcrumbsItem>
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
                    <Jarjestamislupa
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
  uuid: PropTypes.string
};

export default Jarjestaja;
