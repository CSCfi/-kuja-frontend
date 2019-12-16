import React from "react";
import { Helmet } from "react-helmet";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { PropTypes } from "prop-types";
import styled from "styled-components";
import {COLORS} from "../../modules/styles";
import ProfileMenu from "../Jarjestajat/Jarjestaja/components/ProfileMenu";
import {FullWidthWrapper} from "../../modules/elements";
import AvoimetAsiat from "./components/AvoimetAsiat";
import {Route} from "react-router-dom";

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

const Esittelijat = ({history, match, user}) => {
  const routes = [
    {
      path: `${match.url}/avoimet`,
      text: 'Avoimet asiat',
      authenticated: !!user
    }
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>Oiva | Asiat</title>
      </Helmet>
      <div className="mx-auto px-4 sm:px-0 w-11/12 lg:w-3/4">
      <BreadcrumbsItem to="/">Etusivu</BreadcrumbsItem>
      <BreadcrumbsItem to="/asiat">Asiat</BreadcrumbsItem>
      <div className="mx-auto w-full sm:w-3/4 mb-16">
        <h1>Asiat</h1>
      </div>
      <Separator />
      <ProfileMenu routes={routes}/>
      </div>
      <FullWidthWrapper backgroundColor={COLORS.BG_GRAY} className="mt-4">
        <div className="mx-auto lg:w-3/4 pb-8 py-8">
          <Route
            path={`${match.url}/avoimet`}
            exact
            render={() => (
              <AvoimetAsiat/>
            )}
          />
        </div>
      </FullWidthWrapper>
    </React.Fragment>
  )
};

Esittelijat.propTypes = {
  history: PropTypes.object
}

export default Esittelijat;
